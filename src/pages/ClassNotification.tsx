import React, { useState } from 'react';
import { ChevronLeft, Plus, Image as ImageIcon, Send, Bell, CheckCircle } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  content: string;
  date: string;
  target: string[];
  status: 'sent' | 'draft';
  readCount: number;
  totalCount: number;
}

const ClassNotification: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [view, setView] = useState<'list' | 'create'>('list');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: '本周五春游活动安排',
      content: '各位家长好，本周五我们将组织春游活动，请为孩子准备好水壶和零食...',
      date: '2026-02-23 10:00',
      target: ['全班家长'],
      status: 'sent',
      readCount: 15,
      totalCount: 18
    },
    {
      id: '2',
      title: '关于近期流感高发的提醒',
      content: '近期流感高发，请各位家长注意孩子身体状况...',
      date: '2026-02-20 14:30',
      target: ['全班家长'],
      status: 'sent',
      readCount: 18,
      totalCount: 18
    }
  ]);

  const handlePublish = (data: { title: string, content: string }) => {
    const newNotif: Notification = {
      id: Date.now().toString(),
      title: data.title,
      content: data.content,
      date: new Date().toLocaleString(),
      target: ['全班家长'],
      status: 'sent',
      readCount: 0,
      totalCount: 18
    };
    setNotifications([newNotif, ...notifications]);
    setView('list');
  };

  if (view === 'create') {
    return <CreateNotification onBack={() => setView('list')} onPublish={handlePublish} />;
  }

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <div className="bg-white px-4 py-3 border-b border-slate-100 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-1 -ml-1 text-slate-600 active:bg-slate-100 rounded-full">
              <ChevronLeft size={24} />
            </button>
            <h1 className="font-bold text-lg text-slate-800">班级通知</h1>
          </div>
          <button 
            onClick={() => setView('create')}
            className="flex items-center gap-1 text-blue-600 text-sm font-medium bg-blue-50 px-3 py-1.5 rounded-full active:bg-blue-100"
          >
            <Plus size={16} /> 发布
          </button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {notifications.map(notif => (
          <div key={notif.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-slate-800 text-base">{notif.title}</h3>
              <span className="text-xs text-slate-400">{notif.date.split(' ')[0]}</span>
            </div>
            <p className="text-sm text-slate-600 mb-3 line-clamp-2">{notif.content}</p>
            
            <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-50">
              <div className="flex items-center gap-2">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                  {notif.target.join(', ')}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle size={14} className="text-green-500" />
                <span>已读 {notif.readCount}/{notif.totalCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CreateNotification: React.FC<{ onBack: () => void, onPublish: (data: any) => void }> = ({ onBack, onPublish }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="px-4 py-3 border-b border-slate-100 sticky top-0 bg-white z-10 flex items-center justify-between">
        <button onClick={onBack} className="text-slate-600">取消</button>
        <h1 className="font-bold text-lg text-slate-800">发布通知</h1>
        <button 
          onClick={() => onPublish({ title, content })}
          disabled={!title || !content}
          className="text-blue-600 font-medium disabled:text-slate-300"
        >
          发布
        </button>
      </div>

      <div className="p-4 flex-1">
        <input
          type="text"
          placeholder="请输入通知标题"
          className="w-full text-lg font-bold placeholder:text-slate-300 border-none outline-none mb-4"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          placeholder="请输入通知正文..."
          className="w-full h-64 text-base text-slate-600 placeholder:text-slate-300 border-none outline-none resize-none"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        
        <div className="flex gap-4 mt-4">
          <button className="w-20 h-20 bg-slate-50 rounded-lg border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400">
            <ImageIcon size={24} />
            <span className="text-xs mt-1">添加图片</span>
          </button>
        </div>
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50">
        <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200">
          <span className="text-sm text-slate-600">发送范围</span>
          <span className="text-sm font-medium text-slate-800">全班家长 &gt;</span>
        </div>
      </div>
    </div>
  );
};

export default ClassNotification;
