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
    <div className="bg-background min-h-screen flex flex-col font-sans">
      {/* Header */}
      <div className="bg-background/90 backdrop-blur-md px-4 py-3 border-b-2 border-border-main/10 sticky top-0 z-10 flex items-center justify-between shadow-sm transition-all duration-300">
        <button 
          onClick={onBack} 
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-border-main text-text-main shadow-pop active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
        >
          <ChevronLeft size={24} strokeWidth={3} />
        </button>
        <h1 className="font-black text-lg text-text-main tracking-tight">周边学校库</h1>
        <button 
          onClick={() => setShowAddModal(true)} 
          className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-text-main border-2 border-border-main shadow-sm active:scale-95 transition-all"
        >
          <Plus size={24} strokeWidth={3} />
        </button>
      </div>

      {/* School List */}
      <div className="p-4 space-y-3">
        {schools.map(school => (
          <div key={school.id} className="bg-white p-5 rounded-[2rem] border-2 border-border-main flex justify-between items-center shadow-pop transition-all duration-300">
            <div>
              <h3 className="font-black text-text-main text-lg tracking-tight">{school.name}</h3>
              <p className="text-sm text-text-light mt-1 font-bold">{school.address || '暂无地址信息'}</p>
            </div>
            <div className="flex gap-2">
              <button className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-sun border-2 border-border-main text-text-main hover:bg-secondary transition-all active:scale-95">
                <Edit2 size={16} strokeWidth={2.5} />
              </button>
              <button 
                onClick={() => handleDeleteSchool(school.id)}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-sun border-2 border-border-main text-text-main hover:bg-primary hover:text-white transition-all active:scale-95"
              >
                <Trash2 size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        ))}
        {schools.length === 0 && (
          <div className="text-center py-12 text-text-light">
             <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-border-main">
               <Plus size={24} className="text-text-light" strokeWidth={2.5} />
             </div>
             <p className="text-sm font-bold">暂无学校信息，请点击右上角添加</p>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] w-full max-w-sm overflow-hidden shadow-pop scale-100 animate-in zoom-in-95 duration-200 border-2 border-border-main">
            <div className="p-4 border-b-2 border-border-main/10 flex justify-between items-center bg-background">
              <h3 className="font-black text-lg text-text-main">添加学校</h3>
              <button 
                onClick={() => setShowAddModal(false)} 
                className="p-1 text-text-light hover:text-text-main hover:bg-black/5 rounded-full transition-all"
              >
                <X size={24} strokeWidth={2.5} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-black text-text-main mb-1.5 ml-1">学校名称</label>
                <input
                  type="text"
                  value={newSchoolName}
                  onChange={(e) => setNewSchoolName(e.target.value)}
                  className="w-full px-4 py-3 bg-background border-2 border-border-main rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-text-main placeholder:text-text-light font-bold"
                  placeholder="请输入学校名称"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-black text-text-main mb-1.5 ml-1">学校地址</label>
                <input
                  type="text"
                  value={newSchoolAddress}
                  onChange={(e) => setNewSchoolAddress(e.target.value)}
                  className="w-full px-4 py-3 bg-background border-2 border-border-main rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-text-main placeholder:text-text-light font-bold"
                  placeholder="请输入学校地址（选填）"
                />
              </div>
              <button
                onClick={handleAddSchool}
                disabled={!newSchoolName.trim()}
                className="w-full bg-primary text-white py-3.5 rounded-xl font-black text-base shadow-pop border-2 border-border-main hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed mt-2 active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
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
