import React, { useState } from 'react';
import { ChevronLeft, Plus, Edit2, Trash2, Clock, X } from 'lucide-react';

interface CustodyTypeProps {
  onBack: () => void;
}

interface CustodyType {
  id: number;
  name: string;
  timeRange: string;
  price: string;
}

const CustodyType: React.FC<CustodyTypeProps> = ({ onBack }) => {
  const [types, setTypes] = useState<CustodyType[]>([
    { id: 1, name: '午托', timeRange: '11:30 - 14:00', price: '1200元/月' },
    { id: 2, name: '晚托', timeRange: '16:30 - 20:30', price: '1800元/月' },
    { id: 3, name: '全托', timeRange: '11:30 - 20:30', price: '2800元/月' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newType, setNewType] = useState({ name: '', timeRange: '', price: '' });

  const handleAdd = () => {
    if (newType.name) {
      setTypes([...types, { id: Date.now(), ...newType }]);
      setShowModal(false);
      setNewType({ name: '', timeRange: '', price: '' });
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('确定要删除该托管类型吗？')) {
      setTypes(types.filter(t => t.id !== id));
    }
  };

  return (
    <div className="bg-slate-50/50 min-h-screen flex flex-col">
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
          onClick={() => setShowModal(true)} 
          className="p-2 -mr-2 text-blue-600 hover:bg-blue-50 active:scale-95 rounded-full transition-all"
        >
          <Plus size={24} />
        </button>
      </div>

      {/* List */}
      <div className="p-4 space-y-3">
        {types.map(type => (
          <div key={type.id} className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-slate-800 text-lg tracking-tight">{type.name}</h3>
              <div className="flex gap-1">
                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all active:scale-90">
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(type.id)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all active:scale-90"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                <div className="p-2 bg-white rounded-lg shadow-sm text-blue-500">
                  <Clock size={16} />
                </div>
                <span className="text-sm font-bold text-slate-700">{type.timeRange}</span>
              </div>
              <div className="flex items-center justify-between px-1 pt-1">
                <span className="text-xs text-slate-400 font-medium bg-slate-100 px-2 py-1 rounded-md">参考价格</span>
                <span className="font-bold text-blue-600 text-lg tracking-tight">
                  {type.price}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {types.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <Plus size={32} />
            </div>
            <p className="text-slate-400 font-medium">暂无托管类型，请添加</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowModal(false)} />
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl scale-100 animate-in zoom-in-95 duration-300 relative z-10">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/80 backdrop-blur-sm">
              <h3 className="font-bold text-lg text-slate-800">添加托管类型</h3>
              <button 
                onClick={() => setShowModal(false)} 
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-full transition-all active:scale-90"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-slate-700 ml-1">类型名称</label>
                <input
                  type="text"
                  value={newType.name}
                  onChange={e => setNewType({...newType, name: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-800 placeholder:text-slate-400 font-medium"
                  placeholder="如：午托"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-slate-700 ml-1">服务时段</label>
                <input
                  type="text"
                  value={newType.timeRange}
                  onChange={e => setNewType({...newType, timeRange: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-800 placeholder:text-slate-400 font-medium"
                  placeholder="如：11:30 - 14:00"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-slate-700 ml-1">参考价格</label>
                <input
                  type="text"
                  value={newType.price}
                  onChange={e => setNewType({...newType, price: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-800 placeholder:text-slate-400 font-medium"
                  placeholder="如：1200元/月"
                />
              </div>
              <button
                onClick={handleAdd}
                disabled={!newType.name}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3.5 rounded-xl font-bold text-base shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 active:scale-[0.98] transition-all disabled:opacity-50 disabled:shadow-none mt-2"
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

export default CustodyType;
