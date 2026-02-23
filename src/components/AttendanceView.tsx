import { useState } from 'react';
import { User, Check, LogOut, CalendarX } from 'lucide-react';

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
    <div className="pb-20">
      {/* Stats Bar */}
      <div className="bg-white p-3 border-b border-slate-200 sticky top-0 z-10 shadow-sm flex justify-between text-xs text-slate-600">
        <div>全部: {stats.total}</div>
        <div>未点: <span className="text-red-500 font-bold">{stats.pending}</span></div>
        <div>实到: <span className="text-green-600 font-bold">{stats.checkedIn}</span></div>
        <div>请假: {stats.leave}</div>
        <div>已退: {stats.checkedOut}</div>
      </div>

      {/* Student Grid */}
      <div className="p-4 grid grid-cols-3 gap-3">
        {students.map(student => (
          <div key={student.id} className="bg-white p-3 rounded-lg shadow-sm border border-slate-100 flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
              <User size={20} />
            </div>
            <div className="font-medium text-slate-800">{student.name}</div>
            
            {student.status === 'pending' && (
              <div className="flex gap-1 w-full mt-1">
                <button 
                  onClick={() => handleStatusChange(student.id, 'checked-in')}
                  className="flex-1 bg-green-50 text-green-600 text-xs py-1 rounded hover:bg-green-100"
                >
                  签到
                </button>
                <button 
                  onClick={() => handleStatusChange(student.id, 'leave')}
                  className="flex-1 bg-orange-50 text-orange-600 text-xs py-1 rounded hover:bg-orange-100"
                >
                  请假
                </button>
              </div>
            )}

            {student.status === 'checked-in' && (
              <div className="flex flex-col gap-1 w-full mt-1">
                <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                  <Check size={12} /> 已签到
                </div>
                <button 
                  onClick={() => handleStatusChange(student.id, 'checked-out')}
                  className="w-full bg-slate-100 text-slate-600 text-xs py-1 rounded hover:bg-slate-200 flex items-center justify-center gap-1"
                >
                  <LogOut size={12} /> 签退
                </button>
              </div>
            )}

            {student.status === 'leave' && (
              <div className="text-xs text-orange-500 mt-2 flex items-center gap-1">
                <CalendarX size={12} /> 请假
              </div>
            )}

            {student.status === 'checked-out' && (
              <div className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                <LogOut size={12} /> 已签退
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-4 left-4 right-4 flex gap-3">
        <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl shadow-lg font-medium active:bg-blue-700 transition-colors">
          一键签到
        </button>
        <button className="flex-1 bg-white text-slate-600 border border-slate-200 py-3 rounded-xl shadow-sm font-medium active:bg-slate-50 transition-colors">
          一键签退
        </button>
      </div>
    </div>
  );
};

export default AttendanceView;
