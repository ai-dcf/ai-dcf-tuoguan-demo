import React, { useState } from 'react';
import { ChevronLeft, Plus, Users, Search, CheckCircle, Circle, Trash, MoreHorizontal, Calendar, ArrowRight } from 'lucide-react';
import { dataManager } from '../../utils/dataManager';
import type { ClassItem, Student } from '../../utils/dataManager';

interface ClassManagementProps {
  onBack: () => void;
}

const StudentSelector: React.FC<{
  existingStudentIds: number[];
  onSelect: (students: Student[]) => void;
  onClose: () => void;
}> = ({ existingStudentIds, onSelect, onClose }) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Use dataManager to get students
  const availableStudents = dataManager.getStudents().filter(
    s => !existingStudentIds.includes(s.id) && 
    (s.name.includes(searchTerm) || s.phone.includes(searchTerm))
  );

  const toggleSelection = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleConfirm = () => {
    const selectedStudents = dataManager.getStudents().filter(s => selectedIds.includes(s.id));
    onSelect(selectedStudents);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-sm h-[80vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <h3 className="font-bold text-lg text-slate-800">关联学生</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">✕</button>
        </div>
        
        <div className="p-4 border-b border-slate-50 bg-slate-50/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="搜索姓名或手机号" 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto p-2 space-y-1">
          {availableStudents.length > 0 ? (
            availableStudents.map(student => (
              <div 
                key={student.id}
                onClick={() => toggleSelection(student.id)}
                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${
                  selectedIds.includes(student.id) 
                    ? 'bg-blue-50 border-blue-100' 
                    : 'hover:bg-slate-50 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${
                    selectedIds.includes(student.id) ? 'bg-blue-200 text-blue-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {student.name[0]}
                  </div>
                  <div>
                    <div className={`font-bold ${selectedIds.includes(student.id) ? 'text-blue-900' : 'text-slate-700'}`}>{student.name}</div>
                    <div className="text-xs text-slate-400 font-medium">{student.phone}</div>
                  </div>
                </div>
                <div className={selectedIds.includes(student.id) ? "text-blue-600 scale-110 transition-transform" : "text-slate-300"}>
                  {selectedIds.includes(student.id) ? <CheckCircle size={22} className="fill-blue-100" /> : <Circle size={22} />}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Users size={40} className="text-slate-200 mb-3" />
              <p className="text-sm font-medium">没有找到可关联的学生</p>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-100 bg-white safe-area-bottom">
          <button 
            onClick={handleConfirm}
            disabled={selectedIds.length === 0}
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none active:scale-[0.98] transition-all"
          >
            确认添加 ({selectedIds.length})
          </button>
        </div>
      </div>
    </div>
  );
};

const ClassDetailView: React.FC<{ 
  cls: ClassItem; 
  onBack: () => void;
  onDelete: (id: number) => void;
  onAddStudents: (students: Student[]) => void;
  onRemoveStudent: (studentId: number) => void;
}> = ({ cls, onBack, onDelete, onAddStudents, onRemoveStudent }) => {
  const [showSelector, setShowSelector] = useState(false);

  return (
    <div className="bg-slate-50/50 min-h-screen flex flex-col">
      <div className="bg-white/80 backdrop-blur-md px-4 py-3 border-b border-slate-200/60 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <button 
          onClick={onBack} 
          className="p-2 -ml-2 text-slate-600 hover:bg-slate-100/80 active:scale-95 rounded-full transition-all"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className="font-bold text-lg text-slate-800 tracking-tight">班级详情</h1>
        <button 
          onClick={() => onDelete(cls.id)} 
          className="p-2 -mr-2 text-red-500 hover:bg-red-50 active:scale-95 rounded-full transition-all"
        >
          <Trash size={20} />
        </button>
      </div>

      <div className="p-4 space-y-5">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-3xl text-white shadow-lg shadow-blue-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">{cls.name}</h2>
            <div className="flex items-center gap-3 text-blue-100 text-sm mb-6">
              <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-xs font-bold backdrop-blur-sm">{cls.grade}</span>
              <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
              <span className="font-medium">班主任：{cls.teacher}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 text-center border border-white/10">
                <div className="text-2xl font-bold">{cls.studentCount}</div>
                <div className="text-xs text-blue-100 mt-1 font-medium">学生人数</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 text-center border border-white/10">
                <div className="text-2xl font-bold">0</div>
                <div className="text-xs text-blue-100 mt-1 font-medium">今日缺勤</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="font-bold text-slate-800 text-base">班级成员</h3>
            <button 
              onClick={() => setShowSelector(true)}
              className="text-blue-600 text-sm font-bold flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 active:scale-95 transition-all"
            >
              <Plus size={16} strokeWidth={2.5} />
              关联学生
            </button>
          </div>
          <div className="space-y-3">
            {cls.students && cls.students.length > 0 ? (
              cls.students.map(student => (
                <div 
                  key={student.id} 
                  className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between group shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center text-slate-600 text-sm font-bold shadow-inner ring-2 ring-white">
                      {student.name[0]}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">{student.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5 font-medium">{student.phone}</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => onRemoveStudent(student.id)}
                    className="text-slate-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400 bg-white rounded-3xl border border-dashed border-slate-200">
                <Users size={32} className="text-slate-200 mb-2" />
                <span className="text-sm font-medium">暂无学生，点击上方按钮添加</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {showSelector && (
        <StudentSelector 
          existingStudentIds={cls.students.map(s => s.id)}
          onSelect={(students) => {
            onAddStudents(students);
            setShowSelector(false);
          }}
          onClose={() => setShowSelector(false)}
        />
      )}
    </div>
  );
};

const ClassManagement: React.FC<ClassManagementProps> = ({ onBack }) => {
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  
  // Force update to reflect data changes
  const [_, setForceUpdate] = useState(0);
  const classes = dataManager.getClasses();

  const handleClassClick = (cls: ClassItem) => {
    setSelectedClass(cls);
    setView('detail');
  };

  const handleAddStudents = (students: Student[]) => {
    if (selectedClass) {
      students.forEach(s => dataManager.addStudentToClass(selectedClass.id, s));
      // Refresh selected class data
      const updatedClass = dataManager.getClasses().find(c => c.id === selectedClass.id);
      if (updatedClass) setSelectedClass(updatedClass);
      setForceUpdate(prev => prev + 1);
    }
  };

  const handleRemoveStudent = (studentId: number) => {
    if (selectedClass) {
      dataManager.removeStudentFromClass(selectedClass.id, studentId);
      // Refresh selected class data
      const updatedClass = dataManager.getClasses().find(c => c.id === selectedClass.id);
      if (updatedClass) setSelectedClass(updatedClass);
      setForceUpdate(prev => prev + 1);
    }
  };

  const handleDeleteClass = (id: number) => {
    if (confirm('确定要删除这个班级吗？')) {
      dataManager.deleteClass(id);
      setView('list');
      setForceUpdate(prev => prev + 1);
    }
  };

  if (view === 'detail' && selectedClass) {
    return (
      <ClassDetailView 
        cls={selectedClass} 
        onBack={() => setView('list')}
        onDelete={handleDeleteClass}
        onAddStudents={handleAddStudents}
        onRemoveStudent={handleRemoveStudent}
      />
    );
  }

  return (
    <div className="bg-slate-50/50 min-h-screen flex flex-col">
      <div className="bg-white/80 backdrop-blur-md px-4 py-3 border-b border-slate-200/60 flex items-center justify-between sticky top-0 z-10 shadow-sm transition-all duration-300">
        <div className="flex items-center gap-2">
          <button 
            onClick={onBack} 
            className="p-2 -ml-2 text-slate-600 hover:bg-slate-100/80 active:scale-95 rounded-full transition-all"
          >
            <ChevronLeft size={22} />
          </button>
          <h1 className="font-bold text-lg text-slate-800 tracking-tight">班级管理</h1>
        </div>
        <button className="flex items-center gap-1.5 text-white text-sm font-bold bg-blue-600 px-3 py-1.5 rounded-full shadow-md shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all">
          <Plus size={16} strokeWidth={2.5} /> 新建班级
        </button>
      </div>

      <div className="p-4 space-y-4">
        {classes.map(cls => (
          <div 
            key={cls.id} 
            onClick={() => handleClassClick(cls)}
            className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md active:scale-[0.99] transition-all duration-300 cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">{cls.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md text-xs font-bold border border-blue-100">{cls.grade}</span>
                  <span className="text-slate-400 text-xs flex items-center gap-1">
                    <Users size={12} /> {cls.studentCount}人
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                <ArrowRight size={20} />
              </div>
            </div>
            
            <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-sm">
              <span className="text-slate-500 font-medium">班主任：{cls.teacher}</span>
              <span className="text-slate-400 text-xs">ID: {cls.id}</span>
            </div>
          </div>
        ))}
        
        {classes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
              <Users size={32} className="text-slate-300" />
            </div>
            <p className="font-medium">暂无班级数据</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassManagement;