import React, { useState } from 'react';
import { ChevronLeft, Plus, Users, Search, Check, X, Trash2, BookOpen } from 'lucide-react';
import { dataManager } from '../../../utils/dataManager';
import type { ClassItem, Student } from '../../../types';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      <div className="bg-white rounded-[2rem] w-full max-w-sm h-[80vh] flex flex-col border-2 border-border-main shadow-pop overflow-hidden animate-in zoom-in-95 duration-300 relative z-10">
        <div className="p-4 border-b-2 border-border-main/10 flex justify-between items-center bg-background">
          <h3 className="font-black text-lg text-text-main tracking-tight">关联学生</h3>
          <button 
            onClick={onClose} 
            className="p-1.5 text-text-light hover:text-text-main hover:bg-black/5 rounded-full transition-all active:scale-90"
          >
            <X size={24} strokeWidth={2.5} />
          </button>
        </div>
        
        <div className="p-4 border-b-2 border-border-main/10 bg-white">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" size={18} strokeWidth={2.5} />
            <input 
              type="text" 
              placeholder="搜索姓名或手机号" 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-background border-2 border-border-main rounded-xl text-sm font-bold text-text-main focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all placeholder:text-text-light"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-3 bg-white">
          {availableStudents.length > 0 ? (
            availableStudents.map(student => (
              <div 
                key={student.id}
                onClick={() => toggleSelection(student.id)}
                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border-2 ${
                  selectedIds.includes(student.id) 
                    ? 'bg-secondary/20 border-secondary' 
                    : 'bg-white border-border-main hover:bg-surface-sun'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black border-2 border-border-main ${
                    selectedIds.includes(student.id) ? 'bg-secondary text-text-main' : 'bg-background text-text-main'
                  }`}>
                    {student.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-text-main">{student.name}</div>
                    <div className="text-xs font-bold text-text-light">{student.phone}</div>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 border-border-main flex items-center justify-center transition-all ${selectedIds.includes(student.id) ? "bg-secondary scale-110" : "bg-white"}`}>
                  {selectedIds.includes(student.id) && <Check size={14} strokeWidth={4} className="text-text-main" />}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-text-light">
              <Users size={48} className="mb-3 opacity-20" strokeWidth={1.5} />
              <p className="text-sm font-bold opacity-60">没有找到可关联的学生</p>
            </div>
          )}
        </div>

        <div className="p-4 border-t-2 border-border-main/10 bg-white safe-area-bottom">
          <button 
            onClick={handleConfirm}
            disabled={selectedIds.length === 0}
            className="w-full bg-primary text-white py-3.5 rounded-xl font-black text-lg border-2 border-border-main shadow-pop disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all hover:bg-primary/90"
          >
            确认添加 ({selectedIds.length})
          </button>
        </div>
      </div>
    </div>
  );
};

const ClassManagement: React.FC<ClassManagementProps> = ({ onBack }) => {
  const [classes, setClasses] = useState<ClassItem[]>(dataManager.getClasses());
  const [editingClass, setEditingClass] = useState<ClassItem | null>(null);
  const [showStudentSelector, setShowStudentSelector] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  
  // New Class Form State
  const [newClassName, setNewClassName] = useState('');
  const [newClassType, setNewClassType] = useState<string>('晚托');

  // Get custody types from dataManager
  const custodyTypes = dataManager.getCustodyTypes();

  const handleDeleteClass = (id: number) => {
    if (confirm('确定要删除这个班级吗？')) {
      dataManager.deleteClass(id);
      setClasses([...dataManager.getClasses()]);
    }
  };

  const handleCreateClass = () => {
    if (!newClassName) return;
    const newClass: ClassItem = {
      id: Date.now(),
      name: newClassName,
      custodyType: newClassType,
      studentCount: 0,
      students: [],
      status: 'in_progress', // Default status
      grade: '未设置', // Default grade
      teacher: '未分配' // Default teacher
    };
    dataManager.addClass(newClass);
    setClasses([...dataManager.getClasses()]);
    setShowEditor(false);
    setNewClassName('');
  };

  return (
    <div className="bg-background min-h-screen font-sans flex flex-col pb-20">
      <div className="bg-background/90 backdrop-blur-xl px-4 py-3 border-b-2 border-border-main/10 sticky top-0 z-20 flex items-center justify-between shadow-sm transition-all duration-300">
        <button 
          onClick={onBack} 
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-border-main text-text-main shadow-pop active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
        >
          <ChevronLeft size={24} strokeWidth={3} />
        </button>
        <h1 className="font-black text-lg text-text-main tracking-tight">班级管理</h1>
        <button 
          onClick={() => setShowEditor(true)}
          className="w-10 h-10 bg-secondary rounded-full border-2 border-border-main flex items-center justify-center text-text-main shadow-pop active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
        >
          <Plus size={24} strokeWidth={3} />
        </button>
      </div>

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        {classes.map((cls, index) => (
          <div 
            key={cls.id} 
            className="bg-white rounded-[2rem] border-2 border-border-main shadow-pop p-5 group relative overflow-hidden transition-all hover:-translate-y-0.5"
            style={{ animationDelay: `${index * 50}ms` }}
          >
             {/* Decorative stripe */}
             <div className={`absolute top-0 left-0 w-full h-2 ${cls.custodyType === '午托' ? 'bg-secondary' : 'bg-accent'}`}></div>

            <div className="flex justify-between items-start mb-4 mt-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-black text-xl text-text-main tracking-tight">{cls.name}</h3>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-border-main ${
                    cls.custodyType === '午托' ? 'bg-secondary text-text-main' : 'bg-accent text-text-main'
                  }`}>
                    {cls.custodyType || '未分类'}
                  </span>
                </div>
                <div className="text-xs font-bold text-text-light flex items-center gap-1">
                  <Users size={14} strokeWidth={2.5} />
                  {cls.students.length} 名学生
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setEditingClass(cls);
                    setShowStudentSelector(true);
                  }}
                  className="w-9 h-9 rounded-full bg-surface-sun border-2 border-border-main text-text-main hover:bg-secondary transition-all flex items-center justify-center active:scale-95"
                >
                  <Users size={16} strokeWidth={2.5} />
                </button>
                <button 
                  onClick={() => handleDeleteClass(cls.id)}
                  className="w-9 h-9 rounded-full bg-surface-sun border-2 border-border-main text-text-main hover:bg-primary hover:text-white transition-all flex items-center justify-center active:scale-95"
                >
                  <Trash2 size={16} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Student Avatars Preview */}
            <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-hide">
              {cls.students.slice(0, 6).map((student, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-background border-2 border-border-main flex items-center justify-center text-xs font-black text-text-main flex-shrink-0">
                  {student.name[0]}
                </div>
              ))}
              {cls.students.length > 6 && (
                <div className="w-8 h-8 rounded-full bg-text-main text-white flex items-center justify-center text-xs font-bold flex-shrink-0 border-2 border-border-main">
                  +{cls.students.length - 6}
                </div>
              )}
              {cls.students.length === 0 && (
                <span className="text-xs font-bold text-text-light italic opacity-60">暂无学生，点击上方按钮添加</span>
              )}
            </div>
          </div>
        ))}

        {classes.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-white rounded-full border-2 border-border-main shadow-pop flex items-center justify-center mx-auto mb-4">
              <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center border-2 border-border-main/20">
                <BookOpen size={32} className="text-text-light" strokeWidth={2.5} />
              </div>
            </div>
            <p className="text-text-main font-black text-lg">暂无班级</p>
            <p className="text-text-light text-sm mt-1 font-bold">点击右上角创建新班级</p>
          </div>
        )}
      </div>

      {/* Create Class Modal */}
      {showEditor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowEditor(false)} />
          <div className="bg-white rounded-[2rem] w-full max-w-sm overflow-hidden shadow-pop scale-100 animate-in zoom-in-95 duration-300 relative z-10 border-2 border-border-main">
            <div className="px-6 py-4 border-b-2 border-border-main/10 flex justify-between items-center bg-background">
              <h3 className="font-black text-lg text-text-main tracking-tight">创建新班级</h3>
              <button 
                onClick={() => setShowEditor(false)} 
                className="p-1.5 text-text-light hover:text-text-main hover:bg-black/5 rounded-full transition-all active:scale-90"
              >
                <X size={24} strokeWidth={2.5} />
              </button>
            </div>
            
            <div className="p-6 space-y-5 bg-white">
              <div>
                <label className="block text-sm font-black text-text-main mb-2 ml-1">班级名称</label>
                <input 
                  type="text" 
                  value={newClassName}
                  onChange={e => setNewClassName(e.target.value)}
                  placeholder="例如：2026春季晚托一班"
                  className="w-full px-4 py-3 bg-background border-2 border-border-main rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all font-bold text-text-main placeholder:text-text-light"
                />
              </div>

              <div>
                <label className="block text-sm font-black text-text-main mb-2 ml-1">托管类型</label>
                <div className="grid grid-cols-2 gap-3">
                  {custodyTypes.length > 0 ? (
                    custodyTypes.map(type => (
                      <button 
                        key={type.id}
                        onClick={() => setNewClassType(type.name)}
                        className={`py-3 rounded-xl border-2 font-black text-sm transition-all ${
                          newClassType === type.name
                            ? 'bg-secondary border-border-main text-text-main shadow-sm' 
                            : 'bg-white border-border-main text-text-light hover:bg-surface-sun'
                        }`}
                      >
                        {type.name}
                      </button>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-4 text-xs font-bold text-text-light bg-background rounded-xl border-2 border-dashed border-border-main">
                      暂无托管类型，请先前往“托管类型维护”添加
                    </div>
                  )}
                </div>
              </div>

              <button 
                onClick={handleCreateClass}
                disabled={!newClassName}
                className="w-full bg-primary text-white py-3.5 rounded-xl font-black text-lg border-2 border-border-main shadow-pop active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all mt-4 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed hover:bg-primary/90"
              >
                立即创建
              </button>
            </div>
          </div>
        </div>
      )}

      {showStudentSelector && editingClass && (
        <StudentSelector 
          existingStudentIds={editingClass.students.map(s => s.id)}
          onSelect={(students) => {
            const updatedClass = { ...editingClass, students: [...editingClass.students, ...students] };
            dataManager.updateClass(updatedClass);
            setClasses(dataManager.getClasses().map(c => c.id === editingClass.id ? updatedClass : c));
            setShowStudentSelector(false);
          }}
          onClose={() => setShowStudentSelector(false)}
        />
      )}
    </div>
  );
};

export default ClassManagement;
