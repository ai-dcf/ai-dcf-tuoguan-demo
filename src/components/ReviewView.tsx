import { useState } from 'react';
import { Check, Camera, Star, AlertCircle, Save, X, Image as ImageIcon, Search } from 'lucide-react';
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
      <div className="w-20 bg-white border-r border-slate-200 overflow-y-auto pb-20 flex-shrink-0">
        {students.map(student => (
          <button
            key={student.id}
            onClick={() => setSelectedStudentId(student.id)}
            className={`w-full p-3 flex flex-col items-center gap-1 border-b border-slate-50 transition-colors ${
              selectedStudentId === student.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : 'hover:bg-slate-50'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
              selectedStudentId === student.id ? 'bg-blue-200 text-blue-700' : 'bg-slate-100 text-slate-500'
            }`}>
              {student.name.charAt(0)}
            </div>
            <span className={`text-xs ${selectedStudentId === student.id ? 'font-bold text-slate-800' : 'text-slate-500'}`}>
              {student.name}
            </span>
            {student.status === 'completed' && <Check size={12} className="text-green-500" />}
          </button>
        ))}
      </div>

      {/* Right Content: Review Area */}
      <div className="flex-1 overflow-y-auto pb-24 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg text-slate-800">
            {students.find(s => s.id === selectedStudentId)?.name}
            <span className="text-slate-400 font-normal text-sm ml-2">今日作业 (2/2)</span>
          </h2>
        </div>

        {/* Homework List */}
        <div className="space-y-4 mb-6">
          {homeworks.map((hw) => (
            <div key={hw.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <span className={`px-1.5 py-0.5 rounded text-xs ${
                    hw.subject === '数学' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                  }`}>{hw.subject}</span>
                  {hw.title}
                </h3>
                <button 
                  onClick={() => handleMistakeClick(hw.id)}
                  className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border ${
                    hw.mistakeCount > 0 
                      ? 'bg-red-50 text-red-600 border-red-200' 
                      : 'bg-white text-slate-500 border-slate-200 hover:border-red-300 hover:text-red-500'
                  }`}
                >
                  <AlertCircle size={14} />
                  {hw.mistakeCount > 0 ? `错题 ${hw.mistakeCount}` : '错题'}
                </button>
              </div>

              {/* Status & Actions */}
              <div className="flex items-center gap-3 mb-3">
                <button className="w-16 h-16 bg-slate-100 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:bg-slate-200 active:scale-95 transition-transform">
                  <Camera size={20} />
                  <span className="text-xs mt-1">图片</span>
                </button>
                
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleStatusToggle(hw.id)}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                        hw.status === 'submitted' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {hw.status === 'submitted' ? '已交' : '未交'}
                    </button>
                    {hw.status === 'pending' && (
                      <button 
                        onClick={() => handleStatusToggle(hw.id)}
                        className="px-3 py-1 bg-orange-50 text-orange-600 rounded text-xs font-medium hover:bg-orange-100"
                      >
                        补交
                      </button>
                    )}
                  </div>
                  
                  {/* Rating */}
                  <div className="flex gap-1 bg-slate-50 p-1 rounded-lg w-fit">
                    {['A', 'B', 'C', 'D'].map(r => (
                      <button
                        key={r}
                        onClick={() => handleRating(hw.id, r)}
                        className={`w-8 h-8 rounded-md text-sm font-bold transition-all ${
                          hw.rating === r 
                            ? 'bg-white shadow text-blue-600 ring-1 ring-blue-100' 
                            : 'text-slate-400 hover:bg-white/50'
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
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-20">
          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Star size={18} className="text-orange-400" /> 表现状态
          </h3>
          
          <div className="mb-4">
            <label className="text-xs text-slate-500 block mb-2">整体表现</label>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {['优秀', '良好', '一般', '需关注'].map(label => (
                <button key={label} className="px-3 py-1.5 rounded-full border border-slate-200 text-sm text-slate-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors whitespace-nowrap">
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="text-xs text-slate-500 block mb-2">标签</label>
            <div className="flex flex-wrap gap-2">
              {['专注', '积极', '拖拉', '书写乱'].map(tag => (
                <span key={tag} className="px-2 py-1 bg-slate-50 rounded text-xs text-slate-600 border border-slate-100">
                  {tag}
                </span>
              ))}
              <button className="px-2 py-1 bg-white border border-dashed border-slate-300 rounded text-xs text-slate-400">
                +
              </button>
            </div>
          </div>

          <div className="relative">
            <textarea 
              className="w-full bg-slate-50 rounded-lg p-3 text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-100 min-h-[80px]"
              placeholder="输入今日反馈..."
            ></textarea>
            <button className="absolute bottom-2 right-2 text-slate-400 hover:text-blue-500">
              <Camera size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-4 right-4 z-20 left-24">
         <button className="w-full bg-blue-600 text-white py-3 rounded-xl shadow-lg font-bold text-lg flex items-center justify-center gap-2 active:bg-blue-700 transition-colors">
           <Save size={20} /> 保存 (下一个)
         </button>
      </div>

      {/* Mistake Entry Modal */}
      {showMistakeModal && (
        <div className="absolute inset-0 z-50 bg-white animate-in slide-in-from-bottom-10 fade-in duration-200">
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
