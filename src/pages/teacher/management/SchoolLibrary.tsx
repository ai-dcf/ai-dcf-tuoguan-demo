import React, { useState } from 'react';
import { ChevronLeft, Plus, Edit2, Trash2, X } from 'lucide-react';

interface SchoolLibraryProps {
  onBack: () => void;
}

interface School {
  id: number;
  name: string;
  address: string;
}

const SchoolLibrary: React.FC<SchoolLibraryProps> = ({ onBack }) => {
  const [schools, setSchools] = useState<School[]>([
    { id: 1, name: '中关村第一小学', address: '北京市海淀区中关村' },
    { id: 2, name: '中关村第二小学', address: '北京市海淀区中关村' },
    { id: 3, name: '人民大学附属小学', address: '北京市海淀区' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newSchoolName, setNewSchoolName] = useState('');
  const [newSchoolAddress, setNewSchoolAddress] = useState('');

  const handleAddSchool = () => {
    if (newSchoolName.trim()) {
      setSchools([
        ...schools,
        { id: Date.now(), name: newSchoolName, address: newSchoolAddress }
      ]);
      setNewSchoolName('');
      setNewSchoolAddress('');
      setShowAddModal(false);
    }
  };

  const handleDeleteSchool = (id: number) => {
    if (window.confirm('确定要删除该学校吗？')) {
      setSchools(schools.filter(s => s.id !== id));
    }
  };

  return (
    <div className="bg-slate-50/50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md px-4 py-3 border-b border-slate-200/60 sticky top-0 z-10 flex items-center justify-between shadow-sm transition-all duration-300">
        <button 
          onClick={onBack} 
          className="p-2 -ml-2 text-slate-600 hover:bg-slate-100/80 active:scale-95 rounded-full transition-all"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className="font-bold text-lg text-slate-800 tracking-tight">周边学校库</h1>
        <button 
          onClick={() => setShowAddModal(true)} 
          className="p-2 -mr-2 text-blue-600 hover:bg-blue-50 active:scale-95 rounded-full transition-all"
        >
          <Plus size={24} />
        </button>
      </div>

      {/* School List */}
      <div className="p-4 space-y-3">
        {schools.map(school => (
          <div key={school.id} className="bg-white p-5 rounded-2xl border border-slate-100 flex justify-between items-center shadow-sm hover:shadow-md transition-all duration-300">
            <div>
              <h3 className="font-bold text-slate-800 text-lg tracking-tight">{school.name}</h3>
              <p className="text-sm text-slate-500 mt-1 font-medium">{school.address || '暂无地址信息'}</p>
            </div>
            <div className="flex gap-1.5">
              <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 active:bg-blue-100 rounded-full transition-all active:scale-95">
                <Edit2 size={18} />
              </button>
              <button 
                onClick={() => handleDeleteSchool(school.id)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 active:bg-red-100 rounded-full transition-all active:scale-95"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        {schools.length === 0 && (
          <div className="text-center py-12 text-slate-400">
             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
               <Plus size={24} className="text-slate-300" />
             </div>
             <p className="text-sm font-medium">暂无学校信息，请点击右上角添加</p>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-xl scale-100 animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-lg text-slate-800">添加学校</h3>
              <button 
                onClick={() => setShowAddModal(false)} 
                className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">学校名称</label>
                <input
                  type="text"
                  value={newSchoolName}
                  onChange={(e) => setNewSchoolName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-800 placeholder:text-slate-400"
                  placeholder="请输入学校名称"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">学校地址</label>
                <input
                  type="text"
                  value={newSchoolAddress}
                  onChange={(e) => setNewSchoolAddress(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-800 placeholder:text-slate-400"
                  placeholder="请输入学校地址（选填）"
                />
              </div>
              <button
                onClick={handleAddSchool}
                disabled={!newSchoolName.trim()}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-base shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed mt-2"
              >
                确认添加
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolLibrary;
