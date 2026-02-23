import { useState, useEffect } from 'react';
import { Search, Filter, Download, ChevronDown, CheckCircle, XCircle, MoreHorizontal, ChevronLeft, Plus, User } from 'lucide-react';
import MistakeEntry from '../components/MistakeEntry';
import { dataManager } from '../utils/dataManager';
import type { Student, Mistake } from '../utils/dataManager';

interface MistakePageProps {
  onBack?: () => void;
  classId?: string | null;
}

const MistakePage = ({ onBack, classId }: MistakePageProps) => {
  const [view, setView] = useState<'student-list' | 'mistake-list' | 'entry'>('mistake-list');
  const [filter, setFilter] = useState('all');
  const [mistakes, setMistakes] = useState<Mistake[]>([]);
  
  // Class & Student Selection
  const [className, setClassName] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  
  const [filteredMistakes, setFilteredMistakes] = useState<Mistake[]>([]);

  // Initialize data
  useEffect(() => {
    // Load initial mistakes from dataManager
    setMistakes(dataManager.getMistakes());
  }, []);

  // Handle Class Selection Change
  useEffect(() => {
    if (classId) {
      const cls = dataManager.getClasses().find(c => c.id.toString() === classId.toString());
      if (cls) {
        setClassName(cls.name);
        setStudents(cls.students);
        setView('student-list'); // Default to student list when class is selected
        setSelectedStudent(null);
      }
    } else {
      // If no class selected, maybe default to all mistakes or keep previous state
      // For now, let's just stay in mistake-list if no class, showing all
      setView('mistake-list');
    }
  }, [classId]);

  // Handle Filtering
  useEffect(() => {
    let currentMistakes = mistakes;

    // Filter by student if selected
    if (selectedStudent) {
      currentMistakes = currentMistakes.filter(m => m.studentId === selectedStudent.id);
    } 
    // If no specific student selected but class is selected, show all for class (optional, or just show student list)
    // The view 'student-list' handles the class view. 'mistake-list' handles the details.
    // If we are in 'mistake-list' without a selected student (e.g. "All Mistakes" mode), we might want to filter by class.
    else if (classId) {
       // If in mistake-list view but no student selected, it means "Show All for Class" or we shouldn't be here ideally if we enforce student selection.
       // Let's assume we want to show all mistakes for the class if user somehow gets here.
       const cls = dataManager.getClasses().find(c => c.id.toString() === classId.toString());
       if (cls) {
         const studentIds = cls.students.map(s => s.id);
         currentMistakes = currentMistakes.filter(m => studentIds.includes(m.studentId));
       }
    }

    // Subject Filter
    if (filter !== 'all') {
      const subjectMap: Record<string, string> = {
        'math': '数学',
        'english': '英语',
        'chinese': '语文'
      };
      currentMistakes = currentMistakes.filter(item => item.subject === subjectMap[filter]);
    }
    
    setFilteredMistakes(currentMistakes);
  }, [classId, filter, mistakes, selectedStudent]);

  const handleSaveMistake = (data: any) => {
    // Find student ID if possible
    let sId = 0;
    let sName = data.student || '未关联';
    if (selectedStudent) {
      sId = selectedStudent.id;
      sName = selectedStudent.name;
    } else {
        // Try to find by name if manually entered
        const found = students.find(s => s.name === data.student);
        if (found) {
            sId = found.id;
            sName = found.name;
        }
    }

    const newMistake: Mistake = {
      id: Date.now(),
      studentId: sId,
      studentName: sName,
      subject: data.subject,
      title: data.knowledgePoint || '未命名错题',
      date: new Date().toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' }),
      status: 'pending',
      image: true
    };
    
    dataManager.addMistake(newMistake);
    setMistakes([...mistakes, newMistake]); // Update local state to trigger re-render
    setView(selectedStudent ? 'mistake-list' : 'student-list');
  };

  const getStudentMistakeCount = (studentId: number) => {
    const studentMistakes = mistakes.filter(m => m.studentId === studentId);
    const pending = studentMistakes.filter(m => m.status === 'pending').length;
    return { total: studentMistakes.length, pending };
  };

  if (view === 'entry') {
    return <MistakeEntry onBack={() => setView(selectedStudent ? 'mistake-list' : 'student-list')} onSave={handleSaveMistake} initialData={{ student: selectedStudent?.name }} />;
  }

  // Render Student List View
  if (view === 'student-list' && classId) {
    return (
        <div className="flex flex-col h-full bg-slate-50">
          <div className="bg-white px-4 py-3 border-b border-slate-200 sticky top-0 z-10">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    {onBack && (
                    <button onClick={onBack} className="p-1 -ml-1 text-slate-600 active:bg-slate-100 rounded-full">
                        <ChevronLeft size={24} />
                    </button>
                    )}
                    <h1 className="font-bold text-lg text-slate-900">
                    错题本
                    {className && <span className="ml-2 text-sm font-normal text-slate-500">({className})</span>}
                    </h1>
                </div>
            </div>
             {/* Search */}
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
                const stats = getStudentMistakeCount(student.id);
                return (
                    <button 
                        key={student.id}
                        onClick={() => {
                            setSelectedStudent(student);
                            setView('mistake-list');
                        }}
                        className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center active:scale-95 transition-transform"
                    >
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2">
                            <User size={24} />
                        </div>
                        <span className="font-bold text-slate-800 text-sm">{student.name}</span>
                        <div className="mt-2 flex gap-2 text-xs">
                             <span className="text-slate-500">总计: {stats.total}</span>
                             {stats.pending > 0 && <span className="text-red-500 font-medium">待改: {stats.pending}</span>}
                        </div>
                    </button>
                );
            })}
             {students.length === 0 && (
                <div className="col-span-2 text-center py-10 text-slate-400 text-sm">
                    该班级暂无学生
                </div>
            )}
          </div>
        </div>
    );
  }

  // Render Mistake List View (for specific student or all)
  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Top Bar */}
      <div className="bg-white px-4 py-3 border-b border-slate-200 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <button onClick={() => {
                if (selectedStudent) {
                    setSelectedStudent(null);
                    setView('student-list');
                } else if (onBack) {
                    onBack();
                }
            }} className="p-1 -ml-1 text-slate-600 active:bg-slate-100 rounded-full">
                <ChevronLeft size={24} />
            </button>
            <h1 className="font-bold text-lg text-slate-900 flex items-center">
              {selectedStudent ? selectedStudent.name : '错题本'}
              {className && !selectedStudent && <span className="ml-2 text-sm font-normal text-slate-500">({className})</span>}
            </h1>
          </div>
          <button 
            onClick={() => setView('entry')}
            className="flex items-center gap-1 text-blue-600 text-sm font-medium bg-blue-50 px-3 py-1.5 rounded-full active:bg-blue-100"
          >
            <Plus size={16} /> 录入
          </button>
        </div>
        
        {/* Search */}
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="搜索知识点" 
            className="w-full bg-slate-100 rounded-full py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-shadow"
          />
        </div>

        {/* Filters */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button 
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                filter === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600'
              }`}
            >
              全部
            </button>
            <button 
              onClick={() => setFilter('math')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                filter === 'math' ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600'
              }`}
            >
              数学
            </button>
            <button 
              onClick={() => setFilter('english')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                filter === 'english' ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600'
              }`}
            >
              英语
            </button>
             <button 
              onClick={() => setFilter('chinese')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                filter === 'chinese' ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600'
              }`}
            >
              语文
            </button>
          </div>
          
          <button className="p-2 text-slate-400 hover:text-blue-600">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Mistake List */}
      <div className="p-4 space-y-3 flex-1 overflow-y-auto pb-20">
        {filteredMistakes.map((item) => (
          <div key={item.id} className="bg-white rounded-xl p-3 shadow-sm border border-slate-100 flex gap-3">
            {/* Thumbnail Placeholder */}
            <div className="w-20 h-20 bg-slate-100 rounded-lg flex-shrink-0 flex items-center justify-center text-slate-300">
               {item.image ? <span className="text-xs">图片</span> : <span className="text-xs">无图</span>}
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                    item.subject === '数学' ? 'bg-blue-50 text-blue-600' :
                    item.subject === '英语' ? 'bg-purple-50 text-purple-600' : 'bg-orange-50 text-orange-600'
                  }`}>
                    {item.subject}
                  </span>
                  <span className="text-xs text-slate-400">{item.date}</span>
                </div>
                <h3 className="font-bold text-slate-800 text-sm mt-1 line-clamp-2">{item.title}</h3>
                <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <span className="bg-slate-100 px-1.5 rounded text-slate-600">{item.studentName}</span>
                </div>
              </div>

              <div className="flex justify-between items-end mt-2">
                {item.status === 'corrected' ? (
                  <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    <CheckCircle size={12} /> 已订正
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                    <XCircle size={12} /> 待订正
                  </span>
                )}
                <button className="text-slate-400 p-1">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {filteredMistakes.length === 0 && (
             <div className="text-center py-10 text-slate-400 text-sm">
                暂无错题记录
            </div>
        )}

        <div className="pt-4 pb-8 text-center">
           <button className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-medium shadow-sm hover:bg-slate-50 active:scale-[0.99]">
             <Download size={18} /> 导出/打印错题
           </button>
        </div>
      </div>
    </div>
  );
};

export default MistakePage;
