const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

// Inisialisasi Google AI dengan API Key dari .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const summarizeNote = async (req, res) => {
  try {
    const { content, language = 'id' } = req.body;

    // 1. Validasi Input
    if (!content || content.length < 50) {
      return res.status(400).json({ 
        status: "error",
        message: "Konten terlalu pendek untuk diringkas (min. 50 karakter)." 
      });
    }

    // 2. Pilih Model AI (Gemini Pro - Teks)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // 3. Prompt Engineering (Instruksi Rahasia agar hasil bagus)
    const languageInstruction = language === 'en' 
      ? 'Use academic English that is easy to understand.'
      : 'Gunakan Bahasa Indonesia yang akademis tapi mudah dimengerti.';

    const prompt = `
      Bertindaklah sebagai asisten belajar mahasiswa.
      Tugasmu adalah meringkas catatan kuliah berikut ini.
      
      Aturan Ringkasan:
      1. ${languageInstruction}
      2. Format output menggunakan Markdown (Bullet points).
      3. Fokus pada definisi, konsep kunci, dan kesimpulan.
      4. Jangan bertele-tele.
      5. Buat maksimal 5-7 poin penting.
      
      Teks Catatan:
      "${content}"
    `;

    // 4. Panggil External API (Integrasi)
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summaryText = response.text();

    // 5. Kirim Balik ke User
    return res.status(200).json({
      status: "success",
      data: {
        original_length: content.length,
        summary: summaryText,
        ai_model: "gemini-pro",
        timestamp: new Date()
      }
    });

  } catch (error) {
    console.error("AI Service Error:", error);
    return res.status(503).json({ 
      status: "error",
      message: "Layanan AI sedang sibuk atau error.", 
      error: error.message 
    });
  }
};

module.exports = { summarizeNote };
