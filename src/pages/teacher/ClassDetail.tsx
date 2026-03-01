import React, { useState } from 'react';
import { ChevronLeft, UserCheck, FileText, Star, Clock } from 'lucide-react';
import AttendanceView from '../../components/AttendanceView';
import HomeworkView from '../../components/HomeworkView';
import ReviewView from '../../components/ReviewView';
import HistoryView from '../../components/HistoryView';

import { dataManager } from '../../utils/dataManager';

interface ClassDetailProps {
  classId: string;
  onBack: () => void;
  initialTab?: Tab;
}

type Tab = 'attendance' | 'homework' | 'review' | 'history';

const ClassDetail: React.FC<ClassDetailProps> = ({ classId, onBack, initialTab = 'attendance' }) => {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab as Tab);
  const cls = dataManager.getClasses().find(c => c.id.toString() === classId);

  const tabs = [
    { id: 'attendance', label: '点名', icon: UserCheck },
    { id: 'homework', label: '作业', icon: FileText },
    { id: 'review', label: '点评', icon: Star },
    { id: 'history', label: '历史', icon: Clock },
  ];

  return (
    <div className="flex flex-col h-screen bg-background font-sans">
      {/* Header */}
      <div className="bg-background/90 backdrop-blur-xl border-b-2 border-border-main/10 px-5 py-4 flex items-center gap-4 sticky top-0 z-50">
        <button 
          onClick={onBack} 
          className="w-10 h-10 rounded-full bg-white border-2 border-border-main flex items-center justify-center text-text-main shadow-pop active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
        >
          <ChevronLeft size={24} strokeWidth={3} />
        </button>
        <div>
            <h1 className="font-black text-xl text-text-main leading-tight flex items-center gap-2">
              {cls?.name || '未知班级'}
              <span className="px-2 py-0.5 text-[10px] rounded-full border-2 border-border-main bg-secondary text-text-main">进行中</span>
            </h1>
            <p className="text-xs text-text-light font-bold mt-0.5 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-secondary border border-border-main"></span>
              托管班管理
            </p>
        </div>
      </div>

      {/* Floating Tabs */}
      <div className="sticky top-[76px] z-40 px-5 py-2 bg-background/95 backdrop-blur-md">
        <div className="bg-white rounded-2xl shadow-pop border-2 border-border-main p-2 flex justify-around">
            {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
                <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex flex-col items-center py-2 px-1 flex-1 rounded-xl relative transition-all duration-200 ${
                    isActive 
                      ? 'bg-accent text-text-main border-2 border-border-main shadow-sm -translate-y-1' 
                      : 'text-text-light hover:bg-surface-sun'
                }`}
                >
                <Icon size={20} className={`mb-1 transition-transform ${isActive ? 'scale-110' : ''}`} strokeWidth={isActive ? 3 : 2.5} />
                <span className={`text-[10px] ${isActive ? 'font-black' : 'font-bold'}`}>{tab.label}</span>
                </button>
            );
            })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-6 px-3">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === 'attendance' && <AttendanceView />}
            {activeTab === 'homework' && <HomeworkView />}
            {activeTab === 'review' && <ReviewView />}
            {activeTab === 'history' && <HistoryView />}
        </div>
      </div>
    </div>
  );
};

export default ClassDetail;
