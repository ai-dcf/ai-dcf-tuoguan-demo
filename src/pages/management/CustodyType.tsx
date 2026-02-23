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
          onClick={() => setShowModal(true)} 
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
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
              <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all active:scale-90 bg-white/80 backdrop-blur-sm shadow-sm border border-slate-100">
                <Edit2 size={16} />
              </button>
              <button 
                onClick={() => handleDelete(type.id)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all active:scale-90 bg-white/80 backdrop-blur-sm shadow-sm border border-slate-100"
              >
                <Trash2 size={16} />
              </button>
            </div>
            
            <div className="flex justify-between items-start mb-4 pr-16">
              <h3 className="font-bold text-slate-800 text-lg tracking-tight group-hover:text-blue-600 transition-colors">{type.name}</h3>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 p-3 bg-slate-50/80 rounded-xl border border-slate-100 group-hover:border-blue-100/50 group-hover:bg-blue-50/30 transition-colors">
                <div className="p-2 bg-white rounded-lg shadow-sm text-blue-500 group-hover:scale-110 transition-transform duration-300 ring-1 ring-blue-50">
                  <Clock size={18} />
                </div>
                <span className="text-sm font-bold text-slate-700">{type.timeRange}</span>
              </div>
              <div className="flex items-center justify-between px-1 pt-1">
                <span className="text-xs text-slate-400 font-medium bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/50">参考价格</span>
                <span className="font-bold text-blue-600 text-xl tracking-tight drop-shadow-sm">
                  {type.price}
                </span>
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
              <h3 className="font-bold text-xl text-slate-800 tracking-tight">添加托管类型</h3>
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
                  onChange={e => setNewType({...newType, name: e.target.value})}
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-800 placeholder:text-slate-400 font-medium hover:bg-white"
                  placeholder="如：午托"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 ml-1">服务时段</label>
                <input
                  type="text"
                  value={newType.timeRange}
                  onChange={e => setNewType({...newType, timeRange: e.target.value})}
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-800 placeholder:text-slate-400 font-medium hover:bg-white"
                  placeholder="如：11:30 - 14:00"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 ml-1">参考价格</label>
                <input
                  type="text"
                  value={newType.price}
                  onChange={e => setNewType({...newType, price: e.target.value})}
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-800 placeholder:text-slate-400 font-medium hover:bg-white"
                  placeholder="如：1200元/月"
                />
              </div>
              <button
                onClick={handleAdd}
                disabled={!newType.name}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 active:scale-[0.98] transition-all disabled:opacity-50 disabled:shadow-none mt-4 hover:brightness-110"
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
