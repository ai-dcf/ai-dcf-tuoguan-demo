import React from 'react';
import { ChevronLeft, CalendarCheck } from 'lucide-react';
import AttendanceView from '../components/AttendanceView';
import { dataManager } from '../utils/dataManager';

interface AttendancePageProps {
  classId: string;
  onBack: () => void;
}

const AttendancePage: React.FC<AttendancePageProps> = ({ classId, onBack }) => {
  const cls = dataManager.getClasses().find(c => c.id.toString() === classId.toString());
  const className = cls ? cls.name : '未知班级';

  return (
    <div className="flex flex-col h-screen bg-[#F5F7FA]">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-100/50 px-4 py-3 flex items-center gap-3 sticky top-0 z-50">
        <button 
          onClick={onBack} 
          className="p-2 -ml-2 text-slate-600 hover:bg-slate-100/50 rounded-full transition-colors active:scale-95"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                <CalendarCheck size={18} />
            </div>
            <div>
                <h1 className="font-bold text-lg text-slate-800 tracking-tight leading-tight">
                考勤打卡
                </h1>
                <p className="text-[10px] text-slate-500 font-medium leading-tight">{className}</p>
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-[#F5F7FA]">
        <AttendanceView />
      </div>
    </div>
  );
};

export default AttendancePage;
