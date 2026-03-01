import React, { useState } from 'react';
import { ChevronLeft, Plus, Edit2, Trash2, X } from 'lucide-react';
import { dataManager } from '../../../utils/dataManager';
import type { CustodyType as CustodyTypeModel } from '../../../types';

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
      setTypes([...dataManager.getCustodyTypes()]); // Spread to force re-render
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
      setTypes([...dataManager.getCustodyTypes()]); // Spread to force re-render
    }
  };

  return (
    <div className="bg-background min-h-screen font-sans flex flex-col">
      {/* Header */}
      <div className="bg-background/90 backdrop-blur-xl px-4 py-3 border-b-2 border-border-main/10 sticky top-0 z-10 flex items-center justify-between shadow-sm transition-all duration-300">
        <button 
          onClick={onBack} 
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-border-main text-text-main shadow-pop active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
        >
          <ChevronLeft size={24} strokeWidth={3} />
        </button>
        <h1 className="font-black text-lg text-text-main tracking-tight">托管类型维护</h1>
        <button 
          onClick={handleOpenAdd} 
          className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-text-main border-2 border-border-main shadow-sm active:scale-95 transition-all"
        >
          <Plus size={24} strokeWidth={3} />
        </button>
      </div>

      {/* List */}
      <div className="p-4 space-y-3 flex-1 overflow-y-auto">
        {types.map((type, index) => (
          <div 
            key={type.id} 
            className="bg-white rounded-[2rem] p-5 shadow-pop border-2 border-border-main hover:-translate-y-0.5 transition-all duration-300 group flex justify-between items-center"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <h3 className="font-black text-text-main text-lg tracking-tight pl-2 border-l-4 border-secondary/50">{type.name}</h3>
            <div className="flex gap-2">
              <button 
                onClick={() => handleOpenEdit(type)}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-sun border-2 border-border-main text-text-main hover:bg-secondary transition-all active:scale-95"
              >
                <Edit2 size={16} strokeWidth={2.5} />
              </button>
              <button 
                onClick={() => handleDelete(type)}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-sun border-2 border-border-main text-text-main hover:bg-primary hover:text-white transition-all active:scale-95"
              >
                <Trash2 size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        ))}
        
        {types.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-pop border-2 border-border-main">
              <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center border-2 border-border-main/20">
                <Plus size={32} className="text-text-light" strokeWidth={2.5} />
              </div>
            </div>
            <h3 className="text-text-main font-black text-lg mb-2">暂无托管类型</h3>
            <p className="text-text-light text-sm max-w-[200px] mx-auto leading-relaxed font-bold">
              还没有添加任何托管类型，点击右上角加号开始添加吧
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowModal(false)} />
          <div className="bg-white rounded-[2rem] w-full max-w-sm overflow-hidden shadow-pop scale-100 animate-in zoom-in-95 duration-300 relative z-10 border-2 border-border-main">
            <div className="px-6 py-4 border-b-2 border-border-main/10 flex justify-between items-center bg-background">
              <h3 className="font-black text-lg text-text-main tracking-tight">{editingType ? '编辑托管类型' : '添加托管类型'}</h3>
              <button 
                onClick={() => setShowModal(false)} 
                className="p-1.5 text-text-light hover:text-text-main hover:bg-black/5 rounded-full transition-all active:scale-90"
              >
                <X size={24} strokeWidth={2.5} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-black text-text-main ml-1">类型名称</label>
                <input
                  type="text"
                  value={newType.name}
                  onChange={e => setNewType({ name: e.target.value })}
                  className="w-full px-4 py-3.5 bg-background border-2 border-border-main rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-text-main placeholder:text-text-light font-bold"
                  placeholder="如：午托"
                  autoFocus
                />
              </div>
              <button
                onClick={handleSave}
                disabled={!newType.name}
                className="w-full bg-primary text-white py-3.5 rounded-xl font-black text-lg shadow-pop border-2 border-border-main hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:shadow-none mt-2 active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
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
