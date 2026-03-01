import React, { useState } from 'react';
import { ChevronLeft, X, Image as ImageIcon } from 'lucide-react';
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
    <div className="flex flex-col min-h-full bg-slate-50">
      <div className="glass px-4 py-3 sticky top-0 z-20 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-600 active:scale-90 transition-all hover:bg-slate-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg text-slate-800">错题本</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-4 pb-24 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {mistakes.length > 0 ? (
          mistakes.map((mistake, idx) => (
            <div key={mistake.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 flex flex-col gap-4 card-hover" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="flex items-start gap-4">
                 <button 
                  onClick={() => setPreviewImage(mistake.imageUrl)}
                  className="w-24 h-24 bg-slate-100 rounded-2xl flex-shrink-0 overflow-hidden border border-slate-200/50 shadow-inner relative group active:scale-95 transition-transform"
                >
                  <img src={mistake.imageUrl} alt="Mistake" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <ImageIcon size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                  </div>
                </button>
                <div className="flex-1 min-w-0 py-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2.5 py-1 bg-rose-50 text-rose-600 rounded-lg border border-rose-100">
                      {mistake.subject}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{mistake.date}</span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-base truncate mb-2">{mistake.knowledgePoint}</h3>
                   <div className="text-xs text-slate-500 font-medium bg-slate-50 p-3 rounded-xl border border-slate-100">
                     <span className="text-slate-400 mr-1">原因:</span>
                     {mistake.reason}
                   </div>
                </div>
              </div>
              
              <button 
                onClick={() => setPreviewImage(mistake.imageUrl)}
                className="w-full py-3 bg-blue-50 text-blue-600 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-blue-100"
              >
                <ImageIcon size={16} /> 查看大图
              </button>
            </div>
          ))
        ) : (
           <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <ImageIcon size={40} className="opacity-30" />
            </div>
            <p className="font-bold text-lg text-slate-500">暂无错题记录</p>
          </div>
        )}
      </div>

       {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300" onClick={() => setPreviewImage(null)}>
          <button 
            onClick={() => setPreviewImage(null)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all backdrop-blur-md border border-white/10"
          >
            <X size={24} />
          </button>
          <img 
            src={previewImage} 
            alt="Preview" 
            className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300" 
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default MistakePage;
