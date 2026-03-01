import React, { useState } from 'react';
import { BookOpen, UserCheck, CalendarX, FileText, Bell, ChevronRight, X, MapPin, Star } from 'lucide-react';
import type { TeacherViewState as ViewState } from '../../types';
import { dataManager } from '../../utils/dataManager';

interface HomePageProps {
  onSelectClass: (id: string, tab?: 'attendance' | 'homework' | 'mistake') => void;
  onNavigate: (view: ViewState) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSelectClass, onNavigate }) => {
  const [showClassSelector, setShowClassSelector] = useState<{ show: boolean, type: 'attendance' | 'homework' | 'mistake' }>({ show: false, type: 'attendance' });
  const classes = dataManager.getClasses();

  const handleShortcutClick = (type: 'attendance' | 'homework' | 'mistake') => {
    setShowClassSelector({ show: true, type });
  };

  const handleClassSelect = (classId: string) => {
    onSelectClass(classId, showClassSelector.type);
    setShowClassSelector({ show: false, type: 'attendance' });
  };

  const activeClasses = classes.filter(c => c.status !== 'closed');
  const lunchClasses = activeClasses.filter(c => c.custodyType === '午托');
  const dinnerClasses = activeClasses.filter(c => c.custodyType === '晚托');

  return (
    <div className="min-h-screen relative pb-24">
      {/* Header */}
      <div className="px-5 py-6 flex justify-between items-center sticky top-0 z-20 bg-background/90 backdrop-blur-sm">
        <div>
          <h1 className="font-black text-2xl text-text-main tracking-tight flex items-center gap-2">
            未来托管中心
            <span className="bg-accent text-text-main text-[10px] px-2 py-1 rounded-md border-2 border-border-main shadow-pop-sm font-bold">旗舰版</span>
          </h1>
          <p className="text-xs font-bold text-text-muted flex items-center mt-1">
            <MapPin size={12} className="mr-1" /> 徐汇校区
          </p>
        </div>
        <button className="w-10 h-10 bg-white border-2 border-border-main rounded-full flex items-center justify-center text-text-main shadow-pop-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-border-main"></span>
        </button>
      </div>

      {/* Shortcuts */}
      <div className="px-5 mb-8">
        <div className="bg-white rounded-3xl border-2 border-border-main shadow-pop-lg p-6">
          <div className="grid grid-cols-4 gap-4">
            <Shortcut 
              icon={<BookOpen size={24} />} 
              label="错题本" 
              color="bg-secondary"
              onClick={() => handleShortcutClick('mistake')} 
            />
            <Shortcut 
              icon={<UserCheck size={24} />} 
              label="签到" 
              color="bg-accent"
              onClick={() => handleShortcutClick('attendance')} 
            />
            <Shortcut 
              icon={<CalendarX size={24} />} 
              label="请假" 
              color="bg-primary"
              onClick={() => onNavigate('leave')} 
            />
            <Shortcut 
              icon={<FileText size={24} />} 
              label="作业" 
              color="bg-secondary-light"
              onClick={() => handleShortcutClick('homework')} 
            />
          </div>
        </div>
      </div>

      {/* Lunch Care Section */}
      <div className="px-5 py-2 mb-6">
        <SectionHeader title="午托班级" count={lunchClasses.length} color="text-primary" />
        <div className="space-y-4">
          {lunchClasses.length > 0 ? lunchClasses.map(cls => (
            <ClassCard 
              key={cls.id}
              title={cls.name}
              stats={{ uncheck: cls.studentCount, present: 0, leave: 0 }}
              pendingHomework={3} // Mock data
              onClick={() => onSelectClass(cls.id.toString())}
              theme="warm"
            />
          )) : (
            <EmptyState label="暂无午托班级" />
          )}
        </div>
      </div>

      {/* Dinner Care Section */}
      <div className="px-5 py-2">
        <SectionHeader title="晚托班级" count={dinnerClasses.length} color="text-secondary" />
        <div className="space-y-4">
          {dinnerClasses.length > 0 ? dinnerClasses.map(cls => (
            <ClassCard 
              key={cls.id}
              title={cls.name}
              stats={{ uncheck: cls.studentCount, present: 0, leave: 0 }}
              pendingHomework={1} // Mock data
              onClick={() => onSelectClass(cls.id.toString())}
              theme="cool"
            />
          )) : (
            <EmptyState label="暂无晚托班级" />
          )}
        </div>
      </div>

      {/* Class Selector Modal */}
      {showClassSelector.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-text-main/40 backdrop-blur-sm" onClick={() => setShowClassSelector({ ...showClassSelector, show: false })} />
          
          <div className="bg-white w-full max-w-sm rounded-3xl border-2 border-border-main shadow-pop-xl overflow-hidden z-10 animate-in zoom-in-95 duration-300">
            <div className="px-6 py-5 border-b-2 border-border-main flex justify-between items-center bg-accent">
              <div>
                <h3 className="font-black text-xl text-text-main">选择班级</h3>
                <p className="text-xs font-bold text-text-main/70 mt-0.5">
                  前往 {showClassSelector.type === 'attendance' ? '签到' : showClassSelector.type === 'mistake' ? '错题本' : '作业点评'}
                </p>
              </div>
              <button 
                onClick={() => setShowClassSelector({ ...showClassSelector, show: false })} 
                className="w-8 h-8 rounded-full bg-white border-2 border-border-main flex items-center justify-center text-text-main hover:bg-primary hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 max-h-[60vh] overflow-y-auto bg-white">
              {classes.length > 0 ? (
                <div className="space-y-3">
                  {classes.map(cls => (
                    <button 
                      key={cls.id} 
                      onClick={() => handleClassSelect(cls.id.toString())} 
                      className="w-full p-4 text-left bg-white hover:bg-surface-muted border-2 border-border-main rounded-2xl flex justify-between items-center group transition-all active:translate-x-[2px] active:translate-y-[2px] shadow-pop active:shadow-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary border-2 border-border-main flex items-center justify-center text-text-main font-black text-sm">
                          {cls.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-text-main block">{cls.name}</span>
                          <span className="text-xs font-bold text-text-muted">{cls.students.length}名学生</span>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-text-main" />
                    </button>
                  ))}
                </div>
              ) : (
                <EmptyState label="暂无班级数据" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SectionHeader = ({ title, count, color }: { title: string, count: number, color: string }) => (
  <div className="flex items-center justify-between mb-4 pl-1">
    <h2 className="text-[#2D3436] font-black text-lg flex items-center gap-2">
      <Star size={20} className={color} fill="currentColor" />
      {title}
    </h2>
    <span className="text-xs font-bold text-[#2D3436] bg-white border-2 border-[#2D3436] px-3 py-1 rounded-full shadow-[2px_2px_0px_0px_#2D3436]">{count}个班级</span>
  </div>
);

const EmptyState = ({ label }: { label: string }) => (
  <div className="text-sm font-bold text-[#B2BEC3] text-center py-8 bg-white rounded-3xl border-2 border-dashed border-[#B2BEC3]">
    {label}
  </div>
);

const Shortcut = ({ icon, label, onClick, color }: { icon: React.ReactNode, label: string, onClick?: () => void, color: string }) => (
  <button 
    onClick={onClick} 
    className="flex flex-col items-center gap-2 active:scale-95 transition-transform group w-full"
  >
    <div className={`w-14 h-14 rounded-2xl border-2 border-[#2D3436] shadow-[4px_4px_0px_0px_#2D3436] group-hover:shadow-[6px_6px_0px_0px_#2D3436] group-active:shadow-[2px_2px_0px_0px_#2D3436] group-active:translate-x-[2px] group-active:translate-y-[2px] transition-all duration-200 flex items-center justify-center text-[#2D3436] ${color}`}>
      {icon}
    </div>
    <span className="text-xs font-bold text-[#2D3436]">{label}</span>
  </button>
);

const ClassCard = ({ 
  title, 
  stats, 
  pendingHomework, 
  onClick,
  theme = 'warm'
}: { 
  title: string, 
  stats: { uncheck: number, present: number, leave: number }, 
  pendingHomework: number,
  onClick: () => void,
  theme?: 'warm' | 'cool'
}) => (
  <div 
    onClick={onClick}
    className="bg-white rounded-3xl p-5 border-2 border-border-main shadow-pop active:translate-x-[2px] active:translate-y-[2px] active:shadow-pop-sm transition-all cursor-pointer group relative overflow-hidden"
  >
    {/* Decorative background shape */}
    <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-20 group-hover:scale-110 transition-transform ${theme === 'warm' ? 'bg-primary' : 'bg-secondary'}`} />

    <div className="flex justify-between items-start mb-4 relative z-10">
      <div>
        <h3 className="font-black text-lg text-text-main tracking-tight">{title}</h3>
        <div className="flex items-center gap-1 mt-1">
          <div className={`w-2 h-2 rounded-full ${theme === 'warm' ? 'bg-primary' : 'bg-secondary'}`}></div>
          <p className="text-xs text-text-muted font-bold">今日课程进行中</p>
        </div>
      </div>
      <button className="w-8 h-8 rounded-full bg-white border-2 border-border-main flex items-center justify-center text-text-main group-hover:bg-text-main group-hover:text-white transition-colors">
        <ChevronRight size={18} />
      </button>
    </div>
    
    <div className="flex gap-2 mb-4 relative z-10">
      <StatBadge label="未点名" value={stats.uncheck} highlight={stats.uncheck > 0} />
      <StatBadge label="实到" value={stats.present} />
      <StatBadge label="请假" value={stats.leave} />
    </div>

    {pendingHomework > 0 && (
      <div className="flex items-center gap-2 bg-accent/20 border-2 border-accent px-3 py-2 rounded-xl relative z-10">
        <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
        <span className="text-xs text-text-main font-bold">
          有 <span className="text-primary-dark">{pendingHomework}</span> 份作业待批改
        </span>
      </div>
    )}
  </div>
);

const StatBadge = ({ label, value, highlight = false }: { label: string, value: number, highlight?: boolean }) => (
  <div className={`flex-1 rounded-xl p-2 flex flex-col items-center justify-center border-2 ${highlight ? 'bg-primary/10 border-primary' : 'bg-surface-muted border-transparent'}`}>
    <span className={`text-[10px] font-bold mb-0.5 ${highlight ? 'text-primary' : 'text-text-muted'}`}>{label}</span>
    <span className={`font-black text-base ${highlight ? 'text-primary' : 'text-text-main'}`}>{value}</span>
  </div>
);

export default HomePage;
