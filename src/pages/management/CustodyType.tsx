import React, { useState } from 'react';
import { ChevronLeft, Plus, Edit2, Trash2, X } from 'lucide-react';
import { dataManager } from '../../utils/dataManager';
import type { CustodyType as CustodyTypeModel } from '../../utils/dataManager';

interface CustodyTypeProps {
  onBack: () => void;
}

const CustodyType: React.FC<CustodyTypeProps> = ({ onBack }) => {
  const [types, setTypes] = useState<CustodyTypeModel[]>(dataManager.getCustodyTypes());
  const [showModal, setShowModal] = useState(false);
  const [editingType, setEditingType] = useState<CustodyTypeModel | null>(null);
  const [newType, setNewType] = useState({ name: '' });

  const handleSave = () => {
    if (newType.name) {
      if (editingType) {
        // Edit
        const updatedType = { ...editingType, name: newType.name };
        dataManager.updateCustodyType(updatedType);
      } else {
        // Add
        const typeToAdd = { id: Date.now(), name: newType.name };
        dataManager.addCustodyType(typeToAdd);
      }
      setTypes(dataManager.getCustodyTypes());
      setShowModal(false);
      setNewType({ name: '' });
      setEditingType(null);
    }
  };

  const handleOpenAdd = () => {
    setEditingType(null);
    setNewType({ name: '' });
    setShowModal(true);
  };

  const handleOpenEdit = (type: CustodyTypeModel) => {
    setEditingType(type);
    setNewType({ name: type.name });
    setShowModal(true);
  };

  const handleDelete = (type: CustodyTypeModel) => {
    // Check if any class uses this custody type
    const classes = dataManager.getClasses();
    const hasAssociatedClasses = classes.some(cls => cls.custodyType === type.name);

    if (hasAssociatedClasses) {
      alert(`无法删除“${type.name}”，该托管类型下仍有正在运行的班级。请先处理相关班级后再试。`);
      return;
    }

    if (window.confirm(`确定要删除“${type.name}”托管类型吗？`)) {
      dataManager.deleteCustodyType(type.id);
      setTypes(dataManager.getCustodyTypes());
    }
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen font-sans selection:bg-blue-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl px-4 py-3 border-b border-slate-200/60 sticky top-0 z-10 flex items-center justify-between shadow-sm transition-all duration-300">
        <button 
          onClick={onBack} 
          className="p-2 -ml-2 text-slate-600 hover:bg-slate-100/80 active:scale-95 rounded-full transition-all"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className="font-bold text-lg text-slate-800 tracking-tight">托管类型维护</h1>
        <button 
          onClick={handleOpenAdd} 
          className="p-2 -mr-2 text-blue-600 hover:bg-blue-50 active:scale-95 rounded-full transition-all"
        >
          <Plus size={24} />
        </button>
      </div>

      {/* List */}
      <div className="p-4 space-y-4">
        {types.map((type, index) => (
          <div 
            key={type.id} 
            className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-800 text-lg tracking-tight group-hover:text-blue-600 transition-colors">{type.name}</h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleOpenEdit(type)}
                  className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all active:scale-90 bg-slate-50 border border-slate-100"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(type)}
                  className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-90 bg-slate-50 border border-slate-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {types.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100 animate-pulse-slow">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                <Plus size={32} className="text-slate-300" />
              </div>
            </div>
            <h3 className="text-slate-800 font-bold text-lg mb-2">暂无托管类型</h3>
            <p className="text-slate-400 text-sm max-w-[200px] mx-auto leading-relaxed">
              还没有添加任何托管类型，点击右上角加号开始添加吧
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowModal(false)} />
          <div className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl scale-100 animate-in zoom-in-95 duration-300 relative z-10 ring-1 ring-black/5">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 backdrop-blur-xl">
              <h3 className="font-bold text-xl text-slate-800 tracking-tight">{editingType ? '编辑托管类型' : '添加托管类型'}</h3>
              <button 
                onClick={() => setShowModal(false)} 
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all active:scale-90"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 ml-1">类型名称</label>
                <input
                  type="text"
                  value={newType.name}
                  onChange={e => setNewType({ name: e.target.value })}
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-800 placeholder:text-slate-400 font-medium hover:bg-white"
                  placeholder="如：午托"
                />
              </div>
              <button
                onClick={handleSave}
                disabled={!newType.name}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 active:scale-[0.98] transition-all disabled:opacity-50 disabled:shadow-none mt-4 hover:brightness-110"
              >
                {editingType ? '保存修改' : '确认添加'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustodyType;
