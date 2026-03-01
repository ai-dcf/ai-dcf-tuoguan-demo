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
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* Header */}
      <div className="glass px-4 py-3 sticky top-0 z-20 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-600 active:scale-90 transition-all hover:bg-slate-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg text-slate-800">学情详情</h1>
        <div className="w-10"></div>
      </div>

      {/* Tab Switcher */}
      <div className="p-4 sticky top-[60px] z-10 bg-slate-50/95 backdrop-blur-sm">
        <div className="bg-white p-1.5 rounded-[1.2rem] flex shadow-sm border border-slate-100">
          <button 
            onClick={() => setActiveTab('today')}
            className={`flex-1 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${activeTab === 'today' ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            今日学情
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${activeTab === 'history' ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            历史记录
          </button>
        </div>
      </div>

      {activeTab === 'today' ? (
        <div className="px-4 pb-24 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Homework Section */}
          <section>
            <div className="flex items-center gap-3 mb-4 px-1">
              <div className="w-1.5 h-6 bg-blue-600 rounded-full shadow-sm shadow-blue-200"></div>
              <h2 className="font-bold text-lg text-slate-800">作业完成情况</h2>
            </div>
            <div className="space-y-4">
              {homeworks.map((hw, idx) => (
                <div key={hw.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 card-hover" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shadow-inner ${
                        hw.subject === '数学' ? 'bg-blue-50 text-blue-600' :
                        hw.subject === '英语' ? 'bg-indigo-50 text-indigo-600' :
                        'bg-rose-50 text-rose-600'
                      }`}>
                        {hw.subject[0]}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-base">{hw.title}</h3>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Clock size={12} className="text-slate-400" />
                          <p className="text-xs text-slate-400 font-medium">{hw.submitTime || '尚未提交'}</p>
                        </div>
                      </div>
                    </div>
                    {hw.rating && (
                      <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center border-4 border-amber-100 shadow-sm">
                        <span className="text-amber-500 font-black text-xl">{hw.rating}</span>
                      </div>
                    )}
                  </div>
                  {hw.feedback && (
                    <div className="bg-slate-50 p-4 rounded-2xl text-sm text-slate-600 leading-relaxed border border-slate-100 relative">
                      <div className="absolute top-0 left-4 -mt-2 w-4 h-4 bg-slate-50 rotate-45 border-t border-l border-slate-100"></div>
                      <span className="font-bold text-blue-600 mr-2">老师评语:</span>
                      {hw.feedback}
                    </div>
                  )}
                  {hw.status === 'completed' && (
                    <button 
                      onClick={() => setPreviewImage('https://via.placeholder.com/600x800?text=Homework+Detail')}
                      className="mt-4 w-full py-3 bg-blue-50/80 text-blue-600 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-blue-100"
                    >
                      <ImageIcon size={16} /> 查看作业照片
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Review Section */}
          <section>
            <div className="flex items-center gap-3 mb-4 px-1">
              <div className="w-1.5 h-6 bg-amber-500 rounded-full shadow-sm shadow-amber-200"></div>
              <h2 className="font-bold text-lg text-slate-800">今日表现点评</h2>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full -mr-10 -mt-10 blur-2xl"></div>
              
              <div className="flex items-center justify-between mb-5 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-xl text-amber-600">
                    <Star size={20} fill="currentColor" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium mb-0.5">综合评价</div>
                    <span className={`text-lg font-black ${
                      review?.overallRating === '优秀' ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {review?.overallRating || '待评'}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-slate-400 font-medium bg-slate-50 px-3 py-1 rounded-full">{review?.date}</div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-5 relative z-10">
                {review?.tags.map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold border border-slate-100">
                    # {tag}
                  </span>
                ))}
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl mb-5 border border-slate-100 relative z-10">
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "{review?.content || '暂无详细评价'}"
                </p>
              </div>

              {review?.images && (
                <div className="grid grid-cols-3 gap-3 relative z-10">
                  {review.images.map((img, i) => (
                    <button 
                      key={i} 
                      onClick={() => setPreviewImage(img)}
                      className="aspect-square bg-slate-100 rounded-2xl overflow-hidden border border-slate-200/50 active:scale-95 transition-transform shadow-sm"
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
              <div className="w-1.5 h-6 bg-rose-500 rounded-full shadow-sm shadow-rose-200"></div>
              <h2 className="font-bold text-lg text-slate-800">新增错题记录</h2>
            </div>
            <div className="space-y-4">
              {mistakes.map((mistake, idx) => (
                <div key={mistake.id} className="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 flex items-center gap-5 group active:scale-98 transition-all card-hover" style={{ animationDelay: `${idx * 100}ms` }}>
                  <button 
                    onClick={() => setPreviewImage(mistake.imageUrl)}
                    className="w-20 h-20 bg-slate-100 rounded-2xl flex-shrink-0 overflow-hidden border border-slate-200/50 shadow-inner relative group-active:scale-95 transition-transform"
                  >
                    <img src={mistake.imageUrl} alt="Mistake" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <ImageIcon size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                    </div>
                  </button>
                  <div className="flex-1 min-w-0 py-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2 py-1 bg-rose-50 text-rose-600 rounded-lg border border-rose-100">
                        {mistake.subject}
                      </span>
                      <span className="text-xs text-slate-400">{mistake.date}</span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-base truncate mb-1">{mistake.knowledgePoint}</h3>
                    <p className="text-xs text-slate-500 font-medium">原因: {mistake.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Services Section */}
          <section>
            <div className="flex items-center gap-3 mb-4 px-1">
              <div className="w-1.5 h-6 bg-purple-500 rounded-full shadow-sm shadow-purple-200"></div>
              <h2 className="font-bold text-lg text-slate-800">家校服务</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => onNavigate('leave-apply')}
                className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 flex items-center gap-4 active:scale-95 transition-all hover:border-purple-200 group"
              >
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 shadow-sm group-hover:scale-110 transition-transform">
                  <FileText size={24} />
                </div>
                <div className="text-left">
                  <div className="font-bold text-slate-800 text-base">申请请假</div>
                  <div className="text-xs text-slate-400 mt-0.5">在线提交申请</div>
                </div>
              </button>
              <button 
                className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 flex items-center gap-4 active:scale-95 transition-all opacity-60 grayscale hover:grayscale-0 hover:opacity-100"
              >
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 shadow-sm">
                  <CheckCircle2 size={24} />
                </div>
                <div className="text-left">
                  <div className="font-bold text-slate-800 text-base">查看进度</div>
                  <div className="text-xs text-slate-400 mt-0.5">暂无进行中</div>
                </div>
              </button>
            </div>
          </section>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <FileText size={40} className="opacity-30" />
          </div>
          <p className="font-bold text-lg text-slate-500">暂无历史记录</p>
          <p className="text-xs mt-2 text-slate-400">（演示版本暂未包含历史数据）</p>
        </div>
      )}

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

export default LearningPage;
