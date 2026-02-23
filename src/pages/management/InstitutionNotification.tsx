import React, { useState } from 'react';
import { ChevronLeft, Plus, Bell, Clock, Trash2, X } from 'lucide-react';

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
    <div className="bg-slate-50/50 min-h-screen flex flex-col">
      <div className="bg-white/80 backdrop-blur-md px-4 py-3 border-b border-slate-200/60 flex items-center justify-between sticky top-0 z-10 shadow-sm transition-all duration-300">
        <button 
          onClick={onBack} 
          className="p-2 -ml-2 text-slate-600 hover:bg-slate-100/80 active:scale-95 rounded-full transition-all"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className="font-bold text-lg text-slate-800 tracking-tight">通知详情</h1>
        <button 
          onClick={() => onDelete(notification.id)} 
          className="p-2 -mr-2 text-red-500 hover:bg-red-50 active:scale-95 rounded-full transition-all"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-3 leading-tight tracking-tight">{notification.title}</h2>
          <div className="flex items-center gap-4 text-xs text-slate-400 mb-6 pb-4 border-b border-slate-50">
            <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-full">
              <Clock size={12} />
              <span>{notification.date}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-full">
              <Bell size={12} />
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
    <div className="bg-slate-50/50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md px-4 py-3 border-b border-slate-200/60 sticky top-0 z-10 flex items-center justify-between shadow-sm transition-all duration-300">
        <button 
          onClick={onBack} 
          className="p-2 -ml-2 text-slate-600 hover:bg-slate-100/80 active:scale-95 rounded-full transition-all"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className="font-bold text-lg text-slate-800 tracking-tight">机构通知</h1>
        <button 
          onClick={() => setShowModal(true)} 
          className="p-2 -mr-2 text-blue-600 hover:bg-blue-50 active:scale-95 rounded-full transition-all"
        >
          <Plus size={24} />
        </button>
      </div>

      {/* List */}
      <div className="p-4 space-y-3 flex-1 overflow-auto">
        {notifications.map(notice => (
          <div 
            key={notice.id} 
            onClick={() => handleNotificationClick(notice)}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative group active:scale-[0.98] transition-all cursor-pointer hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-slate-800 text-lg line-clamp-1 flex-1 pr-4">{notice.title}</h3>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(notice.id);
                }}
                className="text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all p-1.5 -mr-1.5 -mt-1.5"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <p className="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed font-medium">
              {notice.content}
            </p>
            <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-50 pt-3">
              <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-0.5 rounded-full">
                <Clock size={12} />
                <span>{notice.date}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-0.5 rounded-full">
                <Bell size={12} />
                <span>{notice.readCount} 已读</span>
              </div>
            </div>
          </div>
        ))}
        {notifications.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <Bell size={24} className="text-slate-300" />
            </div>
            <p className="text-sm font-medium">暂无通知，点击右上角发布</p>
          </div>
        )}
      </div>

      {/* Publish Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-xl scale-100 animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-lg text-slate-800">发布通知</h3>
              <button 
                onClick={() => setShowModal(false)} 
                className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">标题</label>
                <input
                  type="text"
                  value={newNotice.title}
                  onChange={e => setNewNotice({...newNotice, title: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-800 placeholder:text-slate-400"
                  placeholder="请输入通知标题"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">内容</label>
                <textarea
                  value={newNotice.content}
                  onChange={e => setNewNotice({...newNotice, content: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-800 placeholder:text-slate-400 resize-none h-32 text-sm"
                  placeholder="请输入通知详情..."
                />
              </div>
              <button
                onClick={handlePublish}
                disabled={!newNotice.title || !newNotice.content}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-base shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:shadow-none mt-2"
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
