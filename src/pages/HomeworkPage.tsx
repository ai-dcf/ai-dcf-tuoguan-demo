import React, { useState, useEffect } from 'react';
import { ChevronLeft, User, Search, ChevronRight, CheckCircle, Clock, Edit3, X } from 'lucide-react';
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
  }, [selectedStudent, view]); // Reload when view changes (after review)

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

  // 1. Student List View
  if (view === 'student-list') {
    return (
      <div className="flex flex-col h-full bg-slate-50">
        <div className="bg-white px-4 py-3 border-b border-slate-200 sticky top-0 z-10">
          <div className="flex items-center gap-2 mb-3">
            <button onClick={onBack} className="p-1 -ml-1 text-slate-600 active:bg-slate-100 rounded-full">
              <ChevronLeft size={24} />
            </button>
            <h1 className="font-bold text-lg text-slate-900">
              作业点评
              <span className="ml-2 text-sm font-normal text-slate-500">({className})</span>
            </h1>
          </div>
          <div className="relative mb-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索学生" 
              className="w-full bg-slate-100 rounded-full py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-shadow"
            />
          </div>
        </div>

        <div className="p-4 grid grid-cols-2 gap-3 overflow-y-auto pb-20">
          {students.map(student => {
            const stats = getStudentHomeworkStats(student.id);
            return (
              <button 
                key={student.id}
                onClick={() => {
                  setSelectedStudent(student);
                  setView('homework-list');
                }}
                className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center active:scale-95 transition-transform"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2">
                  <User size={24} />
                </div>
                <span className="font-bold text-slate-800 text-sm">{student.name}</span>
                <div className="mt-2 flex gap-2 text-xs">
                  <span className="text-slate-500">总计: {stats.total}</span>
                  {stats.pending > 0 ? (
                    <span className="text-red-500 font-medium">待评: {stats.pending}</span>
                  ) : (
                    <span className="text-green-500 font-medium">完成</span>
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
      <div className="flex flex-col h-full bg-slate-50">
        <div className="bg-white px-4 py-3 border-b border-slate-200 sticky top-0 z-10 flex items-center gap-2">
          <button onClick={() => setView('student-list')} className="p-1 -ml-1 text-slate-600 active:bg-slate-100 rounded-full">
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="font-bold text-lg text-slate-900">{selectedStudent.name}的作业</h1>
            <p className="text-xs text-slate-500">待点评: {homeworks.filter(h => h.status === 'pending').length} 项</p>
          </div>
        </div>

        <div className="p-4 space-y-3 overflow-y-auto">
          {homeworks.map(hw => (
            <div key={hw.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    hw.subject === '数学' ? 'bg-blue-100 text-blue-700' : 
                    hw.subject === '语文' ? 'bg-red-100 text-red-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {hw.subject}
                  </span>
                  <h3 className="font-bold text-slate-800">{hw.title}</h3>
                </div>
                {hw.status === 'pending' ? (
                  <span className="text-xs text-orange-500 font-medium bg-orange-50 px-2 py-1 rounded-full flex items-center gap-1">
                    <Clock size={12} /> 待点评
                  </span>
                ) : (
                  <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle size={12} /> 已点评
                  </span>
                )}
              </div>
              
              <div className="text-xs text-slate-500 mb-3">
                {hw.date}
              </div>

              {hw.status !== 'pending' && (
                <div className="bg-slate-50 rounded-lg p-3 text-sm mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-500">评分:</span>
                    <span className="font-bold text-slate-800">{hw.score || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">评语:</span>
                    <span className="text-slate-800">{hw.comment || '无'}</span>
                  </div>
                </div>
              )}

              {hw.status === 'pending' && (
                <button 
                  onClick={() => {
                    setSelectedHomework(hw);
                    setView('review');
                  }}
                  className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium active:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                >
                  <Edit3 size={16} /> 点评作业
                </button>
              )}
            </div>
          ))}
          {homeworks.length === 0 && (
            <div className="text-center text-slate-400 py-10">
              暂无作业记录
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
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <button onClick={() => setView('homework-list')} className="text-slate-600">取消</button>
          <h1 className="font-bold text-lg text-slate-800">作业点评</h1>
          <button 
            onClick={handleReviewSubmit}
            disabled={!reviewData.score}
            className="text-blue-600 font-bold disabled:text-slate-300"
          >
            提交
          </button>
        </div>

        <div className="p-4 space-y-6">
          <div className="bg-slate-50 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-slate-800">{selectedHomework.title}</span>
              <span className="text-xs text-slate-500">({selectedHomework.subject})</span>
            </div>
            <div className="text-sm text-slate-600">
              学生: {selectedHomework.studentName}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">评分等级</label>
            <div className="flex gap-3">
              {['A+', 'A', 'B+', 'B', 'C'].map(score => (
                <button
                  key={score}
                  onClick={() => setReviewData({ ...reviewData, score })}
                  className={`flex-1 py-3 rounded-xl font-bold border transition-all ${
                    reviewData.score === score
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                  }`}
                >
                  {score}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">老师评语</label>
            <div className="space-y-2 mb-3">
              {['字迹工整', '计算准确', '继续努力', '注意审题'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setReviewData({ ...reviewData, comment: reviewData.comment ? `${reviewData.comment}，${tag}` : tag })}
                  className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs rounded-full mr-2 hover:bg-slate-200 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
            <textarea
              placeholder="请输入具体评语..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 min-h-[120px]"
              value={reviewData.comment}
              onChange={e => setReviewData({ ...reviewData, comment: e.target.value })}
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default HomeworkPage;
