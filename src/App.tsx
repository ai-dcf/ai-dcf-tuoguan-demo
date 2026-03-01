import { useState } from 'react';
import { Home, Briefcase, User, BookOpen } from 'lucide-react';
import type { User as UserType, TeacherViewState, ParentViewState, Student } from './types';
import { dataManager } from './utils/dataManager';
import Login from './pages/Login';
import TeacherHome from './pages/teacher/Home';
import ClassDetail from './pages/teacher/ClassDetail';
import TeacherManagement from './pages/teacher/Management';
import TeacherMine from './pages/teacher/Mine';
import TeacherMistake from './pages/teacher/Mistake';
import TeacherAttendance from './pages/teacher/AttendancePage';
import TeacherHomework from './pages/teacher/HomeworkPage';
import TeacherLeave from './pages/teacher/LeavePage';
import ClassNotification from './pages/teacher/ClassNotification';
import ParentHome from './pages/parent/HomePage';
import ParentLearning from './pages/parent/LearningPage';
import ParentMine from './pages/parent/MinePage';
import ParentMistake from './pages/parent/MistakePage';
import ParentRecipe from './pages/parent/RecipePage';
import ParentLeave from './pages/parent/LeavePage';
import ParentReview from './pages/parent/ReviewPage';

export default function App() {
  const initialUser = dataManager.getCurrentUser();
  const initialChildren = initialUser?.role === 'parent' ? dataManager.getParentChildren(initialUser.id) : [];
  const initialActiveChild = initialChildren[0] ?? null;

  const [currentUser, setCurrentUser] = useState<UserType | null>(initialUser);

  const [teacherView, setTeacherView] = useState<TeacherViewState>('home');
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [mistakeClassId, setMistakeClassId] = useState<string | null>(null);
  const [attendanceClassId, setAttendanceClassId] = useState<string | null>(null);
  const [homeworkClassId, setHomeworkClassId] = useState<string | null>(null);
  const [teacherInitialTab, setTeacherInitialTab] = useState<'attendance' | 'homework' | 'review' | 'history'>('attendance');

  const [parentView, setParentView] = useState<ParentViewState>('home');
  const [children, setChildren] = useState<Student[]>(initialChildren);
  const [activeChild, setActiveChild] = useState<Student | null>(initialActiveChild);

  const handleLogin = (user: UserType) => {
    setCurrentUser(user);
    if (user.role === 'parent') {
      const kids = dataManager.getParentChildren(user.id);
      setChildren(kids);
      if (kids.length > 0) setActiveChild(kids[0]);
      setParentView('home');
    } else {
      setTeacherView('home');
    }
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  if (currentUser.role === 'teacher' || currentUser.role === 'admin') {
    if (selectedClassId) {
      return (
        <ClassDetail 
          classId={selectedClassId} 
          onBack={() => {
            setSelectedClassId(null);
            setTeacherInitialTab('attendance');
          }} 
          initialTab={teacherInitialTab}
        />
      );
    }

    const activeTab = ['home', 'mistake', 'leave', 'notification', 'attendance', 'homework'].includes(teacherView) ? 'home' : teacherView;

    return (
      <div className="flex flex-col h-screen bg-slate-50 text-slate-900 font-sans">
        <div className="flex-1 overflow-y-auto pb-16">
          {teacherView === 'home' && (
            <TeacherHome 
              onSelectClass={(id, tab) => {
                if (tab === 'mistake') {
                  setMistakeClassId(id);
                  setTeacherView('mistake');
                } else if (tab === 'attendance') {
                  setAttendanceClassId(id);
                  setTeacherView('attendance');
                } else if (tab === 'homework') {
                  setHomeworkClassId(id);
                  setTeacherView('homework');
                } else {
                  setSelectedClassId(id);
                  setTeacherInitialTab('attendance');
                }
              }} 
              onNavigate={setTeacherView}
            />
          )}
          {teacherView === 'management' && <TeacherManagement />}
          {teacherView === 'mine' && <TeacherMine />}
          {teacherView === 'mistake' && <TeacherMistake classId={mistakeClassId} onBack={() => setTeacherView('home')} />}
          {teacherView === 'attendance' && <TeacherAttendance classId={attendanceClassId || ''} onBack={() => setTeacherView('home')} />}
          {teacherView === 'homework' && <TeacherHomework classId={homeworkClassId || ''} onBack={() => setTeacherView('home')} />}
          {teacherView === 'leave' && <TeacherLeave onBack={() => setTeacherView('home')} />}
          {teacherView === 'notification' && <ClassNotification onBack={() => setTeacherView('home')} />}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 flex justify-around items-center h-16 pb-safe z-50 shadow-lg">
          <button onClick={() => setTeacherView('home')} className={`flex flex-col items-center justify-center w-full h-full ${activeTab === 'home' ? 'text-blue-600' : 'text-slate-400'}`}>
            <Home size={24} />
            <span className="text-[10px] font-medium mt-1">首页</span>
          </button>
          <button onClick={() => setTeacherView('management')} className={`flex flex-col items-center justify-center w-full h-full ${activeTab === 'management' ? 'text-blue-600' : 'text-slate-400'}`}>
            <Briefcase size={24} />
            <span className="text-[10px] font-medium mt-1">管理</span>
          </button>
          <button onClick={() => setTeacherView('mine')} className={`flex flex-col items-center justify-center w-full h-full ${activeTab === 'mine' ? 'text-blue-600' : 'text-slate-400'}`}>
            <User size={24} />
            <span className="text-[10px] font-medium mt-1">我的</span>
          </button>
        </div>
      </div>
    );
  }

  if (currentUser.role === 'parent' && activeChild) {
    return (
      <div className="flex flex-col h-screen bg-slate-50 text-slate-900 font-sans">
        <div className="flex-1 overflow-y-auto pb-20">
          {parentView === 'home' && (
            <ParentHome 
              activeChild={activeChild} 
              children={children} 
              onChildSwitch={setActiveChild}
              onNavigate={(view) => setParentView(view)}
            />
          )}
          {parentView === 'learning' && (
            <ParentLearning 
              activeChild={activeChild}
              onBack={() => setParentView('home')}
              onNavigate={(view) => setParentView(view)}
            />
          )}
          {parentView === 'recipe' && <ParentRecipe onBack={() => setParentView('home')} />}
          {parentView === 'leave-apply' && <ParentLeave activeChild={activeChild} onBack={() => setParentView('home')} />}
          {parentView === 'mistake-detail' && <ParentMistake activeChild={activeChild} onBack={() => setParentView('home')} />}
          {parentView === 'review' && <ParentReview activeChild={activeChild} onBack={() => setParentView('home')} />}
          {parentView === 'mine' && <ParentMine activeChild={activeChild} children={children} />}
        </div>

        <div className="fixed bottom-0 left-0 right-0 glass pb-safe z-50">
          <div className="flex justify-around items-center h-16 px-2">
            <button onClick={() => setParentView('home')} className={`flex-1 flex flex-col items-center justify-center h-full ${parentView === 'home' ? 'text-blue-600 scale-105' : 'text-slate-400'}`}>
              <Home size={24} />
              <span className="text-[10px] font-bold mt-0.5">首页</span>
            </button>
            <button onClick={() => setParentView('learning')} className={`flex-1 flex flex-col items-center justify-center h-full ${parentView === 'learning' ? 'text-blue-600 scale-105' : 'text-slate-400'}`}>
              <BookOpen size={24} />
              <span className="text-[10px] font-bold mt-0.5">学情</span>
            </button>
            <button onClick={() => setParentView('mine')} className={`flex-1 flex flex-col items-center justify-center h-full ${parentView === 'mine' ? 'text-blue-600 scale-105' : 'text-slate-400'}`}>
              <User size={24} />
              <span className="text-[10px] font-bold mt-0.5">我的</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <div>Loading...</div>;
}
