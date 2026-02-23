import { useState } from 'react';
import { Home, Briefcase, User } from 'lucide-react';
import HomePage from './pages/Home';
import ClassDetail from './pages/ClassDetail';
import ManagementPage from './pages/Management';
import MinePage from './pages/Mine';
import MistakePage from './pages/Mistake';
import AttendancePage from './pages/AttendancePage';
import HomeworkPage from './pages/HomeworkPage';
import LeavePage from './pages/LeavePage';
import ClassNotification from './pages/ClassNotification';
import type { ViewState } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [mistakeClassId, setMistakeClassId] = useState<string | null>(null);
  const [attendanceClassId, setAttendanceClassId] = useState<string | null>(null);
  const [homeworkClassId, setHomeworkClassId] = useState<string | null>(null);
  const [initialTab, setInitialTab] = useState<'attendance' | 'homework' | 'review' | 'history' | 'affairs'>('attendance');

  // If a class is selected, show Class Detail (full screen)
  if (selectedClassId) {
    return (
      <ClassDetail 
        classId={selectedClassId} 
        onBack={() => {
          setSelectedClassId(null);
          setInitialTab('attendance');
        }} 
        initialTab={initialTab}
      />
    );
  }

  // Helper to determine which tab is active for the bottom bar
  const activeTab = ['home', 'mistake', 'leave', 'notification', 'attendance', 'homework'].includes(currentView) ? 'home' : currentView;

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pb-16">
        {currentView === 'home' && (
          <HomePage 
            onSelectClass={(id, tab) => {
              if (tab === 'mistake') {
                setMistakeClassId(id);
                setCurrentView('mistake');
              } else if (tab === 'attendance') {
                setAttendanceClassId(id);
                setCurrentView('attendance');
              } else if (tab === 'homework') {
                setHomeworkClassId(id);
                setCurrentView('homework');
              } else {
                setSelectedClassId(id);
                if (tab) setInitialTab(tab as any);
              }
            }} 
            onNavigate={setCurrentView}
          />
        )}
        {currentView === 'management' && <ManagementPage />}
        {currentView === 'mine' && <MinePage />}
        {currentView === 'mistake' && <MistakePage classId={mistakeClassId} onBack={() => setCurrentView('home')} />}
        {currentView === 'attendance' && <AttendancePage classId={attendanceClassId || ''} onBack={() => setCurrentView('home')} />}
        {currentView === 'homework' && <HomeworkPage classId={homeworkClassId || ''} onBack={() => setCurrentView('home')} />}
        {currentView === 'leave' && <LeavePage onBack={() => setCurrentView('home')} />}
        {currentView === 'notification' && <ClassNotification onBack={() => setCurrentView('home')} />}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center h-16 pb-safe z-50">
        <button 
          onClick={() => setCurrentView('home')}
          className={`flex flex-col items-center justify-center w-full h-full ${activeTab === 'home' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <Home size={24} />
          <span className="text-xs mt-1">首页</span>
        </button>
        <button 
          onClick={() => setCurrentView('management')}
          className={`flex flex-col items-center justify-center w-full h-full ${activeTab === 'management' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <Briefcase size={24} />
          <span className="text-xs mt-1">管理</span>
        </button>
        <button 
          onClick={() => setCurrentView('mine')}
          className={`flex flex-col items-center justify-center w-full h-full ${activeTab === 'mine' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <User size={24} />
          <span className="text-xs mt-1">我的</span>
        </button>
      </div>
    </div>
  );
}

export default App;
