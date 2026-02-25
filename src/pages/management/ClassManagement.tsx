import React, { useState } from 'react';
import { ChevronLeft, Plus, Users, Search, CheckCircle, Circle, X, Edit3, GraduationCap, ArrowRightLeft, BookOpen } from 'lucide-react';
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
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
            <X size={20} />
          </button>
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

        <div className="flex-1 overflow-auto p-2 space-y-2">
          {availableStudents.length > 0 ? (
            availableStudents.map(student => (
              <div 
                key={student.id}
                onClick={() => toggleSelection(student.id)}
                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border group ${
                  selectedIds.includes(student.id) 
                    ? 'bg-blue-50/80 border-blue-200 shadow-sm' 
                    : 'hover:bg-slate-50 border-transparent hover:border-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm transition-colors ${
                    selectedIds.includes(student.id) ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-slate-600'
                  }`}>
                    {student.name[0]}
                  </div>
                  <div>
                    <div className={`font-bold transition-colors ${selectedIds.includes(student.id) ? 'text-blue-800' : 'text-slate-700'}`}>{student.name}</div>
                    <div className={`text-xs font-medium transition-colors ${selectedIds.includes(student.id) ? 'text-blue-400' : 'text-slate-400'}`}>{student.phone}</div>
                  </div>
                </div>
                <div className={`transition-all duration-300 ${selectedIds.includes(student.id) ? "text-blue-500 scale-110" : "text-slate-200 group-hover:text-slate-300"}`}>
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

        <div className="p-4 border-t border-slate-100 bg-white/90 backdrop-blur-sm safe-area-bottom">
          <button 
            onClick={handleConfirm}
            disabled={selectedIds.length === 0}
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none active:scale-[0.98] transition-all hover:bg-blue-700"
          >
            确认添加 ({selectedIds.length})
          </button>
        </div>
      </div>

    </div>
  );
};

const EditStudentModal: React.FC<{
  student: Student;
  onSave: (student: Student) => void;
  onClose: () => void;
}> = ({ student, onSave, onClose }) => {
  const [formData, setFormData] = useState<Student>({ ...student });

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-sm flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
          <h3 className="font-bold text-lg text-slate-800">编辑学生信息</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">学生姓名</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-700"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div>
              <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">年级</label>
              <input 
                type="text" 
                value={formData.grade}
                onChange={e => setFormData({...formData, grade: e.target.value})}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">班级</label>
              <input 
                type="text" 
                value={formData.class}
                onChange={e => setFormData({...formData, class: e.target.value})}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">就读学校</label>
            <input 
              type="text" 
              value={formData.school || ''}
              onChange={e => setFormData({...formData, school: e.target.value})}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              placeholder="请输入学校名称"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">家长电话</label>
            <input 
              type="tel" 
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-3 rounded-xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all"
          >
            取消
          </button>
          <button 
            onClick={() => onSave(formData)}
            className="flex-1 py-3 rounded-xl font-bold text-white bg-blue-600 shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
};

const TransferStudentModal: React.FC<{
  student: Student;
  currentClassId: number;
  onTransfer: (targetClassId: number) => void;
  onClose: () => void;
}> = ({ student, currentClassId, onTransfer, onClose }) => {
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  
  // Get other active classes
  const otherClasses = dataManager.getClasses().filter(c => c.id !== currentClassId && c.status !== 'closed');

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-sm flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
          <h3 className="font-bold text-lg text-slate-800">转班操作</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 bg-slate-50/50 border-b border-slate-100">
          <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
              {student.name[0]}
            </div>
            <div>
              <div className="font-bold text-slate-800">{student.name}</div>
              <div className="text-xs text-slate-500">当前班级: {dataManager.getClasses().find(c => c.id === currentClassId)?.name}</div>
            </div>
          </div>
        </div>

        <div className="p-4 flex-1 overflow-auto max-h-[50vh]">
          <h4 className="text-sm font-bold text-slate-500 mb-3 ml-1">选择目标班级</h4>
          <div className="space-y-2">
            {otherClasses.length > 0 ? (
              otherClasses.map(cls => (
                <div 
                  key={cls.id}
                  onClick={() => setSelectedClassId(cls.id)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${
                    selectedClassId === cls.id 
                      ? 'bg-blue-50 border-blue-200 shadow-sm' 
                      : 'bg-white border-slate-100 hover:border-blue-200'
                  }`}
                >
                  <div>
                    <div className={`font-bold ${selectedClassId === cls.id ? 'text-blue-800' : 'text-slate-700'}`}>{cls.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{cls.custodyType === 'lunch' ? '午托' : '晚托'} · {cls.studentCount}人</div>
                  </div>
                  {selectedClassId === cls.id && <CheckCircle size={20} className="text-blue-500" />}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-400 text-sm">无其他可选班级</div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-white flex gap-3 safe-area-bottom">
          <button 
            onClick={onClose}
            className="flex-1 py-3 rounded-xl font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 active:scale-95 transition-all"
          >
            取消
          </button>
          <button 
            onClick={() => selectedClassId && onTransfer(selectedClassId)}
            disabled={!selectedClassId}
            className="flex-1 py-3 rounded-xl font-bold text-white bg-blue-600 shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 active:scale-95 transition-all"
          >
            确认转班
          </button>
        </div>
      </div>
    </div>
  );
};

const ClassDetailView: React.FC<{ 
  cls: ClassItem; 
  onBack: () => void;
  onAddStudents: (students: Student[]) => void;
  onRemoveStudent: (studentId: number) => void;
  onUpdateStudent: (student: Student) => void;
  onTransferStudent: (studentId: number, targetClassId: number) => void;
}> = ({ cls, onBack, onAddStudents, onRemoveStudent, onUpdateStudent, onTransferStudent }) => {
  const [showSelector, setShowSelector] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [transferringStudent, setTransferringStudent] = useState<Student | null>(null);

  // Calculate stats
  const activeCount = cls.students.filter(s => s.status === 'active').length;
  const graduatedCount = cls.students.filter(s => s.status === 'graduated').length;

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
        <div className="w-10"></div>
      </div>

      <div className="p-4 space-y-5">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-3xl text-white shadow-lg shadow-blue-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-2">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold">{cls.name}</h2>
                {cls.custodyType && (
                  <span className="self-start px-2 py-0.5 rounded-lg text-xs font-bold bg-white/20 text-white border border-white/20 backdrop-blur-sm">
                    {cls.custodyType === 'lunch' ? '午托班' : '晚托班'}
                  </span>
                )}
              </div>
              <span className={`px-2 py-0.5 rounded-lg text-xs font-bold border ${
                cls.status === 'closed' ? 'bg-slate-100/20 text-slate-100 border-white/20' : 'bg-green-400/20 text-green-100 border-green-400/30'
              }`}>
                {cls.status === 'closed' ? '已结班' : '进行中'}
              </span>
            </div>
            
            <div className="flex flex-col gap-1 text-blue-100 text-sm mb-6">
              <div className="flex items-center gap-2">
                <span className="bg-white/20 px-2 py-0.5 rounded-md text-xs font-bold backdrop-blur-sm">{cls.grade}</span>
                <span className="font-medium">主教：{cls.mainTeacher}</span>
              </div>
              {cls.assistantTeacher && (
                 <div className="flex items-center gap-2">
                   <span className="opacity-0 px-2"></span>
                   <span className="font-medium text-blue-200">助教：{cls.assistantTeacher}</span>
                 </div>
              )}
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 text-center border border-white/10">
                <div className="text-xl font-bold">{cls.studentCount}</div>
                <div className="text-[10px] text-blue-100 mt-1 font-medium">总人数</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 text-center border border-white/10">
                <div className="text-xl font-bold">{activeCount}</div>
                <div className="text-[10px] text-blue-100 mt-1 font-medium">在班</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 text-center border border-white/10">
                <div className="text-xl font-bold">{graduatedCount}</div>
                <div className="text-[10px] text-blue-100 mt-1 font-medium">结班</div>
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
              cls.students.map(student => {
                const mistakes = dataManager.getMistakesByStudentId(student.id);
                const homeworks = dataManager.getHomeworksByStudentId(student.id);
                const completedHomeworks = homeworks.filter(h => h.status === 'completed' || h.status === 'reviewed').length;
                const homeworkRate = homeworks.length > 0 ? Math.round((completedHomeworks / homeworks.length) * 100) : 0;

                return (
                  <div 
                    key={student.id} 
                    className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center text-slate-600 text-sm font-bold shadow-inner ring-2 ring-white">
                          {student.name[0]}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 flex items-center gap-2">
                            {student.name}
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-md border ${
                              student.status === 'active' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-slate-50 text-slate-500 border-slate-100'
                            }`}>
                              {student.status === 'active' ? '在读' : '已结班'}
                            </span>
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5 font-medium flex gap-2">
                            <span>{student.school || '未录入学校'}</span>
                            <span>{student.class || '未分班'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-500 bg-slate-50/50 p-2 rounded-xl mb-3">
                       <div className="flex-1 text-center border-r border-slate-200">
                         <div className="font-bold text-slate-700">{homeworkRate}%</div>
                         <div className="scale-90 text-slate-400">作业率</div>
                       </div>
                       <div className="flex-1 text-center">
                         <div className="font-bold text-orange-500">{mistakes.length}</div>
                         <div className="scale-90 text-slate-400">错题</div>
                       </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 border-t border-slate-50 pt-3">
                       <button 
                         onClick={() => setEditingStudent(student)}
                         className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-500 bg-slate-50 hover:bg-slate-100 active:scale-95 transition-all"
                       >
                         <Edit3 size={14} /> 编辑
                       </button>
                       <button 
                         onClick={() => setTransferringStudent(student)}
                         className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 active:scale-95 transition-all"
                       >
                         <ArrowRightLeft size={14} /> 转班
                       </button>
                       <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 active:scale-95 transition-all">
                         <BookOpen size={14} /> 错题
                       </button>
                       <button 
                        onClick={() => onRemoveStudent(student.id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 active:scale-95 transition-all"
                       >
                         <GraduationCap size={14} /> 结班
                       </button>
                    </div>
                  </div>
                );
              })
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

      {editingStudent && (
        <EditStudentModal 
          student={editingStudent}
          onSave={(updatedStudent) => {
            onUpdateStudent(updatedStudent);
            setEditingStudent(null);
          }}
          onClose={() => setEditingStudent(null)}
        />
      )}

      {transferringStudent && (
        <TransferStudentModal
          student={transferringStudent}
          currentClassId={cls.id}
          onTransfer={(targetClassId) => {
            onTransferStudent(transferringStudent.id, targetClassId);
            setTransferringStudent(null);
          }}
          onClose={() => setTransferringStudent(null)}
        />
      )}
    </div>
  );
};

const ClassManagement: React.FC<ClassManagementProps> = ({ onBack }) => {
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [classForm, setClassForm] = useState<{
    name: string, 
    grade: string, 
    mainTeacher: string, 
    assistantTeacher: string,
    custodyType: 'lunch' | 'dinner' | 'both'
  }>({ 
    name: '', grade: '', mainTeacher: '', assistantTeacher: '', custodyType: 'lunch' 
  });
  
  // Force update to reflect data changes
  const [, setForceUpdate] = useState(0);
  const classes = dataManager.getClasses();
  const teachers = dataManager.getTeachers();

  const handleClassClick = (cls: ClassItem) => {
    setSelectedClass(cls);
    setView('detail');
  };

  const openAddModal = () => {
    setIsEditing(false);
    setEditingId(null);
    setClassForm({ name: '', grade: '', mainTeacher: '', assistantTeacher: '', custodyType: 'lunch' });
    setShowAddModal(true);
  };

  const openEditModal = (cls: ClassItem) => {
    setIsEditing(true);
    setEditingId(cls.id);
    setClassForm({ 
      name: cls.name, 
      grade: cls.grade, 
      mainTeacher: cls.mainTeacher, 
      assistantTeacher: cls.assistantTeacher || '',
      custodyType: cls.custodyType || 'lunch' 
    });
    setShowAddModal(true);
  };

  const handleSaveClass = () => {
    if (classForm.name && classForm.grade) {
      if (isEditing && editingId) {
        // Update existing class
        const cls = dataManager.getClasses().find(c => c.id === editingId);
        if (cls) {
          cls.name = classForm.name;
          cls.grade = classForm.grade;
          cls.mainTeacher = classForm.mainTeacher || '未分配';
          cls.assistantTeacher = classForm.assistantTeacher;
          cls.custodyType = classForm.custodyType;
        }
      } else {
        // Add new class
        const newClassItem: ClassItem = {
          id: Date.now(),
          name: classForm.name,
          grade: classForm.grade,
          mainTeacher: classForm.mainTeacher || '未分配',
          assistantTeacher: classForm.assistantTeacher,
          studentCount: 0,
          students: [],
          custodyType: classForm.custodyType,
          status: 'active'
        };
        dataManager.addClass(newClassItem);
      }
      
      setShowAddModal(false);
      setForceUpdate(prev => prev + 1);
    }
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

  const handleUpdateStudent = (updatedStudent: Student) => {
    // 1. Update global student registry
    dataManager.updateStudent(updatedStudent);

    // 2. Update student in all classes (to ensure consistency since dataManager might not link them)
    dataManager.getClasses().forEach(cls => {
      const sIndex = cls.students.findIndex(s => s.id === updatedStudent.id);
      if (sIndex !== -1) {
        cls.students[sIndex] = { ...cls.students[sIndex], ...updatedStudent };
      }
    });

    // 3. Refresh current view
    if (selectedClass) {
      const updatedClass = dataManager.getClasses().find(c => c.id === selectedClass.id);
      if (updatedClass) setSelectedClass({...updatedClass});
    }
    setForceUpdate(prev => prev + 1);
  };

  const handleTransferStudent = (studentId: number, targetClassId: number) => {
    if (!selectedClass) return;

    // 1. Find the student object
    const student = selectedClass.students.find(s => s.id === studentId);
    if (!student) return;

    // 2. Remove from current class
    dataManager.removeStudentFromClass(selectedClass.id, studentId);

    // 3. Add to target class
    // We need to ensure we're adding the updated student object (in case it was modified)
    // But for transfer, we just move the reference.
    // However, we should update the 'class' field of the student if it's stored on the student.
    const targetClass = dataManager.getClasses().find(c => c.id === targetClassId);
    if (targetClass) {
      const updatedStudent = { ...student, class: targetClass.name }; // Update class name in student record
      dataManager.addStudentToClass(targetClassId, updatedStudent);
      
      // Update global registry too if needed
      dataManager.updateStudent(updatedStudent);
    }

    // 4. Refresh view
    const updatedClass = dataManager.getClasses().find(c => c.id === selectedClass.id);
    if (updatedClass) setSelectedClass({...updatedClass});
    setForceUpdate(prev => prev + 1);
  };

  const handleCloseClass = (id: number) => {
    if (confirm('确定要结班吗？结班后该班级将变为只读状态。')) {
      const cls = dataManager.getClasses().find(c => c.id === id);
      if (cls) {
        // Use dataManager.updateClass if possible, but we need to modify the object first
        const updatedClass = { ...cls, status: 'closed' as const };
        dataManager.updateClass(updatedClass);
        
        // Also update the local object reference in case dataManager.updateClass doesn't replace it in place deeply enough for our state
        // (Actually dataManager.updateClass replaces the object in the array)
        
        setForceUpdate(prev => prev + 1);
      }
    }
  };

  if (view === 'detail' && selectedClass) {
    return (
      <ClassDetailView 
        cls={selectedClass} 
        onBack={() => setView('list')}
        onAddStudents={handleAddStudents}
        onRemoveStudent={handleRemoveStudent}
        onUpdateStudent={handleUpdateStudent}
        onTransferStudent={handleTransferStudent}
      />
    );
  }

  // Group classes by custody type
  const lunchClasses = classes.filter(c => c.custodyType === 'lunch');
  const dinnerClasses = classes.filter(c => c.custodyType === 'dinner');
  const otherClasses = classes.filter(c => c.custodyType !== 'lunch' && c.custodyType !== 'dinner');

  const renderClassCard = (cls: ClassItem, index: number) => (
    <div 
      key={cls.id} 
      className={`bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 group animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards ${
        cls.status === 'closed' ? 'opacity-70 grayscale-[0.5]' : ''
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex justify-between items-start mb-3 cursor-pointer" onClick={() => handleClassClick(cls)}>
        <div>
          <h3 className="font-bold text-lg text-slate-800 mb-1 group-hover:text-blue-600 transition-colors flex items-center gap-2">
            {cls.name}
            {cls.custodyType && (
              <span className={`text-xs px-2 py-0.5 rounded-full border ${
                cls.custodyType === 'lunch' 
                  ? 'bg-orange-50 text-orange-600 border-orange-100' 
                  : 'bg-indigo-50 text-indigo-600 border-indigo-100'
              }`}>
                {cls.custodyType === 'lunch' ? '午托' : '晚托'}
              </span>
            )}
            {cls.status === 'closed' && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                已结班
              </span>
            )}
          </h3>
          <div className="text-sm text-slate-500 flex flex-col gap-1 mt-1">
            <div className="flex gap-3">
              <span className="flex items-center gap-1"><Users size={14} /> {cls.studentCount}人</span>
              <span>{cls.grade}</span>
            </div>
            <div className="text-xs text-slate-400">
              主教: {cls.mainTeacher} {cls.assistantTeacher && `/ 助教: ${cls.assistantTeacher}`}
            </div>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">
          <ChevronLeft size={20} className="rotate-180" />
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-3 border-t border-slate-50">
        <div className="flex -space-x-2">
          {cls.students.slice(0, 3).map(s => (
            <div key={s.id} className="w-7 h-7 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">
              {s.name[0]}
            </div>
          ))}
          {cls.students.length > 3 && (
            <div className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-400">
              +{cls.students.length - 3}
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); openEditModal(cls); }}
            className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 active:scale-95 transition-all"
          >
            编辑
          </button>
          {cls.status !== 'closed' && (
            <button 
              onClick={(e) => { e.stopPropagation(); handleCloseClass(cls.id); }}
              className="px-3 py-1.5 bg-red-50 text-red-500 rounded-lg text-xs font-bold hover:bg-red-100 active:scale-95 transition-all"
            >
              结班
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-50/50 min-h-screen flex flex-col">
      <div className="bg-white/80 backdrop-blur-md px-4 py-3 border-b border-slate-200/60 flex items-center justify-between sticky top-0 z-10 shadow-sm transition-all duration-300">
        <button 
          onClick={onBack} 
          className="p-2 -ml-2 text-slate-600 hover:bg-slate-100/80 active:scale-95 rounded-full transition-all"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className="font-bold text-lg text-slate-800 tracking-tight">班级管理</h1>
        <button 
          onClick={openAddModal} 
          className="p-2 -mr-2 text-blue-600 hover:bg-blue-50 active:scale-95 rounded-full transition-all"
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="p-4 space-y-6">
        {lunchClasses.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 ml-1">午托班级</h2>
            <div className="space-y-4">
              {lunchClasses.map((cls, index) => renderClassCard(cls, index))}
            </div>
          </div>
        )}

        {dinnerClasses.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 ml-1">晚托班级</h2>
            <div className="space-y-4">
              {dinnerClasses.map((cls, index) => renderClassCard(cls, index))}
            </div>
          </div>
        )}
        
        {otherClasses.length > 0 && (
          <div>
             <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 ml-1">其他班级</h2>
             <div className="space-y-4">
              {otherClasses.map((cls, index) => renderClassCard(cls, index))}
            </div>
          </div>
        )}

        {classes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Users size={32} className="text-slate-300" />
            </div>
            <p className="text-sm font-medium">暂无班级，请点击右上角添加</p>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowAddModal(false)} />
          <div className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl scale-100 animate-in zoom-in-95 duration-300 relative z-10 ring-1 ring-black/5">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 backdrop-blur-xl">
              <h3 className="font-bold text-xl text-slate-800 tracking-tight">{isEditing ? '编辑班级' : '新建班级'}</h3>
              <button 
                onClick={() => setShowAddModal(false)} 
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all active:scale-90"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 ml-1">托管类型</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${classForm.custodyType === 'lunch' ? 'border-orange-200 bg-orange-50 text-orange-700' : 'border-slate-100 bg-slate-50 text-slate-500 hover:bg-white'}`}>
                    <input 
                      type="radio" 
                      name="custodyType" 
                      checked={classForm.custodyType === 'lunch'} 
                      onChange={() => setClassForm({...classForm, custodyType: 'lunch'})}
                      className="hidden"
                    />
                    <span className="font-bold">午托</span>
                  </label>
                  <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${classForm.custodyType === 'dinner' ? 'border-indigo-200 bg-indigo-50 text-indigo-700' : 'border-slate-100 bg-slate-50 text-slate-500 hover:bg-white'}`}>
                    <input 
                      type="radio" 
                      name="custodyType" 
                      checked={classForm.custodyType === 'dinner'} 
                      onChange={() => setClassForm({...classForm, custodyType: 'dinner'})}
                      className="hidden"
                    />
                    <span className="font-bold">晚托</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 ml-1">班级名称</label>
                <input
                  type="text"
                  value={classForm.name}
                  onChange={e => setClassForm({...classForm, name: e.target.value})}
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-800 placeholder:text-slate-400 font-medium hover:bg-white"
                  placeholder="如：一年级1班"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 ml-1">所属年级</label>
                <input
                  type="text"
                  value={classForm.grade}
                  onChange={e => setClassForm({...classForm, grade: e.target.value})}
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-800 placeholder:text-slate-400 font-medium hover:bg-white"
                  placeholder="如：一年级"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700 ml-1">主教老师</label>
                    <div className="relative">
                      <select
                        value={classForm.mainTeacher}
                        onChange={e => setClassForm({...classForm, mainTeacher: e.target.value})}
                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-800 font-medium hover:bg-white appearance-none"
                      >
                        <option value="">请选择主教</option>
                        {teachers.map(teacher => (
                          <option key={teacher} value={teacher}>{teacher}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <ChevronLeft size={16} className="-rotate-90" />
                      </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-700 ml-1">助教老师</label>
                    <div className="relative">
                      <select
                        value={classForm.assistantTeacher}
                        onChange={e => setClassForm({...classForm, assistantTeacher: e.target.value})}
                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-800 font-medium hover:bg-white appearance-none"
                      >
                        <option value="">请选择助教 (选填)</option>
                        {teachers.map(teacher => (
                          <option key={teacher} value={teacher}>{teacher}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <ChevronLeft size={16} className="-rotate-90" />
                      </div>
                    </div>
                </div>
              </div>

              <button
                onClick={handleSaveClass}
                disabled={!classForm.name || !classForm.grade || !classForm.mainTeacher}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 active:scale-[0.98] transition-all disabled:opacity-50 disabled:shadow-none mt-4 hover:brightness-110"
              >
                {isEditing ? '保存修改' : '确认创建'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassManagement;
