import React from 'react';
import { X, Plus, Minus } from 'lucide-react';

const CreateGroupModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl p-8 rounded-[2rem] shadow-2xl relative">
        
        {/* Tombol Close/Cancel di Kiri Atas (Sesuai desain Hal 84) */}
        <button onClick={onClose} className="absolute top-8 left-8 bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-red-600 transition">
          Cancel
        </button>

        <h2 className="text-3xl font-bold text-gn-primary mb-8 text-center">Create Group</h2>

        <form className="flex flex-col gap-6">
          {/* Input Fields */}
          <input type="text" placeholder="Insert group title" className="w-full bg-gn-soft/50 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-gn-secondary text-gn-primary font-medium" />
          
          <textarea placeholder="Insert group description..." rows="3" className="w-full bg-gn-soft/50 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-gn-secondary text-gn-primary resize-none"></textarea>

          {/* Add Friends Section */}
          <div>
            <h3 className="text-lg font-bold text-gn-primary mb-4">Add your friends</h3>
            <div className="flex flex-col gap-3 max-h-48 overflow-y-auto pr-2">
              {/* Dummy Friend Item 1 */}
              <div className="flex items-center justify-between bg-gn-primary text-white p-3 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full"></div> {/* Avatar */}
                  <span className="font-semibold">Adam Joaquin Girsang</span>
                </div>
                <button type="button" className="bg-white text-gn-primary p-1 rounded-md"><Plus size={16}/></button>
              </div>
              
              {/* Dummy Friend Item 2 */}
              <div className="flex items-center justify-between bg-gray-100 text-gray-500 p-3 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <span className="font-semibold">Ananda Fajrul Zidan</span>
                </div>
                <button type="button" className="bg-white border border-gray-300 p-1 rounded-md"><Minus size={16}/></button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <button onClick={onClose} className="bg-gn-secondary text-gn-primary px-8 py-3 rounded-xl font-bold hover:bg-gn-secondary/80 transition">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;