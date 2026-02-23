import React, { useState } from 'react';
import { ChevronLeft, Plus, Bell, Clock, Eye, Send } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  readCount: number;
  totalCount: number;
  isUrgent?: boolean;
}

export default function ClassNotification({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<'list' | 'create'>('list');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: '本周五家长会通知',
      content: '请各位家长于本周五下午3点准时参加家长会，地点在教学楼301会议室。届时将讨论本学期的教学计划和学生的学习情况，请务必出席。',
      author: '张老师',
      date: '2026-02-23 09:00',
      readCount: 25,
      totalCount: 30,
      isUrgent: true
    },
    {
      id: '2',
      title: '春季运动会报名开始',
      content: '一年一度的春季运动会即将开始，请有意向报名的同学在班长处登记。项目包括跑步、跳远、跳高等。',
      author: '李老师',
      date: '2026-02-21 14:30',
      readCount: 18,
      totalCount: 30
    },
    {
      id: '3',
      title: '关于调整放学时间的通知',
      content: '从下周一开始，放学时间调整为下午5点半，请各位家长注意接送时间。',
      author: '王老师',
      date: '2026-02-20 10:00',
      readCount: 30,
      totalCount: 30
    }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);

  const handlePublish = () => {
    if (!newTitle || !newContent) return;
    
    const newNotification: Notification = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      author: '我',
      date: new Date().toLocaleString(),
      readCount: 0,
      totalCount: 30,
      isUrgent
    };
    
    setNotifications([newNotification, ...notifications]);
    setView('list');
    setNewTitle('');
    setNewContent('');
    setIsUrgent(false);
  };

  if (view === 'create') {
    return (
      <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans selection:bg-blue-100">
        <div className="bg-white/80 backdrop-blur-xl px-4 py-3 border-b border-slate-200/60 sticky top-0 z-10 flex items-center gap-2 shadow-sm">
          <button 
            onClick={() => setView('list')} 
            className="p-2 -ml-2 text-slate-600 hover:bg-slate-100/80 active:scale-95 rounded-full transition-all"
          >
            <ChevronLeft size={22} />
          </button>
          <h1 className="font-bold text-lg text-slate-800 tracking-tight">发布通知</h1>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto max-w-2xl mx-auto w-full">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1">
                <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
                通知标题
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="请输入标题"
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium placeholder:text-slate-400"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1">
                <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
                通知内容
              </label>
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="请输入详细内容..."
                rows={8}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium resize-none placeholder:text-slate-400 leading-relaxed"
              />
            </div>
            
            <div className="flex items-center gap-3 py-2 bg-slate-50/50 p-3 rounded-xl border border-slate-100/50">
              <div 
                onClick={() => setIsUrgent(!isUrgent)}
                className={`w-12 h-7 rounded-full relative transition-colors duration-300 cursor-pointer shadow-inner ${isUrgent ? 'bg-red-500' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ${isUrgent ? 'translate-x-5' : ''}`} />
              </div>
              <span className={`text-sm font-bold transition-colors ${isUrgent ? 'text-red-500' : 'text-slate-600'}`}>
                {isUrgent ? '已设为紧急通知' : '设为紧急通知'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-white/80 backdrop-blur-md border-t border-slate-100 sticky bottom-0 safe-area-bottom z-20">
          <button
            onClick={handlePublish}
            disabled={!newTitle || !newContent}
            className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg shadow-blue-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
              !newTitle || !newContent 
                ? 'bg-slate-300 shadow-none cursor-not-allowed opacity-70' 
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-300'
            }`}
          >
            <Send size={18} strokeWidth={2.5} />
            立即发布
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-6 font-sans selection:bg-blue-100">
      <div className="bg-white/80 backdrop-blur-xl px-4 py-3 border-b border-slate-200/60 sticky top-0 z-10 shadow-sm transition-all duration-300">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <button 
              onClick={onBack} 
              className="p-2 -ml-2 text-slate-600 hover:bg-slate-100/80 active:scale-95 rounded-full transition-all"
            >
              <ChevronLeft size={22} />
            </button>
            <h1 className="font-bold text-lg text-slate-800 tracking-tight">班级通知</h1>
          </div>
          <button 
            onClick={() => setView('create')}
            className="flex items-center gap-1.5 text-white text-sm font-bold bg-blue-600 px-4 py-2 rounded-full shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all hover:shadow-blue-300"
          >
            <Plus size={16} strokeWidth={2.5} /> 发布
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4 max-w-2xl mx-auto">
        {notifications.map((note, index) => (
          <div 
            key={note.id} 
            className={`bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 group hover:scale-[1.01] animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm transition-transform group-hover:scale-110 ${
                  note.isUrgent 
                    ? 'bg-red-50 text-red-500 ring-2 ring-red-100' 
                    : 'bg-blue-50 text-blue-500 ring-2 ring-blue-100'
                }`}>
                  <Bell size={20} className={note.isUrgent ? 'animate-pulse' : ''} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base leading-tight mb-1.5 group-hover:text-blue-600 transition-colors">
                    {note.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                    <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">{note.author}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {note.date}</span>
                  </div>
                </div>
              </div>
              {note.isUrgent && (
                <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-red-100 flex-shrink-0 animate-pulse shadow-sm shadow-red-100">
                  紧急
                </span>
              )}
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-4 pl-[56px] text-justify">
              {note.content}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-slate-50 pl-[56px]">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <Eye size={14} className="text-blue-400" />
                <span>已读 {note.readCount}/{note.totalCount}</span>
              </div>
              
              <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000"
                  style={{ width: `${(note.readCount / note.totalCount) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
        
        <div className="text-center py-8">
          <p className="text-xs text-slate-300 font-medium tracking-wide">没有更多通知了</p>
        </div>
      </div>
    </div>
  );
}
