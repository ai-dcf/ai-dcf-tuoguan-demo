import { Settings, UserMinus, ArrowRightLeft, AlertCircle } from 'lucide-react';

const ClassAffairsView = () => {
  const students = Array(18).fill(null).map((_, i) => ({
    id: i + 1,
    name: `学生${i + 1}`,
    grade: '一年级',
    rate: 90 + Math.floor(Math.random() * 10),
    mistakes: Math.floor(Math.random() * 10),
    status: 'active'
  }));

  return (
    <div className="p-4 pb-24 bg-slate-50 min-h-full">
      {/* Teacher Info Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
        
        <div className="flex justify-between items-center mb-4 relative z-10">
          <h3 className="font-bold text-slate-800 text-lg">班级档案</h3>
          <button className="text-blue-600 text-xs font-bold bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">
            管理班级
          </button>
        </div>
        
        <div className="flex gap-4 relative z-10">
          <div className="flex items-center gap-3 bg-gradient-to-br from-blue-50 to-white border border-blue-100 px-4 py-3 rounded-xl flex-1 shadow-sm">
            <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm shadow-inner ring-2 ring-white">
              张
            </div>
            <div>
              <div className="text-[10px] font-bold text-blue-500 uppercase tracking-wider mb-0.5">主教老师</div>
              <div className="font-bold text-slate-800 text-sm">张老师</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white border border-slate-100 px-4 py-3 rounded-xl flex-1 shadow-sm">
             <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold text-sm shadow-inner ring-2 ring-white">
              李
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">助教老师</div>
              <div className="font-bold text-slate-800 text-sm">李老师</div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Stats */}
      <div className="flex justify-between items-center mb-4 px-1">
        <div className="text-sm text-slate-500 font-medium">
          学生 <span className="font-bold text-slate-800 text-lg mx-1">18</span> 人 
          <span className="text-xs text-slate-400 ml-2 bg-slate-100 px-2 py-0.5 rounded-md">在班:18 · 结班:0</span>
        </div>
        <button className="flex items-center gap-1 text-white text-xs font-bold bg-blue-600 px-3 py-2 rounded-xl shadow-md shadow-blue-200 active:scale-95 transition-all hover:bg-blue-700">
          + 关联学生
        </button>
      </div>

      {/* Student List */}
      <div className="space-y-3">
        {students.map((student) => (
          <div key={student.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-slate-50 rounded-full flex items-center justify-center text-slate-500 font-bold text-sm border border-slate-100">
                  {student.name.charAt(student.name.length - 1)}
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-base flex items-center gap-2">
                    {student.name}
                    <span className="px-1.5 py-0.5 bg-slate-100 text-slate-500 text-[10px] rounded font-medium">{student.grade}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                    作业提交率 <span className="text-green-600 font-bold bg-green-50 px-1.5 rounded">{student.rate}%</span>
                  </div>
                </div>
              </div>
              <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
                <Settings size={18} />
              </button>
            </div>

            <div className="flex gap-2 border-t border-slate-50 pt-3">
              <button className="flex-1 flex items-center justify-center gap-1.5 text-slate-600 text-xs font-medium py-2 bg-slate-50 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-colors group">
                <AlertCircle size={14} className="text-orange-400 group-hover:text-orange-600" />
                错题 ({student.mistakes})
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 text-slate-600 text-xs font-medium py-2 bg-slate-50 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <ArrowRightLeft size={14} />
                转班
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 text-slate-600 text-xs font-medium py-2 bg-slate-50 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors">
                <UserMinus size={14} />
                结班
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassAffairsView;
