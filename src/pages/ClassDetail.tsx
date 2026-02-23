import React, { useState } from 'react';
import { ChevronLeft, UserCheck, FileText, Star, Clock, Users } from 'lucide-react';
import AttendanceView from '../components/AttendanceView';
import HomeworkView from '../components/HomeworkView';
import ReviewView from '../components/ReviewView';
import HistoryView from '../components/HistoryView';
import ClassAffairsView from '../components/ClassAffairsView';

interface ClassDetailProps {
  classId: string;
  onBack: () => void;
  initialTab?: Tab;
}

type Tab = 'attendance' | 'homework' | 'review' | 'history' | 'affairs';

const ClassDetail: React.FC<ClassDetailProps> = ({ classId, onBack, initialTab = 'attendance' }) => {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  const tabs = [
    { id: 'attendance', label: '点名', icon: UserCheck },
    { id: 'homework', label: '作业', icon: FileText },
    { id: 'review', label: '点评', icon: Star },
    { id: 'history', label: '历史', icon: Clock },
    { id: 'affairs', label: '班务', icon: Users },
  ];

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-20">
        <button onClick={onBack} className="p-1 -ml-1 text-slate-600 active:bg-slate-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg text-slate-900">
          {classId === 'lunch-high' ? '午托高年级' : '晚托一年级'}
        </h1>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200 flex justify-around px-2 sticky top-14 z-20">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex flex-col items-center py-3 px-2 relative transition-colors ${
                isActive ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              <Icon size={20} className="mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full mx-4" />
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-slate-50">
        {activeTab === 'attendance' && <AttendanceView />}
        {activeTab === 'homework' && <HomeworkView />}
        {activeTab === 'review' && <ReviewView />}
        {activeTab === 'history' && <HistoryView />}
        {activeTab === 'affairs' && <ClassAffairsView />}
      </div>
    </div>
  );
};

export default ClassDetail;
