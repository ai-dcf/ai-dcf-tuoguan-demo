import React, { useState } from 'react';
import { ChevronLeft, Calendar, Edit3, X, Save, ChefHat } from 'lucide-react';

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
    <div className="bg-background min-h-screen flex flex-col font-sans">
      {/* Header */}
      <div className="bg-background/90 backdrop-blur-md px-4 py-3 border-b-2 border-border-main/10 sticky top-0 z-20 flex items-center justify-between shadow-sm transition-all duration-300">
        <button 
          onClick={onBack} 
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-border-main text-text-main shadow-pop active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
        >
          <ChevronLeft size={24} strokeWidth={3} />
        </button>
        <h1 className="font-black text-lg text-text-main tracking-tight">食谱发布</h1>
        <div className="w-10"></div>
      </div>

      {/* Week Selector (Mock) */}
      <div className="bg-background/90 backdrop-blur-md px-4 py-3 flex items-center justify-between text-sm border-b-2 border-border-main/10 sticky top-[68px] z-10">
        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white border-2 border-border-main text-text-main hover:bg-surface-sun active:scale-95 transition-all">
          <ChevronLeft size={20} strokeWidth={3} />
        </button>
        <span className="font-black text-text-main flex items-center gap-2 bg-white px-4 py-2 rounded-xl border-2 border-border-main shadow-sm">
          <Calendar size={18} className="text-primary" strokeWidth={2.5} />
          本周 (10.23 - 10.27)
        </span>
        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white border-2 border-border-main text-text-main hover:bg-surface-sun active:scale-95 transition-all">
          <ChevronLeft size={20} className="rotate-180" strokeWidth={3} />
        </button>
      </div>

      {/* Menu List */}
      <div className="p-4 space-y-4 flex-1 overflow-auto pb-20">
        {weekMenu.map((menu, index) => (
          <div 
            key={menu.date} 
            className="bg-white rounded-[2rem] border-2 border-border-main overflow-hidden shadow-pop hover:-translate-y-0.5 transition-all duration-300"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="bg-surface-sun/50 px-5 py-3 flex justify-between items-center border-b-2 border-border-main/10">
              <div className="flex items-center gap-3">
                <span className="font-black text-text-main text-xl">{menu.day}</span>
                <span className="text-xs font-bold text-text-light bg-white px-2.5 py-1 rounded-lg border-2 border-border-main/20">{menu.date}</span>
              </div>
              <button 
                onClick={() => setEditingDay(menu)}
                className="text-text-main text-xs font-black flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-xl border-2 border-border-main shadow-sm active:scale-95 transition-all hover:bg-secondary/80"
              >
                <Edit3 size={14} strokeWidth={2.5} />
                编辑
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex gap-4 items-start">
                <span className="text-[10px] font-black text-text-main bg-accent px-2 py-1 rounded-lg border-2 border-border-main whitespace-nowrap shadow-sm min-w-[3.5rem] text-center">午餐</span>
                <p className="text-sm text-text-main flex-1 leading-relaxed font-bold pt-0.5">{menu.lunch || '未设置'}</p>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-[10px] font-black text-text-main bg-surface-sun px-2 py-1 rounded-lg border-2 border-border-main whitespace-nowrap shadow-sm min-w-[3.5rem] text-center">加餐</span>
                <p className="text-sm text-text-main flex-1 leading-relaxed font-bold pt-0.5">{menu.snack || '未设置'}</p>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-[10px] font-black text-text-main bg-secondary px-2 py-1 rounded-lg border-2 border-border-main whitespace-nowrap shadow-sm min-w-[3.5rem] text-center">晚餐</span>
                <p className="text-sm text-text-main flex-1 leading-relaxed font-bold pt-0.5">{menu.dinner || '未设置'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingDay && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] w-full max-w-sm overflow-hidden shadow-pop scale-100 animate-in zoom-in-95 duration-200 border-2 border-border-main">
            <div className="p-4 border-b-2 border-border-main/10 flex justify-between items-center bg-background">
              <h3 className="font-black text-lg text-text-main flex items-center gap-2">
                <ChefHat size={20} strokeWidth={2.5} className="text-primary" />
                编辑食谱 <span className="text-sm font-bold text-text-light">({editingDay.day})</span>
              </h3>
              <button 
                onClick={() => setEditingDay(null)} 
                className="p-1.5 text-text-light hover:text-text-main hover:bg-black/5 rounded-full transition-all active:scale-90"
              >
                <X size={24} strokeWidth={2.5} />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-black text-text-main mb-2 ml-1">午餐</label>
                <textarea
                  value={editingDay.lunch}
                  onChange={e => setEditingDay({...editingDay, lunch: e.target.value})}
                  className="w-full px-4 py-3 bg-background border-2 border-border-main rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-text-main placeholder:text-text-light font-bold resize-none h-24 text-sm"
                  placeholder="请输入午餐菜谱"
                />
              </div>
              <div>
                <label className="block text-sm font-black text-text-main mb-2 ml-1">加餐</label>
                <input
                  type="text"
                  value={editingDay.snack}
                  onChange={e => setEditingDay({...editingDay, snack: e.target.value})}
                  className="w-full px-4 py-3 bg-background border-2 border-border-main rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-text-main placeholder:text-text-light font-bold text-sm"
                  placeholder="请输入加餐内容"
                />
              </div>
              <div>
                <label className="block text-sm font-black text-text-main mb-2 ml-1">晚餐</label>
                <textarea
                  value={editingDay.dinner}
                  onChange={e => setEditingDay({...editingDay, dinner: e.target.value})}
                  className="w-full px-4 py-3 bg-background border-2 border-border-main rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-text-main placeholder:text-text-light font-bold resize-none h-24 text-sm"
                  placeholder="请输入晚餐菜谱"
                />
              </div>
              <button
                onClick={handleSave}
                className="w-full bg-primary text-white py-3.5 rounded-xl font-black text-lg shadow-pop border-2 border-border-main hover:bg-primary/90 active:scale-[0.98] transition-all mt-2 active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
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
