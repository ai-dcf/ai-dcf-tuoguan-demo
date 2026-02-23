import React, { useState } from 'react';
import { ChevronLeft, Plus, Edit2, Trash2 } from 'lucide-react';

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
    <div className="bg-slate-50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-slate-100 sticky top-0 z-10 flex items-center justify-between">
        <button onClick={onBack} className="p-1 -ml-1 text-slate-600 active:bg-slate-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg text-slate-800">周边学校库</h1>
        <button onClick={() => setShowAddModal(true)} className="p-1 text-blue-600 active:bg-blue-50 rounded-full">
          <Plus size={24} />
        </button>
      </div>

      {/* School List */}
      <div className="p-4 space-y-3">
        {schools.map(school => (
          <div key={school.id} className="bg-white p-4 rounded-xl border border-slate-100 flex justify-between items-center shadow-sm">
            <div>
              <h3 className="font-bold text-slate-800">{school.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{school.address || '暂无地址信息'}</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-slate-400 hover:text-blue-500 active:bg-slate-50 rounded-lg transition-colors">
                <Edit2 size={18} />
              </button>
              <button 
                onClick={() => handleDeleteSchool(school.id)}
                className="p-2 text-slate-400 hover:text-red-500 active:bg-slate-50 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        {schools.length === 0 && (
          <div className="text-center py-10 text-slate-400">
            暂无学校信息，请点击右上角添加
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-800">添加学校</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">学校名称</label>
                <input
                  type="text"
                  value={newSchoolName}
                  onChange={(e) => setNewSchoolName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="请输入学校名称"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">学校地址</label>
                <input
                  type="text"
                  value={newSchoolAddress}
                  onChange={(e) => setNewSchoolAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="请输入学校地址（选填）"
                />
              </div>
              <button
                onClick={handleAddSchool}
                disabled={!newSchoolName.trim()}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
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
