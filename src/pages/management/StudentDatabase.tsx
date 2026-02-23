import React, { useState } from 'react';
import { ChevronLeft, Plus, Search, Filter, MoreHorizontal, Phone, User, Calendar, Edit, Trash2, X, Check, ArrowUp } from 'lucide-react';
import { dataManager } from '../../utils/dataManager';
import type { Student } from '../../utils/dataManager';

interface StudentDatabaseProps {
  onBack: () => void;
}

const StudentDatabase: React.FC<StudentDatabaseProps> = ({ onBack }) => {
  const [view, setView] = useState<'list' | 'add' | 'detail'>('list');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>(dataManager.getStudents());

  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'graduated'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student => {
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    const matchesSearch = student.name.includes(searchTerm) || student.phone.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const handleAddStudent = (newStudent: Omit<Student, 'id'>) => {
    const student = { ...newStudent, id: Date.now() };
    dataManager.addStudent(student);
    setStudents(dataManager.getStudents());
    setView('list');
  };

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
    setView('detail');
  };

  if (view === 'add') {
    return <AddStudentForm onBack={() => setView('list')} onSave={handleAddStudent} />;
  }

  // Simplified detail view for now
  if (view === 'detail' && selectedStudent) {
    return (
      <div className="bg-slate-50/50 min-h-screen flex flex-col">
         <div className="bg-white/80 backdrop-blur-md px-4 py-3 border-b border-slate-200/60 sticky top-0 z-10 flex items-center justify-between shadow-sm">
            <button onClick={() => setView('list')} className="p-2 -ml-2 text-slate-600 hover:bg-slate-100/80 rounded-full transition-all">
              <ChevronLeft size={22} />
            </button>
            <h1 className="font-bold text-lg text-slate-800">学生档案</h1>
            <button className="text-blue-600 font-medium text-sm">编辑</button>
         </div>
         <div className="p-4">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col items-center mb-4 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none"></div>
             <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold shadow-inner mb-4 ring-4 ring-white relative z-10">
                {selectedStudent.name[0]}
             </div>
             <h2 className="text-2xl font-bold text-slate-800 mb-1 relative z-10">{selectedStudent.name}</h2>
             <div className="flex items-center gap-2 mb-4 relative z-10">
                <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-600 border border-slate-200">{selectedStudent.grade}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  selectedStudent.status === 'active' 
                    ? 'bg-green-50 text-green-600 border-green-100' 
                    : selectedStudent.status === 'graduated' 
                      ? 'bg-slate-100 text-slate-500 border-slate-200' 
                      : 'bg-orange-50 text-orange-600 border-orange-100'
                }`}>
                  {selectedStudent.status === 'active' ? '在读' : selectedStudent.status === 'graduated' ? '毕业' : '休学'}
                </span>
             </div>
          </div>
            
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-4">
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider text-slate-400">基本信息</h3>
                <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center justify-between py-2 border-b border-slate-50">
                        <span className="text-slate-500 text-sm">联系电话</span>
                        <span className="font-medium text-slate-800">{selectedStudent.phone}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-slate-50">
                        <span className="text-slate-500 text-sm">家长姓名</span>
                        <span className="font-medium text-slate-800">{selectedStudent.parent}</span>
                    </div>
                     <div className="flex items-center justify-between py-2 border-b border-slate-50">
                        <span className="text-slate-500 text-sm">入学日期</span>
                        <span className="font-medium text-slate-800">{selectedStudent.enrollDate}</span>
                    </div>
                     <div className="py-2">
                        <span className="text-slate-500 text-sm block mb-1">家庭住址</span>
                        <span className="font-medium text-slate-800">{selectedStudent.address || '未填写'}</span>
                    </div>
                </div>
            </div>
         </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-50/50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md px-4 py-3 border-b border-slate-200/60 sticky top-0 z-10 space-y-3 shadow-sm transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
             <button 
               onClick={onBack} 
               className="p-2 -ml-2 text-slate-600 hover:bg-slate-100/80 active:scale-95 rounded-full transition-all"
             >
              <ChevronLeft size={22} />
            </button>
            <h1 className="font-bold text-lg text-slate-800 tracking-tight">学生总库</h1>
          </div>
          <button 
            onClick={() => setView('add')}
            className="text-white text-sm font-bold flex items-center gap-1.5 bg-blue-600 px-3.5 py-1.5 rounded-full shadow-md shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
          >
            <Plus size={16} strokeWidth={2.5} />
            新增
          </button>
        </div>
        
        {/* Search & Filter */}
        <div className="flex gap-3 px-1 pb-1">
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
            </div>
            <input 
              type="text" 
              placeholder="搜索姓名/手机号" 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-100/80 border-transparent border focus:border-blue-500/50 focus:bg-white rounded-2xl text-sm focus:outline-none transition-all font-medium shadow-sm focus:shadow-md focus:shadow-blue-500/10"
            />
          </div>
          <div className="relative">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="h-full pl-3 pr-8 bg-slate-100/80 border-transparent border focus:border-blue-500/50 focus:bg-white rounded-2xl text-sm font-bold text-slate-600 focus:outline-none appearance-none transition-all shadow-sm focus:shadow-md focus:shadow-blue-500/10"
            >
              <option value="all">全部状态</option>
              <option value="active">在读</option>
              <option value="graduated">毕业</option>
            </select>
            <Filter className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="p-4 space-y-3 flex-1 overflow-y-auto pb-20">
        {filteredStudents.map((student, index) => (
          <div 
            key={student.id} 
            onClick={() => handleStudentClick(student)}
            className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 active:scale-[0.98] hover:shadow-md transition-all duration-300 cursor-pointer group animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-inner ring-2 ring-white transition-transform group-hover:scale-110 duration-300 ${
                student.status === 'active' 
                    ? 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600'
                    : 'bg-slate-100 text-slate-400'
            }`}>
              {student.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1.5">
                <h3 className="font-bold text-slate-800 truncate text-base group-hover:text-blue-600 transition-colors">{student.name}</h3>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                  student.status === 'active' ? 'bg-green-50 text-green-600 border-green-100' : 
                  student.status === 'graduated' ? 'bg-slate-100 text-slate-500 border-slate-200' : 'bg-orange-50 text-orange-600 border-orange-100'
                }`}>
                  {student.status === 'active' ? '在读' : student.status === 'graduated' ? '毕业' : '休学'}
                </span>
              </div>
              <div className="text-xs text-slate-500 flex items-center gap-3">
                <span className="bg-slate-50 px-2 py-0.5 rounded-md font-medium text-slate-600 border border-slate-100">{student.grade}</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <User size={12} />
                  {student.parent}
                </span>
              </div>
            </div>
            <div className="flex items-center pl-2 border-l border-slate-50" onClick={e => e.stopPropagation()}>
               <a href={`tel:${student.phone}`} className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-green-600 hover:bg-green-50 active:scale-90 rounded-full transition-all">
                <Phone size={18} />
              </a>
            </div>
          </div>
        ))}
        
        {filteredStudents.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100 animate-pulse-slow">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                <Search size={32} className="text-slate-300" />
              </div>
            </div>
            <p className="font-medium text-slate-500">未找到相关学生</p>
            <p className="text-xs text-slate-400 mt-1">请尝试更换搜索关键词或筛选条件</p>
          </div>
        )}
      </div>
    </div>
  );
};

const AddStudentForm: React.FC<{ onBack: () => void, onSave: (s: Omit<Student, 'id'>) => void }> = ({ onBack, onSave }) => {
  const [formData, setFormData] = useState<Omit<Student, 'id'>>({
    name: '',
    grade: '一年级',
    class: '',
    parent: '',
    phone: '',
    status: 'active',
    enrollDate: new Date().toISOString().split('T')[0],
    address: '',
    notes: ''
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.phone) return;
    onSave(formData);
  };

  return (
    <div className="bg-slate-50/50 min-h-screen flex flex-col">
      <div className="bg-white/80 backdrop-blur-md px-4 py-3 border-b border-slate-200/60 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <button onClick={onBack} className="text-slate-600 font-medium hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors">取消</button>
        <h1 className="font-bold text-lg text-slate-800">新增学生</h1>
        <button 
          onClick={handleSubmit}
          disabled={!formData.name || !formData.phone}
          className="text-white text-sm font-bold bg-blue-600 px-4 py-1.5 rounded-full shadow-md shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
        >
          保存
        </button>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto flex-1 pb-10">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-5">
          <h3 className="font-bold text-slate-800 border-b border-slate-50 pb-3 flex items-center gap-2">
            <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
            基本信息
          </h3>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">学生姓名 <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:font-normal"
              placeholder="请输入姓名"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">年级</label>
              <div className="relative">
                <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none transition-all"
                    value={formData.grade}
                    onChange={e => setFormData({...formData, grade: e.target.value})}
                >
                    {['一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '初一', '初二', '初三'].map(g => (
                    <option key={g} value={g}>{g}</option>
                    ))}
                </select>
                <ChevronLeft className="absolute right-3 top-1/2 -translate-y-1/2 rotate-[-90deg] text-slate-400 pointer-events-none" size={16} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">班级</label>
              <input 
                type="text" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:font-normal"
                placeholder="例如: 1班"
                value={formData.class}
                onChange={e => setFormData({...formData, class: e.target.value})}
              />
            </div>
          </div>
          
           <div>
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">入学日期</label>
            <div className="relative">
                <input 
                type="date" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={formData.enrollDate}
                onChange={e => setFormData({...formData, enrollDate: e.target.value})}
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-5">
           <h3 className="font-bold text-slate-800 border-b border-slate-50 pb-3 flex items-center gap-2">
            <div className="w-1 h-4 bg-green-500 rounded-full"></div>
            家庭信息
          </h3>
          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">家长姓名</label>
                <input 
                type="text" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:font-normal"
                placeholder="请输入"
                value={formData.parent}
                onChange={e => setFormData({...formData, parent: e.target.value})}
                />
             </div>
             <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">联系电话 <span className="text-red-500">*</span></label>
                <input 
                type="tel" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:font-normal"
                placeholder="请输入"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                />
             </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">家庭住址</label>
            <input 
              type="text" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:font-normal"
              placeholder="请输入详细地址"
              value={formData.address}
              onChange={e => setFormData({...formData, address: e.target.value})}
            />
          </div>
           <div>
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">备注信息</label>
            <textarea 
              rows={3}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none placeholder:font-normal"
              placeholder="请输入备注..."
              value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDatabase;