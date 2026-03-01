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
      <div className="h-full bg-background overflow-y-auto pb-8 font-sans">
        <div className="p-4">
          <div className="bg-secondary rounded-[2rem] p-5 text-text-main shadow-pop border-2 border-border-main mb-4 relative overflow-hidden">
             {/* Decorative pattern */}
             <div className="absolute -right-5 -top-5 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
             
            <div className="flex items-center justify-between mb-3 relative z-10">
              <h2 className="text-lg font-black flex items-center gap-2">
                <GraduationCap size={22} strokeWidth={2.5} />
                学生点评
              </h2>
              <div className="bg-white/30 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-black border-2 border-border-main/10">
                {students.filter(s => s.hasReviewed).length}/{students.length}
              </div>
            </div>
            <p className="text-text-main font-bold text-sm relative z-10 opacity-80">点击学生卡片开始点评</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {students.map((student, index) => (
              <button
                key={student.id}
                onClick={() => handleStudentClick(student.id)}
                className="bg-white rounded-[2rem] p-4 shadow-pop border-2 border-border-main transition-all duration-300 active:scale-[0.97] cursor-pointer group flex flex-col items-center hover:-translate-y-1"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black shadow-sm border-2 border-border-main transition-all duration-300 mb-3 ${
                  student.hasReviewed 
                    ? 'bg-secondary text-text-main' 
                    : 'bg-surface-sun text-text-main'
                }`}>
                  {student.name.charAt(0)}
                  {student.hasReviewed && (
                    <div className="absolute -top-2 -right-2 bg-accent rounded-full p-1 border-2 border-border-main shadow-sm">
                      <Check size={12} className="text-text-main" strokeWidth={4} />
                    </div>
                  )}
                </div>
                <h3 className="font-black text-text-main text-base mb-2">
                  {student.name}
                </h3>
                
                {student.hasReviewed ? (
                  <span className="inline-flex items-center gap-1 bg-secondary text-text-main text-[10px] px-3 py-1 rounded-full font-black border-2 border-border-main">
                    <Check size={10} strokeWidth={3} /> 已完成
                  </span>
                ) : student.ungradedCount > 0 ? (
                  <span className="inline-flex items-center gap-1 bg-accent text-text-main text-[10px] px-3 py-1 rounded-full font-black border-2 border-border-main">
                    <Clock size={10} strokeWidth={3} />
                    {student.ungradedCount} 份待批改
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 bg-surface-sun text-text-light text-[10px] px-3 py-1 rounded-full font-black border-2 border-border-main/20">
                    暂无作业
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
    <div className="flex h-full bg-background relative flex-col font-sans">
      {/* Header with Back Button */}
      <div className="flex items-center gap-3 px-4 py-4 bg-background/90 backdrop-blur-xl border-b-2 border-border-main/10 sticky top-0 z-10">
        <button 
          onClick={handleBackToList}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-border-main text-text-main shadow-pop active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
        >
          <ChevronLeft size={24} strokeWidth={3} />
        </button>
        <div className="flex items-center gap-3 flex-1 ml-2">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-base font-black border-2 border-border-main shadow-sm ${
            currentStudent?.hasReviewed 
              ? 'bg-secondary text-text-main' 
              : 'bg-surface-sun text-text-main'
          }`}>
            {currentStudent?.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h2 className="font-black text-xl text-text-main leading-none mb-1">
              {currentStudent?.name}
            </h2>
            <p className="text-text-light text-xs font-bold">
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
            <div className="w-1 h-5 bg-primary rounded-full border border-border-main"></div>
            <h3 className="text-sm font-black text-text-main uppercase tracking-wider">作业列表</h3>
          </div>
          {currentHomeworks.map((hw, index) => (
            <div 
              key={hw.id} 
              className="bg-white rounded-[2rem] p-5 shadow-pop border-2 border-border-main transition-all duration-300"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-border-main font-black text-sm ${
                    hw.subject === '数学' 
                      ? 'bg-secondary text-text-main' 
                      : 'bg-accent text-text-main'
                  }`}>
                    {hw.subject === '数学' ? '数' : '英'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black border border-border-main ${
                        hw.subject === '数学' 
                          ? 'bg-secondary/20 text-text-main' 
                          : 'bg-accent/20 text-text-main'
                      }`}>{hw.subject}</span>
                    </div>
                    <h4 className="font-black text-text-main text-base truncate">{hw.title}</h4>
                  </div>
                </div>
                <button 
                  onClick={() => handleMistakeClick(hw.id)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all duration-200 active:scale-95 cursor-pointer ${
                    hw.mistakeCount > 0 
                      ? 'bg-primary text-white border-border-main shadow-sm' 
                      : 'bg-white text-text-light border-border-main hover:border-primary hover:text-primary'
                  }`}
                >
                  <AlertCircle size={14} strokeWidth={2.5} />
                  {hw.mistakeCount > 0 ? `错题 ${hw.mistakeCount}` : '记错题'}
                </button>
              </div>

              {/* Status & Actions */}
              <div className="flex items-center gap-3">
                <button className="w-20 h-20 bg-background rounded-2xl flex flex-col items-center justify-center text-text-light hover:bg-surface-sun hover:text-text-main active:scale-95 transition-all duration-200 border-2 border-dashed border-border-main cursor-pointer">
                  <Camera size={24} strokeWidth={2} />
                  <span className="text-[10px] mt-1 font-bold">拍照</span>
                </button>
                
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleStatusToggle(hw.id)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-black transition-all duration-200 active:scale-95 cursor-pointer border-2 border-border-main ${
                        hw.status === 'submitted' 
                            ? 'bg-secondary text-text-main shadow-sm' 
                            : 'bg-white text-text-light'
                      }`}
                    >
                      {hw.status === 'submitted' ? '✓ 已提交' : '未提交'}
                    </button>
                    {hw.status === 'pending' && (
                      <button 
                        onClick={() => handleStatusToggle(hw.id)}
                        className="px-4 py-2.5 bg-accent text-text-main rounded-xl text-sm font-black hover:bg-accent/80 border-2 border-border-main transition-all duration-200 cursor-pointer active:scale-95 shadow-sm"
                      >
                        补交
                      </button>
                    )}
                  </div>
                  
                  {/* Rating */}
                  <div className="flex bg-background p-1 rounded-xl border-2 border-border-main">
                    {['A', 'B', 'C', 'D'].map(r => (
                      <button
                        key={r}
                        onClick={() => handleRating(hw.id, r)}
                        className={`flex-1 h-9 rounded-lg text-sm font-black transition-all duration-200 active:scale-90 cursor-pointer ${
                          hw.rating === r 
                            ? 'bg-primary text-white border-2 border-border-main shadow-sm' 
                            : 'text-text-light hover:text-text-main'
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
        <div className="bg-white rounded-[2rem] p-6 shadow-pop border-2 border-border-main mb-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-accent rounded-xl text-text-main border-2 border-border-main shadow-sm">
                <Star size={20} fill="currentColor" strokeWidth={0} /> 
            </div>
            <div>
              <h3 className="font-black text-text-main text-lg">今日表现</h3>
              <p className="text-text-light text-xs font-bold">记录学生的课堂表现</p>
            </div>
          </div>
          <div className="mb-6">
            <label className="text-xs font-black text-text-light block mb-3 uppercase tracking-widest">整体评价</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: '优秀', color: 'bg-secondary', text: 'text-text-main' },
                { label: '良好', color: 'bg-surface-sun', text: 'text-text-main' },
                { label: '一般', color: 'bg-accent', text: 'text-text-main' },
                { label: '需关注', color: 'bg-primary', text: 'text-white' }
              ].map(({ label, color, text }) => (
                <button 
                  key={label} 
                  onClick={() => setSelectedOverallRating(label)}
                  className={`py-3.5 rounded-xl border-2 text-sm font-black transition-all duration-200 cursor-pointer active:scale-95 ${
                    selectedOverallRating === label 
                      ? `${color} ${text} border-border-main shadow-pop` 
                      : `bg-white text-text-light border-border-main/50 hover:border-border-main`
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="text-xs font-black text-text-light block mb-3 uppercase tracking-widest">特征标签</label>
            <div className="flex flex-wrap gap-2.5">
              {['专注', '积极', '拖拉', '书写乱'].map(tag => (
                <span 
                  key={tag} 
                  onClick={() => handleTagClick(tag)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold border-2 cursor-pointer transition-all duration-200 active:scale-95 ${
                    selectedTags.includes(tag)
                      ? 'bg-secondary text-text-main border-border-main shadow-sm'
                      : 'bg-white text-text-light border-border-main/50 hover:border-border-main'
                  }`}
                >
                  {tag}
                </span>
              ))}
              <button className="px-4 py-2.5 bg-background border-2 border-dashed border-border-main rounded-xl text-sm font-bold text-text-light hover:text-primary hover:border-primary transition-all duration-200 cursor-pointer active:scale-95">
                + 添加
              </button>
            </div>
          </div>

          <div className="relative group">
            <label className="text-xs font-black text-text-light block mb-3 uppercase tracking-widest">反馈评语</label>
            <div className="relative">
              <textarea 
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full bg-background rounded-xl p-5 text-sm font-medium border-2 border-border-main focus:ring-4 focus:ring-primary/20 min-h-[120px] resize-none transition-all duration-200 placeholder-text-light outline-none"
                placeholder="记录学生今天的表现，给出具体的反馈和建议..."
              ></textarea>
              <button className="absolute bottom-4 right-4 text-text-light hover:text-primary p-2 transition-all duration-200 cursor-pointer">
                <Camera size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-5 right-4 left-4 z-30">
         <button 
           onClick={handleSaveAndNext}
           className="w-full bg-primary text-white py-4 rounded-2xl shadow-pop border-2 border-border-main font-black text-lg flex items-center justify-center gap-3 active:scale-[0.97] transition-all duration-300 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
         >
           <Save size={22} strokeWidth={2.5} /> 保存并下一个
         </button>
      </div>

      {/* Mistake Entry Modal */}
      {showMistakeModal && (
        <div className="absolute inset-0 z-50 bg-background/95 backdrop-blur-xl animate-in slide-in-from-bottom-8 fade-in duration-400">
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
