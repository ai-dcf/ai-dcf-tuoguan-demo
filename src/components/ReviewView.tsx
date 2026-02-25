import { useState } from 'react';
import { Check, Camera, Star, AlertCircle, Save, ChevronLeft, GraduationCap, Clock } from 'lucide-react';
import MistakeEntry from './MistakeEntry';

interface Student {
  id: number;
  name: string;
  status: 'pending' | 'completed';
  ungradedCount: number;
  hasReviewed: boolean;
  homeworks: Homework[];
}

interface Homework {
  id: number;
  subject: string;
  title: string;
  status: 'submitted' | 'pending';
  rating: string | null;
  mistakeCount: number;
}

const ReviewView = () => {
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [showMistakeModal, setShowMistakeModal] = useState(false);
  const [activeHomeworkId, setActiveHomeworkId] = useState<number | null>(null);
  const [selectedOverallRating, setSelectedOverallRating] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [reviewText, setReviewText] = useState('');

  const [students, setStudents] = useState<Student[]>([
    { 
      id: 1, 
      name: '张三', 
      status: 'pending', 
      ungradedCount: 1, 
      hasReviewed: false,
      homeworks: [
        { id: 1, subject: '数学', title: '口算第3页', status: 'submitted', rating: 'A', mistakeCount: 0 },
        { id: 2, subject: '英语', title: '抄写 Unit 1', status: 'pending', rating: null, mistakeCount: 0 },
      ]
    },
    { 
      id: 2, 
      name: '李四', 
      status: 'completed', 
      ungradedCount: 0, 
      hasReviewed: true,
      homeworks: [
        { id: 1, subject: '数学', title: '口算第3页', status: 'submitted', rating: 'B', mistakeCount: 1 },
        { id: 2, subject: '英语', title: '抄写 Unit 1', status: 'submitted', rating: 'A', mistakeCount: 0 },
      ]
    },
    { 
      id: 3, 
      name: '王五', 
      status: 'pending', 
      ungradedCount: 2, 
      hasReviewed: false,
      homeworks: [
        { id: 1, subject: '数学', title: '口算第3页', status: 'pending', rating: null, mistakeCount: 0 },
        { id: 2, subject: '英语', title: '抄写 Unit 1', status: 'pending', rating: null, mistakeCount: 0 },
      ]
    },
    { 
      id: 4, 
      name: '赵六', 
      status: 'pending', 
      ungradedCount: 1, 
      hasReviewed: false,
      homeworks: [
        { id: 1, subject: '数学', title: '口算第3页', status: 'submitted', rating: null, mistakeCount: 0 },
        { id: 2, subject: '英语', title: '抄写 Unit 1', status: 'submitted', rating: null, mistakeCount: 0 },
      ]
    },
    { 
      id: 5, 
      name: '孙七', 
      status: 'completed', 
      ungradedCount: 0, 
      hasReviewed: true,
      homeworks: [
        { id: 1, subject: '数学', title: '口算第3页', status: 'submitted', rating: 'A', mistakeCount: 0 },
        { id: 2, subject: '英语', title: '抄写 Unit 1', status: 'submitted', rating: 'A', mistakeCount: 0 },
      ]
    },
  ]);

  const getCurrentStudent = () => students.find(s => s.id === selectedStudentId);
  const getCurrentHomeworks = () => getCurrentStudent()?.homeworks || [];

  const handleRating = (hwId: number, rating: string) => {
    if (!selectedStudentId) return;
    setStudents(prev => prev.map(student => {
      if (student.id !== selectedStudentId) return student;
      return {
        ...student,
        homeworks: student.homeworks.map(hw => hw.id === hwId ? { ...hw, rating } : hw)
      };
    }));
  };

  const handleStatusToggle = (hwId: number) => {
    if (!selectedStudentId) return;
    setStudents(prev => prev.map(student => {
      if (student.id !== selectedStudentId) return student;
      return {
        ...student,
        homeworks: student.homeworks.map(hw => hw.id === hwId ? { 
          ...hw, 
          status: hw.status === 'pending' ? 'submitted' : 'pending' 
        } : hw)
      };
    }));
  };

  const handleMistakeClick = (hwId: number) => {
    setActiveHomeworkId(hwId);
    setShowMistakeModal(true);
  };

  const handleSaveMistake = (count: number) => {
    if (activeHomeworkId && selectedStudentId) {
      setStudents(prev => prev.map(student => {
        if (student.id !== selectedStudentId) return student;
        return {
          ...student,
          homeworks: student.homeworks.map(hw => hw.id === activeHomeworkId ? { ...hw, mistakeCount: hw.mistakeCount + count } : hw)
        };
      }));
    }
    setShowMistakeModal(false);
    setActiveHomeworkId(null);
  };

  const handleStudentClick = (studentId: number) => {
    setSelectedStudentId(studentId);
    setViewMode('detail');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedStudentId(null);
  };

  const handleSaveAndNext = () => {
    if (!selectedStudentId) return;
    
    setStudents(prev => prev.map(student => {
      if (student.id !== selectedStudentId) return student;
      const ungraded = student.homeworks.filter(hw => hw.status === 'submitted' && !hw.rating).length;
      return {
        ...student,
        status: 'completed',
        hasReviewed: true,
        ungradedCount: ungraded
      };
    }));

    const currentIndex = students.findIndex(s => s.id === selectedStudentId);
    const nextStudent = students.find((_, index) => index > currentIndex && !students[index].hasReviewed);
    
    if (nextStudent) {
      setSelectedStudentId(nextStudent.id);
    } else {
      handleBackToList();
    }
    
    setSelectedOverallRating(null);
    setSelectedTags([]);
    setReviewText('');
  };

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  if (viewMode === 'list') {
    return (
      <div className="h-full bg-gradient-to-b from-slate-50 to-blue-50/30 overflow-y-auto pb-8">
        <div className="p-4">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-5 text-white shadow-lg shadow-blue-200 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <GraduationCap size={22} />
                学生点评
              </h2>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold">
                {students.filter(s => s.hasReviewed).length}/{students.length}
              </div>
            </div>
            <p className="text-blue-100 text-sm">点击学生卡片开始点评</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {students.map((student, index) => (
              <button
                key={student.id}
                onClick={() => handleStudentClick(student.id)}
                className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100/80 transition-all duration-300 hover:shadow-xl hover:shadow-blue-100/50 hover:-translate-y-1 active:scale-[0.97] cursor-pointer group flex flex-col items-center"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg transition-all duration-300 mb-3 ${
                  student.hasReviewed 
                    ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-emerald-200 group-hover:shadow-emerald-300 group-hover:scale-110' 
                    : 'bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 shadow-slate-200 group-hover:shadow-slate-300 group-hover:scale-110'
                }`}>
                  {student.name.charAt(0)}
                  {student.hasReviewed && (
                    <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-md">
                      <Check size={14} className="text-emerald-500" strokeWidth={4} />
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-slate-800 text-base mb-1">
                  {student.name}
                </h3>
                {student.hasReviewed && (
                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 text-[10px] px-2 py-0.5 rounded-full font-semibold mb-2">
                    已完成
                  </span>
                )}
                {student.ungradedCount > 0 ? (
                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 text-[10px] px-2.5 py-1 rounded-full font-bold border border-orange-100">
                    <Clock size={10} />
                    {student.ungradedCount} 份待批改
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 text-[10px] px-2.5 py-1 rounded-full font-bold border border-emerald-100">
                    <Check size={10} />
                    已批改完
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const currentStudent = getCurrentStudent();
  const currentHomeworks = getCurrentHomeworks();

  return (
    <div className="flex h-full bg-gradient-to-b from-slate-50 to-blue-50/30 relative flex-col">
      {/* Header with Back Button */}
      <div className="flex items-center gap-3 px-4 py-4 bg-white/90 backdrop-blur-xl border-b border-slate-100/60 sticky top-0 z-10 shadow-sm">
        <button 
          onClick={handleBackToList}
          className="p-2.5 -ml-2 text-slate-600 hover:bg-slate-100/80 rounded-2xl transition-all duration-200 active:scale-95 cursor-pointer group"
        >
          <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform duration-200" />
        </button>
        <div className="flex items-center gap-3 flex-1">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-base font-black shadow-sm ${
            currentStudent?.hasReviewed 
              ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white' 
              : 'bg-gradient-to-br from-blue-400 to-indigo-600 text-white'
          }`}>
            {currentStudent?.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-xl text-slate-800">
              {currentStudent?.name}
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              今日作业 ({currentHomeworks.filter(h => h.status === 'submitted').length}/{currentHomeworks.length})
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-32 px-4 pt-4">
        {/* Homework List */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">作业列表</h3>
          </div>
          {currentHomeworks.map((hw, index) => (
            <div 
              key={hw.id} 
              className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100/80 transition-all duration-300 hover:shadow-lg hover:shadow-blue-50/50"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    hw.subject === '数学' 
                      ? 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600' 
                      : 'bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600'
                  }`}>
                    {hw.subject === '数学' ? '数' : '英'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2.5 py-0.5 rounded-xl text-xs font-black ${
                        hw.subject === '数学' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'bg-purple-50 text-purple-700'
                      }`}>{hw.subject}</span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-base truncate">{hw.title}</h4>
                  </div>
                </div>
                <button 
                  onClick={() => handleMistakeClick(hw.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-bold border transition-all duration-200 active:scale-95 cursor-pointer ${
                    hw.mistakeCount > 0 
                      ? 'bg-gradient-to-r from-red-50 to-rose-50 text-red-600 border-red-100 shadow-sm shadow-red-100 hover:shadow-md hover:shadow-red-100' 
                      : 'bg-white text-slate-400 border-slate-200 hover:border-red-200 hover:text-red-500 hover:bg-red-50'
                  }`}
                >
                  <AlertCircle size={14} strokeWidth={2.5} />
                  {hw.mistakeCount > 0 ? `错题 ${hw.mistakeCount}` : '记错题'}
                </button>
              </div>

              {/* Status & Actions */}
              <div className="flex items-center gap-3">
                <button className="w-18 h-18 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:bg-gradient-to-br from-blue-50 to-indigo-50 hover:text-blue-500 active:scale-95 transition-all duration-200 border-2 border-dashed border-slate-200 hover:border-blue-200 cursor-pointer">
                  <Camera size={22} strokeWidth={2} />
                  <span className="text-[10px] mt-1 font-semibold">拍照</span>
                </button>
                
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleStatusToggle(hw.id)}
                      className={`flex-1 py-2.5 rounded-2xl text-sm font-bold transition-all duration-200 active:scale-95 cursor-pointer ${
                        hw.status === 'submitted' 
                            ? 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 shadow-sm shadow-emerald-100 border border-emerald-200' 
                            : 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {hw.status === 'submitted' ? '✓ 已提交' : '未提交'}
                    </button>
                    {hw.status === 'pending' && (
                      <button 
                        onClick={() => handleStatusToggle(hw.id)}
                        className="px-4 py-2.5 bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 rounded-2xl text-sm font-bold hover:from-orange-100 hover:to-amber-100 border border-orange-200 transition-all duration-200 cursor-pointer active:scale-95"
                      >
                        补交
                      </button>
                    )}
                  </div>
                  
                  {/* Rating */}
                  <div className="flex gap-2 bg-gradient-to-r from-slate-50 to-slate-100 p-1.5 rounded-2xl w-fit border border-slate-200">
                    {['A', 'B', 'C', 'D'].map(r => (
                      <button
                        key={r}
                        onClick={() => handleRating(hw.id, r)}
                        className={`w-11 h-11 rounded-xl text-base font-black transition-all duration-200 active:scale-90 cursor-pointer ${
                          hw.rating === r 
                            ? 'bg-white shadow-lg shadow-blue-100 text-blue-600 ring-2 ring-blue-200 scale-105' 
                            : 'text-slate-300 hover:text-slate-500 hover:bg-white/50'
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
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100/80 mb-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl text-amber-500 shadow-sm">
                <Star size={20} fill="currentColor" strokeWidth={0} /> 
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg">今日表现</h3>
              <p className="text-slate-400 text-xs">记录学生的课堂表现</p>
            </div>
          </div>
          <div className="mb-6">
            <label className="text-xs font-black text-slate-500 block mb-3 uppercase tracking-widest">整体评价</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: '优秀', color: 'from-emerald-500 to-teal-500', text: 'text-emerald-700', bg: 'from-emerald-50 to-teal-50', border: 'border-emerald-200', shadow: 'shadow-emerald-200' },
                { label: '良好', color: 'from-blue-500 to-indigo-500', text: 'text-blue-700', bg: 'from-blue-50 to-indigo-50', border: 'border-blue-200', shadow: 'shadow-blue-200' },
                { label: '一般', color: 'from-amber-500 to-orange-500', text: 'text-amber-700', bg: 'from-amber-50 to-orange-50', border: 'border-amber-200', shadow: 'shadow-amber-200' },
                { label: '需关注', color: 'from-rose-500 to-red-500', text: 'text-rose-700', bg: 'from-rose-50 to-red-50', border: 'border-rose-200', shadow: 'shadow-rose-200' }
              ].map(({ label, color, text, bg, border, shadow }) => (
                <button 
                  key={label} 
                  onClick={() => setSelectedOverallRating(label)}
                  className={`py-4 rounded-2xl border text-sm font-bold transition-all duration-200 cursor-pointer active:scale-95 hover:shadow-md ${
                    selectedOverallRating === label 
                      ? `bg-gradient-to-r ${color} text-white border-transparent shadow-lg ${shadow} scale-[1.02]` 
                      : `bg-gradient-to-r ${bg} ${text} border ${border} hover:bg-gradient-to-r ${color} hover:text-white hover:border-transparent`
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="text-xs font-black text-slate-500 block mb-3 uppercase tracking-widest">特征标签</label>
            <div className="flex flex-wrap gap-2.5">
              {['专注', '积极', '拖拉', '书写乱'].map(tag => (
                <span 
                  key={tag} 
                  onClick={() => handleTagClick(tag)}
                  className={`px-4 py-2.5 rounded-2xl text-sm font-bold border cursor-pointer transition-all duration-200 active:scale-95 ${
                    selectedTags.includes(tag)
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-transparent shadow-lg shadow-blue-200 scale-105'
                      : 'bg-gradient-to-r from-slate-50 to-slate-100 text-slate-600 border border-slate-200 hover:bg-gradient-to-r from-blue-50 to-indigo-50 hover:text-blue-600 hover:border-blue-200'
                  }`}
                >
                  {tag}
                </span>
              ))}
              <button className="px-4 py-2.5 bg-white border-2 border-dashed border-slate-300 rounded-2xl text-sm font-semibold text-slate-400 hover:text-blue-500 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer active:scale-95">
                + 添加
              </button>
            </div>
          </div>

          <div className="relative group">
            <label className="text-xs font-black text-slate-500 block mb-3 uppercase tracking-widest">反馈评语</label>
            <div className="relative">
              <textarea 
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-2xl p-5 text-sm border-2 border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 min-h-[120px] resize-none transition-all duration-200 placeholder-slate-400"
                placeholder="记录学生今天的表现，给出具体的反馈和建议..."
              ></textarea>
              <button className="absolute bottom-4 right-4 text-slate-400 hover:text-blue-500 p-2.5 hover:bg-blue-50 rounded-xl transition-all duration-200 cursor-pointer">
                <Camera size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-5 right-4 left-4 z-30">
         <button 
           onClick={handleSaveAndNext}
           className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white py-4.5 rounded-3xl shadow-xl shadow-blue-300/50 font-black text-lg flex items-center justify-center gap-3 active:scale-[0.97] transition-all duration-300 hover:shadow-2xl hover:shadow-blue-400/50 hover:-translate-y-1"
         >
           <Save size={22} strokeWidth={2.5} /> 保存并下一个
         </button>
      </div>

      {/* Mistake Entry Modal */}
      {showMistakeModal && (
        <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-xl animate-in slide-in-from-bottom-8 fade-in duration-400">
          <MistakeEntry 
            onBack={() => setShowMistakeModal(false)}
            onSave={() => handleSaveMistake(1)}
            initialData={{
              student: currentStudent?.name,
              subject: currentHomeworks.find(h => h.id === activeHomeworkId)?.subject === '数学' ? 'math' : 
                       currentHomeworks.find(h => h.id === activeHomeworkId)?.subject === '英语' ? 'english' : 'chinese'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ReviewView;
