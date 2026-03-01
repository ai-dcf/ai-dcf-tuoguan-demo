import React, { useState } from 'react';
import { ChevronDown, Bell, Clock, BookOpen, Star, AlertCircle, Utensils, ChevronRight } from 'lucide-react';
import type { Student as Child, ParentViewState as ViewState } from '../../types';
import { dataManager } from '../../utils/dataManager';

interface HomePageProps {
  activeChild: Child;
  children: Child[];
  onChildSwitch: (child: Child) => void;
  onNavigate: (view: ViewState) => void;
}

const HomePage: React.FC<HomePageProps> = ({ activeChild, children, onChildSwitch, onNavigate }) => {
  const [showChildPicker, setShowChildPicker] = useState(false);
  const attendance = dataManager.getChildAttendance(activeChild.id, '2026-02-25');
  const homeworks = dataManager.getChildHomeworks(activeChild.id);
  const review = dataManager.getChildReviews(activeChild.id)[0];
  const mistakes = dataManager.getChildMistakes(activeChild.id);

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md px-5 py-4 border-b border-slate-100 flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <div className="relative">
          <button 
            onClick={() => setShowChildPicker(!showChildPicker)}
            className="flex items-center gap-3 active:scale-95 transition-all group"
          >
            <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-all border-2 border-white">
              {activeChild.name[0]}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 text-lg">{activeChild.name}</span>
                <ChevronDown size={16} className={`text-slate-400 transition-transform duration-300 ${showChildPicker ? 'rotate-180' : ''}`} />
              </div>
              <span className="text-xs text-slate-500 font-medium">{activeChild.grade} {activeChild.class}</span>
            </div>
          </button>

          {showChildPicker && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setShowChildPicker(false)}></div>
              <div className="absolute top-full left-0 mt-3 w-56 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 z-40 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {children.map(child => (
                  <button
                    key={child.id}
                    onClick={() => {
                      onChildSwitch(child);
                      setShowChildPicker(false);
                    }}
                    className={`w-full px-5 py-4 flex items-center gap-3 hover:bg-slate-50 transition-colors ${activeChild.id === child.id ? 'bg-blue-50/50' : ''}`}
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ${activeChild.id === child.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {child.name[0]}
                    </div>
                    <div className="text-left">
                      <div className={`font-bold ${activeChild.id === child.id ? 'text-blue-600' : 'text-slate-700'}`}>{child.name}</div>
                      <div className="text-xs text-slate-400 font-medium">{child.grade} {child.class}</div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <button className="w-11 h-11 bg-white border border-slate-100 rounded-full flex items-center justify-center text-slate-500 relative active:scale-90 transition-all shadow-sm hover:shadow-md hover:text-blue-600">
          <Bell size={22} />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>

      <div className="p-5 space-y-8 pb-24">
        {/* Today's Status Card */}
        <section>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 ml-1">今日动态</h2>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[2.5rem] p-1 text-white shadow-xl shadow-blue-600/20 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/30 rounded-full blur-3xl -ml-10 -mb-10"></div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-[2.3rem] p-6 h-full relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-blue-100 text-sm font-medium mb-1">{new Date().toLocaleDateString('zh-CN', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
                  <h3 className="text-3xl font-bold tracking-tight">你好, {activeChild.name}家长</h3>
                </div>
                <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold border border-white/10">
                  在校中
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-4 border border-white/10 relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-2 text-blue-100">
                    <div className="p-1 bg-blue-500/30 rounded-lg">
                      <Clock size={14} />
                    </div>
                    <span className="text-xs font-bold opacity-80">到班时间</span>
                  </div>
                  <div className="text-3xl font-black tracking-tight">{attendance?.checkIn || '--:--'}</div>
                </div>
                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-4 border border-white/10 relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-2 text-blue-100">
                    <div className="p-1 bg-indigo-500/30 rounded-lg">
                      <Clock size={14} className="rotate-180" />
                    </div>
                    <span className="text-xs font-bold opacity-80">离班时间</span>
                  </div>
                  <div className="text-3xl font-black tracking-tight opacity-50">{attendance?.checkOut || '--:--'}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/10 rounded-2xl p-3 text-center border border-white/5">
                  <div className="text-2xl font-bold mb-1">{homeworks.filter(h => h.status === 'completed').length}/{homeworks.length}</div>
                  <div className="text-[10px] text-blue-100 font-medium">作业进度</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-3 text-center border border-white/5">
                  <div className="text-2xl font-bold mb-1">{review?.overallRating || '-'}</div>
                  <div className="text-[10px] text-blue-100 font-medium">今日表现</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-3 text-center border border-white/5">
                  <div className="text-2xl font-bold mb-1">{mistakes.length}</div>
                  <div className="text-[10px] text-blue-100 font-medium">新增错题</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 ml-1">快捷服务</h2>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => onNavigate('learning')}
              className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 flex flex-col items-center justify-center gap-4 active:scale-95 transition-all group relative overflow-hidden hover:border-blue-200"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center text-white shadow-md shadow-blue-200 group-hover:scale-110 transition-transform duration-300 relative z-10">
                <BookOpen size={28} strokeWidth={2} />
              </div>
              <div className="text-center relative z-10">
                <span className="font-bold text-slate-800 text-lg block">学情详情</span>
                <span className="text-[10px] text-slate-400 font-medium">作业与反馈</span>
              </div>
            </button>

            <button 
              onClick={() => onNavigate('mistake-detail')}
              className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 flex flex-col items-center justify-center gap-4 active:scale-95 transition-all group relative overflow-hidden hover:border-purple-200"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-400 rounded-2xl flex items-center justify-center text-white shadow-md shadow-purple-200 group-hover:scale-110 transition-transform duration-300 relative z-10">
                <AlertCircle size={28} strokeWidth={2} />
              </div>
              <div className="text-center relative z-10">
                <span className="font-bold text-slate-800 text-lg block">错题本</span>
                <span className="text-[10px] text-slate-400 font-medium">查漏补缺</span>
              </div>
            </button>

            <button 
              onClick={() => onNavigate('review')}
              className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 flex flex-col items-center justify-center gap-4 active:scale-95 transition-all group relative overflow-hidden hover:border-amber-200"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center text-white shadow-md shadow-amber-200 group-hover:scale-110 transition-transform duration-300 relative z-10">
                <Star size={28} strokeWidth={2} />
              </div>
              <div className="text-center relative z-10">
                <span className="font-bold text-slate-800 text-lg block">表现点评</span>
                <span className="text-[10px] text-slate-400 font-medium">每日成长</span>
              </div>
            </button>

            <button 
              onClick={() => onNavigate('recipe')}
              className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 flex flex-col items-center justify-center gap-4 active:scale-95 transition-all group relative overflow-hidden hover:border-emerald-200"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-2xl flex items-center justify-center text-white shadow-md shadow-emerald-200 group-hover:scale-110 transition-transform duration-300 relative z-10">
                <Utensils size={28} strokeWidth={2} />
              </div>
              <div className="text-center relative z-10">
                <span className="font-bold text-slate-800 text-lg block">今日食谱</span>
                <span className="text-[10px] text-slate-400 font-medium">健康饮食</span>
              </div>
            </button>

            <button 
              onClick={() => onNavigate('leave-apply')}
              className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 flex flex-col items-center justify-center gap-4 active:scale-95 transition-all group relative overflow-hidden hover:border-rose-200"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center text-white shadow-md shadow-rose-200 group-hover:scale-110 transition-transform duration-300 relative z-10">
                <Clock size={28} strokeWidth={2} />
              </div>
              <div className="text-center relative z-10">
                <span className="font-bold text-slate-800 text-lg block">请假申请</span>
                <span className="text-[10px] text-slate-400 font-medium">快捷请假</span>
              </div>
            </button>
          </div>
        </section>

        {/* Institution Notification */}
        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">机构动态</h2>
            <button className="text-xs text-blue-600 font-bold flex items-center bg-blue-50 px-3 py-1 rounded-full active:scale-95 transition-transform">查看全部 <ChevronRight size={14} /></button>
          </div>
          <div className="bg-white p-1 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 group cursor-pointer hover:shadow-xl transition-all duration-300">
            <div className="flex gap-5 p-4">
              <div className="w-20 h-20 bg-slate-100 rounded-2xl flex-shrink-0 overflow-hidden shadow-inner">
                <img src="https://via.placeholder.com/150" alt="Notice" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-red-50 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded-md border border-red-100">置顶</span>
                  <span className="text-[10px] text-slate-400 font-medium">2026-02-24</span>
                </div>
                <h3 className="font-bold text-slate-800 line-clamp-1 text-base group-hover:text-blue-600 transition-colors mb-1">2026年劳动节放假安排</h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">尊敬的家长，根据国家节假日安排，本中心将于5月1日至5月5日放假...</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
