import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, CheckCircle2, XCircle, Clock, ChevronRight as ArrowRight } from 'lucide-react';

// Mock Data
const HISTORY_DATA = [
  { date: '2026-02-23', weekday: '今天', total: 18, actual: 15, leave: 1, pending: 2, status: 'ongoing' },
  { date: '2026-02-22', weekday: '六', total: 18, actual: 0, leave: 0, pending: 0, status: 'rest' },
  { date: '2026-02-21', weekday: '五', total: 18, actual: 16, leave: 0, pending: 2, status: 'completed' },
  { date: '2026-02-20', weekday: '四', total: 18, actual: 17, leave: 1, pending: 0, status: 'completed' },
  { date: '2026-02-19', weekday: '三', total: 18, actual: 18, leave: 0, pending: 0, status: 'completed' },
];

const HistoryView = () => {
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setView('detail');
  };

  if (view === 'detail' && selectedDate) {
    return (
      <HistoryDetail 
        date={selectedDate} 
        onBack={() => setView('list')} 
      />
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 pb-20">
      {/* Date Filter Bar */}
      <div className="bg-white p-4 border-b border-slate-200 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-lg text-slate-800">2026年2月</h2>
          </div>
          <div className="flex gap-2 text-xs">
            <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-medium">本月</button>
            <button className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full">上月</button>
          </div>
        </div>
        
        {/* Weekly Calendar Strip (Simplified) */}
        <div className="flex justify-between text-center">
          {['日', '一', '二', '三', '四', '五', '六'].map((day, i) => (
            <div key={i} className={`flex flex-col items-center gap-1 ${i === 1 ? 'text-blue-600' : 'text-slate-400'}`}>
              <span className="text-xs">{day}</span>
              <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${
                i === 1 ? 'bg-blue-600 text-white font-bold' : ''
              }`}>{22 + i}</span>
            </div>
          ))}
        </div>
      </div>

      {/* History List */}
      <div className="p-4 space-y-3">
        {HISTORY_DATA.map((item, index) => (
          <button 
            key={index}
            onClick={() => handleDateClick(item.date)}
            className="w-full bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center justify-between active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center w-12 border-r border-slate-100 pr-4">
                <span className="text-lg font-bold text-slate-800">{item.date.split('-')[2]}</span>
                <span className="text-xs text-slate-500">{item.weekday}</span>
              </div>
              
              <div className="flex flex-col items-start gap-1">
                {item.status === 'rest' ? (
                  <span className="text-slate-400 font-medium">休息日</span>
                ) : (
                  <>
                    <div className="flex gap-3 text-sm">
                      <span className="text-slate-600">实到 <b className="text-slate-900">{item.actual}</b></span>
                      <span className="text-slate-600">请假 <b className="text-orange-500">{item.leave}</b></span>
                    </div>
                    <div className="flex gap-2">
                      {item.status === 'ongoing' && (
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded">进行中</span>
                      )}
                      {item.status === 'completed' && (
                        <span className="px-2 py-0.5 bg-green-50 text-green-600 text-xs rounded">已完成</span>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <ArrowRight size={18} className="text-slate-300" />
          </button>
        ))}
      </div>
    </div>
  );
};

// Sub-component: History Detail
const HistoryDetail = ({ date, onBack }: { date: string, onBack: () => void }) => {
  // Mock student states for this date
  const students = Array(18).fill(null).map((_, i) => ({
    id: i, 
    name: `学生${i+1}`, 
    status: i < 15 ? 'checked-out' : (i === 15 ? 'leave' : 'checked-in') 
  }));

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={onBack} className="p-1 -ml-2 text-slate-600">
          <ChevronLeft size={24} />
        </button>
        <div>
          <h2 className="font-bold text-slate-800">{date} 考勤详情</h2>
          <p className="text-xs text-slate-500">实到 16 · 请假 1 · 未到 1</p>
        </div>
      </div>

      <div className="p-4 grid grid-cols-3 gap-3 overflow-y-auto pb-20">
        {students.map((student) => (
          <div key={student.id} className="bg-white p-3 rounded-lg shadow-sm border border-slate-100 flex flex-col items-center gap-2 opacity-90">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
              student.status === 'leave' ? 'bg-orange-400' : 
              student.status === 'checked-out' ? 'bg-slate-300' : 'bg-blue-500'
            }`}>
              {student.name.charAt(student.name.length - 1)}
            </div>
            <span className="text-sm font-medium text-slate-700">{student.name}</span>
            
            {student.status === 'checked-out' && (
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <CheckCircle2 size={12} /> 已签退
              </span>
            )}
            {student.status === 'leave' && (
              <span className="text-xs text-orange-500 flex items-center gap-1">
                <XCircle size={12} /> 请假
              </span>
            )}
            {student.status === 'checked-in' && (
              <span className="text-xs text-blue-600 flex items-center gap-1">
                <Clock size={12} /> 在班
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryView;
