import React, { useState } from 'react';
import { ChevronLeft, Search, CheckCircle, Clock, Edit3, X, Filter, BookOpen, Star, Sparkles } from 'lucide-react';
import { dataManager } from '../../utils/dataManager';
import type { Student, Homework } from '../../types';

interface HomeworkPageProps {
  classId: string;
  onBack: () => void;
}

const HomeworkPage: React.FC<HomeworkPageProps> = ({ classId, onBack }) => {
  const [view, setView] = useState<'student-list' | 'homework-list' | 'review'>('student-list');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedHomework, setSelectedHomework] = useState<Homework | null>(null);
  const [reviewData, setReviewData] = useState({ score: '', comment: '' });
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const cls = dataManager.getClasses().find(c => c.id.toString() === classId.toString());
  const className = cls ? cls.name : '未知班级';
  const students: Student[] = cls?.students ?? [];
  const homeworks: Homework[] = selectedStudent ? dataManager.getHomeworksByStudentId(selectedStudent.id) : [];

  const getStudentHomeworkStats = (studentId: number) => {
    const hw = dataManager.getHomeworksByStudentId(studentId);
    const pending = hw.filter(h => h.status === 'pending').length;
    return { total: hw.length, pending };
  };

  const handleReviewSubmit = () => {
    if (selectedHomework) {
      const updatedHomework = {
        ...selectedHomework,
        status: 'reviewed' as const,
        score: reviewData.score,
        comment: reviewData.comment
      };
      dataManager.updateHomework(updatedHomework);
      setView('homework-list');
      setReviewData({ score: '', comment: '' });
      setSelectedHomework(null);
    }
  };

  const filteredStudents = students.filter(student => {
    const stats = getStudentHomeworkStats(student.id);
    if (filter === 'pending') return stats.pending > 0;
    if (filter === 'completed') return stats.pending === 0;
    return true;
  });

  // 1. Student List View
  if (view === 'student-list') {
    return (
      <div className="flex flex-col h-full bg-background font-sans">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b-2 border-border-main/10 px-4 py-3">
          <div className="flex items-center gap-3 mb-4">
            <button 
              onClick={onBack} 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-border-main text-text-main shadow-pop active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
            >
              <ChevronLeft size={24} strokeWidth={3} />
            </button>
            <div>
              <h1 className="font-black text-xl text-text-main tracking-tight">作业点评</h1>
              <p className="text-xs text-text-light font-bold">{className}</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="relative flex-1 group">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light group-focus-within:text-text-main transition-colors" strokeWidth={2.5} />
              <input 
                type="text" 
                placeholder="搜索学生姓名..." 
                className="w-full bg-white border-2 border-border-main rounded-xl py-2.5 pl-10 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all placeholder:text-text-light"
              />
            </div>
            <button className="w-10 h-10 bg-white rounded-xl border-2 border-border-main text-text-main shadow-sm active:scale-95 transition-all flex items-center justify-center">
              <Filter size={18} strokeWidth={2.5} />
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1 no-scrollbar">
            {([
              { key: 'all', label: '全部学生' },
              { key: 'pending', label: '待点评' },
              { key: 'completed', label: '已完成' }
            ] as const).map(tab => (
              <button 
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-1.5 rounded-full text-xs font-black whitespace-nowrap transition-all border-2 ${
                  filter === tab.key 
                    ? 'bg-secondary text-text-main border-border-main shadow-sm' 
                    : 'bg-white border-border-main text-text-light hover:bg-surface-sun'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Student Grid */}
        <div className="p-4 grid grid-cols-2 gap-3 pb-24 overflow-y-auto">
          {filteredStudents.map((student, index) => {
            const stats = getStudentHomeworkStats(student.id);
            return (
              <button 
                key={student.id}
                onClick={() => {
                  setSelectedStudent(student);
                  setView('homework-list');
                }}
                className="bg-white p-4 rounded-[2rem] border-2 border-border-main shadow-pop flex flex-col items-center text-center active:scale-[0.98] transition-all hover:-translate-y-0.5 group relative overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-surface-sun rounded-bl-full opacity-50 border-b-2 border-l-2 border-border-main border-dashed -mr-2 -mt-2"></div>
                
                <div className="w-14 h-14 bg-background border-2 border-border-main rounded-2xl flex items-center justify-center text-text-main mb-3 group-hover:rotate-6 transition-transform duration-300 shadow-sm relative z-10">
                  <span className="font-black text-xl">{student.name.charAt(0)}</span>
                </div>
                
                <span className="font-black text-text-main text-base mb-3 relative z-10">{student.name}</span>
                
                <div className="w-full flex justify-center gap-2 text-[10px] font-black relative z-10">
                  {stats.pending > 0 ? (
                    <span className="bg-primary text-white px-2 py-1 rounded-lg border-2 border-border-main flex items-center gap-1 shadow-sm animate-pulse">
                      待评 {stats.pending}
                    </span>
                  ) : (
                    <span className="bg-secondary text-text-main px-2 py-1 rounded-lg border-2 border-border-main flex items-center gap-1 shadow-sm">
                      <CheckCircle size={10} strokeWidth={3} /> 完成
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 2. Homework List View
  if (view === 'homework-list' && selectedStudent) {
    return (
      <div className="flex flex-col h-full bg-background font-sans">
        <div className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b-2 border-border-main/10 px-4 py-3 flex items-center gap-3">
          <button 
            onClick={() => setView('student-list')} 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-border-main text-text-main shadow-pop active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
          >
            <ChevronLeft size={24} strokeWidth={3} />
          </button>
          <div>
            <h1 className="font-black text-lg text-text-main tracking-tight">{selectedStudent.name}的作业</h1>
            <div className="flex items-center gap-2 text-xs text-text-light font-bold">
              <span className="w-2 h-2 rounded-full bg-primary border border-border-main"></span>
              待点评: {homeworks.filter(h => h.status === 'pending').length} 项
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto pb-24">
          {homeworks.map((hw, index) => (
            <div 
              key={hw.id} 
              className="bg-white rounded-[2rem] p-5 shadow-pop border-2 border-border-main transition-all hover:-translate-y-0.5"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm border-2 border-border-main font-black text-sm ${
                    hw.subject === '数学' ? 'bg-secondary text-text-main' : 
                    hw.subject === '语文' ? 'bg-primary text-white' :
                    'bg-accent text-text-main'
                  }`}>
                    {hw.subject === '数学' ? '数' : hw.subject === '语文' ? '语' : '英'}
                  </div>
                  <div>
                    <h3 className="font-black text-text-main text-base">{hw.title}</h3>
                    <span className="text-xs text-text-light font-bold">{hw.date}</span>
                  </div>
                </div>
                {hw.status === 'pending' ? (
                  <span className="text-xs text-text-main font-black bg-primary/20 px-2.5 py-1 rounded-lg border-2 border-border-main flex items-center gap-1.5 shadow-sm">
                    <Clock size={12} strokeWidth={3} /> 待点评
                  </span>
                ) : (
                  <span className="text-xs text-text-main font-black bg-secondary px-2.5 py-1 rounded-lg border-2 border-border-main flex items-center gap-1.5 shadow-sm">
                    <CheckCircle size={12} strokeWidth={3} /> 已点评
                  </span>
                )}
              </div>

              {hw.status !== 'pending' && (
                <div className="bg-background rounded-2xl p-4 text-sm border-2 border-border-main">
                  <div className="flex justify-between items-center mb-2 pb-2 border-b-2 border-border-main/10">
                    <span className="text-text-light font-black text-xs uppercase tracking-wider">评分</span>
                    <div className="flex items-center gap-1 text-primary font-black bg-white px-2 py-0.5 rounded-lg border border-border-main shadow-sm">
                      <Star size={14} fill="currentColor" strokeWidth={0} />
                      {hw.score || '-'}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-text-light font-black text-xs uppercase tracking-wider">评语</span>
                    <p className="text-text-main font-bold leading-relaxed">{hw.comment || '无'}</p>
                  </div>
                </div>
              )}

              {hw.status === 'pending' && (
                <button 
                  onClick={() => {
                    setSelectedHomework(hw);
                    setView('review');
                  }}
                  className="w-full mt-3 py-3 bg-secondary text-text-main rounded-xl text-sm font-black shadow-pop border-2 border-border-main active:scale-[0.98] transition-all flex items-center justify-center gap-2 group active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                >
                  <Edit3 size={16} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform" /> 
                  开始点评
                </button>
              )}
            </div>
          ))}
          {homeworks.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-text-light">
              <div className="w-24 h-24 bg-white rounded-full border-2 border-border-main shadow-pop flex items-center justify-center mb-4">
                <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center border-2 border-border-main/20">
                   <BookOpen size={32} className="text-text-light" strokeWidth={2.5} />
                </div>
              </div>
              <p className="font-black text-text-main">暂无作业记录</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 3. Review View
  if (view === 'review' && selectedHomework) {
    return (
      <div className="flex flex-col h-full bg-background font-sans">
        <div className="px-4 py-3 border-b-2 border-border-main/10 flex items-center justify-between sticky top-0 bg-background/90 backdrop-blur-md z-50">
          <button 
            onClick={() => setView('homework-list')} 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-border-main text-text-main shadow-pop active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
          >
            <X size={24} strokeWidth={3} />
          </button>
          <h1 className="font-black text-lg text-text-main">作业点评</h1>
          <button 
            onClick={handleReviewSubmit}
            disabled={!reviewData.score}
            className="text-text-main font-bold text-sm px-4 py-2 bg-secondary rounded-xl border-2 border-border-main shadow-pop active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
          >
            提交
          </button>
        </div>

        <div className="p-4 space-y-6 pb-24 overflow-y-auto">
          {/* Homework Info Card */}
          <div className="bg-white p-5 rounded-[2rem] border-2 border-border-main shadow-pop">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm border-2 border-border-main font-black ${
                selectedHomework.subject === '数学' ? 'bg-secondary text-text-main' : 
                selectedHomework.subject === '语文' ? 'bg-primary text-white' :
                'bg-accent text-text-main'
              }`}>
                <BookOpen size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="font-black text-text-main text-xl">{selectedHomework.title}</h3>
                <p className="text-xs text-text-light font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-text-light"></span>
                  学生: {selectedHomework.studentName}
                </p>
              </div>
            </div>
          </div>

          {/* Score Selection */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-black text-text-main ml-1">
              <Star size={18} className="text-secondary" strokeWidth={0} fill="currentColor" />
              评分等级
            </label>
            <div className="grid grid-cols-5 gap-2">
              {['A+', 'A', 'B+', 'B', 'C'].map(score => (
                <button
                  key={score}
                  onClick={() => setReviewData({ ...reviewData, score })}
                  className={`py-3 rounded-xl font-black border-2 transition-all active:scale-95 ${
                    reviewData.score === score
                      ? 'bg-primary text-white border-border-main shadow-pop -translate-y-1'
                      : 'bg-white text-text-light border-border-main hover:bg-surface-sun'
                  }`}
                >
                  {score}
                </button>
              ))}
            </div>
          </div>

          {/* Comment Section */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-black text-text-main ml-1">
              <Sparkles size={18} className="text-accent" strokeWidth={2.5} />
              老师评语
            </label>
            
            {/* Quick Tags */}
            <div className="flex flex-wrap gap-2">
              {['字迹工整', '计算准确', '继续努力', '注意审题', '进步很大', '卷面整洁'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setReviewData({ ...reviewData, comment: reviewData.comment ? `${reviewData.comment}，${tag}` : tag })}
                  className="px-3 py-1.5 bg-white text-text-main text-xs font-bold rounded-lg border-2 border-border-main hover:bg-secondary transition-colors active:scale-95 shadow-sm"
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="relative">
              <textarea
                placeholder="请输入具体评语..."
                className="w-full bg-white border-2 border-border-main rounded-[2rem] px-5 py-4 text-sm outline-none focus:ring-4 focus:ring-primary/20 transition-all min-h-[160px] resize-none text-text-main font-bold placeholder:text-text-light"
                value={reviewData.comment}
                onChange={e => setReviewData({ ...reviewData, comment: e.target.value })}
              />
              <div className="absolute bottom-4 right-4 text-[10px] text-text-light font-black bg-background px-2 py-1 rounded-full border border-border-main">
                {reviewData.comment.length} 字
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default HomeworkPage;
