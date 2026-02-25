import { useState } from 'react';
import { Search, Filter, Download, CheckCircle, XCircle, MoreHorizontal, ChevronLeft, Plus, User, Sparkles } from 'lucide-react';
import MistakeEntry from '../components/MistakeEntry';
import type { MistakeEntryData } from '../components/MistakeEntry';
import { dataManager } from '../utils/dataManager';
import type { Student, Mistake } from '../utils/dataManager';

interface MistakePageProps {
  onBack?: () => void;
  classId?: string | null;
}

const MistakePage = ({ onBack, classId }: MistakePageProps) => {
  const [view, setView] = useState<'student-list' | 'mistake-list' | 'entry'>(() => (classId ? 'student-list' : 'mistake-list'));
  const [filter, setFilter] = useState<'all' | 'math' | 'english' | 'chinese'>('all');
  const [mistakes, setMistakes] = useState<Mistake[]>(() => dataManager.getMistakes());
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);

  const cls = classId ? dataManager.getClasses().find(c => c.id.toString() === classId.toString()) : undefined;
  const className = cls?.name ?? '';
  const students: Student[] = cls?.students ?? [];
  const selectedStudent = selectedStudentId ? (students.find(s => s.id === selectedStudentId) ?? null) : null;

  const subjectMap: Record<'math' | 'english' | 'chinese', string> = {
    math: '数学',
    english: '英语',
    chinese: '语文',
  };

  const filteredMistakes = (() => {
    let currentMistakes = mistakes;

    if (selectedStudent) {
      currentMistakes = currentMistakes.filter(m => m.studentId === selectedStudent.id);
    } else if (classId && cls) {
      const studentIds = cls.students.map(s => s.id);
      currentMistakes = currentMistakes.filter(m => studentIds.includes(m.studentId));
    }

    if (filter !== 'all') {
      currentMistakes = currentMistakes.filter(item => item.subject === subjectMap[filter]);
    }

    return currentMistakes;
  })();

  const handleSaveMistake = (data: MistakeEntryData) => {
    let sId = 0;
    let sName = data.student || '未关联';
    if (selectedStudent) {
      sId = selectedStudent.id;
      sName = selectedStudent.name;
    } else {
        const found = students.find(s => s.name === data.student);
        if (found) {
            sId = found.id;
            sName = found.name;
        }
    }

    const nextId = mistakes.reduce((max, m) => Math.max(max, m.id), 0) + 1;

    const newMistake: Mistake = {
      id: nextId,
      studentId: sId,
      studentName: sName,
      subject: subjectMap[data.subject],
      title: data.knowledgePoint || '未命名错题',
      date: '02-24',
      status: 'pending',
      image: true
    };
    
    dataManager.addMistake(newMistake);
    setMistakes(prev => [...prev, newMistake]);
    setView(selectedStudent ? 'mistake-list' : classId ? 'student-list' : 'mistake-list');
  };

  const getStudentMistakeCount = (studentId: number) => {
    const studentMistakes = mistakes.filter(m => m.studentId === studentId);
    const pending = studentMistakes.filter(m => m.status === 'pending').length;
    return { total: studentMistakes.length, pending };
  };

  if (view === 'entry') {
    return <MistakeEntry onBack={() => setView(selectedStudent ? 'mistake-list' : classId ? 'student-list' : 'mistake-list')} onSave={handleSaveMistake} initialData={{ student: selectedStudent?.name }} />;
  }

  // Render Student List View
  if (view === 'student-list' && classId) {
    return (
        <div className="flex flex-col h-full bg-slate-50">
          <div className="bg-white/80 backdrop-blur-md px-4 py-3 border-b border-slate-100 sticky top-0 z-10">
            <div className="flex items-center gap-2 mb-3">
                {onBack && (
                <button onClick={onBack} className="w-8 h-8 flex items-center justify-center -ml-2 text-slate-600 active:bg-slate-100 rounded-full transition-colors">
                    <ChevronLeft size={22} />
                </button>
                )}
                <h1 className="font-bold text-lg text-slate-900 tracking-tight">
                错题本
                {className && <span className="ml-2 text-sm font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{className}</span>}
                </h1>
            </div>
             {/* Search */}
            <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="搜索学生..." 
                    className="w-full bg-slate-100/80 border-transparent focus:bg-white border focus:border-blue-200 rounded-xl py-2.5 pl-9 pr-4 text-sm outline-none transition-all shadow-sm"
                />
            </div>
          </div>

          <div className="p-4 grid grid-cols-2 gap-3 overflow-y-auto pb-20">
            {students.map(student => {
                const stats = getStudentMistakeCount(student.id);
                return (
                    <button 
                        key={student.id}
                        onClick={() => {
                            setSelectedStudentId(student.id);
                            setView('mistake-list');
                        }}
                        className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center active:scale-[0.98] transition-all hover:shadow-md hover:border-blue-100 group"
                    >
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center text-blue-600 mb-3 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                            <span className="font-bold text-lg">{student.name.charAt(0)}</span>
                        </div>
                        <span className="font-bold text-slate-800 text-sm mb-2">{student.name}</span>
                        <div className="w-full flex justify-center gap-2 text-[10px] font-medium">
                             <span className="bg-slate-50 text-slate-500 px-2 py-1 rounded-md border border-slate-100">总计 {stats.total}</span>
                             {stats.pending > 0 ? (
                               <span className="bg-red-50 text-red-600 px-2 py-1 rounded-md border border-red-100">待改 {stats.pending}</span>
                             ) : (
                               <span className="bg-green-50 text-green-600 px-2 py-1 rounded-md border border-green-100">完成</span>
                             )}
                        </div>
                    </button>
                );
            })}
             {students.length === 0 && (
                <div className="col-span-2 py-12 flex flex-col items-center justify-center text-slate-400">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                        <User size={24} className="text-slate-300" />
                    </div>
                    <p className="text-sm">该班级暂无学生</p>
                </div>
            )}
          </div>
        </div>
    );
  }

  // Render Mistake List View
  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Top Bar */}
      <div className="bg-white/80 backdrop-blur-md px-4 py-3 border-b border-slate-100 sticky top-0 z-10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => {
                if (selectedStudent) {
                    setSelectedStudentId(null);
                    setView(classId ? 'student-list' : 'mistake-list');
                } else if (onBack) {
                    onBack();
                }
            }} className="w-8 h-8 flex items-center justify-center -ml-2 text-slate-600 active:bg-slate-100 rounded-full transition-colors">
                <ChevronLeft size={22} />
            </button>
            <h1 className="font-bold text-lg text-slate-900 flex items-center">
              {selectedStudent ? selectedStudent.name : '错题本'}
              {className && !selectedStudent && <span className="ml-2 text-sm font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{className}</span>}
            </h1>
          </div>
          <button 
            onClick={() => setView('entry')}
            className="flex items-center gap-1.5 bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg shadow-blue-200 active:scale-95 transition-transform"
          >
            <Plus size={18} /> 录入
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="搜索知识点..." 
            className="w-full bg-slate-100/80 border-transparent focus:bg-white border focus:border-blue-200 rounded-xl py-2 pl-9 pr-4 text-sm outline-none transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex justify-between items-center pt-1">
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar mask-linear-fade">
            {([
                { key: 'all', label: '全部' },
                { key: 'math', label: '数学' },
                { key: 'english', label: '英语' },
                { key: 'chinese', label: '语文' }
            ] as const).map(tab => (
                <button 
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    filter === tab.key 
                        ? 'bg-slate-800 text-white shadow-md' 
                        : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
            ))}
          </div>
          
          <button className="p-2 text-slate-400 hover:text-slate-600 bg-white rounded-full border border-slate-100 shadow-sm ml-2">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Mistake List */}
      <div className="p-4 space-y-3 flex-1 overflow-y-auto pb-20">
        {filteredMistakes.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-slate-100 flex gap-4 active:scale-[0.99] transition-transform">
            {/* Thumbnail */}
            <div className="w-20 h-20 bg-slate-50 rounded-xl flex-shrink-0 flex items-center justify-center border border-slate-100 text-slate-300 overflow-hidden relative group">
               {item.image ? (
                   <>
                    <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
                        <Sparkles size={16} className="text-slate-400" />
                    </div>
                    <span className="relative z-10 text-[10px] font-medium bg-white/80 px-1.5 py-0.5 rounded backdrop-blur-sm">图片</span>
                   </>
               ) : (
                   <span className="text-[10px]">无图</span>
               )}
            </div>

            <div className="flex-1 flex flex-col justify-between py-0.5">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold tracking-wide ${
                    item.subject === '数学' ? 'bg-blue-50 text-blue-600' :
                    item.subject === '英语' ? 'bg-purple-50 text-purple-600' : 'bg-orange-50 text-orange-600'
                  }`}>
                    {item.subject}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">{item.date}</span>
                </div>
                <h3 className="font-bold text-slate-800 text-sm leading-snug line-clamp-2">{item.title}</h3>
                {!selectedStudent && (
                    <div className="mt-1.5">
                        <span className="bg-slate-100 text-slate-500 text-[10px] px-1.5 py-0.5 rounded font-medium">{item.studentName}</span>
                    </div>
                )}
              </div>

              <div className="flex justify-between items-end mt-2">
                {item.status === 'corrected' ? (
                  <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium border border-green-100">
                    <CheckCircle size={12} strokeWidth={2.5} /> 已订正
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded-full font-medium border border-red-100">
                    <XCircle size={12} strokeWidth={2.5} /> 待订正
                  </span>
                )}
                <button className="text-slate-400 p-1 hover:bg-slate-50 rounded-full transition-colors">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {filteredMistakes.length === 0 && (
             <div className="py-16 flex flex-col items-center justify-center text-slate-400">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <Sparkles size={32} className="text-slate-300" />
                </div>
                <p className="text-sm font-medium text-slate-500">暂无错题记录</p>
                <p className="text-xs text-slate-400 mt-1">点击右上角录入第一道错题</p>
            </div>
        )}

        <div className="pt-2 text-center">
           <button className="flex items-center justify-center gap-2 w-full py-3.5 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold shadow-sm hover:bg-slate-50 active:scale-[0.98] transition-all">
             <Download size={18} /> 导出/打印错题
           </button>
        </div>
      </div>
    </div>
  );
};

export default MistakePage;
