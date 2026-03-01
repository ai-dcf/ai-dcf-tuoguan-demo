import React, { useState } from 'react';
import { ChevronLeft, Plus, Phone, MoreHorizontal, UserCog, Trash, BookOpen, X } from 'lucide-react';

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
      case 'admin': return 'bg-accent text-text-main border-2 border-border-main';
      case 'teacher': return 'bg-secondary text-text-main border-2 border-border-main';
      case 'assistant': return 'bg-surface-sun text-text-main border-2 border-border-main';
      default: return 'bg-background text-text-light border-2 border-border-main';
    }
  };

  const TeacherDetailView: React.FC<{
    teacher: Teacher;
    onBack: () => void;
    onDelete: (id: number) => void;
  }> = ({ teacher, onBack, onDelete }) => {
    return (
      <div className="bg-background min-h-screen flex flex-col font-sans">
        <div className="bg-background/90 backdrop-blur-md px-4 py-3 border-b-2 border-border-main/10 flex items-center justify-between sticky top-0 z-10 shadow-sm transition-all duration-300">
          <button 
            onClick={onBack} 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-border-main text-text-main shadow-pop active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
          >
            <ChevronLeft size={24} strokeWidth={3} />
          </button>
          <h1 className="font-black text-lg text-text-main tracking-tight">教师详情</h1>
          <button 
            onClick={() => onDelete(teacher.id)} 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white border-2 border-border-main shadow-pop active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
          >
            <Trash size={20} strokeWidth={2.5} />
          </button>
        </div>

        <div className="p-4 space-y-5">
          <div className="bg-white p-6 rounded-[2rem] border-2 border-border-main shadow-pop flex flex-col items-center relative overflow-hidden transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-24 bg-surface-sun/50"></div>
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-text-main font-black text-4xl mb-4 border-2 border-border-main relative z-10 shadow-sm">
              {teacher.name[0]}
            </div>
            <h2 className="text-2xl font-black text-text-main tracking-tight relative z-10">{teacher.name}</h2>
            <div className={`mt-3 px-4 py-1.5 rounded-full text-sm font-black shadow-sm ${getRoleColor(teacher.role)} relative z-10`}>
              {getRoleLabel(teacher.role)}
            </div>
            <div className="flex items-center gap-2.5 text-text-main mt-6 bg-background px-5 py-2.5 rounded-2xl border-2 border-border-main relative z-10">
              <Phone size={18} className="text-text-light" strokeWidth={2.5} />
              <span className="font-bold font-mono text-lg tracking-wide">{teacher.phone}</span>
            </div>
          </div>

          <div>
            <h3 className="font-black text-text-main mb-4 px-1 flex items-center gap-2.5 text-lg">
              <div className="w-1.5 h-5 bg-secondary rounded-full border border-border-main"></div>
              负责班级
            </h3>
            <div className="space-y-3">
              {teacher.classes && teacher.classes.length > 0 ? (
                teacher.classes.map((cls, index) => (
                  <div key={index} className="bg-white p-4 rounded-[2rem] border-2 border-border-main flex items-center gap-4 shadow-pop hover:-translate-y-0.5 transition-all duration-300">
                    <div className="bg-secondary p-3 rounded-xl text-text-main border-2 border-border-main shadow-sm">
                      <BookOpen size={22} strokeWidth={2.5} />
                    </div>
                    <span className="font-black text-text-main text-lg">{cls}</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 text-text-light bg-white rounded-[2rem] border-2 border-dashed border-border-main">
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-border-main">
                    <BookOpen size={24} className="text-text-light" strokeWidth={2.5} />
                  </div>
                  <p className="text-sm font-bold">暂未分配班级</p>
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
    <div className="bg-background min-h-screen flex flex-col font-sans">
      {/* Header */}
      <div className="bg-background/90 backdrop-blur-md px-4 py-3 border-b-2 border-border-main/10 sticky top-0 z-10 flex items-center justify-between shadow-sm transition-all duration-300">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-border-main text-text-main shadow-pop active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all">
          <ChevronLeft size={24} strokeWidth={3} />
        </button>
        <h1 className="font-black text-lg text-text-main tracking-tight">教师管理</h1>
        <button onClick={() => setShowModal(true)} className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-text-main border-2 border-border-main shadow-sm active:scale-95 transition-all">
          <Plus size={24} strokeWidth={3} />
        </button>
      </div>

      {/* List */}
      <div className="p-4 space-y-3">
        {teachers.map(teacher => (
          <div 
            key={teacher.id} 
            onClick={() => handleTeacherClick(teacher)}
            className="bg-white p-4 rounded-[2rem] border-2 border-border-main shadow-pop flex items-center justify-between active:scale-[0.98] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-background rounded-full flex items-center justify-center text-text-main font-black text-lg border-2 border-border-main group-hover:bg-surface-sun transition-colors duration-300">
                {teacher.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-black text-text-main text-lg tracking-tight">{teacher.name}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${getRoleColor(teacher.role)}`}>
                    {getRoleLabel(teacher.role)}
                  </span>
                </div>
                <div className="text-xs text-text-light font-bold flex items-center gap-1.5 bg-background px-2 py-0.5 rounded-md w-fit border border-border-main/20">
                  <Phone size={12} strokeWidth={2.5} />
                  <span className="font-mono">{teacher.phone}</span>
                </div>
              </div>
            </div>
            
            <button className="p-2 text-text-light hover:text-text-main rounded-full active:bg-background transition-colors">
              <MoreHorizontal size={24} strokeWidth={2.5} />
            </button>
          </div>
        ))}
        
        {teachers.length === 0 && (
          <div className="text-center py-16 text-text-light">
            <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-border-main">
              <UserCog size={32} className="text-text-light" strokeWidth={2.5} />
            </div>
            <p className="text-sm font-bold">暂无教师信息，请点击右上角添加</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowModal(false)} />
          <div className="bg-white rounded-[2rem] w-full max-w-sm overflow-hidden shadow-pop scale-100 animate-in zoom-in-95 duration-300 relative z-10 border-2 border-border-main">
            <div className="px-6 py-4 border-b-2 border-border-main/10 flex justify-between items-center bg-background">
              <h3 className="font-black text-lg text-text-main">添加教师</h3>
              <button 
                onClick={() => setShowModal(false)} 
                className="p-1.5 text-text-light hover:text-text-main hover:bg-black/5 rounded-full transition-all active:scale-90"
              >
                <X size={24} strokeWidth={2.5} />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="block text-sm font-black text-text-main ml-1">姓名</label>
                <input
                  type="text"
                  value={newTeacher.name}
                  onChange={e => setNewTeacher({...newTeacher, name: e.target.value})}
                  className="w-full px-4 py-3 bg-background border-2 border-border-main rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-text-main placeholder:text-text-light font-bold"
                  placeholder="请输入姓名"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-black text-text-main ml-1">手机号</label>
                <input
                  type="tel"
                  value={newTeacher.phone}
                  onChange={e => setNewTeacher({...newTeacher, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-background border-2 border-border-main rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-text-main placeholder:text-text-light font-bold"
                  placeholder="请输入手机号"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-black text-text-main ml-1">角色</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['admin', 'teacher', 'assistant'] as const).map((role) => (
                    <button
                      key={role}
                      onClick={() => setNewTeacher({...newTeacher, role})}
                      className={`py-2.5 rounded-xl text-sm font-black transition-all border-2 ${
                        newTeacher.role === role 
                          ? 'bg-secondary text-text-main border-border-main shadow-sm' 
                          : 'bg-white text-text-light border-border-main/20 hover:border-border-main'
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
                className="w-full bg-primary text-white py-3.5 rounded-xl font-black text-base shadow-pop border-2 border-border-main hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:shadow-none mt-2 active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
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
