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
    <div className="flex flex-col min-h-full bg-background font-sans">
      {/* Header */}
      <div className="bg-background/90 backdrop-blur-md px-5 py-4 border-b-2 border-border-main/10 sticky top-0 z-20 flex items-center justify-between">
        <button 
          onClick={onBack} 
          className="w-10 h-10 rounded-full bg-white border-2 border-border-main flex items-center justify-center text-text-main shadow-pop-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
        >
          <ChevronLeft size={24} strokeWidth={3} />
        </button>
        <h1 className="font-black text-xl text-text-main">表现点评</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-5 pb-24 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {reviews.length > 0 ? (
          reviews.map((review, idx) => (
            <div 
              key={review.id} 
              className="bg-white p-6 rounded-[2rem] border-2 border-border-main shadow-pop relative overflow-hidden group hover:-translate-y-1 hover:shadow-pop-lg transition-all duration-300"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-bl-[4rem] -mr-8 -mt-8 opacity-50 pointer-events-none"></div>

              <div className="flex items-center justify-between mb-5 relative z-10">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 border-border-main shadow-pop-sm ${
                    review.overallRating === '优秀' ? 'bg-secondary text-text-main' : 'bg-primary text-white'
                  }`}>
                    <Star size={24} fill="currentColor" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="font-black text-text-main text-xl">
                      {review.overallRating || '待评'}
                    </h3>
                    <div className="flex items-center gap-1.5 text-text-muted text-xs font-bold bg-surface-muted px-2 py-0.5 rounded-lg border border-border-main/10 mt-1">
                      <Calendar size={12} strokeWidth={2.5} />
                      {review.date}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-5 relative z-10">
                {review.tags.map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-white text-text-main rounded-xl text-xs font-black border-2 border-border-main shadow-[2px_2px_0px_0px_#2D3436]">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="bg-surface-muted p-5 rounded-2xl border-2 border-border-main mb-5 relative">
                <Quote size={24} className="absolute top-4 left-4 text-accent rotate-180" fill="currentColor" />
                <p className="text-sm text-text-main font-bold leading-relaxed relative z-10 pl-4 italic">
                  "{review.content || '暂无详细评价'}"
                </p>
              </div>

              {review.images && review.images.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {review.images.map((img, i) => (
                    <button 
                      key={i} 
                      onClick={() => setPreviewImage(img)}
                      className="aspect-square bg-surface-muted rounded-2xl overflow-hidden border-2 border-border-main active:scale-95 transition-transform shadow-sm hover:shadow-md"
                    >
                      <img src={img} alt="Review" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-text-light">
            <div className="w-24 h-24 bg-surface-muted rounded-full flex items-center justify-center mb-6 border-2 border-border-main opacity-50">
              <Star size={40} className="text-text-main" strokeWidth={2} />
            </div>
            <p className="font-black text-lg text-text-muted">暂无表现点评</p>
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

export default ReviewPage;
