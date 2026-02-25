import { useState } from 'react';
import { BookOpen, UserCheck, CalendarX, FileText, Bell, ChevronRight, X, Sparkles, MapPin } from 'lucide-react';
import type { ViewState } from '../types';
import { dataManager } from '../utils/dataManager';
import type { ClassItem } from '../utils/dataManager';

interface HomePageProps {
  onSelectClass: (id: string, tab?: 'attendance' | 'homework' | 'mistake') => void;
  onNavigate: (view: ViewState) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSelectClass, onNavigate }) => {
  const [showClassSelector, setShowClassSelector] = useState<{ show: boolean, type: 'attendance' | 'homework' | 'mistake' }>({ show: false, type: 'attendance' });
  const classes: ClassItem[] = dataManager.getClasses();

  const handleShortcutClick = (type: 'attendance' | 'homework' | 'mistake') => {
    setShowClassSelector({ show: true, type });
  };

  const handleClassSelect = (classId: string) => {
    onSelectClass(classId, showClassSelector.type);
    setShowClassSelector({ show: false, type: 'attendance' });
  };

  const activeClasses = classes.filter(c => c.status !== 'closed');
  const lunchClasses = activeClasses.filter(c => c.custodyType === 'lunch');
  const dinnerClasses = activeClasses.filter(c => c.custodyType === 'dinner');

  return (
    <div className="bg-slate-50 min-h-screen relative pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md px-5 py-4 border-b border-slate-100 flex justify-between items-center sticky top-0 z-20">
        <div>
          <h1 className="font-extrabold text-xl text-slate-900 tracking-tight flex items-center gap-2">
            未来托管中心
            <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full font-medium">旗舰版</span>
          </h1>
          <p className="text-xs text-slate-500 flex items-center mt-1">
            <MapPin size={12} className="mr-1" /> 徐汇校区
          </p>
        </div>
        <button className="w-9 h-9 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 transition-colors relative">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>

      {/* Hero / Welcome (Optional - keeping it simple for now) */}
      
      {/* Shortcuts */}
      <div className="bg-white px-4 py-6 mb-3 shadow-sm border-b border-slate-100">
        <div className="grid grid-cols-4 gap-y-6">
          <Shortcut 
            icon={<div className="bg-blue-50 text-blue-600 w-full h-full flex items-center justify-center rounded-2xl"><BookOpen size={24} /></div>} 
            label="错题本" 
            onClick={() => handleShortcutClick('mistake')} 
          />
          <Shortcut 
            icon={<div className="bg-green-50 text-green-600 w-full h-full flex items-center justify-center rounded-2xl"><UserCheck size={24} /></div>} 
            label="签到" 
            onClick={() => handleShortcutClick('attendance')} 
          />
          <Shortcut 
            icon={<div className="bg-orange-50 text-orange-600 w-full h-full flex items-center justify-center rounded-2xl"><CalendarX size={24} /></div>} 
            label="请假" 
            onClick={() => onNavigate('leave')} 
          />
          <Shortcut 
            icon={<div className="bg-purple-50 text-purple-600 w-full h-full flex items-center justify-center rounded-2xl"><FileText size={24} /></div>} 
            label="作业" 
            onClick={() => handleShortcutClick('homework')} 
          />
          {/* Added a decorative or 'More' item if needed, but sticking to 4 cols for better spacing */}
        </div>
      </div>

      {/* Lunch Care Section */}
      <div className="px-5 py-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-slate-800 font-bold text-base flex items-center gap-2">
            <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
            午托班级
          </h2>
          <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">{lunchClasses.length}个班级</span>
        </div>
        <div className="space-y-3">
          {lunchClasses.length > 0 ? lunchClasses.map(cls => (
            <ClassCard 
              key={cls.id}
              title={cls.name}
              stats={{ uncheck: cls.studentCount, present: 0, leave: 0 }}
              pendingHomework={3} // Mock data
              onClick={() => onSelectClass(cls.id.toString())}
              gradient="from-blue-50 to-white"
            />
          )) : (
            <div className="text-sm text-slate-400 text-center py-4 bg-white rounded-2xl border border-dashed border-slate-200">
              暂无午托班级
            </div>
          )}
        </div>
      </div>

      {/* Dinner Care Section */}
      <div className="px-5 py-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-slate-800 font-bold text-base flex items-center gap-2">
            <span className="w-1 h-4 bg-indigo-500 rounded-full"></span>
            晚托班级
          </h2>
          <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">{dinnerClasses.length}个班级</span>
        </div>
        <div className="space-y-3">
          {dinnerClasses.length > 0 ? dinnerClasses.map(cls => (
            <ClassCard 
              key={cls.id}
              title={cls.name}
              stats={{ uncheck: cls.studentCount, present: 0, leave: 0 }}
              pendingHomework={1} // Mock data
              onClick={() => onSelectClass(cls.id.toString())}
              gradient="from-indigo-50 to-white"
            />
          )) : (
            <div className="text-sm text-slate-400 text-center py-4 bg-white rounded-2xl border border-dashed border-slate-200">
              暂无晚托班级
            </div>
          )}
        </div>
      </div>

      {/* Class Selector Modal */}
      {showClassSelector.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setShowClassSelector({ ...showClassSelector, show: false })} />
          
          <div className="bg-white w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl z-10 animate-in zoom-in-95 duration-300">
            <div className="px-5 py-4 border-b border-slate-50 flex justify-between items-center bg-white">
              <div>
                <h3 className="font-bold text-lg text-slate-800">选择班级</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  前往 {showClassSelector.type === 'attendance' ? '签到' : showClassSelector.type === 'mistake' ? '错题本' : '作业点评'}
                </p>
              </div>
              <button 
                onClick={() => setShowClassSelector({ ...showClassSelector, show: false })} 
                className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 max-h-[60vh] overflow-y-auto">
              {classes.length > 0 ? (
                <div className="space-y-2">
                  {classes.map(cls => (
                    <button 
                      key={cls.id} 
                      onClick={() => handleClassSelect(cls.id.toString())} 
                      className="w-full p-4 text-left bg-slate-50 hover:bg-blue-50/50 border border-transparent hover:border-blue-100 rounded-xl flex justify-between items-center group transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 shadow-sm border border-slate-100 font-bold text-sm">
                          {cls.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-slate-700 block">{cls.name}</span>
                          <span className="text-xs text-slate-400">{cls.students.length}名学生</span>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-slate-300 group-hover:text-blue-400 transition-colors" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-slate-400">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                    <Sparkles size={24} className="text-slate-300" />
                  </div>
                  <p className="text-sm">暂无班级数据</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Shortcut = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) => (
  <button 
    onClick={onClick} 
    className="flex flex-col items-center gap-2 active:scale-95 transition-transform group w-full"
  >
    <div className="w-14 h-14 rounded-2xl shadow-sm group-hover:shadow-md transition-shadow duration-200">
      {icon}
    </div>
    <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900">{label}</span>
  </button>
);

const ClassCard = ({ 
  title, 
  stats, 
  pendingHomework, 
  onClick,
  gradient = "from-white to-white"
}: { 
  title: string, 
  stats: { uncheck: number, present: number, leave: number }, 
  pendingHomework: number,
  onClick: () => void,
  gradient?: string
}) => (
  <div 
    onClick={onClick}
    className={`bg-gradient-to-br ${gradient} rounded-2xl p-5 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-slate-100 active:scale-[0.98] transition-all cursor-pointer hover:shadow-md relative overflow-hidden group`}
  >
    {/* Decorative circle */}
    <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/40 rounded-full blur-2xl group-hover:bg-white/60 transition-colors" />

    <div className="flex justify-between items-start mb-4 relative z-10">
      <div>
        <h3 className="font-bold text-lg text-slate-800 tracking-tight">{title}</h3>
        <p className="text-xs text-slate-400 mt-0.5 font-medium">今日课程进行中</p>
      </div>
      <button className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-white shadow-sm transition-colors">
        <ChevronRight size={18} />
      </button>
    </div>
    
    <div className="grid grid-cols-3 gap-2 mb-4 relative z-10">
      <div className="bg-white/60 rounded-lg p-2 flex flex-col items-center justify-center border border-slate-50">
        <span className="text-xs text-slate-400 mb-1">未点名</span>
        <span className={`font-bold text-base ${stats.uncheck > 0 ? 'text-red-500' : 'text-slate-700'}`}>{stats.uncheck}</span>
      </div>
      <div className="bg-white/60 rounded-lg p-2 flex flex-col items-center justify-center border border-slate-50">
        <span className="text-xs text-slate-400 mb-1">实到</span>
        <span className="font-bold text-base text-green-600">{stats.present}</span>
      </div>
      <div className="bg-white/60 rounded-lg p-2 flex flex-col items-center justify-center border border-slate-50">
        <span className="text-xs text-slate-400 mb-1">请假</span>
        <span className="font-bold text-base text-slate-600">{stats.leave}</span>
      </div>
    </div>

    {pendingHomework > 0 && (
      <div className="flex items-center gap-2 bg-orange-50/80 border border-orange-100 px-3 py-2 rounded-xl relative z-10">
        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
        <span className="text-xs text-orange-700 font-medium">
          有 <span className="font-bold">{pendingHomework}</span> 份作业待批改
        </span>
      </div>
    )}
  </div>
);

export default HomePage;
