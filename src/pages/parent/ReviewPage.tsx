import React, { useState } from 'react';
import { ChevronLeft, X, Star, Quote, Calendar } from 'lucide-react';
import type { Student as Child } from '../../types';
import { dataManager } from '../../utils/dataManager';

interface ReviewPageProps {
  activeChild: Child;
  onBack: () => void;
}

const ReviewPage: React.FC<ReviewPageProps> = ({ activeChild, onBack }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const reviews = dataManager.getChildReviews(activeChild.id);

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <div className="glass px-4 py-3 sticky top-0 z-20 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-600 active:scale-90 transition-all hover:bg-slate-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg text-slate-800">表现点评</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-4 pb-24 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {reviews.length > 0 ? (
          reviews.map((review, idx) => (
            <div 
              key={review.id} 
              className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 card-hover relative overflow-hidden group"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-bl-[4rem] -mr-8 -mt-8 opacity-50 pointer-events-none"></div>

              <div className="flex items-center justify-between mb-5 relative z-10">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm ${
                    review.overallRating === '优秀' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <Star size={20} fill="currentColor" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">
                      {review.overallRating || '待评'}
                    </h3>
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                      <Calendar size={12} />
                      {review.date}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-5 relative z-10">
                {review.tags.map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold border border-slate-100 shadow-sm">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-100 mb-5 relative">
                <Quote size={20} className="absolute top-4 left-4 text-blue-200 rotate-180" />
                <p className="text-sm text-slate-700 leading-relaxed relative z-10 pl-2">
                  {review.content || '暂无详细评价'}
                </p>
              </div>

              {review.images && review.images.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {review.images.map((img, i) => (
                    <button 
                      key={i} 
                      onClick={() => setPreviewImage(img)}
                      className="aspect-square bg-slate-100 rounded-2xl overflow-hidden border border-slate-200/50 active:scale-95 transition-transform shadow-sm hover:shadow-md"
                    >
                      <img src={img} alt="Review" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <Star size={40} className="opacity-30" />
            </div>
            <p className="font-bold text-lg text-slate-500">暂无表现点评</p>
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

export default ReviewPage;
