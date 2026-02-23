import { useState } from 'react';
import { Check, LogOut, CalendarX, Plus } from 'lucide-react';

const AttendanceView = () => {
  const [students, setStudents] = useState([
    { id: 1, name: '张三', status: 'checked-in' },
    { id: 2, name: '李四', status: 'checked-in' },
    { id: 3, name: '王五', status: 'leave' },
    { id: 4, name: '赵六', status: 'pending' },
    { id: 5, name: '孙七', status: 'checked-out' },
    { id: 6, name: '周八', status: 'pending' },
    // ... more students
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
    <div className="pb-32 bg-[#F5F7FA] min-h-full">
      {/* Stats Bar */}
      <div className="bg-white/80 backdrop-blur-md px-4 py-4 border-b border-slate-100/50 sticky top-0 z-30 shadow-sm">
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-blue-50/50 rounded-xl p-2.5 text-center border border-blue-100/50">
            <div className="text-[10px] text-blue-400 font-medium mb-0.5">实到</div>
            <div className="text-lg font-bold text-blue-600">{stats.checkedIn}</div>
          </div>
          <div className="bg-red-50/50 rounded-xl p-2.5 text-center border border-red-100/50">
            <div className="text-[10px] text-red-400 font-medium mb-0.5">未点</div>
            <div className="text-lg font-bold text-red-500">{stats.pending}</div>
          </div>
          <div className="bg-orange-50/50 rounded-xl p-2.5 text-center border border-orange-100/50">
            <div className="text-[10px] text-orange-400 font-medium mb-0.5">请假</div>
            <div className="text-lg font-bold text-orange-500">{stats.leave}</div>
          </div>
          <div className="bg-slate-50/50 rounded-xl p-2.5 text-center border border-slate-100/50">
            <div className="text-[10px] text-slate-400 font-medium mb-0.5">已退</div>
            <div className="text-lg font-bold text-slate-600">{stats.checkedOut}</div>
          </div>
        </div>
      </div>

      {/* Student Grid */}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {students.map(student => (
          <div 
            key={student.id} 
            className={`bg-white p-4 rounded-2xl shadow-sm border transition-all duration-300 relative overflow-hidden group ${
              student.status === 'pending' ? 'border-red-100 ring-2 ring-red-50' : 
              student.status === 'checked-in' ? 'border-green-100 ring-2 ring-green-50' :
              student.status === 'leave' ? 'border-orange-100 opacity-90' :
              'border-slate-100 opacity-75'
            }`}
          >
            {/* Status Badge */}
            <div className="absolute top-2 right-2">
              {student.status === 'checked-in' && <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>}
              {student.status === 'pending' && <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>}
            </div>

            <div className="flex flex-col items-center gap-3 relative z-10">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shadow-inner transition-colors ${
                student.status === 'checked-in' ? 'bg-green-100 text-green-600' :
                student.status === 'pending' ? 'bg-slate-100 text-slate-400' :
                student.status === 'leave' ? 'bg-orange-100 text-orange-600' :
                'bg-slate-100 text-slate-300'
              }`}>
                {student.status === 'checked-in' ? <Check size={24} /> : 
                 student.status === 'leave' ? <CalendarX size={20} /> :
                 student.status === 'checked-out' ? <LogOut size={20} /> :
                 student.name.charAt(0)}
              </div>
              
              <div className="font-bold text-slate-800">{student.name}</div>
              
              {/* Actions */}
              <div className="w-full space-y-2">
                {student.status === 'pending' && (
                  <div className="flex gap-2 w-full">
                    <button 
                      onClick={() => handleStatusChange(student.id, 'checked-in')}
                      className="flex-1 bg-green-500 text-white text-xs font-bold py-2 rounded-lg shadow-sm hover:bg-green-600 active:scale-95 transition-all"
                    >
                      签到
                    </button>
                    <button 
                      onClick={() => handleStatusChange(student.id, 'leave')}
                      className="flex-1 bg-orange-50 text-orange-600 text-xs font-bold py-2 rounded-lg border border-orange-200 hover:bg-orange-50 active:scale-95 transition-all"
                    >
                      请假
                    </button>
                  </div>
                )}

                {student.status === 'checked-in' && (
                  <button 
                    onClick={() => handleStatusChange(student.id, 'checked-out')}
                    className="w-full bg-white text-slate-600 text-xs font-bold py-2 rounded-lg border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center gap-1"
                  >
                    <LogOut size={12} /> 签退
                  </button>
                )}

                {(student.status === 'leave' || student.status === 'checked-out') && (
                  <button 
                    onClick={() => handleStatusChange(student.id, 'pending')}
                    className="w-full text-xs text-slate-400 py-2 hover:text-slate-600 transition-colors"
                  >
                    重置状态
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* Add Student Button (Mock) */}
        <button className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50 transition-all p-4 min-h-[180px] group">
          <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus size={20} />
          </div>
          <span className="text-xs font-bold">添加学生</span>
        </button>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 left-4 right-4 flex gap-3 z-40">
        <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-2xl shadow-lg shadow-blue-200 font-bold text-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2">
          <Check size={18} /> 一键全部签到
        </button>
        <button className="px-4 bg-white text-slate-600 border border-slate-200 rounded-2xl shadow-sm font-bold active:bg-slate-50 transition-colors">
          <LogOut size={18} />
        </button>
      </div>
    </div>
  );
};

export default AttendanceView;
