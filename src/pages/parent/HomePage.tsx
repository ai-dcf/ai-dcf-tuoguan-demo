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
  const attendance = dataManager.getChildAttendance(activeChild.id, '2026-03-01');
  const homeworks = dataManager.getChildHomeworks(activeChild.id);
  const review = dataManager.getChildReviews(activeChild.id)[0];
  const mistakes = dataManager.getChildMistakes(activeChild.id);

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="bg-background/90 backdrop-blur-md px-5 py-6 flex justify-between items-center sticky top-0 z-20">
        <div className="relative">
          <button 
            onClick={() => setShowChildPicker(!showChildPicker)}
            className="flex items-center gap-3 active:scale-95 transition-all group"
          >
            <div className="w-12 h-12 bg-primary border-2 border-border-main rounded-full flex items-center justify-center text-white font-black text-lg shadow-pop-sm group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-none transition-all">
              {activeChild.name[0]}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-text-main text-xl">{activeChild.name}</span>
                <ChevronDown size={20} className={`text-text-main transition-transform duration-300 stroke-[3px] ${showChildPicker ? 'rotate-180' : ''}`} />
              </div>
              <span className="text-xs text-text-muted font-bold bg-white border-2 border-border-main px-2 py-0.5 rounded-full inline-block mt-0.5">{activeChild.grade} {activeChild.class}</span>
            </div>
          </button>

          {showChildPicker && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setShowChildPicker(false)}></div>
              <div className="absolute top-full left-0 mt-3 w-60 bg-white rounded-2xl border-2 border-border-main shadow-pop-lg z-40 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {children.map(child => (
                  <button
                    key={child.id}
                    onClick={() => {
                      onChildSwitch(child);
                      setShowChildPicker(false);
                    }}
                    className={`w-full px-5 py-4 flex items-center gap-3 hover:bg-surface-muted transition-colors border-b-2 border-border-main last:border-b-0 ${activeChild.id === child.id ? 'bg-accent/30' : ''}`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 border-border-main ${activeChild.id === child.id ? 'bg-primary text-white' : 'bg-white text-text-main'}`}>
                      {child.name[0]}
                    </div>
                    <div className="text-left">
                      <div className={`font-bold ${activeChild.id === child.id ? 'text-text-main' : 'text-text-muted'}`}>{child.name}</div>
                      <div className="text-xs text-text-light font-bold">{child.grade} {child.class}</div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <button className="w-12 h-12 bg-white border-2 border-border-main rounded-full flex items-center justify-center text-text-main shadow-pop-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all relative">
          <Bell size={24} strokeWidth={2.5} />
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-primary rounded-full border-2 border-border-main"></span>
        </button>
      </div>

      <div className="p-5 space-y-8 pb-24">
        {/* Today's Status Card */}
        <section>
          <div className="bg-secondary rounded-[2rem] border-2 border-border-main p-6 text-text-main shadow-pop-lg relative overflow-hidden group hover:-translate-y-1 hover:shadow-pop-xl transition-all duration-300">
            {/* Decorative Patterns */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffffff]/20 rounded-full -mr-10 -mt-10 border-2 border-border-main/10"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#ffffff]/20 rounded-full -ml-8 -mb-8 border-2 border-border-main/10"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="bg-white border-2 border-border-main px-3 py-1 rounded-full text-xs font-bold inline-block mb-2 shadow-pop-sm">
                    {new Date().toLocaleDateString('zh-CN', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </div>
                  <h3 className="text-2xl font-black tracking-tight">你好, {activeChild.name}家长</h3>
                </div>
                <div className="bg-accent px-3 py-1.5 rounded-xl text-xs font-black border-2 border-border-main shadow-pop-sm">
                  在校中
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-2xl p-3 border-2 border-border-main shadow-pop-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock size={16} strokeWidth={3} className="text-secondary" />
                    <span className="text-xs font-bold text-text-muted">到班</span>
                  </div>
                  <div className="text-2xl font-black tracking-tight text-text-main">{attendance?.checkIn || '--:--'}</div>
                </div>
                <div className="bg-white rounded-2xl p-3 border-2 border-border-main shadow-pop-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock size={16} strokeWidth={3} className="text-primary" />
                    <span className="text-xs font-bold text-text-muted">离班</span>
                  </div>
                  <div className="text-2xl font-black tracking-tight text-text-light">{attendance?.checkOut || '--:--'}</div>
                </div>
              </div>

              <div className="flex justify-between items-center bg-white/30 rounded-2xl p-4 border-2 border-border-main/10">
                <div className="text-center flex-1 border-r-2 border-border-main/10">
                  <div className="text-xl font-black mb-0.5">{homeworks.filter(h => h.status === 'completed').length}/{homeworks.length}</div>
                  <div className="text-[10px] font-bold text-text-main/60 uppercase">作业进度</div>
                </div>
                <div className="text-center flex-1 border-r-2 border-border-main/10">
                  <div className="text-xl font-black mb-0.5">{review?.overallRating || '-'}</div>
                  <div className="text-[10px] font-bold text-text-main/60 uppercase">今日表现</div>
                </div>
                <div className="text-center flex-1">
                  <div className="text-xl font-black mb-0.5">{mistakes.length}</div>
                  <div className="text-[10px] font-bold text-text-main/60 uppercase">新增错题</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-text-main font-black text-lg flex items-center gap-2">
              <Star size={20} className="text-accent" fill="currentColor" />
              快捷服务
            </h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <NavCard 
              title="学情详情" 
              subtitle="作业与反馈" 
              icon={BookOpen} 
              color="bg-secondary" 
              onClick={() => onNavigate('learning')} 
            />
            <NavCard 
              title="错题本" 
              subtitle="查漏补缺" 
              icon={AlertCircle} 
              color="bg-secondary-light" 
              onClick={() => onNavigate('mistake-detail')} 
            />
            <NavCard 
              title="表现点评" 
              subtitle="每日成长" 
              icon={Star} 
              color="bg-accent" 
              onClick={() => onNavigate('review')} 
            />
            <NavCard 
              title="今日食谱" 
              subtitle="健康饮食" 
              icon={Utensils} 
              color="bg-primary-light" 
              onClick={() => onNavigate('recipe')} 
            />
            <NavCard 
              title="请假申请" 
              subtitle="快捷请假" 
              icon={Clock} 
              color="bg-primary" 
              onClick={() => onNavigate('leave-apply')}
              fullWidth 
            />
          </div>
        </section>

        {/* Institution Notification */}
        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-text-main font-black text-lg flex items-center gap-2">
              <Bell size={20} className="text-primary" fill="currentColor" />
              机构动态
            </h2>
            <button className="text-xs font-bold text-text-muted flex items-center bg-white px-3 py-1 rounded-full border-2 border-border-main shadow-pop-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all">
              全部 <ChevronRight size={14} strokeWidth={3} />
            </button>
          </div>
          
          <div className="bg-white rounded-[2rem] border-2 border-border-main shadow-pop-lg p-5">
            {[1, 2].map((_, i) => (
              <div key={i} className={`flex gap-4 py-4 ${i !== 1 ? 'border-b-2 border-surface-muted' : ''}`}>
                <div className="w-16 h-16 bg-surface-muted rounded-2xl border-2 border-border-main flex-shrink-0 flex items-center justify-center font-bold text-text-light">
                  图
                </div>
                <div>
                  <h3 className="font-bold text-text-main text-sm mb-1 line-clamp-1">春季托班火热报名中，限时优惠活动开启</h3>
                  <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
                    为了回馈广大家长，我们推出了春季托班特别优惠活动，前50名报名可享受8折优惠...
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[10px] font-bold text-white bg-primary px-2 py-0.5 rounded-full border-2 border-border-main">活动</span>
                    <span className="text-[10px] font-bold text-text-light">2026-02-20</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const NavCard = ({ title, subtitle, icon: Icon, color, onClick, fullWidth = false }: any) => (
  <button 
    onClick={onClick}
    className={`bg-white p-5 rounded-[2rem] border-2 border-border-main shadow-pop-lg flex flex-col items-center justify-center gap-3 active:translate-x-[2px] active:translate-y-[2px] active:shadow-pop-sm transition-all group relative overflow-hidden ${fullWidth ? 'col-span-2 flex-row' : ''}`}
  >
    <div className={`w-14 h-14 ${color} rounded-2xl border-2 border-border-main flex items-center justify-center text-text-main shadow-pop-sm group-hover:scale-110 transition-transform duration-300 relative z-10`}>
      <Icon size={28} strokeWidth={2.5} />
    </div>
    <div className={`text-center relative z-10 ${fullWidth ? 'text-left flex-1' : ''}`}>
      <span className="font-black text-text-main text-lg block">{title}</span>
      <span className="text-xs text-text-muted font-bold">{subtitle}</span>
    </div>
    {/* Decorative circle */}
    <div className={`absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-20 ${color} z-0`}></div>
  </button>
);

export default HomePage;
