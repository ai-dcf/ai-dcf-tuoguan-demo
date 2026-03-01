import React from 'react';
import { ChevronLeft, CalendarCheck } from 'lucide-react';
import AttendanceView from '../../components/AttendanceView';
import { dataManager } from '../../utils/dataManager';

interface AttendancePageProps {
  classId: string;
  onBack: () => void;
}

const AttendancePage: React.FC<AttendancePageProps> = ({ classId, onBack }) => {
  const cls = dataManager.getClasses().find(c => c.id.toString() === classId.toString());
  const className = cls ? cls.name : '未知班级';

  return (
    <div className="flex flex-col h-screen bg-background font-sans">
      {/* Header */}
      <div className="bg-background/90 backdrop-blur-md border-b-2 border-border-main/10 px-5 py-4 flex items-center gap-4 sticky top-0 z-50">
        <button 
          onClick={onBack} 
          className="w-10 h-10 rounded-full bg-white border-2 border-border-main flex items-center justify-center text-text-main shadow-pop active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
        >
          <ChevronLeft size={24} strokeWidth={3} />
        </button>
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent text-text-main rounded-xl border-2 border-border-main flex items-center justify-center shadow-pop">
                <CalendarCheck size={20} strokeWidth={2.5} />
            </div>
            <div>
                <h1 className="font-black text-xl text-text-main leading-tight">
                考勤打卡
                </h1>
                <p className="text-xs text-text-light font-bold mt-0.5">{className}</p>
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-background">
        <AttendanceView />
      </div>
    </div>
  );
};

export default AttendancePage;
