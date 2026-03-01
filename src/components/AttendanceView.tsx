import { useState } from 'react';
import { Check, LogOut, CalendarX, X } from 'lucide-react';

const AttendanceView = () => {
  const [students, setStudents] = useState([
    { id: 1, name: '张三', status: 'checked-in' },
    { id: 2, name: '李四', status: 'checked-in' },
    { id: 3, name: '王五', status: 'leave' },
    { id: 4, name: '赵六', status: 'pending' },
    { id: 5, name: '孙七', status: 'checked-out' },
    { id: 6, name: '周八', status: 'pending' },
    { id: 7, name: '吴九', status: 'checked-in' },
    { id: 8, name: '郑十', status: 'pending' },
  ]);

  const stats = {
    total: students.length,
    checkedIn: students.filter(s => s.status === 'checked-in').length,
    leave: students.filter(s => s.status === 'leave').length,
    checkedOut: students.filter(s => s.status === 'checked-out').length,
    pending: students.filter(s => s.status === 'pending').length,
  };

  const handleStatusChange = (id: number, status: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  return (
    <div className="pb-32 bg-background min-h-full font-sans">
      {/* Stats Bar */}
      <div className="bg-background/90 backdrop-blur-md px-5 py-4 border-b-2 border-border-main/10 sticky top-0 z-30">
        <div className="grid grid-cols-4 gap-3">
          <StatBox label="实到" value={stats.checkedIn} color="bg-secondary" />
          <StatBox label="未点" value={stats.pending} color="bg-primary" />
          <StatBox label="请假" value={stats.leave} color="bg-accent" />
          <StatBox label="已退" value={stats.checkedOut} color="bg-gray-300" />
        </div>
      </div>

      {/* Student Grid */}
      <div className="p-5 grid grid-cols-2 gap-4">
        {students.map(student => (
          <div 
            key={student.id} 
            className={`bg-white p-5 rounded-[2rem] border-2 border-border-main shadow-pop transition-all duration-200 relative overflow-hidden group ${
              student.status === 'pending' ? 'ring-4 ring-primary/20' : 
              student.status === 'checked-in' ? 'ring-4 ring-secondary/20' :
              student.status === 'leave' ? 'opacity-80' :
              'opacity-60'
            }`}
          >
            {/* Status Indicator */}
            <div className="absolute top-3 right-3">
              {student.status === 'checked-in' && <div className="w-3 h-3 rounded-full bg-secondary border-2 border-border-main animate-pulse"></div>}
              {student.status === 'pending' && <div className="w-3 h-3 rounded-full bg-primary border-2 border-border-main animate-pulse"></div>}
            </div>

            <div className="flex flex-col items-center gap-4 relative z-10">
              <div className={`w-14 h-14 rounded-2xl border-2 border-border-main flex items-center justify-center text-text-main shadow-[3px_3px_0px_0px_#2D3436] transition-transform group-hover:rotate-6 ${
                student.status === 'checked-in' ? 'bg-secondary' :
                student.status === 'pending' ? 'bg-surface-sun' :
                student.status === 'leave' ? 'bg-accent' :
                'bg-gray-300'
              }`}>
                {student.status === 'checked-in' ? <Check size={28} strokeWidth={3} /> : 
                 student.status === 'leave' ? <CalendarX size={24} strokeWidth={2.5} /> :
                 student.status === 'checked-out' ? <LogOut size={24} strokeWidth={2.5} /> :
                 <span className="text-xl font-black">{student.name.charAt(0)}</span>}
              </div>
              
              <div className="font-black text-text-main text-lg">{student.name}</div>
              
              {/* Actions */}
              <div className="w-full space-y-2 mt-2">
                {student.status === 'pending' ? (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleStatusChange(student.id, 'checked-in')}
                      className="flex-1 bg-secondary text-text-main text-xs font-black py-2.5 rounded-xl border-2 border-border-main shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
                    >
                      签到
                    </button>
                    <button 
                      onClick={() => handleStatusChange(student.id, 'leave')}
                      className="flex-1 bg-accent text-text-main text-xs font-black py-2.5 rounded-xl border-2 border-border-main shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
                    >
                      请假
                    </button>
                  </div>
                ) : student.status === 'checked-in' ? (
                  <button 
                    onClick={() => handleStatusChange(student.id, 'checked-out')}
                    className="w-full bg-gray-300 text-white text-xs font-black py-2.5 rounded-xl border-2 border-border-main shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
                  >
                    确认离班
                  </button>
                ) : (
                  <button 
                    onClick={() => handleStatusChange(student.id, 'pending')}
                    className="w-full bg-white text-text-main text-xs font-black py-2.5 rounded-xl border-2 border-border-main shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center gap-1"
                  >
                    <X size={14} strokeWidth={3} /> 重置状态
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatBox = ({ label, value, color }: { label: string, value: number, color: string }) => (
  <div className={`rounded-2xl p-2.5 text-center border-2 border-border-main shadow-[3px_3px_0px_0px_#2D3436] ${color}`}>
    <div className="text-[10px] text-text-main font-black uppercase tracking-wider mb-0.5">{label}</div>
    <div className="text-xl font-black text-text-main">{value}</div>
  </div>
);

export default AttendanceView;
