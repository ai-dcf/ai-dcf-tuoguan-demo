import { useState } from 'react';
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
      <div className="min-h-screen bg-background flex flex-col font-sans">
        <div className="bg-background/90 backdrop-blur-xl px-4 py-3 border-b-2 border-border-main/10 sticky top-0 z-10 flex items-center gap-3 shadow-sm">
          <button 
            onClick={() => setView('list')} 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-border-main text-text-main shadow-pop active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
          >
            <ChevronLeft size={24} strokeWidth={3} />
          </button>
          <h1 className="font-black text-lg text-text-main tracking-tight">发布通知</h1>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto w-full">
          <div className="bg-white rounded-[2rem] p-6 shadow-pop border-2 border-border-main space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <label className="block text-xs font-black text-text-light mb-2 flex items-center gap-1 uppercase tracking-wider ml-1">
                通知标题
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="请输入标题"
                className="w-full px-4 py-3.5 bg-background border-2 border-border-main rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all font-bold text-text-main placeholder:text-text-light"
              />
            </div>
            
            <div>
              <label className="block text-xs font-black text-text-light mb-2 flex items-center gap-1 uppercase tracking-wider ml-1">
                通知内容
              </label>
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="请输入详细内容..."
                rows={8}
                className="w-full px-4 py-3.5 bg-background border-2 border-border-main rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all font-bold text-text-main resize-none placeholder:text-text-light leading-relaxed"
              />
            </div>
            
            <div className="flex items-center gap-3 py-2 bg-background p-3 rounded-xl border-2 border-border-main">
              <div 
                onClick={() => setIsUrgent(!isUrgent)}
                className={`w-12 h-7 rounded-full relative transition-colors duration-300 cursor-pointer shadow-inner border-2 border-border-main ${isUrgent ? 'bg-primary' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 border-2 border-border-main ${isUrgent ? 'translate-x-5' : ''}`} />
              </div>
              <span className={`text-sm font-black transition-colors ${isUrgent ? 'text-primary' : 'text-text-light'}`}>
                {isUrgent ? '已设为紧急通知' : '设为紧急通知'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-background/80 backdrop-blur-md border-t-2 border-border-main/10 sticky bottom-0 safe-area-bottom z-20">
          <button
            onClick={handlePublish}
            disabled={!newTitle || !newContent}
            className={`w-full py-3.5 rounded-xl font-black text-white shadow-pop border-2 border-border-main active:scale-[0.98] transition-all flex items-center justify-center gap-2 active:shadow-none active:translate-x-[2px] active:translate-y-[2px] ${
              !newTitle || !newContent 
                ? 'bg-gray-300 shadow-none cursor-not-allowed opacity-70 border-gray-400' 
                : 'bg-primary hover:bg-primary/90'
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
    <div className="min-h-screen bg-background pb-6 font-sans">
      <div className="bg-background/90 backdrop-blur-xl px-4 py-3 border-b-2 border-border-main/10 sticky top-0 z-10 shadow-sm transition-all duration-300">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack} 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-border-main text-text-main shadow-pop active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
            >
              <ChevronLeft size={24} strokeWidth={3} />
            </button>
            <h1 className="font-black text-lg text-text-main tracking-tight">班级通知</h1>
          </div>
          <button 
            onClick={() => setView('create')}
            className="flex items-center gap-1.5 text-text-main text-sm font-bold bg-secondary px-4 py-2 rounded-xl border-2 border-border-main shadow-pop active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
          >
            <Plus size={18} strokeWidth={3} /> 发布
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {notifications.map((note, index) => (
          <div 
            key={note.id} 
            className={`bg-white rounded-[2rem] p-5 shadow-pop border-2 border-border-main hover:-translate-y-0.5 transition-all duration-300 group animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border-2 border-border-main transition-transform group-hover:rotate-6 ${
                  note.isUrgent 
                    ? 'bg-primary text-white' 
                    : 'bg-surface-sun text-text-main'
                }`}>
                  <Bell size={24} className={note.isUrgent ? 'animate-pulse' : ''} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="font-black text-text-main text-base leading-tight mb-1.5 line-clamp-1 pr-2">
                    {note.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-text-light font-bold">
                    <span className="bg-background px-2 py-0.5 rounded-md border border-border-main/20">{note.author}</span>
                    <span className="flex items-center gap-1"><Clock size={11} strokeWidth={2.5} /> {note.date}</span>
                  </div>
                </div>
              </div>
              {note.isUrgent && (
                <span className="bg-primary text-white text-[10px] font-black px-2.5 py-1 rounded-lg border-2 border-border-main flex-shrink-0 animate-pulse shadow-sm">
                  紧急
                </span>
              )}
            </div>

            <p className="text-text-main text-sm font-bold leading-relaxed mb-4 pl-[60px] text-justify line-clamp-3">
              {note.content}
            </p>

            <div className="flex items-center justify-between pt-3 border-t-2 border-border-main/10 pl-[60px]">
              <div className="flex items-center gap-1.5 text-xs font-black text-text-light">
                <Eye size={14} className="text-secondary" strokeWidth={2.5} />
                <span>已读 {note.readCount}/{note.totalCount}</span>
              </div>
              
              <div className="w-24 h-2.5 bg-background rounded-full overflow-hidden border-2 border-border-main">
                <div 
                  className="h-full bg-secondary transition-all duration-1000 border-r-2 border-border-main"
                  style={{ width: `${(note.readCount / note.totalCount) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
        
        <div className="text-center py-8">
          <p className="text-xs text-text-light font-bold tracking-wide">没有更多通知了</p>
        </div>
      </div>
    </div>
  );
}
