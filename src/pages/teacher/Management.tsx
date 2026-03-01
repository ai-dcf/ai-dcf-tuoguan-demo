import React, { useState } from 'react';
import { Settings, Users, School, BookOpen, Utensils, Bell, ChevronRight, Briefcase, GraduationCap, ArrowRight } from 'lucide-react';
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
    <div className="bg-[#F5F7FA] min-h-screen pb-24 font-sans selection:bg-blue-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl px-5 py-4 border-b border-slate-200/60 sticky top-0 z-20 flex items-center justify-between shadow-sm transition-all duration-300">
        <h1 className="font-bold text-xl text-slate-800 tracking-tight flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
          管理中心
        </h1>
        <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 active:scale-95 transition-all cursor-pointer hover:bg-slate-50 hover:shadow-md">
            <Settings size={20} className="text-slate-600" />
        </div>
      </div>

      <div className="p-4 space-y-6 max-w-2xl mx-auto">
        {/* Basic Settings */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            基础设置
          </h2>
          <div className="bg-white/70 backdrop-blur-lg rounded-[1.5rem] overflow-hidden shadow-sm border border-white/50 hover:shadow-md transition-shadow duration-300">
            <MenuItem 
              icon={<School size={20} />} 
              iconColor="text-blue-500"
              iconBg="bg-blue-50"
              label="机构信息" 
              onClick={() => setCurrentView('institution')}
            />
            <MenuItem 
              icon={<Settings size={20} />} 
              iconColor="text-slate-500"
              iconBg="bg-slate-50"
              label="周边学校库" 
              border={false} 
              onClick={() => setCurrentView('school-library')}
            />
          </div>
        </section>

        {/* Academic Management */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          <h2 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            教务管理
          </h2>
          <div className="bg-white/70 backdrop-blur-lg rounded-[1.5rem] overflow-hidden shadow-sm border border-white/50 hover:shadow-md transition-shadow duration-300">
            <MenuItem 
              icon={<Briefcase size={20} />} 
              iconColor="text-indigo-500"
              iconBg="bg-indigo-50"
              label="托管类型维护" 
              onClick={() => setCurrentView('custody-type')}
            />
            <MenuItem 
              icon={<Users size={20} />} 
              iconColor="text-indigo-500"
              iconBg="bg-indigo-50"
              label="班级管理" 
              onClick={() => setCurrentView('class-management')}
            />
            <MenuItem 
              icon={<BookOpen size={20} />} 
              iconColor="text-indigo-500"
              iconBg="bg-indigo-50"
              label="教学设置" 
              subLabel="学科/作业类型/表现标签" 
              border={false} 
              onClick={() => setCurrentView('teaching-settings')}
            />
          </div>
        </section>

        {/* Personnel Management */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
          <h2 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            人员管理
          </h2>
          <div className="bg-white/70 backdrop-blur-lg rounded-[1.5rem] overflow-hidden shadow-sm border border-white/50 hover:shadow-md transition-shadow duration-300">
            <MenuItem 
              icon={<Users size={20} />} 
              iconColor="text-green-500"
              iconBg="bg-green-50"
              label="教师管理" 
              onClick={() => setCurrentView('teacher-management')}
            />
            <MenuItem 
              icon={<GraduationCap size={20} />} 
              iconColor="text-green-500"
              iconBg="bg-green-50"
              label="学生总库" 
              subLabel="唯一新增入口" 
              border={false} 
              onClick={() => setCurrentView('student-database')}
            />
          </div>
        </section>

        {/* Operations Tools */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
          <h2 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            运营工具
          </h2>
          <div className="bg-white/70 backdrop-blur-lg rounded-[1.5rem] overflow-hidden shadow-sm border border-white/50 hover:shadow-md transition-shadow duration-300">
            <MenuItem 
              icon={<Utensils size={20} />} 
              iconColor="text-orange-500"
              iconBg="bg-orange-50"
              label="食谱发布" 
              onClick={() => setCurrentView('recipe-publishing')}
            />
            <MenuItem 
              icon={<Bell size={20} />} 
              iconColor="text-orange-500"
              iconBg="bg-orange-50"
              label="机构通知" 
              border={false} 
              onClick={() => setCurrentView('institution-notification')}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

interface MenuItemProps {
  icon: React.ReactNode;
  iconColor?: string;
  iconBg?: string;
  label: string;
  subLabel?: string;
  border?: boolean;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ 
  icon, 
  iconColor = "text-slate-500", 
  iconBg = "bg-slate-50", 
  label, 
  subLabel, 
  border = true, 
  onClick 
}) => {
  return (
    <div 
      onClick={onClick}
      className="group relative flex items-center justify-between p-4 cursor-pointer active:bg-slate-50/80 transition-all hover:bg-white/80"
    >
      <div className="flex items-center gap-4">
        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm ${iconBg} ${iconColor}`}>
          {icon}
        </div>
        <div>
          <div className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{label}</div>
          {subLabel && <div className="text-[10px] text-slate-400 mt-0.5 font-medium">{subLabel}</div>}
        </div>
      </div>
      <div className="flex items-center text-slate-300 group-hover:text-blue-400 transition-colors">
        <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        <ChevronRight size={18} className="group-hover:opacity-0 transition-all duration-300 absolute right-4" />
      </div>
      {border && <div className="absolute bottom-0 left-16 right-0 h-px bg-slate-100/60" />}
    </div>
  );
};

export default ManagementPage;
