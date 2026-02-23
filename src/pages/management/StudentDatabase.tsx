import React, { useState } from 'react';
import { ChevronLeft, Plus, Search, Filter, MoreHorizontal, Phone, User, Calendar, Edit, Trash2, X } from 'lucide-react';
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

  if (view === 'detail' && selectedStudent) {
    return <StudentDetailView student={selectedStudent} onBack={() => setView('list')} />;
  }

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-slate-100 sticky top-0 z-10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
             <button onClick={onBack} className="p-1 -ml-1 text-slate-600 active:bg-slate-100 rounded-full">
              <ChevronLeft size={24} />
            </button>
            <h1 className="font-bold text-lg text-slate-800">学生总库</h1>
          </div>
          <button 
            onClick={() => setView('add')}
            className="text-blue-600 font-medium text-sm flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-full active:bg-blue-100"
          >
            <Plus size={16} />
            新增
          </button>
        </div>
        
        {/* Search & Filter */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="搜索姓名/手机号" 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-shadow"
            />
          </div>
          <div className="relative">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="h-full px-3 bg-slate-100 rounded-lg text-sm text-slate-600 focus:outline-none appearance-none pr-8"
            >
              <option value="all">全部</option>
              <option value="active">在读</option>
              <option value="graduated">毕业</option>
            </select>
            <Filter className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="p-4 space-y-3 flex-1 overflow-y-auto pb-20">
        {filteredStudents.map(student => (
          <div 
            key={student.id} 
            onClick={() => handleStudentClick(student)}
            className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3 active:scale-[0.99] transition-transform cursor-pointer"
          >
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center font-bold text-lg">
              {student.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-800 truncate">{student.name}</h3>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  student.status === 'active' ? 'bg-green-50 text-green-600' : 
                  student.status === 'graduated' ? 'bg-slate-100 text-slate-500' : 'bg-orange-50 text-orange-600'
                }`}>
                  {student.status === 'active' ? '在读' : student.status === 'graduated' ? '毕业' : '休学'}
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                <span className="bg-slate-50 px-1.5 py-0.5 rounded text-slate-600">{student.grade} {student.class}</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <User size={12} />
                  {student.parent}
                </span>
              </div>
            </div>
            <div className="flex items-center" onClick={e => e.stopPropagation()}>
               <a href={`tel:${student.phone}`} className="p-2 text-slate-400 hover:text-green-500 active:bg-slate-50 rounded-full transition-colors">
                <Phone size={20} />
              </a>
            </div>
          </div>
        ))}
        
        {filteredStudents.length === 0 && (
            <div className="text-center py-12 text-slate-400">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Search size={24} className="text-slate-300" />
                </div>
                <p>未找到相关学生</p>
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
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <div className="bg-white px-4 py-3 border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack} className="text-slate-600">取消</button>
        <h1 className="font-bold text-lg text-slate-800">新增学生</h1>
        <button 
          onClick={handleSubmit}
          disabled={!formData.name || !formData.phone}
          className="text-blue-600 font-medium disabled:text-slate-300"
        >
          保存
        </button>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto flex-1">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 space-y-4">
          <h3 className="font-bold text-slate-800 border-b border-slate-50 pb-2">基本信息</h3>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">学生姓名 <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="请输入姓名"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
             <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">年级</label>
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                value={formData.grade}
                onChange={e => setFormData({...formData, grade: e.target.value})}
              >
                {['一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '初一', '初二', '初三'].map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">班级</label>
              <input 
                type="text" 
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="例: 1班"
                value={formData.class}
                onChange={e => setFormData({...formData, class: e.target.value})}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">入学日期</label>
            <input 
              type="date" 
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={formData.enrollDate}
              onChange={e => setFormData({...formData, enrollDate: e.target.value})}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 space-y-4">
          <h3 className="font-bold text-slate-800 border-b border-slate-50 pb-2">家庭信息</h3>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">家长姓名</label>
            <input 
              type="text" 
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="请输入家长姓名"
              value={formData.parent}
              onChange={e => setFormData({...formData, parent: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">联系电话 <span className="text-red-500">*</span></label>
            <input 
              type="tel" 
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="请输入手机号"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">家庭住址</label>
            <input 
              type="text" 
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="请输入详细地址"
              value={formData.address}
              onChange={e => setFormData({...formData, address: e.target.value})}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 space-y-4">
          <h3 className="font-bold text-slate-800 border-b border-slate-50 pb-2">其他信息</h3>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">备注</label>
            <textarea 
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 h-24 resize-none"
              placeholder="例如：过敏史、性格特点等"
              value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const StudentDetailView: React.FC<{ student: Student, onBack: () => void }> = ({ student, onBack }) => {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <div className="bg-white px-4 py-3 border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack} className="text-slate-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg text-slate-800">学生详情</h1>
        <button className="text-slate-600">
          <Edit size={20} />
        </button>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto flex-1">
        {/* Profile Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col items-center">
          <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-3xl mb-3">
            {student.name[0]}
          </div>
          <h2 className="text-xl font-bold text-slate-800">{student.name}</h2>
          <div className="text-slate-500 text-sm mt-1 mb-4">{student.grade} {student.class}</div>
          
          <div className="flex gap-3 w-full">
            <a 
              href={`tel:${student.phone}`}
              className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium active:bg-blue-100 transition-colors"
            >
              <Phone size={18} /> 呼叫家长
            </a>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-50 text-slate-600 rounded-lg font-medium active:bg-slate-100 transition-colors">
              <Calendar size={18} /> 考勤记录
            </button>
          </div>
        </div>

        {/* Info List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <InfoRow label="学籍状态" value={student.status === 'active' ? '在读' : student.status === 'graduated' ? '毕业' : '休学'} />
          <InfoRow label="家长姓名" value={student.parent || '未填写'} />
          <InfoRow label="联系电话" value={student.phone} />
          <InfoRow label="入学日期" value={student.enrollDate || '未填写'} />
          <InfoRow label="家庭住址" value={student.address || '未填写'} />
          <InfoRow label="备注信息" value={student.notes || '无'} last />
        </div>

        {/* Danger Zone */}
        <div className="mt-8">
           <button className="w-full py-3 bg-white text-red-500 font-medium rounded-xl border border-red-100 shadow-sm active:bg-red-50 flex items-center justify-center gap-2">
             <Trash2 size={18} /> 删除学生
           </button>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value, last }: { label: string, value: string, last?: boolean }) => (
  <div className={`flex justify-between items-center p-4 ${!last && 'border-b border-slate-50'}`}>
    <span className="text-slate-500 text-sm">{label}</span>
    <span className="text-slate-800 text-sm font-medium">{value}</span>
  </div>
);

export default StudentDatabase;
