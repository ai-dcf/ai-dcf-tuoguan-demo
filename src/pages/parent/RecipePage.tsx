import React from 'react';
import { ChevronLeft, Utensils, Clock, Sun, Moon, Coffee } from 'lucide-react';
import { dataManager } from '../../utils/dataManager';

interface RecipePageProps {
  onBack: () => void;
}

type MealCardProps = {
  title: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  items: string[];
  image?: string;
  colorClass: string;
  bgClass: string;
  borderColor: string;
};

const MealCard: React.FC<MealCardProps> = ({ title, icon: Icon, items, image, colorClass, bgClass, borderColor }) => (
  <div className={`bg-white rounded-[2rem] overflow-hidden border ${borderColor} shadow-lg shadow-slate-200/50 mb-6 card-hover group`}>
    <div className={`px-6 py-5 flex items-center gap-3 border-b border-slate-50 ${bgClass}`}>
      <div className={`p-2.5 rounded-2xl bg-white shadow-sm ${colorClass} group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={22} strokeWidth={2.5} />
      </div>
      <h3 className="font-bold text-xl text-slate-800">{title}</h3>
    </div>
    
    <div className="p-6">
      <div className="flex flex-wrap gap-2.5 mb-5">
        {items.map((item, idx) => (
          <span key={idx} className="px-4 py-2 bg-slate-50 text-slate-700 rounded-xl text-sm font-bold border border-slate-100 shadow-sm">
            {item}
          </span>
        ))}
      </div>
      
      {image && (
        <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shadow-inner">
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        </div>
      )}
    </div>
  </div>
);

const RecipePage: React.FC<RecipePageProps> = ({ onBack }) => {
  const recipe = dataManager.getTodayRecipe();

  if (!recipe) {
    return (
      <div className="flex flex-col min-h-full bg-slate-50">
        <div className="glass px-4 py-3 sticky top-0 z-20 flex items-center">
          <button onClick={onBack} className="p-2 -ml-2 text-slate-600 active:scale-90 transition-all hover:bg-slate-100 rounded-full">
            <ChevronLeft size={24} />
          </button>
          <h1 className="font-bold text-lg text-slate-800 ml-2">今日食谱</h1>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-10 animate-in fade-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <Utensils size={40} className="opacity-30" />
          </div>
          <p className="font-bold text-lg text-slate-500">今日食谱尚未发布</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <div className="glass px-4 py-3 sticky top-0 z-20 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-600 active:scale-90 transition-all hover:bg-slate-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg text-slate-800">今日食谱</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-5 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-6 flex items-center gap-2 text-slate-500 text-sm font-medium px-1 bg-white/50 w-fit px-4 py-2 rounded-full border border-white/50 backdrop-blur-sm">
          <Clock size={16} />
          <span>{recipe.date}</span>
        </div>

        <MealCard 
          title="午餐" 
          icon={Sun} 
          items={recipe.lunch} 
          image={recipe.lunchImage} 
          colorClass="text-orange-500" 
          bgClass="bg-orange-50/50" 
          borderColor="border-orange-100"
        />

        <MealCard 
          title="点心" 
          icon={Coffee} 
          items={recipe.snack} 
          image={recipe.snackImage} 
          colorClass="text-emerald-500" 
          bgClass="bg-emerald-50/50" 
          borderColor="border-emerald-100"
        />

        <MealCard 
          title="晚餐" 
          icon={Moon} 
          items={recipe.dinner} 
          image={recipe.dinnerImage} 
          colorClass="text-indigo-500" 
          bgClass="bg-indigo-50/50" 
          borderColor="border-indigo-100"
        />
      </div>
    </div>
  );
};

export default RecipePage;
