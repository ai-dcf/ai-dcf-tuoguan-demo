import React, { useState } from 'react';
import { Settings, Users, School, BookOpen, Utensils, Bell, ChevronRight, Briefcase, GraduationCap } from 'lucide-react';
import InstitutionInfo from './management/InstitutionInfo';
import SchoolLibrary from './management/SchoolLibrary';
import ClassManagement from './management/ClassManagement';
import StudentDatabase from './management/StudentDatabase';
import CustodyType from './management/CustodyType';
import TeachingSettings from './management/TeachingSettings';
import TeacherManagement from './management/TeacherManagement';
import RecipePublishing from './management/RecipePublishing';
import InstitutionNotification from './management/InstitutionNotification';

type ManagementView = 'menu' | 'institution' | 'school-library' | 'class-management' | 'student-database' | 'custody-type' | 'teaching-settings' | 'teacher-management' | 'recipe-publishing' | 'institution-notification';

const ManagementPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<ManagementView>('menu');

  if (currentView === 'institution') return <InstitutionInfo onBack={() => setCurrentView('menu')} />;
  if (currentView === 'school-library') return <SchoolLibrary onBack={() => setCurrentView('menu')} />;
  if (currentView === 'class-management') return <ClassManagement onBack={() => setCurrentView('menu')} />;
  if (currentView === 'student-database') return <StudentDatabase onBack={() => setCurrentView('menu')} />;
  if (currentView === 'custody-type') return <CustodyType onBack={() => setCurrentView('menu')} />;
  if (currentView === 'teaching-settings') return <TeachingSettings onBack={() => setCurrentView('menu')} />;
  if (currentView === 'teacher-management') return <TeacherManagement onBack={() => setCurrentView('menu')} />;
  if (currentView === 'recipe-publishing') return <RecipePublishing onBack={() => setCurrentView('menu')} />;
  if (currentView === 'institution-notification') return <InstitutionNotification onBack={() => setCurrentView('menu')} />;

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-slate-100 sticky top-0 z-10">
        <h1 className="font-bold text-lg text-slate-800">管理中心</h1>
      </div>

      {/* Basic Settings */}
      <div className="mt-4 px-4">
        <h2 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">基础设置</h2>
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100">
          <MenuItem 
            icon={<School className="text-blue-500" />} 
            label="机构信息" 
            onClick={() => setCurrentView('institution')}
          />
          <MenuItem 
            icon={<Settings className="text-slate-500" />} 
            label="周边学校库" 
            border={false} 
            onClick={() => setCurrentView('school-library')}
          />
        </div>
      </div>

      {/* Academic Management */}
      <div className="mt-6 px-4">
        <h2 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">教务管理</h2>
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100">
          <MenuItem 
            icon={<Briefcase className="text-indigo-500" />} 
            label="托管类型维护" 
            onClick={() => setCurrentView('custody-type')}
          />
          <MenuItem 
            icon={<Users className="text-indigo-500" />} 
            label="班级管理" 
            onClick={() => setCurrentView('class-management')}
          />
          <MenuItem 
            icon={<BookOpen className="text-indigo-500" />} 
            label="教学设置" 
            subLabel="学科/作业类型/表现标签" 
            border={false} 
            onClick={() => setCurrentView('teaching-settings')}
          />
        </div>
      </div>

      {/* Personnel Management */}
      <div className="mt-6 px-4">
        <h2 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">人员管理</h2>
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100">
          <MenuItem 
            icon={<Users className="text-green-500" />} 
            label="教师管理" 
            onClick={() => setCurrentView('teacher-management')}
          />
          <MenuItem 
            icon={<GraduationCap className="text-green-500" />} 
            label="学生总库" 
            subLabel="唯一新增入口" 
            border={false} 
            onClick={() => setCurrentView('student-database')}
          />
        </div>
      </div>

      {/* Operations Tools */}
      <div className="mt-6 px-4">
        <h2 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">运营工具</h2>
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100">
          <MenuItem 
            icon={<Utensils className="text-orange-500" />} 
            label="食谱发布" 
            onClick={() => setCurrentView('recipe-publishing')}
          />
          <MenuItem 
            icon={<Bell className="text-orange-500" />} 
            label="机构通知" 
            border={false} 
            onClick={() => setCurrentView('institution-notification')}
          />
        </div>
      </div>
    </div>
  );
};

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  subLabel?: string;
  border?: boolean;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, subLabel, border = true, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center justify-between p-4 active:bg-slate-50 transition-colors cursor-pointer ${border ? 'border-b border-slate-50' : ''}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
          {React.cloneElement(icon as React.ReactElement, { size: 18 })}
        </div>
        <div>
          <div className="text-sm font-medium text-slate-800">{label}</div>
          {subLabel && <div className="text-xs text-slate-400 mt-0.5">{subLabel}</div>}
        </div>
      </div>
      <ChevronRight size={16} className="text-slate-300" />
    </div>
  );
};

export default ManagementPage;
