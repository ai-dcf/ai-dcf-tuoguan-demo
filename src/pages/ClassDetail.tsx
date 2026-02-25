import React, { useState } from 'react';
import { ChevronLeft, UserCheck, FileText, Star, Clock } from 'lucide-react';
import AttendanceView from '../components/AttendanceView';
import HomeworkView from '../components/HomeworkView';
import ReviewView from '../components/ReviewView';
import HistoryView from '../components/HistoryView';

import { dataManager } from '../utils/dataManager';

interface ClassDetailProps {
  classId: string;
  onBack: () => void;
  initialTab?: Tab;
}

type Tab = 'attendance' | 'homework' | 'review' | 'history';

const ClassDetail: React.FC<ClassDetailProps> = ({ classId, onBack, initialTab = 'attendance' }) => {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const cls = dataManager.getClasses().find(c => c.id.toString() === classId);

  const tabs = [
    { id: 'attendance', label: '点名', icon: UserCheck },
    { id: 'homework', label: '作业', icon: FileText },
    { id: 'review', label: '点评', icon: Star },
    { id: 'history', label: '历史', icon: Clock },
  ];

  const getStatusLabel = (status?: string) => {
    switch(status) {
      case 'not_started': return { label: '未开始', color: 'bg-blue-50 text-blue-500 border-blue-100' };
      case 'in_progress': return { label: '进行中', color: 'bg-green-50 text-green-600 border-green-100' };
      case 'closed': return { label: '已结班', color: 'bg-slate-100 text-slate-500 border-slate-200' };
      default: return { label: '进行中', color: 'bg-green-50 text-green-600 border-green-100' };
    }
  };

  const statusInfo = getStatusLabel(cls?.status);

  return (
    <div className="flex flex-col h-screen bg-[#F5F7FA] font-sans selection:bg-blue-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-4 py-3 flex items-center gap-3 sticky top-0 z-50 transition-all shadow-sm">
        <button 
          onClick={onBack} 
          className="p-2 -ml-2 text-slate-600 hover:bg-slate-100/50 rounded-full transition-colors active:scale-95"
        >
          <ChevronLeft size={24} />
        </button>
        <div>
            <h1 className="font-bold text-lg text-slate-800 tracking-tight leading-tight flex items-center gap-2">
            {cls?.name || (classId === 'lunch-high' ? '午托高年级' : '晚托一年级')}
            <span className={`px-2 py-0.5 text-[10px] rounded-full border ${statusInfo.color}`}>{statusInfo.label}</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              托管班管理
            </p>
        </div>
      </div>

      {/* Floating Tabs */}
      <div className="sticky top-[61px] z-40 px-3 py-2 bg-[#F5F7FA]/95 backdrop-blur-md transition-all duration-300">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-1.5 flex justify-around ring-1 ring-black/5">
            {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
                <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex flex-col items-center py-2 px-1 flex-1 rounded-xl relative transition-all duration-300 ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600 shadow-sm scale-105 ring-1 ring-blue-100' 
                      : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
                >
                <Icon size={20} className={`mb-1 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-[10px] transition-all duration-300 ${isActive ? 'font-bold' : 'font-medium'}`}>{tab.label}</span>
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
