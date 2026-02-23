import React, { useState } from 'react';
import { ChevronLeft, Plus, Phone, MoreHorizontal, UserCog, ShieldCheck, Trash, BookOpen, X } from 'lucide-react';

interface TeacherManagementProps {
  onBack: () => void;
}

interface Teacher {
  id: number;
  name: string;
  phone: string;
  role: 'admin' | 'teacher' | 'assistant';
  status: 'active' | 'inactive';
  classes?: string[];
}

const getRoleLabel = (role: Teacher['role']) => {
  switch(role) {
    case 'admin': return '管理员';
    case 'teacher': return '主班老师';
    case 'assistant': return '助教';
    default: return role;
  }
};

const getRoleColor = (role: Teacher['role']) => {
    switch(role) {
      case 'admin': return 'bg-purple-50 text-purple-600 border border-purple-100';
      case 'teacher': return 'bg-blue-50 text-blue-600 border border-blue-100';
      case 'assistant': return 'bg-orange-50 text-orange-600 border border-orange-100';
      default: return 'bg-slate-50 text-slate-600 border border-slate-100';
    }
  };

  const TeacherDetailView: React.FC<{
    teacher: Teacher;
    onBack: () => void;
    onDelete: (id: number) => void;
  }> = ({ teacher, onBack, onDelete }) => {
    return (
      <div className="bg-slate-50/50 min-h-screen flex flex-col">
        <div className="bg-white/80 backdrop-blur-md px-4 py-3 border-b border-slate-200/60 flex items-center justify-between sticky top-0 z-10 shadow-sm transition-all duration-300">
          <button 
            onClick={onBack} 
            className="p-2 -ml-2 text-slate-600 hover:bg-slate-100/80 active:scale-95 rounded-full transition-all"
          >
            <ChevronLeft size={22} />
          </button>
          <h1 className="font-bold text-lg text-slate-800 tracking-tight">教师详情</h1>
          <button 
            onClick={() => onDelete(teacher.id)} 
            className="p-2 -mr-2 text-red-500 hover:bg-red-50 active:scale-95 rounded-full transition-all"
          >
            <Trash size={20} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
            <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold text-3xl mb-4 shadow-inner">
              {teacher.name[0]}
            </div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">{teacher.name}</h2>
            <div className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(teacher.role)}`}>
              {getRoleLabel(teacher.role)}
            </div>
            <div className="flex items-center gap-2 text-slate-500 mt-5 bg-slate-50 px-4 py-2 rounded-xl">
              <Phone size={16} />
              <span className="font-medium font-mono">{teacher.phone}</span>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 mb-3 px-1 flex items-center gap-2">
              <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
              负责班级
            </h3>
            <div className="space-y-2.5">
              {teacher.classes && teacher.classes.length > 0 ? (
                teacher.classes.map((cls, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-3 shadow-sm">
                    <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
                      <BookOpen size={20} />
                    </div>
                    <span className="font-bold text-slate-700">{cls}</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-2">
                    <BookOpen size={20} className="text-slate-300" />
                  </div>
                  <p className="text-sm">暂未分配班级</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

const TeacherManagement: React.FC<TeacherManagementProps> = ({ onBack }) => {
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([
    { id: 1, name: '张老师', phone: '13900139001', role: 'admin', status: 'active', classes: ['一年级1班'] },
    { id: 2, name: '李老师', phone: '13900139002', role: 'teacher', status: 'active', classes: ['二年级2班'] },
    { id: 3, name: '王助教', phone: '13900139003', role: 'assistant', status: 'active', classes: [] },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newTeacher, setNewTeacher] = useState({ name: '', phone: '', role: 'teacher' as Teacher['role'] });

  const handleAdd = () => {
    if (newTeacher.name && newTeacher.phone) {
      setTeachers([...teachers, { 
        id: Date.now(), 
        ...newTeacher, 
        status: 'active',
        classes: []
      }]);
      setShowModal(false);
      setNewTeacher({ name: '', phone: '', role: 'teacher' });
    }
  };

  const handleTeacherClick = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setView('detail');
  };

  const handleDeleteTeacher = (id: number) => {
    if (confirm('确定要删除这位老师吗？')) {
      setTeachers(teachers.filter(t => t.id !== id));
      setView('list');
      setSelectedTeacher(null);
    }
  };

  if (view === 'detail' && selectedTeacher) {
    return (
      <TeacherDetailView 
        teacher={selectedTeacher} 
        onBack={() => setView('list')} 
        onDelete={handleDeleteTeacher}
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
        <h1 className="font-bold text-lg text-slate-800">教师管理</h1>
        <button onClick={() => setShowModal(true)} className="p-1 text-blue-600 active:bg-blue-50 rounded-full">
          <Plus size={24} />
        </button>
      </div>

      {/* List */}
      <div className="p-4 space-y-3">
        {teachers.map(teacher => (
          <div 
            key={teacher.id} 
            onClick={() => handleTeacherClick(teacher)}
            className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between active:scale-[0.99] transition-transform cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold">
                {teacher.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-800">{teacher.name}</h3>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${getRoleColor(teacher.role)}`}>
                    {getRoleLabel(teacher.role)}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                  <Phone size={10} />
                  {teacher.phone}
                </div>
              </div>
            </div>
            
            <button className="p-2 text-slate-300 hover:text-slate-500 rounded-full active:bg-slate-50">
              <MoreHorizontal size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-800">添加教师</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">教师姓名</label>
                <input
                  type="text"
                  value={newTeacher.name}
                  onChange={e => setNewTeacher({...newTeacher, name: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="请输入姓名"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">手机号码</label>
                <input
                  type="tel"
                  value={newTeacher.phone}
                  onChange={e => setNewTeacher({...newTeacher, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="请输入手机号"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">角色权限</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['admin', 'teacher', 'assistant'] as const).map(role => (
                    <button
                      key={role}
                      onClick={() => setNewTeacher({...newTeacher, role})}
                      className={`px-2 py-2 text-sm rounded-lg border transition-colors ${
                        newTeacher.role === role 
                          ? 'bg-blue-50 border-blue-200 text-blue-600 font-medium' 
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {getRoleLabel(role)}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={handleAdd}
                disabled={!newTeacher.name || !newTeacher.phone}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold active:scale-[0.98] transition-transform disabled:opacity-50 mt-2"
              >
                确认添加
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherManagement;
