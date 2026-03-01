import React, { useState } from 'react';
import { ChevronLeft, X, Image as ImageIcon, BookOpen } from 'lucide-react';
import type { Student as Child } from '../../types';
import { dataManager } from '../../utils/dataManager';

interface MistakePageProps {
  activeChild: Child;
  onBack: () => void;
}

const MistakePage: React.FC<MistakePageProps> = ({ activeChild, onBack }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const mistakes = dataManager.getChildMistakes(activeChild.id);

  return (
    <div className="flex flex-col min-h-full bg-background font-sans">
      {/* Header */}
      <div className="bg-background/90 backdrop-blur-md px-5 py-4 border-b-2 border-border-main/10 sticky top-0 z-20 flex items-center justify-between">
        <button 
          onClick={onBack} 
          className="w-10 h-10 rounded-full bg-white border-2 border-border-main flex items-center justify-center text-text-main shadow-pop-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
        >
          <ChevronLeft size={24} strokeWidth={3} />
        </button>
        <h1 className="font-black text-xl text-text-main">错题本</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-5 pb-24 space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {mistakes.length > 0 ? (
          mistakes.map((mistake, idx) => (
            <div 
              key={mistake.id} 
              className="bg-white p-5 rounded-[2rem] border-2 border-border-main shadow-pop flex flex-col gap-4 group hover:-translate-y-1 hover:shadow-pop-lg transition-all duration-300" 
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                 <button 
                  onClick={() => setPreviewImage(mistake.imageUrl || null)}
                  className="w-24 h-24 bg-surface-muted rounded-2xl flex-shrink-0 overflow-hidden border-2 border-border-main relative group active:scale-95 transition-transform"
                >
                  <img src={mistake.imageUrl} alt="Mistake" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <ImageIcon size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" strokeWidth={2.5} />
                  </div>
                </button>
                <div className="flex-1 min-w-0 py-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black px-2.5 py-1 bg-primary text-white rounded-lg border-2 border-border-main shadow-[2px_2px_0px_0px_#2D3436]">
                      {mistake.subject}
                    </span>
                    <span className="text-xs text-text-muted font-bold">{mistake.date}</span>
                  </div>
                  <h3 className="font-black text-text-main text-lg truncate">{mistake.knowledgePoint}</h3>
                   <div className="text-xs text-text-main font-bold bg-accent/20 p-3 rounded-xl border-2 border-border-main/20">
                     <span className="text-text-muted mr-1">原因:</span>
                     {mistake.reason}
                   </div>
                </div>
              </div>
              
              <button 
                onClick={() => setPreviewImage(mistake.imageUrl || null)}
                className="w-full py-3 bg-secondary/20 text-text-main rounded-xl border-2 border-secondary text-sm font-black flex items-center justify-center gap-2 active:translate-x-[2px] active:translate-y-[2px] transition-all hover:bg-secondary/30"
              >
                <ImageIcon size={18} strokeWidth={2.5} /> 查看大图
              </button>
            </div>
          ))
        ) : (
           <div className="flex flex-col items-center justify-center py-20 text-text-light">
            <div className="w-24 h-24 bg-surface-muted rounded-full flex items-center justify-center mb-6 border-2 border-border-main opacity-50">
              <BookOpen size={40} className="text-text-main" strokeWidth={2} />
            </div>
            <p className="font-black text-lg text-text-muted">暂无错题记录</p>
          </div>
        )}
      </div>

       {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-border-main/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300" onClick={() => setPreviewImage(null)}>
          <button 
            onClick={() => setPreviewImage(null)}
            className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center text-text-main border-2 border-border-main shadow-pop hover:bg-primary hover:text-white transition-all"
          >
            <X size={24} strokeWidth={3} />
          </button>
          <div className="bg-white p-2 rounded-3xl border-2 border-border-main shadow-pop-xl animate-in zoom-in-95 duration-300 max-w-full max-h-[85vh] overflow-hidden">
             <img 
                src={previewImage} 
                alt="Preview" 
                className="w-full h-full object-contain rounded-2xl" 
                onClick={e => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MistakePage;
