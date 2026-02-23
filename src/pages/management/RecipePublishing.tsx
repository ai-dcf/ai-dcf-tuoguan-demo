import React, { useState } from 'react';
import { ChevronLeft, Plus, Calendar, Utensils, Edit3 } from 'lucide-react';

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
    <div className="bg-slate-50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-slate-100 sticky top-0 z-10 flex items-center justify-between">
        <button onClick={onBack} className="p-1 -ml-1 text-slate-600 active:bg-slate-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg text-slate-800">食谱发布</h1>
        <div className="w-8"></div>
      </div>

      {/* Week Selector (Mock) */}
      <div className="bg-white px-4 py-3 flex items-center justify-between text-sm text-slate-600 border-b border-slate-50">
        <button className="p-1 hover:bg-slate-50 rounded"><ChevronLeft size={16} /></button>
        <span className="font-medium">本周 (10.23 - 10.27)</span>
        <button className="p-1 hover:bg-slate-50 rounded"><ChevronLeft size={16} className="rotate-180" /></button>
      </div>

      {/* Menu List */}
      <div className="p-4 space-y-3 flex-1 overflow-auto">
        {weekMenu.map(menu => (
          <div key={menu.date} className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm">
            <div className="bg-slate-50 px-4 py-2 flex justify-between items-center border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-700">{menu.day}</span>
                <span className="text-xs text-slate-400">{menu.date}</span>
              </div>
              <button 
                onClick={() => setEditingDay(menu)}
                className="text-blue-600 text-xs font-medium flex items-center gap-1 active:opacity-70"
              >
                <Edit3 size={12} />
                编辑
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex gap-3">
                <span className="text-xs font-bold text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded h-fit">午餐</span>
                <p className="text-sm text-slate-600 flex-1">{menu.lunch || '未设置'}</p>
              </div>
              <div className="flex gap-3">
                <span className="text-xs font-bold text-green-500 bg-green-50 px-1.5 py-0.5 rounded h-fit">加餐</span>
                <p className="text-sm text-slate-600 flex-1">{menu.snack || '未设置'}</p>
              </div>
              <div className="flex gap-3">
                <span className="text-xs font-bold text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded h-fit">晚餐</span>
                <p className="text-sm text-slate-600 flex-1">{menu.dinner || '未设置'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingDay && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-800">编辑食谱 ({editingDay.day})</h3>
              <button onClick={() => setEditingDay(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">午餐</label>
                <textarea
                  value={editingDay.lunch}
                  onChange={e => setEditingDay({...editingDay, lunch: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 resize-none h-20"
                  placeholder="请输入午餐菜谱"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">加餐</label>
                <input
                  type="text"
                  value={editingDay.snack}
                  onChange={e => setEditingDay({...editingDay, snack: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="请输入加餐内容"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">晚餐</label>
                <textarea
                  value={editingDay.dinner}
                  onChange={e => setEditingDay({...editingDay, dinner: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 resize-none h-20"
                  placeholder="请输入晚餐菜谱"
                />
              </div>
              <button
                onClick={handleSave}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold active:scale-[0.98] transition-transform mt-2"
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
