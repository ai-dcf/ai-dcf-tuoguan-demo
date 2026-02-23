import { useState } from 'react';
import { Check, Camera, Star, AlertCircle, Save, ChevronRight } from 'lucide-react';
import MistakeEntry from './MistakeEntry';

const ReviewView = () => {
  const [selectedStudentId, setSelectedStudentId] = useState(1);
  const [showMistakeModal, setShowMistakeModal] = useState(false);
  const [activeHomeworkId, setActiveHomeworkId] = useState<number | null>(null);

  const [students] = useState([
    { id: 1, name: '张三', status: 'pending' },
    { id: 2, name: '李四', status: 'completed' },
    { id: 3, name: '王五', status: 'pending' },
    { id: 4, name: '赵六', status: 'pending' },
    { id: 5, name: '孙七', status: 'completed' },
  ]);

  const [homeworks, setHomeworks] = useState([
    { id: 1, subject: '数学', title: '口算第3页', status: 'submitted', rating: 'A', mistakeCount: 0 },
    { id: 2, subject: '英语', title: '抄写 Unit 1', status: 'pending', rating: null, mistakeCount: 0 },
  ]);

  const handleRating = (hwId: number, rating: string) => {
    setHomeworks(prev => prev.map(hw => hw.id === hwId ? { ...hw, rating } : hw));
  };

  const handleStatusToggle = (hwId: number) => {
    setHomeworks(prev => prev.map(hw => hw.id === hwId ? { 
      ...hw, 
      status: hw.status === 'pending' ? 'submitted' : 'pending' 
    } : hw));
  };

  const handleMistakeClick = (hwId: number) => {
    setActiveHomeworkId(hwId);
    setShowMistakeModal(true);
  };

  const handleSaveMistake = (count: number) => {
    if (activeHomeworkId) {
      setHomeworks(prev => prev.map(hw => hw.id === activeHomeworkId ? { ...hw, mistakeCount: hw.mistakeCount + count } : hw));
    }
    setShowMistakeModal(false);
    setActiveHomeworkId(null);
  };

  return (
    <div className="flex h-full bg-slate-50 relative">
      {/* Left Sidebar: Student List */}
      <div className="w-22 bg-white border-r border-slate-200/60 overflow-y-auto pb-20 flex-shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
        <div className="p-3 text-xs font-bold text-slate-400 text-center uppercase tracking-wider">学生列表</div>
        {students.map(student => (
          <button
            key={student.id}
            onClick={() => setSelectedStudentId(student.id)}
            className={`w-full p-3 flex flex-col items-center gap-1.5 transition-all relative ${
              selectedStudentId === student.id ? 'bg-blue-50/50' : 'hover:bg-slate-50'
            }`}
          >
            {selectedStudentId === student.id && (
                <div className="absolute left-0 top-3 bottom-3 w-1 bg-blue-600 rounded-r-full" />
            )}
            <div className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold shadow-sm transition-transform ${
              selectedStudentId === student.id 
                ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white scale-105 shadow-blue-200' 
                : 'bg-slate-100 text-slate-500'
            }`}>
              {student.name.charAt(0)}
            </div>
            <span className={`text-xs ${selectedStudentId === student.id ? 'font-bold text-slate-800' : 'text-slate-500'}`}>
              {student.name}
            </span>
            {student.status === 'completed' && (
                <div className="absolute top-2 right-2 bg-white rounded-full p-0.5 shadow-sm">
                    <Check size={10} className="text-green-500" strokeWidth={3} />
                </div>
            )}
          </button>
        ))}
      </div>

      {/* Right Content: Review Area */}
      <div className="flex-1 overflow-y-auto pb-24 p-4">
        <div className="flex justify-between items-center mb-5 bg-white/60 backdrop-blur-sm p-3 rounded-2xl border border-white shadow-sm">
          <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
            {students.find(s => s.id === selectedStudentId)?.name}
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
            <span className="text-slate-500 font-medium text-sm">今日作业 (2/2)</span>
          </h2>
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
             <ChevronRight size={18} />
          </div>
        </div>

        {/* Homework List */}
        <div className="space-y-4 mb-6">
          {homeworks.map((hw) => (
            <div key={hw.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 transition-all hover:shadow-md">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-slate-800 flex items-center gap-2 text-base">
                  <span className={`px-2 py-0.5 rounded-lg text-xs font-bold ${
                    hw.subject === '数学' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                  }`}>{hw.subject}</span>
                  {hw.title}
                </h3>
                <button 
                  onClick={() => handleMistakeClick(hw.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border transition-all active:scale-95 ${
                    hw.mistakeCount > 0 
                      ? 'bg-red-50 text-red-600 border-red-100 shadow-sm shadow-red-100' 
                      : 'bg-white text-slate-400 border-slate-200 hover:border-red-200 hover:text-red-500'
                  }`}
                >
                  <AlertCircle size={14} strokeWidth={2.5} />
                  {hw.mistakeCount > 0 ? `错题 ${hw.mistakeCount}` : '记错题'}
                </button>
              </div>

              {/* Status & Actions */}
              <div className="flex items-center gap-3 mb-1">
                <button className="w-16 h-16 bg-slate-50 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-blue-500 active:scale-95 transition-all border border-slate-100 border-dashed">
                  <Camera size={20} />
                  <span className="text-[10px] mt-1 font-medium">拍照</span>
                </button>
                
                <div className="flex-1 flex flex-col gap-2.5">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleStatusToggle(hw.id)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 ${
                        hw.status === 'submitted' 
                            ? 'bg-green-100 text-green-700 shadow-sm shadow-green-100' 
                            : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {hw.status === 'submitted' ? '已提交' : '未提交'}
                    </button>
                    {hw.status === 'pending' && (
                      <button 
                        onClick={() => handleStatusToggle(hw.id)}
                        className="px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg text-xs font-bold hover:bg-orange-100 border border-orange-100"
                      >
                        补交
                      </button>
                    )}
                  </div>
                  
                  {/* Rating */}
                  <div className="flex gap-1.5 bg-slate-50 p-1 rounded-xl w-fit border border-slate-100">
                    {['A', 'B', 'C', 'D'].map(r => (
                      <button
                        key={r}
                        onClick={() => handleRating(hw.id, r)}
                        className={`w-8 h-8 rounded-lg text-sm font-bold transition-all active:scale-90 ${
                          hw.rating === r 
                            ? 'bg-white shadow-sm text-blue-600 ring-1 ring-blue-100 scale-105' 
                            : 'text-slate-300 hover:text-slate-500'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Section */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-20">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-base">
            <div className="p-1.5 bg-orange-100 rounded-lg text-orange-500">
                <Star size={16} fill="currentColor" /> 
            </div>
            今日表现
          </h3>
          
          <div className="mb-5">
            <label className="text-xs font-bold text-slate-500 block mb-2 uppercase tracking-wide">整体评价</label>
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {['优秀', '良好', '一般', '需关注'].map(label => (
                <button key={label} className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 active:bg-blue-100 transition-all whitespace-nowrap">
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="text-xs font-bold text-slate-500 block mb-2 uppercase tracking-wide">特征标签</label>
            <div className="flex flex-wrap gap-2">
              {['专注', '积极', '拖拉', '书写乱'].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-slate-50 rounded-lg text-xs font-medium text-slate-600 border border-slate-100 cursor-pointer hover:bg-slate-100 hover:border-slate-200 transition-colors">
                  {tag}
                </span>
              ))}
              <button className="px-3 py-1.5 bg-white border border-dashed border-slate-300 rounded-lg text-xs text-slate-400 hover:text-blue-500 hover:border-blue-300 transition-colors">
                + 添加
              </button>
            </div>
          </div>

          <div className="relative group">
            <textarea 
              className="w-full bg-slate-50 rounded-xl p-4 text-sm border-0 focus:ring-2 focus:ring-blue-100 min-h-[100px] resize-none transition-all"
              placeholder="输入今日反馈评语..."
            ></textarea>
            <button className="absolute bottom-3 right-3 text-slate-400 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-full transition-colors">
              <Camera size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-4 right-4 z-20 left-26">
         <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3.5 rounded-2xl shadow-lg shadow-blue-200 font-bold text-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all hover:shadow-xl">
           <Save size={20} /> 保存并下一个
         </button>
      </div>

      {/* Mistake Entry Modal */}
      {showMistakeModal && (
        <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm animate-in slide-in-from-bottom-5 fade-in duration-300">
          <MistakeEntry 
            onBack={() => setShowMistakeModal(false)}
            onSave={() => handleSaveMistake(1)}
            initialData={{
              student: students.find(s => s.id === selectedStudentId)?.name,
              subject: homeworks.find(h => h.id === activeHomeworkId)?.subject === '数学' ? 'math' : 
                       homeworks.find(h => h.id === activeHomeworkId)?.subject === '英语' ? 'english' : 'chinese'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ReviewView;
