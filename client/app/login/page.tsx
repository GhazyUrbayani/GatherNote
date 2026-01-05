'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '../lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        const response = await authAPI.login(formData.email, formData.password);
        if (response.error) {
          setError(response.message || 'Login gagal');
        } else if (response.token) {
          router.push('/');
        } else {
          setError('Login gagal: Token tidak ditemukan');
        }
      } else {
        // Register
        const response = await authAPI.register(formData.name, formData.email, formData.password);
        if (response.error) {
          setError(response.message || 'Registrasi gagal');
        } else {
          // Auto login setelah register
          const loginResponse = await authAPI.login(formData.email, formData.password);
          if (loginResponse.error) {
            setError('Registrasi berhasil, silakan login');
            setIsLogin(true);
          } else {
            router.push('/');
          }
        }
      }
    } catch (err) {
      setError('Terjadi kesalahan. Pastikan server berjalan di port 7004');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1E3A8A] mb-2">GatherNote</h1>
          <p className="text-gray-500 text-sm">
            {isLogin ? 'Masuk ke akun Anda' : 'Buat akun baru'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
                placeholder="John Doe"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
              placeholder="email@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
              placeholder="••••••••"
              required
              minLength={6}
            />
            {!isLogin && (
              <p className="text-xs text-gray-500 mt-1">Minimal 6 karakter</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1E3A8A] text-white py-3 rounded-lg font-medium hover:bg-[#1E3A8A]/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Memproses...' : isLogin ? 'Masuk' : 'Daftar'}
          </button>
        </form>

        {/* Toggle Login/Register */}
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setFormData({ name: '', email: '', password: '' });
            }}
            className="text-[#1E3A8A] hover:underline text-sm"
          >
            {isLogin ? 'Belum punya akun? Daftar di sini' : 'Sudah punya akun? Masuk di sini'}
          </button>
        </div>

        {/* Demo Credentials Info */}
        {isLogin && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-gray-600 font-semibold mb-2">Demo Accounts (Real DB Data):</p>
            <div className="text-xs text-gray-600 space-y-1">
              <p>• <strong>daffa@itb.ac.id</strong> / password123</p>
              <p>• <strong>azzam@itb.ac.id</strong> / password123</p>
              <p>• <strong>siti@itb.ac.id</strong> / password123</p>
            </div>
            <p className="text-xs text-gray-500 mt-2 italic">
              * Username: daffa_student, azzam_mahasiswa, siti_scholar
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
