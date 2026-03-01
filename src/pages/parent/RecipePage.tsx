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

const MealCard: React.FC<MealCardProps> = ({ title, icon: Icon, items, image, colorClass, bgClass }) => (
  <div className={`bg-white rounded-[2rem] p-5 shadow-pop border-2 border-border-main relative overflow-hidden group`}>
    <div className={`absolute top-0 right-0 w-24 h-24 ${bgClass} rounded-bl-full opacity-20 -mr-6 -mt-6 transition-transform group-hover:scale-110`}></div>
    <div className={`px-6 py-5 flex items-center gap-3 border-b-2 border-border-main ${bgClass}`}>
      <div className={`p-2.5 rounded-2xl bg-white border-2 border-border-main shadow-pop-sm ${colorClass} group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={22} strokeWidth={2.5} />
      </div>
      <h3 className="font-black text-xl text-text-main">{title}</h3>
    </div>
    
    <div className="p-6">
      <div className="flex flex-wrap gap-2.5 mb-5">
        {items.map((item, idx) => (
          <span key={idx} className="px-4 py-2 bg-white text-text-main rounded-xl text-sm font-black border-2 border-border-main shadow-[2px_2px_0px_0px_#2D3436]">
            {item}
          </span>
        ))}
      </div>
      
      {image && (
        <div className="aspect-video rounded-2xl overflow-hidden bg-surface-muted border-2 border-border-main">
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
      <div className="flex flex-col min-h-full bg-background font-sans">
        <div className="bg-background/90 backdrop-blur-md px-5 py-4 border-b-2 border-border-main/10 sticky top-0 z-20 flex items-center">
          <button 
            onClick={onBack} 
            className="w-10 h-10 rounded-full bg-white border-2 border-border-main flex items-center justify-center text-text-main shadow-pop-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
          >
            <ChevronLeft size={24} strokeWidth={3} />
          </button>
          <h1 className="font-black text-lg text-text-main ml-2">今日食谱</h1>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-text-light p-10 animate-in fade-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-surface-muted rounded-full flex items-center justify-center mb-6 border-2 border-border-main opacity-50">
            <Utensils size={40} className="text-text-main" strokeWidth={2} />
          </div>
          <p className="font-black text-lg text-text-muted">今日食谱尚未发布</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-background font-sans">
      <div className="bg-background/90 backdrop-blur-md px-5 py-4 border-b-2 border-border-main/10 sticky top-0 z-20 flex items-center justify-between">
        <button 
          onClick={onBack} 
          className="w-10 h-10 rounded-full bg-white border-2 border-border-main flex items-center justify-center text-text-main shadow-pop-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
        >
          <ChevronLeft size={24} strokeWidth={3} />
        </button>
        <h1 className="font-black text-xl text-text-main">今日食谱</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-5 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-6 flex items-center gap-2 text-text-muted text-sm font-bold bg-white px-4 py-2 rounded-full border-2 border-border-main shadow-pop-sm w-fit">
          <Clock size={16} strokeWidth={2.5} />
          <span>{recipe.date}</span>
        </div>

        <MealCard 
          title="午餐" 
          icon={Sun} 
          items={recipe.lunch} 
          image={recipe.lunchImage} 
          colorClass="text-primary" 
          bgClass="bg-primary/10" 
          borderColor="border-border-main"
        />

        <MealCard 
          title="点心" 
          icon={Coffee} 
          items={recipe.snack} 
          image={recipe.snackImage} 
          colorClass="text-accent" 
          bgClass="bg-accent/20" 
          borderColor="border-border-main"
        />

        <MealCard 
          title="晚餐" 
          icon={Moon} 
          items={recipe.dinner} 
          image={recipe.dinnerImage} 
          colorClass="text-secondary" 
          bgClass="bg-secondary/20" 
          borderColor="border-border-main"
        />
      </div>
    </div>
  );
};

export default RecipePage;
