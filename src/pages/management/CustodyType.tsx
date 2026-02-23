import React, { useState } from 'react';
import { ChevronLeft, Plus, Edit2, Trash2, Clock } from 'lucide-react';

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
    <div className="bg-slate-50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-slate-100 sticky top-0 z-10 flex items-center justify-between">
        <button onClick={onBack} className="p-1 -ml-1 text-slate-600 active:bg-slate-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg text-slate-800">托管类型维护</h1>
        <button onClick={() => setShowModal(true)} className="p-1 text-blue-600 active:bg-blue-50 rounded-full">
          <Plus size={24} />
        </button>
      </div>

      {/* List */}
      <div className="p-4 space-y-3">
        {types.map(type => (
          <div key={type.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-slate-800 text-lg">{type.name}</h3>
              <div className="flex gap-2">
                <button className="text-slate-400 hover:text-blue-500 transition-colors">
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(type.id)}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-slate-400" />
                <span>{type.timeRange}</span>
              </div>
              <div className="font-medium text-slate-700">
                {type.price}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-800">添加托管类型</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">类型名称</label>
                <input
                  type="text"
                  value={newType.name}
                  onChange={e => setNewType({...newType, name: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="如：午托"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">服务时段</label>
                <input
                  type="text"
                  value={newType.timeRange}
                  onChange={e => setNewType({...newType, timeRange: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="如：11:30 - 14:00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">参考价格</label>
                <input
                  type="text"
                  value={newType.price}
                  onChange={e => setNewType({...newType, price: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="如：1200元/月"
                />
              </div>
              <button
                onClick={handleAdd}
                disabled={!newType.name}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold active:scale-[0.98] transition-transform disabled:opacity-50 mt-2"
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
