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
    <div className="bg-background min-h-screen flex flex-col font-sans">
      <div className="bg-background/90 backdrop-blur-md px-4 py-3 border-b-2 border-border-main/10 flex items-center justify-between sticky top-0 z-10 shadow-sm transition-all duration-300">
        <button 
          onClick={onBack} 
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-border-main text-text-main shadow-pop active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
        >
          <ChevronLeft size={24} strokeWidth={3} />
        </button>
        <h1 className="font-black text-lg text-text-main tracking-tight">通知详情</h1>
        <button 
          onClick={() => onDelete(notification.id)} 
          className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white border-2 border-border-main shadow-pop active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
        >
          <Trash2 size={20} strokeWidth={2.5} />
        </button>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white p-6 rounded-[2rem] border-2 border-border-main shadow-pop">
          <h2 className="text-xl font-black text-text-main mb-3 leading-tight tracking-tight">{notification.title}</h2>
          <div className="flex items-center gap-4 text-xs text-text-light mb-6 pb-4 border-b-2 border-border-main/10 font-bold">
            <div className="flex items-center gap-1.5 bg-background px-2.5 py-1 rounded-full border border-border-main/20">
              <Clock size={12} strokeWidth={2.5} />
              <span>{notification.date}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-background px-2.5 py-1 rounded-full border border-border-main/20">
              <Bell size={12} strokeWidth={2.5} />
              <span>{notification.readCount} 已读</span>
            </div>
          </div>
          
          <div className="text-text-main text-base leading-relaxed whitespace-pre-wrap font-medium">
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
    <div className="bg-background min-h-screen flex flex-col font-sans">
      {/* Header */}
      <div className="bg-background/90 backdrop-blur-md px-4 py-3 border-b-2 border-border-main/10 sticky top-0 z-10 flex items-center justify-between shadow-sm transition-all duration-300">
        <button 
          onClick={onBack} 
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-border-main text-text-main shadow-pop active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
        >
          <ChevronLeft size={24} strokeWidth={3} />
        </button>
        <h1 className="font-black text-lg text-text-main tracking-tight">机构通知</h1>
        <button 
          onClick={() => setShowModal(true)} 
          className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-text-main border-2 border-border-main shadow-sm active:scale-95 transition-all"
        >
          <Plus size={24} strokeWidth={3} />
        </button>
      </div>

      {/* List */}
      <div className="p-4 space-y-3 flex-1 overflow-auto">
        {notifications.map(notice => (
          <div 
            key={notice.id} 
            onClick={() => handleNotificationClick(notice)}
            className="bg-white p-5 rounded-[2rem] border-2 border-border-main shadow-pop relative group active:scale-[0.98] transition-all cursor-pointer hover:-translate-y-0.5"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-black text-text-main text-lg line-clamp-1 flex-1 pr-4">{notice.title}</h3>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(notice.id);
                }}
                className="text-text-light hover:text-primary hover:bg-primary/10 rounded-full transition-all p-1.5 -mr-1.5 -mt-1.5"
              >
                <Trash2 size={18} strokeWidth={2.5} />
              </button>
            </div>
            <p className="text-sm text-text-main line-clamp-2 mb-4 leading-relaxed font-medium">
              {notice.content}
            </p>
            <div className="flex items-center justify-between text-xs text-text-light border-t-2 border-border-main/10 pt-3 font-bold">
              <div className="flex items-center gap-1.5 bg-background px-2 py-0.5 rounded-full border border-border-main/20">
                <Clock size={12} strokeWidth={2.5} />
                <span>{notice.date}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-background px-2 py-0.5 rounded-full border border-border-main/20">
                <Bell size={12} strokeWidth={2.5} />
                <span>{notice.readCount} 已读</span>
              </div>
            </div>
          </div>
        ))}
        {notifications.length === 0 && (
          <div className="text-center py-12 text-text-light">
            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-border-main">
              <Bell size={24} className="text-text-light" strokeWidth={2.5} />
            </div>
            <p className="text-sm font-bold">暂无通知，点击右上角发布</p>
          </div>
        )}
      </div>

      {/* Publish Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] w-full max-w-sm overflow-hidden shadow-pop scale-100 animate-in zoom-in-95 duration-200 border-2 border-border-main">
            <div className="p-4 border-b-2 border-border-main/10 flex justify-between items-center bg-background">
              <h3 className="font-black text-lg text-text-main">发布通知</h3>
              <button 
                onClick={() => setShowModal(false)} 
                className="p-1 text-text-light hover:text-text-main hover:bg-black/5 rounded-full transition-all"
              >
                <X size={24} strokeWidth={2.5} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-black text-text-main mb-1.5 ml-1">标题</label>
                <input
                  type="text"
                  value={newNotice.title}
                  onChange={e => setNewNotice({...newNotice, title: e.target.value})}
                  className="w-full px-4 py-2.5 bg-background border-2 border-border-main rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-text-main placeholder:text-text-light font-bold"
                  placeholder="请输入通知标题"
                />
              </div>
              <div>
                <label className="block text-sm font-black text-text-main mb-1.5 ml-1">内容</label>
                <textarea
                  value={newNotice.content}
                  onChange={e => setNewNotice({...newNotice, content: e.target.value})}
                  className="w-full px-4 py-3 bg-background border-2 border-border-main rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-text-main placeholder:text-text-light resize-none h-32 text-sm font-medium"
                  placeholder="请输入通知详情..."
                />
              </div>
              <button
                onClick={handlePublish}
                disabled={!newNotice.title || !newNotice.content}
                className="w-full bg-primary text-white py-3 rounded-xl font-black text-base shadow-pop border-2 border-border-main hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed mt-2 active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
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
