import { useState } from 'react';
import { Search, Filter, Download, CheckCircle, XCircle, MoreHorizontal, ChevronLeft, Plus, User, Sparkles } from 'lucide-react';
import MistakeEntry from '../../components/MistakeEntry';
import type { MistakeEntryData } from '../../components/MistakeEntry';
import { dataManager } from '../../utils/dataManager';
import type { Student, Mistake } from '../../types';

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
        <div className="flex flex-col h-full bg-background">
          <div className="bg-background/90 backdrop-blur-md px-5 py-4 border-b-2 border-border-main/10 sticky top-0 z-10">
            <div className="flex items-center gap-2 mb-4">
                {onBack && (
                <button onClick={onBack} className="w-10 h-10 rounded-full bg-white border-2 border-border-main flex items-center justify-center text-text-main shadow-pop-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all">
                    <ChevronLeft size={24} strokeWidth={3} />
                </button>
                )}
                <h1 className="font-black text-xl text-text-main tracking-tight flex items-center gap-2">
                错题本
                {className && <span className="text-xs font-bold text-text-main bg-accent px-2 py-0.5 rounded-full border-2 border-border-main shadow-[2px_2px_0px_0px_#2D3436]">{className}</span>}
                </h1>
            </div>
             {/* Search */}
            <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-main" strokeWidth={2.5} />
                <input 
                    type="text" 
                    placeholder="搜索学生..." 
                    className="input-pop pl-10"
                />
            </div>
          </div>

          <div className="p-5 grid grid-cols-2 gap-4 overflow-y-auto pb-20">
            {students.map(student => {
                const stats = getStudentMistakeCount(student.id);
                return (
                    <button 
                        key={student.id}
                        onClick={() => {
                            setSelectedStudentId(student.id);
                            setView('mistake-list');
                        }}
                        className="bg-white p-5 rounded-[2rem] border-2 border-border-main shadow-pop flex flex-col items-center text-center active:translate-x-[2px] active:translate-y-[2px] active:shadow-pop-sm transition-all group"
                    >
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white border-2 border-border-main mb-3 group-hover:scale-110 transition-transform duration-300 shadow-pop-sm">
                            <span className="font-black text-xl">{student.name.charAt(0)}</span>
                        </div>
                        <span className="font-black text-text-main text-base mb-3">{student.name}</span>
                        <div className="w-full flex justify-center gap-2 text-[10px] font-bold">
                             <span className="bg-surface-muted text-text-muted px-2 py-1 rounded-lg border-2 border-border-main">总计 {stats.total}</span>
                             {stats.pending > 0 ? (
                               <span className="bg-primary/10 text-primary px-2 py-1 rounded-lg border-2 border-primary">待改 {stats.pending}</span>
                             ) : (
                               <span className="bg-secondary/10 text-secondary-dark px-2 py-1 rounded-lg border-2 border-secondary-dark">完成</span>
                             )}
                        </div>
                    </button>
                );
            })}
             {students.length === 0 && (
                <div className="col-span-2 py-12 flex flex-col items-center justify-center text-text-muted">
                    <div className="w-20 h-20 bg-surface-muted rounded-full flex items-center justify-center mb-4 border-2 border-border-main opacity-50">
                        <User size={32} className="text-text-main" strokeWidth={2} />
                    </div>
                    <p className="font-bold">该班级暂无学生</p>
                </div>
            )}
          </div>
        </div>
    );
  }

  // Render Mistake List View
  return (
    <div className="flex flex-col h-full bg-background">
      {/* Top Bar */}
      <div className="bg-background/90 backdrop-blur-md px-5 py-4 border-b-2 border-border-main/10 sticky top-0 z-10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => {
                if (selectedStudent) {
                    setSelectedStudentId(null);
                    setView(classId ? 'student-list' : 'mistake-list');
                } else if (onBack) {
                    onBack();
                }
            }} className="w-10 h-10 rounded-full bg-white border-2 border-border-main flex items-center justify-center text-text-main shadow-pop-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all">
                <ChevronLeft size={24} strokeWidth={3} />
            </button>
            <h1 className="font-black text-xl text-text-main flex items-center">
              {selectedStudent ? selectedStudent.name : '错题本'}
              {className && !selectedStudent && <span className="ml-2 text-xs font-bold text-text-main bg-accent px-2 py-0.5 rounded-full border-2 border-border-main shadow-[2px_2px_0px_0px_#2D3436]">{className}</span>}
            </h1>
          </div>
          <button 
            onClick={() => setView('entry')}
            className="flex items-center gap-1.5 bg-primary text-white text-sm font-black px-4 py-2.5 rounded-xl border-2 border-border-main shadow-pop-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
          >
            <Plus size={20} strokeWidth={3} /> 录入
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-main" strokeWidth={2.5} />
          <input 
            type="text" 
            placeholder="搜索知识点..." 
            className="input-pop pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex justify-between items-center pt-1">
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {([
                { key: 'all', label: '全部' },
                { key: 'math', label: '数学' },
                { key: 'english', label: '英语' },
                { key: 'chinese', label: '语文' }
            ] as const).map(tab => (
                <button 
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all border-2 border-border-main ${
                    filter === tab.key 
                        ? 'bg-text-main text-white shadow-pop-sm -translate-y-1' 
                        : 'bg-white text-text-main hover:bg-surface-muted shadow-[2px_2px_0px_0px_#2D3436]'
                  }`}
                >
                  {tab.label}
                </button>
            ))}
          </div>
          
          <button className="p-2.5 text-text-main bg-white rounded-xl border-2 border-border-main shadow-pop-sm ml-2 active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all">
            <Filter size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Mistake List */}
      <div className="p-5 space-y-4 flex-1 overflow-y-auto pb-20">
        {filteredMistakes.map((item) => (
          <div key={item.id} className="bg-white rounded-[2rem] p-4 shadow-pop border-2 border-border-main flex gap-4 active:translate-x-[2px] active:translate-y-[2px] active:shadow-pop-sm transition-all">
            {/* Thumbnail */}
            <div className="w-20 h-20 bg-surface-muted rounded-2xl flex-shrink-0 flex items-center justify-center border-2 border-border-main overflow-hidden relative group">
               {item.image ? (
                   <>
                    <div className="absolute inset-0 bg-text-light/20 flex items-center justify-center">
                        <Sparkles size={20} className="text-text-muted" strokeWidth={2.5} />
                    </div>
                    <span className="relative z-10 text-[10px] font-black bg-white px-2 py-0.5 rounded-full border-2 border-border-main">图片</span>
                   </>
               ) : (
                   <span className="text-[10px] font-bold text-text-muted">无图</span>
               )}
            </div>

            <div className="flex-1 flex flex-col justify-between py-0.5">
              <div>
                <div className="flex justify-between items-start mb-1.5">
                  <span className={`text-[10px] px-2 py-0.5 rounded-lg font-black border-2 border-border-main ${
                    item.subject === '数学' ? 'bg-secondary text-text-main' :
                    item.subject === '英语' ? 'bg-accent text-text-main' : 'bg-primary text-white'
                  }`}>
                    {item.subject}
                  </span>
                  <span className="text-[10px] text-text-muted font-bold">{item.date}</span>
                </div>
                <h3 className="font-black text-text-main text-sm leading-snug line-clamp-2">{item.title}</h3>
                {!selectedStudent && (
                    <div className="mt-1.5">
                        <span className="bg-surface-muted text-text-main text-[10px] px-2 py-0.5 rounded-md font-bold border-2 border-border-main/20">{item.studentName}</span>
                    </div>
                )}
              </div>

              <div className="flex justify-between items-end mt-2">
                {item.status === 'corrected' ? (
                  <span className="flex items-center gap-1 text-[10px] text-text-main bg-secondary/20 px-2 py-0.5 rounded-lg font-black border-2 border-secondary">
                    <CheckCircle size={12} strokeWidth={3} /> 已订正
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-lg font-black border-2 border-primary">
                    <XCircle size={12} strokeWidth={3} /> 待订正
                  </span>
                )}
                <button className="text-text-main p-1 hover:bg-surface-muted rounded-lg transition-colors border-2 border-transparent hover:border-border-main">
                  <MoreHorizontal size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {filteredMistakes.length === 0 && (
             <div className="py-16 flex flex-col items-center justify-center text-text-muted">
                <div className="w-24 h-24 bg-surface-muted rounded-full flex items-center justify-center mb-6 border-2 border-border-main opacity-50">
                    <Sparkles size={40} className="text-text-main" strokeWidth={2} />
                </div>
                <p className="text-sm font-black text-text-main">暂无错题记录</p>
                <p className="text-xs text-text-muted mt-1 font-bold">点击右上角录入第一道错题</p>
            </div>
        )}

        <div className="pt-2 text-center">
           <button className="flex items-center justify-center gap-2 w-full py-3.5 bg-white border-2 border-border-main text-text-main rounded-2xl font-black shadow-pop hover:bg-surface-muted active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all">
             <Download size={20} strokeWidth={2.5} /> 导出/打印错题
           </button>
        </div>
      </div>
    </div>
  );
};

export default MistakePage;
