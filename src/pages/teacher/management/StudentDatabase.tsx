import React, { useState } from 'react';
import { ChevronLeft, Plus, Search, Filter, Phone, User, Calendar, MapPin, FileText, X } from 'lucide-react';
import { dataManager } from '../../../utils/dataManager';
import type { Student } from '../../../types';

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

  // Detail View
  if (view === 'detail' && selectedStudent) {
    return (
      <div className="bg-background min-h-screen flex flex-col font-sans">
         <div className="bg-background/90 backdrop-blur-md px-5 py-4 border-b-2 border-border-main/10 sticky top-0 z-10 flex items-center justify-between">
            <button onClick={() => setView('list')} className="w-10 h-10 rounded-full bg-white border-2 border-border-main flex items-center justify-center text-text-main shadow-pop active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all">
              <ChevronLeft size={24} strokeWidth={3} />
            </button>
            <h1 className="font-black text-xl text-text-main">学生档案</h1>
            <button className="text-text-main font-bold text-sm bg-secondary px-3 py-1.5 rounded-xl border-2 border-border-main shadow-pop active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all">
              编辑
            </button>
         </div>
         
         <div className="p-5 space-y-6">
            <div className="bg-white rounded-[2rem] p-6 shadow-pop border-2 border-border-main flex flex-col items-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-24 bg-surface-sun/50 border-b-2 border-border-main border-dashed"></div>
             
             <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-black border-4 border-border-main shadow-sm mb-4 relative z-10">
                {selectedStudent.name[0]}
             </div>
             
             <h2 className="text-3xl font-black text-text-main mb-2 relative z-10">{selectedStudent.name}</h2>
             
             <div className="flex items-center gap-2 mb-4 relative z-10">
                <span className="px-3 py-1 bg-background rounded-full text-xs font-bold text-text-main border-2 border-border-main">
                  {selectedStudent.grade}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 border-border-main ${
                  selectedStudent.status === 'active' 
                    ? 'bg-secondary text-text-main' 
                    : selectedStudent.status === 'graduated' 
                      ? 'bg-gray-300 text-text-main' 
                      : 'bg-primary text-white'
                }`}>
                  {selectedStudent.status === 'active' ? '在读' : selectedStudent.status === 'graduated' ? '毕业' : '休学'}
                </span>
             </div>
          </div>
            
            <div className="bg-white rounded-[2rem] p-6 shadow-pop border-2 border-border-main space-y-5">
                <h3 className="font-black text-text-main text-sm uppercase tracking-wider flex items-center gap-2">
                  <div className="w-3 h-3 bg-secondary rounded-full border-2 border-border-main"></div>
                  基本信息
                </h3>
                
                <div className="space-y-4">
                    <InfoRow label="联系电话" value={selectedStudent.phone} icon={<Phone size={16} />} />
                    <InfoRow label="家长姓名" value={selectedStudent.parent} icon={<User size={16} />} />
                    <InfoRow label="入学日期" value={selectedStudent.enrollDate || '未设置'} icon={<Calendar size={16} />} />
                    <InfoRow label="家庭住址" value={selectedStudent.address || '未填写'} icon={<MapPin size={16} />} />
                    <InfoRow label="备注信息" value={selectedStudent.notes || '无'} icon={<FileText size={16} />} />
                </div>
            </div>
         </div>
      </div>
    )
  }

  return (
    <div className="bg-background min-h-screen flex flex-col font-sans">
      {/* Header */}
      <div className="bg-background/90 backdrop-blur-md px-5 py-4 border-b-2 border-border-main/10 sticky top-0 z-10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <button 
               onClick={onBack} 
               className="w-10 h-10 rounded-full bg-white border-2 border-border-main flex items-center justify-center text-text-main shadow-pop active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
             >
              <ChevronLeft size={24} strokeWidth={3} />
            </button>
            <h1 className="font-black text-xl text-text-main">学生总库</h1>
          </div>
          <button 
            onClick={() => setView('add')}
            className="text-text-main text-sm font-bold flex items-center gap-2 bg-secondary px-4 py-2 rounded-xl border-2 border-border-main shadow-pop active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all hover:bg-secondary/80"
          >
            <Plus size={18} strokeWidth={3} />
            新增
          </button>
        </div>
        
        {/* Search & Filter */}
        <div className="flex gap-3">
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-text-main" size={18} strokeWidth={2.5} />
            </div>
            <input 
              type="text" 
              placeholder="搜索姓名/手机号" 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-3 bg-white border-2 border-border-main rounded-xl text-sm font-bold text-text-main focus:outline-none focus:bg-background transition-all placeholder:text-text-light shadow-sm focus:shadow-none focus:translate-x-[2px] focus:translate-y-[2px]"
            />
          </div>
          <div className="relative">
            <select 
              value={filterStatus}
              onChange={(e) => {
                const value = e.target.value as any;
                setFilterStatus(value);
              }}
              className="h-full pl-3 pr-8 bg-surface-sun border-2 border-border-main rounded-xl text-sm font-black text-text-main focus:outline-none appearance-none transition-all shadow-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
            >
              <option value="all">全部</option>
              <option value="active">在读</option>
              <option value="graduated">毕业</option>
            </select>
            <Filter className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-main pointer-events-none" size={16} strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="p-5 space-y-3 flex-1 overflow-y-auto pb-20">
        {filteredStudents.map((student) => (
          <div 
            key={student.id} 
            onClick={() => handleStudentClick(student)}
            className="bg-white p-4 rounded-2xl border-2 border-border-main shadow-pop flex items-center gap-4 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-200 cursor-pointer group"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg border-2 border-border-main transition-transform group-hover:rotate-6 ${
                student.status === 'active' 
                    ? 'bg-secondary text-text-main'
                    : 'bg-background text-text-light'
            }`}>
              {student.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1.5">
                <h3 className="font-black text-text-main truncate text-lg">{student.name}</h3>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border-2 border-border-main ${
                  student.status === 'active' ? 'bg-secondary/20 text-text-main' : 
                  student.status === 'graduated' ? 'bg-background text-text-light' : 'bg-primary/20 text-text-main'
                }`}>
                  {student.status === 'active' ? '在读' : student.status === 'graduated' ? '毕业' : '休学'}
                </span>
              </div>
              <div className="text-xs text-text-light font-bold flex items-center gap-3">
                <span className="bg-background px-2 py-0.5 rounded-md border border-border-main/20">{student.grade}</span>
                <span className="flex items-center gap-1">
                  <User size={12} strokeWidth={2.5} />
                  {student.parent}
                </span>
              </div>
            </div>
            <div className="flex items-center pl-2 border-l-2 border-border-main/10" onClick={e => e.stopPropagation()}>
               <a href={`tel:${student.phone}`} className="w-10 h-10 flex items-center justify-center text-text-main bg-background hover:bg-secondary border-2 border-border-main rounded-full transition-all active:scale-95">
                <Phone size={18} strokeWidth={2.5} />
              </a>
            </div>
          </div>
        ))}
        
        {filteredStudents.length === 0 && (
          <div className="text-center py-20 text-text-light">
            <div className="w-24 h-24 bg-background rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-border-main opacity-50">
              <Search size={40} className="text-text-main" />
            </div>
            <p className="font-bold text-text-main">未找到相关学生</p>
            <p className="text-xs text-text-light mt-1 font-bold">请尝试更换搜索关键词或筛选条件</p>
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
    <div className="bg-background min-h-screen flex flex-col font-sans">
      <div className="bg-background/90 backdrop-blur-md px-5 py-4 border-b-2 border-border-main/10 flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white border-2 border-border-main flex items-center justify-center text-text-main shadow-pop active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all">
          <X size={24} strokeWidth={3} />
        </button>
        <h1 className="font-black text-xl text-text-main">新增学生</h1>
        <button 
          onClick={handleSubmit}
          disabled={!formData.name || !formData.phone}
          className="text-text-main text-sm font-bold bg-primary px-4 py-2 rounded-xl border-2 border-border-main shadow-pop hover:bg-primary/90 active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none text-white"
        >
          保存
        </button>
      </div>

      <div className="p-5 space-y-6 overflow-y-auto flex-1 pb-10">
        <div className="bg-white rounded-[2rem] p-6 shadow-pop border-2 border-border-main space-y-6">
          <h3 className="font-black text-text-main border-b-2 border-border-main/10 pb-3 flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full border-2 border-border-main"></div>
            基本信息
          </h3>
          
          <InputGroup label="学生姓名" required>
            <input 
              type="text" 
              className="w-full px-4 py-3 bg-background border-2 border-border-main rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all font-bold text-text-main placeholder:text-text-light"
              placeholder="请输入姓名"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </InputGroup>
          
          <div className="grid grid-cols-2 gap-4">
             <InputGroup label="年级">
              <div className="relative">
                <select 
                    className="w-full px-4 py-3 bg-background border-2 border-border-main rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all font-bold text-text-main appearance-none"
                    value={formData.grade}
                    onChange={e => setFormData({...formData, grade: e.target.value})}
                >
                    {['一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '初一', '初二', '初三'].map(g => (
                    <option key={g} value={g}>{g}</option>
                    ))}
                </select>
                <ChevronLeft className="absolute right-3 top-1/2 -translate-y-1/2 rotate-[-90deg] text-text-main pointer-events-none" size={16} strokeWidth={3} />
              </div>
            </InputGroup>
            
            <InputGroup label="班级">
              <input 
                type="text" 
                className="w-full px-4 py-3 bg-background border-2 border-border-main rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all font-bold text-text-main placeholder:text-text-light"
                placeholder="例如: 1班"
                value={formData.class}
                onChange={e => setFormData({...formData, class: e.target.value})}
              />
            </InputGroup>
          </div>
          
           <InputGroup label="入学日期">
            <div className="relative">
                <input 
                type="date" 
                className="w-full px-4 py-3 bg-background border-2 border-border-main rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all font-bold text-text-main"
                value={formData.enrollDate}
                onChange={e => setFormData({...formData, enrollDate: e.target.value})}
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-text-main pointer-events-none" size={18} strokeWidth={2.5} />
            </div>
          </InputGroup>
        </div>

        <div className="bg-white rounded-[2rem] p-6 shadow-pop border-2 border-border-main space-y-6">
          <h3 className="font-black text-text-main border-b-2 border-border-main/10 pb-3 flex items-center gap-2">
            <div className="w-3 h-3 bg-secondary rounded-full border-2 border-border-main"></div>
            家庭信息
          </h3>
          
          <InputGroup label="家长姓名">
            <input 
              type="text" 
              className="w-full px-4 py-3 bg-background border-2 border-border-main rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all font-bold text-text-main placeholder:text-text-light"
              placeholder="请输入家长姓名"
              value={formData.parent}
              onChange={e => setFormData({...formData, parent: e.target.value})}
            />
          </InputGroup>
          
          <InputGroup label="联系电话" required>
            <input 
              type="tel" 
              className="w-full px-4 py-3 bg-background border-2 border-border-main rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all font-bold text-text-main placeholder:text-text-light"
              placeholder="请输入手机号"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </InputGroup>
          
          <InputGroup label="家庭住址">
            <textarea 
              className="w-full px-4 py-3 bg-background border-2 border-border-main rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all font-bold text-text-main placeholder:text-text-light min-h-[80px] resize-none"
              placeholder="请输入详细地址"
              value={formData.address}
              onChange={e => setFormData({...formData, address: e.target.value})}
            />
          </InputGroup>
          
           <InputGroup label="备注信息">
            <textarea 
              className="w-full px-4 py-3 bg-background border-2 border-border-main rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all font-bold text-text-main placeholder:text-text-light min-h-[80px] resize-none"
              placeholder="其他需要注意的事项..."
              value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})}
            />
          </InputGroup>
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, required, children }: { label: string, required?: boolean, children: React.ReactNode }) => (
  <div>
    <label className="block text-xs font-black text-text-light mb-2 uppercase tracking-wider ml-1">
      {label} {required && <span className="text-primary">*</span>}
    </label>
    {children}
  </div>
);

const InfoRow = ({ label, value, icon }: { label: string, value: string, icon: React.ReactElement }) => (
    <div className="flex items-center justify-between py-2 border-b-2 border-border-main/10 last:border-0">
        <div className="flex items-center gap-2 text-text-light">
            {React.cloneElement(icon as any, { size: 14, strokeWidth: 2.5 })}
            <span className="text-sm font-bold">{label}</span>
        </div>
        <span className="font-bold text-text-main text-right">{value}</span>
    </div>
);

export default StudentDatabase;
