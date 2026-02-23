import { User, Settings, Phone, UserMinus, ArrowRightLeft, AlertCircle } from 'lucide-react';

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
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-slate-800">班级档案</h3>
          <button className="text-blue-600 text-xs font-medium">管理</button>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg flex-1">
            <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold text-xs">
              张
            </div>
            <div>
              <div className="text-xs text-slate-500">主教老师</div>
              <div className="font-medium text-slate-800 text-sm">张老师</div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg flex-1">
             <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold text-xs">
              李
            </div>
            <div>
              <div className="text-xs text-slate-500">助教老师</div>
              <div className="font-medium text-slate-800 text-sm">李老师</div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Stats */}
      <div className="flex justify-between items-center mb-3 px-1">
        <div className="text-sm text-slate-500">
          学生 <span className="font-bold text-slate-800">18</span> 人 
          <span className="text-xs text-slate-400 ml-2">(在班:18 结班:0)</span>
        </div>
        <button className="flex items-center gap-1 text-blue-600 text-xs font-medium bg-white px-2 py-1 rounded border border-blue-100 shadow-sm active:scale-95">
          + 关联学生
        </button>
      </div>

      {/* Student List */}
      <div className="space-y-3">
        {students.map((student) => (
          <div key={student.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold">
                  {student.name.charAt(student.name.length - 1)}
                </div>
                <div>
                  <div className="font-bold text-slate-800">{student.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {student.grade} | 作业率 <span className="text-green-600 font-medium">{student.rate}%</span>
                  </div>
                </div>
              </div>
              <button className="p-1 text-slate-300 hover:text-slate-600">
                <Settings size={18} />
              </button>
            </div>

            <div className="flex gap-2 border-t border-slate-50 pt-3">
              <button className="flex-1 flex items-center justify-center gap-1 text-slate-600 text-xs py-1.5 bg-slate-50 rounded hover:bg-slate-100">
                <AlertCircle size={14} className="text-orange-500" />
                错题 ({student.mistakes})
              </button>
              <button className="flex-1 flex items-center justify-center gap-1 text-slate-600 text-xs py-1.5 bg-slate-50 rounded hover:bg-slate-100">
                <ArrowRightLeft size={14} />
                转班
              </button>
              <button className="flex-1 flex items-center justify-center gap-1 text-slate-600 text-xs py-1.5 bg-slate-50 rounded hover:bg-slate-100">
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
