import React from 'react';
import { User, Settings, LogOut, ChevronRight, Bell, Shield, CircleHelp } from 'lucide-react';

const MinePage = () => {
  return (
    <div className="min-h-screen bg-background pb-24 font-sans">
      {/* Header Profile Card */}
      <div className="bg-white pb-10 rounded-b-[3rem] shadow-[0px_4px_0px_0px_#2D3436] border-b-2 border-border-main relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-accent rounded-full border-2 border-border-main opacity-50"></div>
        <div className="absolute top-[20px] left-[-30px] w-24 h-24 bg-secondary rounded-full border-2 border-border-main opacity-30"></div>
        
        <div className="px-6 pt-12 pb-6 relative z-10 flex flex-col items-center text-center">
          <div className="w-28 h-28 bg-primary rounded-full flex items-center justify-center text-white border-4 border-border-main shadow-pop mb-4 relative group">
            <User size={48} strokeWidth={2.5} />
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-accent rounded-full border-2 border-border-main flex items-center justify-center text-text-main">
              <div className="w-2 h-2 bg-text-main rounded-full"></div>
            </div>
          </div>
          
          <h1 className="font-black text-2xl text-text-main mb-1">张老师</h1>
          <div className="flex items-center gap-2 justify-center">
            <span className="px-3 py-1 bg-secondary text-text-main text-xs font-black rounded-full border-2 border-border-main shadow-pop-sm">
              主讲教师
            </span>
            <span className="px-3 py-1 bg-white text-text-muted text-xs font-bold rounded-full border-2 border-border-main shadow-pop-sm">
              徐汇校区
            </span>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-8 relative z-20 space-y-6 max-w-2xl mx-auto">
        {/* Stats Card */}
        <div className="bg-white rounded-3xl p-6 shadow-pop border-2 border-border-main flex justify-around items-center">
            <StatItem value="12" label="负责班级" />
            <div className="w-0.5 h-10 bg-border-main/10"></div>
            <StatItem value="45" label="学生总数" />
            <div className="w-0.5 h-10 bg-border-main/10"></div>
            <StatItem value="4.9" label="评分" />
        </div>

        {/* Menu Group 1 */}
        <div className="bg-white rounded-[2rem] border-2 border-border-main shadow-pop overflow-hidden">
          <MenuItem icon={<Bell size={20} />} color="bg-accent" label="消息通知" hasBadge badgeCount={3} />
          <MenuItem icon={<Shield size={20} />} color="bg-secondary-light" label="账号安全" />
          <MenuItem icon={<Settings size={20} />} color="bg-text-light" label="个人设置" border={false} />
        </div>

        {/* Menu Group 2 */}
        <div className="bg-white rounded-[2rem] border-2 border-border-main shadow-pop overflow-hidden">
          <MenuItem icon={<CircleHelp size={20} />} color="bg-primary-light" label="帮助与反馈" />
          <MenuItem icon={<LogOut size={20} />} color="bg-text-main text-white" label="退出登录" isDestructive border={false} />
        </div>
        
        <p className="text-center text-xs text-text-light font-bold tracking-widest pt-4">
            v1.0.0 Build 20240315
        </p>
      </div>
    </div>
  );
};

const StatItem = ({ value, label }: { value: string, label: string }) => (
  <div className="text-center group cursor-pointer active:scale-95 transition-transform">
    <div className="text-2xl font-black text-text-main group-hover:text-primary transition-colors">{value}</div>
    <div className="text-xs text-text-muted font-bold mt-1 uppercase tracking-wider">{label}</div>
  </div>
);

const MenuItem = ({ 
    icon, 
    color = "bg-surface-muted", 
    label, 
    isDestructive, 
    hasBadge, 
    badgeCount,
    border = true
}: { 
    icon: React.ReactNode, 
    color?: string,
    label: string, 
    isDestructive?: boolean,
    hasBadge?: boolean,
    badgeCount?: number,
    border?: boolean
}) => (
  <button className={`w-full flex items-center justify-between p-4 hover:bg-surface-muted active:bg-accent transition-colors group ${border ? 'border-b-2 border-border-main/10' : ''}`}>
    <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 border-border-main shadow-pop-sm group-active:shadow-none group-active:translate-x-[2px] group-active:translate-y-[2px] transition-all ${color} ${isDestructive ? 'text-white' : 'text-text-main'}`}>
            {React.cloneElement(icon as React.ReactElement, { strokeWidth: 2.5 })}
        </div>
        <span className={`font-bold text-base ${isDestructive ? 'text-primary' : 'text-text-main'}`}>{label}</span>
    </div>
    <div className="flex items-center gap-3">
        {hasBadge && (
            <span className="w-5 h-5 bg-primary text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-border-main">
                {badgeCount}
            </span>
        )}
        <ChevronRight size={20} className="text-text-light group-hover:text-text-main stroke-[3px] transition-colors" />
    </div>
  </button>
);

export default MinePage;
