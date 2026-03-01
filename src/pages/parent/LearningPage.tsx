import React, { useState } from 'react';
import { ChevronLeft, Image as ImageIcon, X, FileText, CheckCircle2, Clock, Star } from 'lucide-react';
import type { Student as Child, ParentViewState as ViewState } from '../../types';
import { dataManager } from '../../utils/dataManager';

interface LearningPageProps {
  activeChild: Child;
  onBack: () => void;
  onNavigate: (view: ViewState) => void;
}

const LearningPage: React.FC<LearningPageProps> = ({ activeChild, onBack, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'today' | 'history'>('today');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const homeworks = dataManager.getChildHomeworks(activeChild.id);
  const review = dataManager.getChildReviews(activeChild.id)[0];
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
        <h1 className="font-black text-xl text-text-main">学情详情</h1>
        <div className="w-10"></div>
      </div>

      {/* Tab Switcher */}
      <div className="p-5 sticky top-[72px] z-10 bg-background/95 backdrop-blur-sm">
        <div className="bg-white p-1.5 rounded-2xl flex border-2 border-border-main shadow-pop-sm">
          <button 
            onClick={() => setActiveTab('today')}
            className={`flex-1 py-3 rounded-xl text-sm font-black transition-all duration-200 ${
              activeTab === 'today' 
                ? 'bg-primary text-white border-2 border-border-main shadow-pop-sm -translate-y-1' 
                : 'text-text-muted hover:bg-surface-muted'
            }`}
          >
            今日学情
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 rounded-xl text-sm font-black transition-all duration-200 ${
              activeTab === 'history' 
                ? 'bg-primary text-white border-2 border-border-main shadow-pop-sm -translate-y-1' 
                : 'text-text-muted hover:bg-surface-muted'
            }`}
          >
            历史记录
          </button>
        </div>
      </div>

      {activeTab === 'today' ? (
        <div className="px-5 pb-24 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Homework Section */}
          <section>
            <div className="flex items-center gap-3 mb-4 px-1">
              <div className="w-1.5 h-6 bg-secondary rounded-full border-2 border-border-main"></div>
              <h2 className="font-black text-lg text-text-main">作业完成情况</h2>
            </div>
            <div className="space-y-4">
              {homeworks.map((hw, idx) => (
                <div key={hw.id} className="bg-white p-5 rounded-[2rem] border-2 border-border-main shadow-pop group" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl border-2 border-border-main shadow-pop-sm ${
                        hw.subject === '数学' ? 'bg-secondary text-text-main' :
                        hw.subject === '英语' ? 'bg-accent text-text-main' :
                        'bg-primary text-white'
                      }`}>
                        {hw.subject[0]}
                      </div>
                      <div>
                        <h3 className="font-black text-text-main text-lg">{hw.title}</h3>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Clock size={14} className="text-text-muted" strokeWidth={2.5} />
                          <p className="text-xs text-text-muted font-bold">{hw.submitTime || '尚未提交'}</p>
                        </div>
                      </div>
                    </div>
                    {hw.rating && (
                      <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center border-2 border-border-main shadow-pop-sm rotate-12">
                        <span className="text-text-main font-black text-xl">{hw.rating}</span>
                      </div>
                    )}
                  </div>
                  {hw.feedback && (
                    <div className="bg-surface-muted p-4 rounded-2xl text-sm text-text-main font-medium border-2 border-border-main relative mb-4">
                      <div className="absolute top-0 left-6 -mt-2 w-4 h-4 bg-surface-muted rotate-45 border-t-2 border-l-2 border-border-main"></div>
                      <span className="font-black text-primary mr-2">老师评语:</span>
                      {hw.feedback}
                    </div>
                  )}
                  {hw.status === 'completed' && (
                    <button 
                      onClick={() => setPreviewImage('https://via.placeholder.com/600x800?text=Homework+Detail')}
                      className="w-full py-3 bg-secondary/20 text-text-main rounded-xl border-2 border-secondary text-sm font-black flex items-center justify-center gap-2 active:translate-x-[2px] active:translate-y-[2px] transition-all hover:bg-secondary/30"
                    >
                      <ImageIcon size={18} strokeWidth={2.5} /> 查看作业照片
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Review Section */}
          <section>
            <div className="flex items-center gap-3 mb-4 px-1">
              <div className="w-1.5 h-6 bg-accent rounded-full border-2 border-border-main"></div>
              <h2 className="font-black text-lg text-text-main">今日表现点评</h2>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border-2 border-border-main shadow-pop relative overflow-hidden">
              {/* Decorative blob */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full -mr-10 -mt-10 blur-xl"></div>
              
              <div className="flex items-center justify-between mb-5 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent rounded-xl text-text-main border-2 border-border-main shadow-pop-sm">
                    <Star size={24} fill="currentColor" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="text-xs text-text-muted font-bold mb-0.5">综合评价</div>
                    <span className="text-2xl font-black text-primary">
                      {review?.overallRating || '待评'}
                    </span>
                  </div>
                </div>
                <div className="text-xs font-black text-text-muted bg-surface-muted px-3 py-1 rounded-full border-2 border-border-main">{review?.date}</div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-5 relative z-10">
                {review?.tags.map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-white text-text-main rounded-xl text-xs font-black border-2 border-border-main shadow-[2px_2px_0px_0px_#2D3436]">
                    # {tag}
                  </span>
                ))}
              </div>

              <div className="bg-surface-muted p-5 rounded-2xl mb-5 border-2 border-border-main relative z-10">
                <p className="text-sm text-text-main font-bold leading-relaxed italic">
                  "{review?.content || '暂无详细评价'}"
                </p>
              </div>

              {review?.images && (
                <div className="grid grid-cols-3 gap-3 relative z-10">
                  {review.images.map((img, i) => (
                    <button 
                      key={i} 
                      onClick={() => setPreviewImage(img)}
                      className="aspect-square bg-surface-muted rounded-2xl overflow-hidden border-2 border-border-main active:scale-95 transition-transform shadow-sm"
                    >
                      <img src={img} alt="Review" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Mistakes Section */}
          <section>
            <div className="flex items-center gap-3 mb-4 px-1">
              <div className="w-1.5 h-6 bg-primary rounded-full border-2 border-border-main"></div>
              <h2 className="font-black text-lg text-text-main">新增错题记录</h2>
            </div>
            <div className="space-y-4">
              {mistakes.map((mistake, idx) => (
                <div key={mistake.id} className="bg-white p-4 rounded-[2rem] border-2 border-border-main shadow-pop flex items-center gap-5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-pop-sm transition-all cursor-pointer group" style={{ animationDelay: `${idx * 100}ms` }}>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewImage(mistake.imageUrl || null);
                    }}
                    className="w-20 h-20 bg-surface-muted rounded-2xl flex-shrink-0 overflow-hidden border-2 border-border-main relative group-active:scale-95 transition-transform"
                  >
                    <img src={mistake.imageUrl} alt="Mistake" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <ImageIcon size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" strokeWidth={2.5} />
                    </div>
                  </button>
                  <div className="flex-1 min-w-0 py-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-black px-2 py-1 bg-primary/10 text-primary rounded-lg border-2 border-primary">
                        {mistake.subject}
                      </span>
                      <span className="text-xs font-bold text-text-muted">{mistake.date}</span>
                    </div>
                    <h3 className="font-black text-text-main text-base truncate mb-1">{mistake.knowledgePoint}</h3>
                    <p className="text-xs text-text-muted font-bold">原因: {mistake.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Services Section */}
          <section>
            <div className="flex items-center gap-3 mb-4 px-1">
              <div className="w-1.5 h-6 bg-secondary-light rounded-full border-2 border-border-main"></div>
              <h2 className="font-black text-lg text-text-main">家校服务</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => onNavigate('leave-apply')}
                className="bg-white p-5 rounded-[2rem] border-2 border-border-main shadow-pop flex items-center gap-4 active:translate-x-[2px] active:translate-y-[2px] active:shadow-pop-sm transition-all group"
              >
                <div className="w-12 h-12 bg-primary rounded-2xl border-2 border-border-main flex items-center justify-center text-white shadow-pop-sm group-hover:scale-110 transition-transform">
                  <FileText size={24} strokeWidth={2.5} />
                </div>
                <div className="text-left">
                  <div className="font-black text-text-main text-base">申请请假</div>
                  <div className="text-xs text-text-muted font-bold mt-0.5">在线提交申请</div>
                </div>
              </button>
              <button 
                className="bg-white p-5 rounded-[2rem] border-2 border-border-main shadow-pop flex items-center gap-4 active:translate-x-[2px] active:translate-y-[2px] active:shadow-pop-sm transition-all opacity-60 grayscale hover:grayscale-0 hover:opacity-100"
              >
                <div className="w-12 h-12 bg-surface-muted rounded-2xl border-2 border-border-main flex items-center justify-center text-text-light shadow-pop-sm">
                  <CheckCircle2 size={24} strokeWidth={2.5} />
                </div>
                <div className="text-left">
                  <div className="font-black text-text-main text-base">查看进度</div>
                  <div className="text-xs text-text-muted font-bold mt-0.5">暂无进行中</div>
                </div>
              </button>
            </div>
          </section>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-text-light animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="w-24 h-24 bg-surface-muted rounded-full flex items-center justify-center mb-6 border-2 border-border-main opacity-50">
            <FileText size={40} className="text-text-main" strokeWidth={2} />
          </div>
          <p className="font-black text-lg text-text-muted">暂无历史记录</p>
          <p className="text-xs mt-2 text-text-light font-bold">（演示版本暂未包含历史数据）</p>
        </div>
      )}

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

export default LearningPage;
