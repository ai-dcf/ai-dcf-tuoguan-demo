import React from 'react';
import { ChevronLeft } from 'lucide-react';
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
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-20">
        <button onClick={onBack} className="p-1 -ml-1 text-slate-600 active:bg-slate-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg text-slate-900">
          {className} - 签到
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-slate-50">
        <AttendanceView />
      </div>
    </div>
  );
};

export default AttendancePage;
