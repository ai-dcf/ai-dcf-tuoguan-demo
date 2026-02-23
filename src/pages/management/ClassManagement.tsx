import React, { useState } from 'react';
import { ChevronLeft, Plus, Users, BookOpen, MoreHorizontal, Edit, Trash, Search, CheckCircle, Circle } from 'lucide-react';
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
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-sm h-[80vh] flex flex-col animate-in fade-in zoom-in duration-200">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-lg text-slate-800">关联学生</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>
        
        <div className="p-4 border-b border-slate-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="搜索姓名或手机号" 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto p-2">
          {availableStudents.length > 0 ? (
            availableStudents.map(student => (
              <div 
                key={student.id}
                onClick={() => toggleSelection(student.id)}
                className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg cursor-pointer active:bg-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 text-sm font-bold">
                    {student.name[0]}
                  </div>
                  <div>
                    <div className="font-medium text-slate-700">{student.name}</div>
                    <div className="text-xs text-slate-400">{student.phone}</div>
                  </div>
                </div>
                <div className={selectedIds.includes(student.id) ? "text-blue-600" : "text-slate-300"}>
                  {selectedIds.includes(student.id) ? <CheckCircle size={24} className="fill-blue-50" /> : <Circle size={24} />}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-slate-400 text-sm">
              没有找到可关联的学生
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleConfirm}
            disabled={selectedIds.length === 0}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-transform"
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
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <div className="bg-white px-4 py-3 border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack} className="text-slate-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg text-slate-800">班级详情</h1>
        <button onClick={() => onDelete(cls.id)} className="text-red-500">
          <Trash size={20} />
        </button>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-1">{cls.name}</h2>
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
            <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs">{cls.grade}</span>
            <span>•</span>
            <span>班主任：{cls.teacher}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">{cls.studentCount}</div>
              <div className="text-xs text-slate-500 mt-1">学生人数</div>
            </div>
            <div className="text-center border-l border-slate-100">
              <div className="text-2xl font-bold text-slate-800">0</div>
              <div className="text-xs text-slate-500 mt-1">今日缺勤</div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="font-bold text-slate-800">班级成员</h3>
            <button 
              onClick={() => setShowSelector(true)}
              className="text-blue-600 text-sm font-medium flex items-center gap-1 active:opacity-70"
            >
              <Plus size={16} />
              关联学生
            </button>
          </div>
          <div className="space-y-2">
            {cls.students && cls.students.length > 0 ? (
              cls.students.map(student => (
                <div key={student.id} className="bg-white p-3 rounded-lg border border-slate-100 flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 text-xs font-bold">
                      {student.name[0]}
                    </div>
                    <span className="font-medium text-slate-700">{student.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 text-sm">{student.phone}</span>
                    <button 
                      onClick={() => onRemoveStudent(student.id)}
                      className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-400 bg-white rounded-xl border border-dashed border-slate-200">
                暂无学生
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
  const [classes, setClasses] = useState<ClassItem[]>(dataManager.getClasses());

  const [showModal, setShowModal] = useState(false);
  const [newClass, setNewClass] = useState({ name: '', grade: '一年级', teacher: '' });

  const handleAddClass = () => {
    if (newClass.name && newClass.teacher) {
      const cls = { 
        id: Date.now(), 
        ...newClass, 
        studentCount: 0,
        students: []
      };
      dataManager.addClass(cls);
      setClasses(dataManager.getClasses());
      setShowModal(false);
      setNewClass({ name: '', grade: '一年级', teacher: '' });
    }
  };

  const handleClassClick = (cls: ClassItem) => {
    setSelectedClass(cls);
    setView('detail');
  };

  const handleDeleteClass = (id: number) => {
    if (confirm('确定要删除这个班级吗？')) {
      dataManager.deleteClass(id);
      setClasses(dataManager.getClasses());
      setView('list');
      setSelectedClass(null);
    }
  };

  const handleAddStudentsToClass = (newStudents: Student[]) => {
    if (!selectedClass) return;

    const updatedClass = {
      ...selectedClass,
      students: [...selectedClass.students, ...newStudents],
      studentCount: selectedClass.studentCount + newStudents.length
    };

    dataManager.updateClass(updatedClass);
    setClasses(dataManager.getClasses());
    setSelectedClass(updatedClass);
  };

  const handleRemoveStudentFromClass = (studentId: number) => {
    if (!selectedClass) return;
    
    if (confirm('确定要将该学生移除出班级吗？')) {
      const updatedClass = {
        ...selectedClass,
        students: selectedClass.students.filter(s => s.id !== studentId),
        studentCount: selectedClass.studentCount - 1
      };
      
      dataManager.updateClass(updatedClass);
      setClasses(dataManager.getClasses());
      setSelectedClass(updatedClass);
    }
  };

  if (view === 'detail' && selectedClass) {
    return (
      <ClassDetailView 
        cls={selectedClass} 
        onBack={() => setView('list')}
        onDelete={handleDeleteClass}
        onAddStudents={handleAddStudentsToClass}
        onRemoveStudent={handleRemoveStudentFromClass}
      />
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-slate-100 sticky top-0 z-10 flex items-center justify-between">
        <button onClick={onBack} className="p-1 -ml-1 text-slate-600 active:bg-slate-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg text-slate-800">班级管理</h1>
        <button onClick={() => setShowModal(true)} className="text-blue-600 font-medium text-sm flex items-center gap-1">
          <Plus size={16} />
          新建
        </button>
      </div>

      {/* Class List */}
      <div className="p-4 space-y-3">
        {classes.map(cls => (
          <div 
            key={cls.id} 
            onClick={() => handleClassClick(cls)}
            className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm relative group active:scale-[0.99] transition-transform cursor-pointer"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-slate-800 text-lg">{cls.name}</h3>
                <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded mt-1">{cls.grade}</span>
              </div>
              <button className="text-slate-300 hover:text-slate-500 p-1">
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-slate-500 mt-4">
              <div className="flex items-center gap-1.5">
                <Users size={16} className="text-slate-400" />
                <span>{cls.teacher}</span>
              </div>
              <div className="w-px h-3 bg-slate-200"></div>
              <div className="flex items-center gap-1.5">
                <BookOpen size={16} className="text-slate-400" />
                <span>{cls.studentCount}人</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Class Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
             <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-800">新建班级</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">班级名称</label>
                <input
                  type="text"
                  value={newClass.name}
                  onChange={e => setNewClass({...newClass, name: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="如：一年级1班"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">所属年级</label>
                <select
                  value={newClass.grade}
                  onChange={e => setNewClass({...newClass, grade: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors bg-white"
                >
                  <option>一年级</option>
                  <option>二年级</option>
                  <option>三年级</option>
                  <option>四年级</option>
                  <option>五年级</option>
                  <option>六年级</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">带班老师</label>
                <input
                  type="text"
                  value={newClass.teacher}
                  onChange={e => setNewClass({...newClass, teacher: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="请输入老师姓名"
                />
              </div>
              <button
                onClick={handleAddClass}
                disabled={!newClass.name || !newClass.teacher}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                创建班级
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassManagement;
