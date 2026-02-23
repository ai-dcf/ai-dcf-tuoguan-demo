import { useState, useEffect } from 'react';
import { BookOpen, UserCheck, CalendarX, FileText, Bell, ChevronRight, X } from 'lucide-react';
import type { ViewState } from '../types';
import { dataManager } from '../utils/dataManager';
import type { ClassItem } from '../utils/dataManager';

interface HomePageProps {
  onSelectClass: (id: string, tab?: 'attendance' | 'homework' | 'mistake') => void;
  onNavigate: (view: ViewState) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSelectClass, onNavigate }) => {
  const [showClassSelector, setShowClassSelector] = useState<{ show: boolean, type: 'attendance' | 'homework' | 'mistake' }>({ show: false, type: 'attendance' });
  const [classes, setClasses] = useState<ClassItem[]>([]);

  useEffect(() => {
    setClasses(dataManager.getClasses());
  }, []);

  const handleShortcutClick = (type: 'attendance' | 'homework' | 'mistake') => {
    setShowClassSelector({ show: true, type });
  };

  const handleClassSelect = (classId: string) => {
    onSelectClass(classId, showClassSelector.type);
    setShowClassSelector({ show: false, type: 'attendance' });
  };

  return (
    <div className="bg-slate-50 min-h-screen relative">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-slate-100 flex justify-between items-center sticky top-0 z-10">
        <h1 className="font-bold text-lg text-slate-800">未来托管中心-徐汇校区</h1>
        <div className="w-20 h-8 bg-slate-100 rounded-full flex items-center justify-center">
            <span className="text-[10px] text-slate-400">胶囊占位</span>
        </div>
      </div>

      {/* Shortcuts */}
      <div className="bg-white p-4 grid grid-cols-5 gap-2 mb-2">
        <Shortcut icon={<BookOpen size={24} className="text-blue-500" />} label="错题" onClick={() => handleShortcutClick('mistake')} />
        <Shortcut icon={<UserCheck size={24} className="text-green-500" />} label="签到" onClick={() => handleShortcutClick('attendance')} />
        <Shortcut icon={<CalendarX size={24} className="text-orange-500" />} label="请假" onClick={() => onNavigate('leave')} />
        <Shortcut icon={<FileText size={24} className="text-purple-500" />} label="作业" onClick={() => handleShortcutClick('homework')} />
        <Shortcut icon={<Bell size={24} className="text-red-500" />} label="通知" onClick={() => onNavigate('notification')} />
      </div>

      {/* Lunch Care Section */}
      <div className="px-4 py-2">
        <h2 className="text-slate-500 text-sm font-semibold mb-2">午托</h2>
        <ClassCard 
          title="午托高年级" 
          stats={{ uncheck: 2, present: 15, leave: 1 }}
          pendingHomework={3}
          onClick={() => onSelectClass('lunch-high')}
        />
      </div>

      {/* Dinner Care Section */}
      <div className="px-4 py-2 pb-20">
        <h2 className="text-slate-500 text-sm font-semibold mb-2">晚托</h2>
        <ClassCard 
          title="晚托一年级" 
          stats={{ uncheck: 0, present: 18, leave: 0 }}
          pendingHomework={0}
          onClick={() => onSelectClass('dinner-1')}
        />
        <ClassCard 
          title="晚托二年级" 
          stats={{ uncheck: 5, present: 12, leave: 1 }}
          pendingHomework={1}
          onClick={() => onSelectClass('dinner-2')}
        />
      </div>

      {/* Class Selector Modal */}
      {showClassSelector.show && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl w-full max-w-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-800">
                请选择班级
                <span className="text-sm font-normal text-slate-500 ml-2">
                  (前往{showClassSelector.type === 'attendance' ? '签到' : showClassSelector.type === 'mistake' ? '错题本' : '作业点评'})
                </span>
              </h3>
              <button onClick={() => setShowClassSelector({ ...showClassSelector, show: false })} className="text-slate-400">
                <X size={24} />
              </button>
            </div>
            <div className="p-2">
              {classes.map(cls => (
                <button key={cls.id} onClick={() => handleClassSelect(cls.id.toString())} className="w-full p-4 text-left hover:bg-slate-50 rounded-lg flex justify-between items-center group">
                  <span className="font-medium text-slate-700">{cls.name}</span>
                  <ChevronRight size={20} className="text-slate-300 group-hover:text-slate-500" />
                </button>
              ))}
              {classes.length === 0 && (
                <div className="p-4 text-center text-slate-400 text-sm">
                  暂无班级
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
  <div onClick={onClick} className="flex flex-col items-center justify-center gap-1 active:opacity-70 transition-opacity cursor-pointer">
    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
      {icon}
    </div>
    <span className="text-xs text-slate-600">{label}</span>
  </div>
);

const ClassCard = ({ 
  title, 
  stats, 
  pendingHomework, 
  onClick 
}: { 
  title: string, 
  stats: { uncheck: number, present: number, leave: number }, 
  pendingHomework: number,
  onClick: () => void
}) => (
  <div 
    onClick={onClick}
    className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-slate-100 active:bg-slate-50 transition-colors cursor-pointer"
  >
    <div className="flex justify-between items-start mb-3">
      <h3 className="font-bold text-lg text-slate-800">{title}</h3>
      <button className="flex items-center text-blue-600 text-sm font-medium">
        上课 <ChevronRight size={16} />
      </button>
    </div>
    
    <div className="flex gap-4 text-sm text-slate-600 mb-3">
      <span>未点: <span className="text-red-500 font-medium">{stats.uncheck}</span></span>
      <span>实到: <span className="text-green-600 font-medium">{stats.present}</span></span>
      <span>请假: <span className="text-slate-400">{stats.leave}</span></span>
    </div>

    {pendingHomework > 0 && (
      <div className="inline-flex items-center px-2 py-1 bg-orange-50 text-orange-600 text-xs rounded-md">
        待批改作业: {pendingHomework}
      </div>
    )}
  </div>
);

export default HomePage;
