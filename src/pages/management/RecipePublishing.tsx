import React, { useState } from 'react';
import { ChevronLeft, Plus, Calendar, Utensils, Edit3, X } from 'lucide-react';

interface RecipePublishingProps {
  onBack: () => void;
}

interface DailyMenu {
  date: string;
  day: string;
  lunch: string;
  snack: string;
  dinner: string;
}

const RecipePublishing: React.FC<RecipePublishingProps> = ({ onBack }) => {
  const [weekMenu, setWeekMenu] = useState<DailyMenu[]>([
    { date: '2023-10-23', day: '周一', lunch: '红烧肉、清炒时蔬、紫菜蛋汤', snack: '苹果、酸奶', dinner: '宫保鸡丁、番茄炒蛋' },
    { date: '2023-10-24', day: '周二', lunch: '糖醋排骨、蒜蓉西兰花、蘑菇汤', snack: '香蕉、饼干', dinner: '鱼香肉丝、麻婆豆腐' },
    { date: '2023-10-25', day: '周三', lunch: '清蒸鱼、土豆丝、冬瓜排骨汤', snack: '梨、牛奶', dinner: '回锅肉、青椒土豆丝' },
    { date: '2023-10-26', day: '周四', lunch: '土豆牛腩、手撕包菜、番茄蛋汤', snack: '橙子、面包', dinner: '木须肉、地三鲜' },
    { date: '2023-10-27', day: '周五', lunch: '香菇滑鸡、干煸豆角、豆腐汤', snack: '西瓜、果冻', dinner: '可乐鸡翅、素炒三鲜' },
  ]);

  const [editingDay, setEditingDay] = useState<DailyMenu | null>(null);

  const handleSave = () => {
    if (editingDay) {
      setWeekMenu(weekMenu.map(m => m.date === editingDay.date ? editingDay : m));
      setEditingDay(null);
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
        <h1 className="font-bold text-lg text-slate-800 tracking-tight">食谱发布</h1>
        <div className="w-8"></div>
      </div>

      {/* Week Selector (Mock) */}
      <div className="bg-white/80 backdrop-blur-md px-4 py-3 flex items-center justify-between text-sm text-slate-600 border-b border-slate-200/60 sticky top-[53px] z-10">
        <button className="p-2 hover:bg-slate-100/80 rounded-full active:scale-95 transition-all">
          <ChevronLeft size={18} />
        </button>
        <span className="font-bold text-slate-800 flex items-center gap-2 bg-slate-100/50 px-3 py-1.5 rounded-full">
          <Calendar size={14} className="text-slate-500" />
          本周 (10.23 - 10.27)
        </span>
        <button className="p-2 hover:bg-slate-100/80 rounded-full active:scale-95 transition-all">
          <ChevronLeft size={18} className="rotate-180" />
        </button>
      </div>

      {/* Menu List */}
      <div className="p-4 space-y-4 flex-1 overflow-auto pb-20">
        {weekMenu.map(menu => (
          <div key={menu.date} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
            <div className="bg-slate-50/80 px-4 py-3 flex justify-between items-center border-b border-slate-100/60">
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-800 text-lg">{menu.day}</span>
                <span className="text-xs font-medium text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-100 shadow-sm">{menu.date}</span>
              </div>
              <button 
                onClick={() => setEditingDay(menu)}
                className="text-blue-600 text-xs font-bold flex items-center gap-1.5 bg-blue-50 px-2.5 py-1 rounded-full hover:bg-blue-100 active:scale-95 transition-all"
              >
                <Edit3 size={12} />
                编辑
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex gap-4">
                <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-lg h-fit border border-orange-100 whitespace-nowrap shadow-sm">午餐</span>
                <p className="text-sm text-slate-600 flex-1 leading-relaxed font-medium">{menu.lunch || '未设置'}</p>
              </div>
              <div className="flex gap-4">
                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg h-fit border border-green-100 whitespace-nowrap shadow-sm">加餐</span>
                <p className="text-sm text-slate-600 flex-1 leading-relaxed font-medium">{menu.snack || '未设置'}</p>
              </div>
              <div className="flex gap-4">
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg h-fit border border-blue-100 whitespace-nowrap shadow-sm">晚餐</span>
                <p className="text-sm text-slate-600 flex-1 leading-relaxed font-medium">{menu.dinner || '未设置'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingDay && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-xl scale-100 animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-lg text-slate-800">编辑食谱 ({editingDay.day})</h3>
              <button 
                onClick={() => setEditingDay(null)} 
                className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">午餐</label>
                <textarea
                  value={editingDay.lunch}
                  onChange={e => setEditingDay({...editingDay, lunch: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-800 placeholder:text-slate-400 resize-none h-24 text-sm"
                  placeholder="请输入午餐菜谱"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">加餐</label>
                <input
                  type="text"
                  value={editingDay.snack}
                  onChange={e => setEditingDay({...editingDay, snack: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                  placeholder="请输入加餐内容"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">晚餐</label>
                <textarea
                  value={editingDay.dinner}
                  onChange={e => setEditingDay({...editingDay, dinner: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-800 placeholder:text-slate-400 resize-none h-24 text-sm"
                  placeholder="请输入晚餐菜谱"
                />
              </div>
              <button
                onClick={handleSave}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-base shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all mt-2"
              >
                保存食谱
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipePublishing;
