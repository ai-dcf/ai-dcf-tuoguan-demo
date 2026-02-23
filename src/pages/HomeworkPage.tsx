import React, { useState, useEffect } from 'react';
import { ChevronLeft, User, Search, ChevronRight, CheckCircle, Clock, Edit3, X, Filter, BookOpen, Star } from 'lucide-react';
import { dataManager } from '../utils/dataManager';
import type { Student, Homework } from '../utils/dataManager';

interface HomeworkPageProps {
  classId: string;
  onBack: () => void;
}

const HomeworkPage: React.FC<HomeworkPageProps> = ({ classId, onBack }) => {
  const [view, setView] = useState<'student-list' | 'homework-list' | 'review'>('student-list');
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [selectedHomework, setSelectedHomework] = useState<Homework | null>(null);
  const [reviewData, setReviewData] = useState({ score: '', comment: '' });
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const cls = dataManager.getClasses().find(c => c.id.toString() === classId.toString());
  const className = cls ? cls.name : '未知班级';

  useEffect(() => {
    if (cls) {
      setStudents(cls.students);
    }
  }, [cls]);

  useEffect(() => {
    if (selectedStudent) {
      setHomeworks(dataManager.getHomeworksByStudentId(selectedStudent.id));
    }
  }, [selectedStudent, view]);

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
      <div className="flex flex-col h-full bg-[#F5F7FA]">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100/50 px-4 py-3">
          <div className="flex items-center gap-3 mb-4">
            <button 
              onClick={onBack} 
              className="p-2 -ml-2 text-slate-600 hover:bg-slate-100/50 rounded-full transition-colors active:scale-95"
            >
              <ChevronLeft size={24} />
            </button>
            <div>
              <h1 className="font-bold text-xl text-slate-800 tracking-tight">作业点评</h1>
              <p className="text-xs text-slate-500 font-medium">{className}</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="relative flex-1 group">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text" 
                placeholder="搜索学生姓名..." 
                className="w-full bg-slate-100/80 rounded-2xl py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all shadow-inner"
              />
            </div>
            <button className="p-2.5 bg-white rounded-2xl border border-slate-200 text-slate-600 shadow-sm active:scale-95 transition-all">
              <Filter size={18} />
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1 no-scrollbar mask-linear-fade">
            {[
              { key: 'all', label: '全部学生' },
              { key: 'pending', label: '待点评' },
              { key: 'completed', label: '已完成' }
            ].map(tab => (
              <button 
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  filter === tab.key 
                    ? 'bg-slate-800 text-white shadow-md transform scale-105' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Student Grid */}
        <div className="p-4 grid grid-cols-2 gap-3 pb-24">
          {filteredStudents.map(student => {
            const stats = getStudentHomeworkStats(student.id);
            return (
              <button 
                key={student.id}
                onClick={() => {
                  setSelectedStudent(student);
                  setView('homework-list');
                }}
                className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center active:scale-[0.98] transition-all hover:shadow-md hover:border-blue-100 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full opacity-50"></div>
                
                <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center text-blue-600 mb-3 group-hover:scale-110 transition-transform duration-300 shadow-inner relative z-10">
                  <span className="font-bold text-lg">{student.name.charAt(0)}</span>
                </div>
                
                <span className="font-bold text-slate-800 text-sm mb-2 relative z-10">{student.name}</span>
                
                <div className="w-full flex justify-center gap-2 text-[10px] font-medium relative z-10">
                  <span className="bg-slate-50 text-slate-500 px-2 py-1 rounded-md border border-slate-100">
                    总计 {stats.total}
                  </span>
                  {stats.pending > 0 ? (
                    <span className="bg-red-50 text-red-600 px-2 py-1 rounded-md border border-red-100 flex items-center gap-1 animate-pulse">
                      待评 {stats.pending}
                    </span>
                  ) : (
                    <span className="bg-green-50 text-green-600 px-2 py-1 rounded-md border border-green-100 flex items-center gap-1">
                      <CheckCircle size={8} /> 完成
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
      <div className="flex flex-col h-full bg-[#F5F7FA]">
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100/50 px-4 py-3 flex items-center gap-3">
          <button 
            onClick={() => setView('student-list')} 
            className="p-2 -ml-2 text-slate-600 hover:bg-slate-100/50 rounded-full transition-colors active:scale-95"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="font-bold text-lg text-slate-800">{selectedStudent.name}的作业</h1>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-orange-400"></span>
              待点评: {homeworks.filter(h => h.status === 'pending').length} 项
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto pb-24">
          {homeworks.map((hw, index) => (
            <div 
              key={hw.id} 
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 transition-all hover:shadow-md animate-in slide-in-from-bottom-2 duration-500"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-inner ${
                    hw.subject === '数学' ? 'bg-blue-50 text-blue-600' : 
                    hw.subject === '语文' ? 'bg-red-50 text-red-600' :
                    'bg-purple-50 text-purple-600'
                  }`}>
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">{hw.title}</h3>
                    <span className="text-xs text-slate-400 font-medium">{hw.date}</span>
                  </div>
                </div>
                {hw.status === 'pending' ? (
                  <span className="text-xs text-orange-600 font-bold bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-100 flex items-center gap-1.5 shadow-sm">
                    <Clock size={12} className="animate-spin-slow" /> 待点评
                  </span>
                ) : (
                  <span className="text-xs text-green-600 font-bold bg-green-50 px-2.5 py-1 rounded-lg border border-green-100 flex items-center gap-1.5 shadow-sm">
                    <CheckCircle size={12} /> 已点评
                  </span>
                )}
              </div>

              {hw.status !== 'pending' && (
                <div className="bg-slate-50/80 rounded-xl p-4 text-sm border border-slate-100">
                  <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-200/50">
                    <span className="text-slate-500 font-medium text-xs">评分</span>
                    <div className="flex items-center gap-1 text-yellow-500 font-bold">
                      <Star size={14} fill="currentColor" />
                      {hw.score || '-'}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-500 font-medium text-xs">评语</span>
                    <p className="text-slate-700 font-medium leading-relaxed">{hw.comment || '无'}</p>
                  </div>
                </div>
              )}

              {hw.status === 'pending' && (
                <button 
                  onClick={() => {
                    setSelectedHomework(hw);
                    setView('review');
                  }}
                  className="w-full mt-3 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                >
                  <Edit3 size={16} className="group-hover:rotate-12 transition-transform" /> 
                  开始点评
                </button>
              )}
            </div>
          ))}
          {homeworks.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen size={32} className="text-slate-300" />
              </div>
              <p className="font-medium text-sm">暂无作业记录</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 3. Review View
  if (view === 'review' && selectedHomework) {
    return (
      <div className="flex flex-col h-full bg-white">
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-50">
          <button 
            onClick={() => setView('homework-list')} 
            className="p-2 -ml-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
          <h1 className="font-bold text-lg text-slate-800">作业点评</h1>
          <button 
            onClick={handleReviewSubmit}
            disabled={!reviewData.score}
            className="text-blue-600 font-bold text-sm px-4 py-1.5 bg-blue-50 rounded-full disabled:text-slate-400 disabled:bg-slate-50 transition-all hover:bg-blue-100"
          >
            提交
          </button>
        </div>

        <div className="p-4 space-y-6 pb-24 overflow-y-auto">
          {/* Homework Info Card */}
          <div className="bg-gradient-to-br from-slate-50 to-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${
                selectedHomework.subject === '数学' ? 'bg-blue-100 text-blue-600' : 
                selectedHomework.subject === '语文' ? 'bg-red-100 text-red-600' :
                'bg-purple-100 text-purple-600'
              }`}>
                <BookOpen size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">{selectedHomework.title}</h3>
                <p className="text-xs text-slate-500 font-medium">学生: {selectedHomework.studentName}</p>
              </div>
            </div>
          </div>

          {/* Score Selection */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <Star size={16} className="text-yellow-500" />
              评分等级
            </label>
            <div className="grid grid-cols-5 gap-2">
              {['A+', 'A', 'B+', 'B', 'C'].map(score => (
                <button
                  key={score}
                  onClick={() => setReviewData({ ...reviewData, score })}
                  className={`py-3 rounded-xl font-bold border transition-all active:scale-95 ${
                    reviewData.score === score
                      ? 'bg-slate-800 text-white border-slate-800 shadow-lg shadow-slate-200 transform scale-105'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {score}
                </button>
              ))}
            </div>
          </div>

          {/* Comment Section */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <Edit3 size={16} className="text-blue-500" />
              老师评语
            </label>
            
            {/* Quick Tags */}
            <div className="flex flex-wrap gap-2">
              {['字迹工整', '计算准确', '继续努力', '注意审题', '进步很大', '卷面整洁'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setReviewData({ ...reviewData, comment: reviewData.comment ? `${reviewData.comment}，${tag}` : tag })}
                  className="px-3 py-1.5 bg-slate-50 text-slate-600 text-xs font-medium rounded-lg border border-slate-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-colors active:scale-95"
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="relative">
              <textarea
                placeholder="请输入具体评语..."
                className="w-full bg-slate-50 border-0 rounded-2xl px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition-all min-h-[160px] shadow-inner resize-none text-slate-700"
                value={reviewData.comment}
                onChange={e => setReviewData({ ...reviewData, comment: e.target.value })}
              />
              <div className="absolute bottom-3 right-3 text-[10px] text-slate-400 font-medium">
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
