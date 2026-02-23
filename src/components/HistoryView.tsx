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
    <div className="flex flex-col h-full bg-slate-50 pb-20 relative">
      {/* Date Filter Bar */}
      <div className="bg-white/80 backdrop-blur-md p-4 border-b border-slate-200/60 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-lg text-slate-800">2026年2月</h2>
            <ChevronRight size={16} className="text-slate-400" />
          </div>
          <div className="flex gap-1 bg-slate-100 p-1 rounded-full">
            <button className="px-3 py-1 bg-white text-blue-600 rounded-full font-bold shadow-sm text-xs transition-all">本月</button>
            <button className="px-3 py-1 text-slate-500 rounded-full text-xs font-medium hover:text-slate-800 transition-colors">上月</button>
          </div>
        </div>
        
        {/* Weekly Calendar Strip */}
        <div className="flex justify-between text-center bg-white rounded-xl p-2 shadow-sm border border-slate-50">
          {['日', '一', '二', '三', '四', '五', '六'].map((day, i) => (
            <div key={i} className={`flex flex-col items-center gap-1 p-1 rounded-lg transition-all ${
              i === 1 ? 'bg-blue-50' : 'hover:bg-slate-50'
            }`}>
              <span className={`text-xs font-medium ${i === 1 ? 'text-blue-600' : 'text-slate-400'}`}>{day}</span>
              <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-all ${
                i === 1 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200 scale-110' 
                  : 'text-slate-700'
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
            className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between active:scale-[0.98] transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-5">
              <div className="flex flex-col items-center w-12 border-r border-slate-100 pr-5">
                <span className={`text-xl font-bold ${item.weekday === '今天' ? 'text-blue-600' : 'text-slate-800'}`}>
                  {item.date.split('-')[2]}
                </span>
                <span className="text-xs text-slate-400 font-medium">{item.weekday}</span>
              </div>
              
              <div className="flex flex-col items-start gap-1.5">
                {item.status === 'rest' ? (
                  <span className="text-slate-400 font-bold bg-slate-50 px-3 py-1 rounded-lg text-sm">休息日</span>
                ) : (
                  <>
                    <div className="flex gap-4 text-sm">
                      <span className="text-slate-500">实到 <b className="text-slate-800 text-base">{item.actual}</b></span>
                      <span className="text-slate-500">请假 <b className="text-orange-500 text-base">{item.leave}</b></span>
                    </div>
                    <div className="flex gap-2">
                      {item.status === 'ongoing' && (
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded border border-blue-100">进行中</span>
                      )}
                      {item.status === 'completed' && (
                        <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold rounded border border-green-100">已完成</span>
                      )}
                      {item.pending > 0 && (
                         <span className="px-2 py-0.5 bg-orange-50 text-orange-600 text-[10px] font-bold rounded border border-orange-100">待签 {item.pending}</span>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
              <ArrowRight size={16} />
            </div>
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
    <div className="flex flex-col h-full bg-slate-50 absolute inset-0 z-30">
      <div className="bg-white/80 backdrop-blur-md px-4 py-3 border-b border-slate-200/60 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
          <ChevronLeft size={22} />
        </button>
        <div>
          <h2 className="font-bold text-slate-800 text-lg">{date} 考勤详情</h2>
          <p className="text-xs text-slate-500 font-medium">实到 16 · 请假 1 · 未到 1</p>
        </div>
      </div>

      <div className="p-4 grid grid-cols-3 gap-3 overflow-y-auto pb-20">
        {students.map((student) => (
          <div key={student.id} className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-2 transition-all hover:shadow-md active:scale-95">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm ${
              student.status === 'leave' ? 'bg-orange-400' : 
              student.status === 'checked-out' ? 'bg-slate-300' : 'bg-blue-500'
            }`}>
              {student.name.charAt(student.name.length - 1)}
            </div>
            <span className="text-sm font-bold text-slate-700">{student.name}</span>
            
            {student.status === 'checked-out' && (
              <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-full">
                <CheckCircle2 size={10} /> 已签退
              </span>
            )}
            {student.status === 'leave' && (
              <span className="text-[10px] font-medium text-orange-500 flex items-center gap-1 bg-orange-50 px-2 py-0.5 rounded-full">
                <XCircle size={10} /> 请假
              </span>
            )}
            {student.status === 'checked-in' && (
              <span className="text-[10px] font-medium text-blue-600 flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded-full">
                <Clock size={10} /> 在班
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryView;
