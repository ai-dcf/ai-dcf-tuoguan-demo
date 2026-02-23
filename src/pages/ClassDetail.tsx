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
    <div className="flex flex-col h-screen bg-[#F5F7FA]">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-100/50 px-4 py-3 flex items-center gap-3 sticky top-0 z-50 transition-all">
        <button 
          onClick={onBack} 
          className="p-2 -ml-2 text-slate-600 hover:bg-slate-100/50 rounded-full transition-colors active:scale-95"
        >
          <ChevronLeft size={24} />
        </button>
        <div>
            <h1 className="font-bold text-lg text-slate-800 tracking-tight leading-tight">
            {classId === 'lunch-high' ? '午托高年级' : '晚托一年级'}
            </h1>
            <p className="text-[10px] text-slate-500 font-medium">托管班管理</p>
        </div>
      </div>

      {/* Floating Tabs */}
      <div className="sticky top-[60px] z-40 px-3 py-2 bg-[#F5F7FA]/90 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100/50 p-1 flex justify-around">
            {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
                <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex flex-col items-center py-2 px-3 rounded-xl relative transition-all duration-300 ${
                    isActive ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
                >
                <Icon size={20} className={`mb-1 transition-transform ${isActive ? 'scale-110' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-bold">{tab.label}</span>
                </button>
            );
            })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-6">
        <div className="animate-in fade-in duration-500">
            {activeTab === 'attendance' && <AttendanceView />}
            {activeTab === 'homework' && <HomeworkView />}
            {activeTab === 'review' && <ReviewView />}
            {activeTab === 'history' && <HistoryView />}
            {activeTab === 'affairs' && <ClassAffairsView />}
        </div>
      </div>
    </div>
  );
};

export default ClassDetail;
