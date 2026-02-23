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
            className="p-2 -mr-2 text-red-500 hover:bg-red-50 active:scale-90 rounded-full transition-all"
          >
            <Trash size={20} />
          </button>
        </div>

        <div className="p-4 space-y-5">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col items-center relative overflow-hidden transition-all duration-300 hover:shadow-md">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-blue-50/50 to-transparent"></div>
            <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold text-4xl mb-4 shadow-inner relative z-10 ring-4 ring-white shadow-slate-200">
              {teacher.name[0]}
            </div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight relative z-10">{teacher.name}</h2>
            <div className={`mt-3 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm ${getRoleColor(teacher.role)} relative z-10`}>
              {getRoleLabel(teacher.role)}
            </div>
            <div className="flex items-center gap-2.5 text-slate-500 mt-6 bg-slate-50 px-5 py-2.5 rounded-2xl border border-slate-100 relative z-10 group hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-default">
              <Phone size={18} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
              <span className="font-bold font-mono text-lg tracking-wide group-hover:text-blue-700 transition-colors">{teacher.phone}</span>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 mb-4 px-1 flex items-center gap-2.5 text-lg">
              <div className="w-1.5 h-5 bg-blue-600 rounded-full shadow-sm shadow-blue-200"></div>
              负责班级
            </h3>
            <div className="space-y-3">
              {teacher.classes && teacher.classes.length > 0 ? (
                teacher.classes.map((cls, index) => (
                  <div key={index} className="bg-white p-4 rounded-2xl border border-slate-200/60 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-0.5">
                    <div className="bg-blue-50 p-3 rounded-xl text-blue-600 shadow-sm shadow-blue-100 group-hover:scale-110 transition-transform duration-300">
                      <BookOpen size={22} />
                    </div>
                    <span className="font-bold text-slate-700 text-lg group-hover:text-blue-700 transition-colors">{cls}</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 text-slate-400 bg-white rounded-3xl border border-dashed border-slate-200">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen size={24} className="text-slate-300" />
                  </div>
                  <p className="text-sm font-medium">暂未分配班级</p>
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
    <div className="bg-slate-50/50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md px-4 py-3 border-b border-slate-200/60 sticky top-0 z-10 flex items-center justify-between shadow-sm transition-all duration-300">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-600 hover:bg-slate-100/80 active:scale-95 rounded-full transition-all">
          <ChevronLeft size={22} />
        </button>
        <h1 className="font-bold text-lg text-slate-800 tracking-tight">教师管理</h1>
        <button onClick={() => setShowModal(true)} className="p-2 -mr-2 text-blue-600 hover:bg-blue-50 active:scale-95 rounded-full transition-all">
          <Plus size={24} />
        </button>
      </div>

      {/* List */}
      <div className="p-4 space-y-3">
        {teachers.map(teacher => (
          <div 
            key={teacher.id} 
            onClick={() => handleTeacherClick(teacher)}
            className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex items-center justify-between active:scale-[0.98] transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold text-lg shadow-inner group-hover:scale-105 transition-transform duration-300">
                {teacher.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-slate-800 text-lg tracking-tight group-hover:text-blue-700 transition-colors">{teacher.name}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${getRoleColor(teacher.role)}`}>
                    {getRoleLabel(teacher.role)}
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5 bg-slate-50 px-2 py-0.5 rounded-md w-fit group-hover:bg-blue-50/50 group-hover:text-blue-500 transition-colors">
                  <Phone size={12} />
                  <span className="font-mono">{teacher.phone}</span>
                </div>
              </div>
            </div>
            
            <button className="p-2 text-slate-300 hover:text-slate-500 rounded-full active:bg-slate-50 transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>
        ))}
        
        {teachers.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <UserCog size={32} className="text-slate-300" />
            </div>
            <p className="text-sm font-medium">暂无教师信息，请点击右上角添加</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowModal(false)} />
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl scale-100 animate-in zoom-in-95 duration-300 relative z-10">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/80 backdrop-blur-sm">
              <h3 className="font-bold text-lg text-slate-800">添加教师</h3>
              <button 
                onClick={() => setShowModal(false)} 
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all active:scale-90"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-slate-700 ml-1">姓名</label>
                <input
                  type="text"
                  value={newTeacher.name}
                  onChange={e => setNewTeacher({...newTeacher, name: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-800 placeholder:text-slate-400 font-medium hover:bg-slate-50/80"
                  placeholder="请输入姓名"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-slate-700 ml-1">手机号</label>
                <input
                  type="tel"
                  value={newTeacher.phone}
                  onChange={e => setNewTeacher({...newTeacher, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-800 placeholder:text-slate-400 font-medium hover:bg-slate-50/80"
                  placeholder="请输入手机号"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-slate-700 ml-1">角色</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['admin', 'teacher', 'assistant'] as const).map((role) => (
                    <button
                      key={role}
                      onClick={() => setNewTeacher({...newTeacher, role})}
                      className={`py-2.5 rounded-xl text-sm font-bold transition-all border ${
                        newTeacher.role === role 
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/30' 
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
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
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3.5 rounded-xl font-bold text-base shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 active:scale-[0.98] transition-all disabled:opacity-50 disabled:shadow-none mt-2"
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
