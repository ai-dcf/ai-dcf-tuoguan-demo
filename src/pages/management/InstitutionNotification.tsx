import React, { useState } from 'react';
import { ChevronLeft, Plus, Bell, Clock, Trash2 } from 'lucide-react';

interface InstitutionNotificationProps {
  onBack: () => void;
}

interface Notification {
  id: number;
  title: string;
  content: string;
  date: string;
  readCount: number;
}

const NotificationDetailView: React.FC<{
  notification: Notification;
  onBack: () => void;
  onDelete: (id: number) => void;
}> = ({ notification, onBack, onDelete }) => {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <div className="bg-white px-4 py-3 border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack} className="text-slate-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg text-slate-800">通知详情</h1>
        <button onClick={() => onDelete(notification.id)} className="text-red-500">
          <Trash2 size={20} />
        </button>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-2 leading-tight">{notification.title}</h2>
          <div className="flex items-center gap-4 text-xs text-slate-400 mb-6 pb-4 border-b border-slate-50">
            <div className="flex items-center gap-1.5">
              <Clock size={14} />
              <span>{notification.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bell size={14} />
              <span>{notification.readCount} 已读</span>
            </div>
          </div>
          
          <div className="text-slate-600 text-base leading-relaxed whitespace-pre-wrap">
            {notification.content}
          </div>
        </div>
      </div>
    </div>
  );
};

const InstitutionNotification: React.FC<InstitutionNotificationProps> = ({ onBack }) => {
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: '国庆放假通知', content: '各位家长好，根据国家法定节假日安排，我校将于10月1日至7日放假，共7天。10月8日（周日）正常上课。\n\n请家长们提前安排好假期行程，注意假期安全。祝大家国庆快乐！', date: '2023-09-28', readCount: 45 },
    { id: 2, title: '秋季流感预防提醒', content: '近期流感高发，请家长们注意孩子身体状况，如有不适请及时就医。建议外出佩戴口罩，勤洗手，多通风。\n\n学校已加强每日晨午检和消毒工作，让我们共同守护孩子们的健康。', date: '2023-10-15', readCount: 38 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newNotice, setNewNotice] = useState({ title: '', content: '' });

  const handlePublish = () => {
    if (newNotice.title && newNotice.content) {
      setNotifications([{
        id: Date.now(),
        title: newNotice.title,
        content: newNotice.content,
        date: new Date().toISOString().split('T')[0],
        readCount: 0
      }, ...notifications]);
      setShowModal(false);
      setNewNotice({ title: '', content: '' });
    }
  };

  const handleNotificationClick = (notice: Notification) => {
    setSelectedNotification(notice);
    setView('detail');
  };

  const handleDelete = (id: number) => {
    if (window.confirm('确定要删除该通知吗？')) {
      setNotifications(notifications.filter(n => n.id !== id));
      if (view === 'detail') {
        setView('list');
        setSelectedNotification(null);
      }
    }
  };

  if (view === 'detail' && selectedNotification) {
    return (
      <NotificationDetailView 
        notification={selectedNotification} 
        onBack={() => setView('list')} 
        onDelete={handleDelete}
      />
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-slate-100 sticky top-0 z-10 flex items-center justify-between">
        <button onClick={onBack} className="p-1 -ml-1 text-slate-600 active:bg-slate-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg text-slate-800">机构通知</h1>
        <button onClick={() => setShowModal(true)} className="p-1 text-blue-600 active:bg-blue-50 rounded-full">
          <Plus size={24} />
        </button>
      </div>

      {/* List */}
      <div className="p-4 space-y-3 flex-1 overflow-auto">
        {notifications.map(notice => (
          <div 
            key={notice.id} 
            onClick={() => handleNotificationClick(notice)}
            className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm relative group active:scale-[0.99] transition-transform cursor-pointer"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-slate-800 text-lg line-clamp-1">{notice.title}</h3>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(notice.id);
                }}
                className="text-slate-300 hover:text-red-500 transition-colors p-1 -mr-1"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <p className="text-sm text-slate-600 line-clamp-2 mb-3 leading-relaxed">
              {notice.content}
            </p>
            <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-50 pt-3">
              <div className="flex items-center gap-1.5">
                <Clock size={12} />
                <span>{notice.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bell size={12} />
                <span>{notice.readCount} 已读</span>
              </div>
            </div>
          </div>
        ))}
        {notifications.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            暂无通知，点击右上角发布
          </div>
        )}
      </div>

      {/* Publish Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-800">发布通知</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">标题</label>
                <input
                  type="text"
                  value={newNotice.title}
                  onChange={e => setNewNotice({...newNotice, title: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="请输入通知标题"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">内容</label>
                <textarea
                  value={newNotice.content}
                  onChange={e => setNewNotice({...newNotice, content: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 resize-none h-32"
                  placeholder="请输入通知详情..."
                />
              </div>
              <button
                onClick={handlePublish}
                disabled={!newNotice.title || !newNotice.content}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold active:scale-[0.98] transition-transform disabled:opacity-50 mt-2"
              >
                立即发布
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstitutionNotification;
