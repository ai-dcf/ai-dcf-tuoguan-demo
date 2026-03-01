import React, { useState } from 'react';
import { Settings, Users, School, BookOpen, Utensils, Bell, Briefcase, GraduationCap, ArrowRight, UserCheck } from 'lucide-react';
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
    <div className="bg-background min-h-screen pb-24 font-sans">
      {/* Header */}
      <div className="bg-background/90 backdrop-blur-xl px-5 py-6 border-b-2 border-border-main/10 sticky top-0 z-20 flex items-center justify-between">
        <h1 className="font-black text-2xl text-text-main tracking-tight flex items-center gap-2">
          <div className="w-3 h-8 bg-primary rounded-full border-2 border-border-main shadow-pop-sm"></div>
          管理中心
        </h1>
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-border-main shadow-pop-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer">
            <Settings size={20} className="text-text-main" strokeWidth={2.5} />
        </div>
      </div>

      <div className="p-5 space-y-8 max-w-2xl mx-auto">
        {/* Basic Settings */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-text-main text-sm font-black uppercase tracking-wider mb-4 px-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-text-main"></span>
            基础设置
          </h2>
          <div className="space-y-3">
            <MenuItem 
              icon={<School size={20} />} 
              color="bg-primary"
              label="机构信息" 
              onClick={() => setCurrentView('institution')}
            />
            <MenuItem 
              icon={<Settings size={20} />} 
              color="bg-accent"
              label="周边学校库" 
              onClick={() => setCurrentView('school-library')}
            />
          </div>
        </section>

        {/* Academic Management */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          <h2 className="text-text-main text-sm font-black uppercase tracking-wider mb-4 px-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-text-main"></span>
            教务管理
          </h2>
          <div className="space-y-3">
            <MenuItem 
              icon={<Briefcase size={20} />} 
              color="bg-secondary"
              label="托管类型维护" 
              onClick={() => setCurrentView('custody-type')}
            />
            <MenuItem 
              icon={<Users size={20} />} 
              color="bg-secondary"
              label="班级管理" 
              onClick={() => setCurrentView('class-management')}
            />
            <MenuItem 
              icon={<BookOpen size={20} />} 
              color="bg-secondary"
              label="教学设置" 
              subLabel="学科/作业类型/表现标签" 
              onClick={() => setCurrentView('teaching-settings')}
            />
          </div>
        </section>

        {/* Personnel Management */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
          <h2 className="text-text-main text-sm font-black uppercase tracking-wider mb-4 px-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-text-main"></span>
            人员管理
          </h2>
          <div className="space-y-3">
            <MenuItem 
              icon={<UserCheck size={20} />} 
              color="bg-secondary-light"
              label="教师管理" 
              onClick={() => setCurrentView('teacher-management')}
            />
            <MenuItem 
              icon={<GraduationCap size={20} />} 
              color="bg-secondary-light"
              label="学生库" 
              onClick={() => setCurrentView('student-database')}
            />
          </div>
        </section>

        {/* Operation Management */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
          <h2 className="text-text-main text-sm font-black uppercase tracking-wider mb-4 px-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-text-main"></span>
            运营管理
          </h2>
          <div className="space-y-3">
            <MenuItem 
              icon={<Utensils size={20} />} 
              color="bg-primary-light"
              label="食谱发布" 
              onClick={() => setCurrentView('recipe-publishing')}
            />
            <MenuItem 
              icon={<Bell size={20} />} 
              color="bg-primary-light"
              label="机构通知" 
              onClick={() => setCurrentView('institution-notification')}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

const MenuItem = ({ icon, label, subLabel, onClick, color }: { 
  icon: React.ReactNode, 
  label: string, 
  subLabel?: string, 
  onClick: () => void,
  color: string
}) => (
  <button 
    onClick={onClick}
    className="w-full bg-white p-4 rounded-2xl border-2 border-border-main shadow-pop flex items-center justify-between group active:translate-x-[2px] active:translate-y-[2px] active:shadow-pop-sm transition-all"
  >
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl border-2 border-border-main flex items-center justify-center text-text-main ${color} shadow-pop-sm group-hover:rotate-6 transition-transform`}>
        {icon}
      </div>
      <div className="text-left">
        <div className="font-black text-text-main text-lg">{label}</div>
        {subLabel && <div className="text-xs font-bold text-text-muted mt-0.5">{subLabel}</div>}
      </div>
    </div>
    <div className="w-8 h-8 rounded-full bg-surface-muted border-2 border-border-main flex items-center justify-center text-text-main group-hover:bg-text-main group-hover:text-white transition-colors">
      <ArrowRight size={16} strokeWidth={3} />
    </div>
  </button>
);

export default ManagementPage;
