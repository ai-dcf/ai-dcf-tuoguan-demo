import { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle, Clock, ChevronRight as ArrowRight } from 'lucide-react';

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
    <div className="flex flex-col h-full bg-background pb-20 relative font-sans">
      {/* Date Filter Bar */}
      <div className="bg-background/90 backdrop-blur-md p-4 border-b-2 border-border-main/10 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="font-black text-xl text-text-main">2026年2月</h2>
            <ChevronRight size={20} className="text-text-light" strokeWidth={3} />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 bg-secondary text-text-main rounded-full font-black shadow-sm border-2 border-border-main text-xs transition-all">本月</button>
            <button className="px-4 py-1.5 bg-white text-text-light rounded-full text-xs font-bold border-2 border-border-main/20 hover:border-border-main transition-colors">上月</button>
          </div>
        </div>
        
        {/* Weekly Calendar Strip */}
        <div className="flex justify-between text-center bg-white rounded-2xl p-3 shadow-pop border-2 border-border-main">
          {['日', '一', '二', '三', '四', '五', '六'].map((day, i) => (
            <div key={i} className={`flex flex-col items-center gap-2 p-1 rounded-xl transition-all ${
              i === 1 ? 'bg-primary/10' : ''
            }`}>
              <span className={`text-xs font-black ${i === 1 ? 'text-primary' : 'text-text-light'}`}>{day}</span>
              <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-black transition-all border-2 ${
                i === 1 
                  ? 'bg-primary text-white border-border-main shadow-sm scale-110' 
                  : 'text-text-main border-transparent'
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
            className="w-full bg-white rounded-[2rem] p-5 shadow-pop border-2 border-border-main flex items-center justify-between active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-5">
              <div className="flex flex-col items-center w-14 border-r-2 border-border-main/10 pr-5">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black mb-1 ${
                    item.weekday === '今天' ? 'bg-primary text-white border-2 border-border-main' : 'text-text-main'
                }`}>
                    {item.date.split('-')[2]}
                </div>
                <span className="text-xs text-text-light font-bold">{item.weekday}</span>
              </div>
              
              <div className="flex flex-col items-start gap-2">
                {item.status === 'rest' ? (
                  <span className="text-text-light font-black bg-background px-4 py-1.5 rounded-xl border-2 border-border-main/20 text-sm">休息日</span>
                ) : (
                  <>
                    <div className="flex gap-4 text-sm font-bold">
                      <span className="text-text-light">实到 <b className="text-text-main text-base">{item.actual}</b></span>
                      <span className="text-text-light">请假 <b className="text-accent text-base">{item.leave}</b></span>
                    </div>
                    <div className="flex gap-2">
                      {item.status === 'ongoing' && (
                        <span className="px-2 py-0.5 bg-secondary text-text-main text-[10px] font-black rounded border-2 border-border-main">进行中</span>
                      )}
                      {item.status === 'completed' && (
                        <span className="px-2 py-0.5 bg-surface-sun text-text-main text-[10px] font-black rounded border-2 border-border-main">已完成</span>
                      )}
                      {item.pending > 0 && (
                         <span className="px-2 py-0.5 bg-accent text-text-main text-[10px] font-black rounded border-2 border-border-main">待签 {item.pending}</span>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="w-9 h-9 rounded-full bg-background flex items-center justify-center text-text-main border-2 border-border-main group-hover:bg-secondary transition-colors">
              <ArrowRight size={18} strokeWidth={3} />
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
    <div className="flex flex-col h-full bg-background absolute inset-0 z-30 font-sans">
      <div className="bg-background/90 backdrop-blur-md px-4 py-3 border-b-2 border-border-main/10 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-border-main text-text-main shadow-pop active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all">
          <ChevronLeft size={24} strokeWidth={3} />
        </button>
        <div>
          <h2 className="font-black text-text-main text-lg">{date} 考勤详情</h2>
          <p className="text-xs text-text-light font-bold">实到 16 · 请假 1 · 未到 1</p>
        </div>
      </div>

      <div className="p-4 grid grid-cols-3 gap-3 overflow-y-auto pb-20">
        {students.map((student) => (
          <div key={student.id} className="bg-white p-3 rounded-2xl shadow-pop border-2 border-border-main flex flex-col items-center gap-2 transition-all active:scale-95">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-text-main font-black text-sm shadow-sm border-2 border-border-main ${
              student.status === 'leave' ? 'bg-accent' : 
              student.status === 'checked-out' ? 'bg-gray-300' : 'bg-secondary'
            }`}>
              {student.name.charAt(student.name.length - 1)}
            </div>
            <span className="text-sm font-black text-text-main">{student.name}</span>
            
            {student.status === 'checked-out' && (
              <span className="text-[10px] font-bold text-text-light flex items-center gap-1 bg-background px-2 py-0.5 rounded-full border border-border-main/20">
                <CheckCircle2 size={10} strokeWidth={2.5} /> 已签退
              </span>
            )}
            {student.status === 'leave' && (
              <span className="text-[10px] font-bold text-text-main flex items-center gap-1 bg-accent/30 px-2 py-0.5 rounded-full border border-border-main/20">
                <XCircle size={10} strokeWidth={2.5} /> 请假
              </span>
            )}
            {student.status === 'checked-in' && (
              <span className="text-[10px] font-bold text-text-main flex items-center gap-1 bg-secondary/30 px-2 py-0.5 rounded-full border border-border-main/20">
                <Clock size={10} strokeWidth={2.5} /> 在班
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryView;
