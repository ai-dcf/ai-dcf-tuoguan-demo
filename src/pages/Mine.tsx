import React from 'react';
import { User, Settings, LogOut, ChevronRight, Bell, Shield, CircleHelp } from 'lucide-react';

const MinePage = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-24 font-sans selection:bg-blue-100">
      {/* Header Profile Card */}
      <div className="bg-white pb-8 rounded-b-[3rem] shadow-lg shadow-blue-900/5 relative overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/5 to-indigo-600/5"></div>
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-12 -left-12 w-60 h-60 bg-indigo-400/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        
        <div className="px-6 pt-12 pb-6 relative z-10">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-500/30 border-4 border-white transform hover:scale-105 transition-transform duration-300">
              <User size={40} />
            </div>
            <div>
              <h1 className="font-bold text-2xl text-slate-800 mb-2 tracking-tight">张老师</h1>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full border border-blue-200 shadow-sm">
                  主讲教师
                </span>
                <span className="text-slate-500 text-sm font-medium bg-white/50 px-2 py-0.5 rounded-full backdrop-blur-sm">
                  徐汇校区
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-8 relative z-20 space-y-5 max-w-2xl mx-auto">
        {/* Stats Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-5 shadow-xl shadow-slate-200/50 border border-white/50 flex justify-around items-center">
            <div className="text-center group cursor-pointer">
                <div className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">12</div>
                <div className="text-xs text-slate-400 font-medium mt-1 group-hover:text-slate-500">负责班级</div>
            </div>
            <div className="w-px h-8 bg-slate-100"></div>
            <div className="text-center group cursor-pointer">
                <div className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">45</div>
                <div className="text-xs text-slate-400 font-medium mt-1 group-hover:text-slate-500">学生总数</div>
            </div>
            <div className="w-px h-8 bg-slate-100"></div>
            <div className="text-center group cursor-pointer">
                <div className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">4.9</div>
                <div className="text-xs text-slate-400 font-medium mt-1 group-hover:text-slate-500">评分</div>
            </div>
        </div>

        {/* Menu Group 1 */}
        <div className="bg-white/80 backdrop-blur-lg rounded-[2rem] shadow-sm border border-white/50 overflow-hidden hover:shadow-md transition-shadow duration-300">
          <MenuItem icon={<Bell size={20} />} iconColor="text-orange-500" iconBg="bg-orange-50" label="消息通知" hasBadge badgeCount={3} />
          <MenuItem icon={<Shield size={20} />} iconColor="text-green-500" iconBg="bg-green-50" label="账号安全" />
          <MenuItem icon={<Settings size={20} />} iconColor="text-blue-500" iconBg="bg-blue-50" label="个人设置" border={false} />
        </div>

        {/* Menu Group 2 */}
        <div className="bg-white/80 backdrop-blur-lg rounded-[2rem] shadow-sm border border-white/50 overflow-hidden hover:shadow-md transition-shadow duration-300">
          <MenuItem icon={<CircleHelp size={20} />} iconColor="text-purple-500" iconBg="bg-purple-50" label="帮助与反馈" />
          <MenuItem icon={<LogOut size={20} />} iconColor="text-slate-400" iconBg="bg-slate-50" label="退出登录" isDestructive border={false} />
        </div>
        
        <p className="text-center text-xs text-slate-300 pt-2 pb-8 font-medium tracking-wide">
            v1.0.0 Build 20240315
        </p>
      </div>
    </div>
  );
};

const MenuItem = ({ 
    icon, 
    iconColor = "text-slate-500", 
    iconBg = "bg-slate-50",
    label, 
    isDestructive, 
    hasBadge, 
    badgeCount,
    border = true
}: { 
    icon: React.ReactNode, 
    iconColor?: string,
    iconBg?: string,
    label: string, 
    isDestructive?: boolean,
    hasBadge?: boolean,
    badgeCount?: number,
    border?: boolean
}) => (
  <div className="relative group active:bg-slate-50/80 transition-all cursor-pointer hover:bg-white/60">
      <div className="flex items-center justify-between p-4">
        <div className={`flex items-center gap-4 ${isDestructive ? 'text-red-500' : 'text-slate-700'}`}>
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm ${iconBg} ${isDestructive ? 'text-red-500 bg-red-50' : iconColor}`}>
                {icon}
            </div>
            <span className="font-bold text-sm tracking-tight">{label}</span>
        </div>
        <div className="flex items-center gap-3">
            {hasBadge && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-red-500/30 animate-pulse">
                    {badgeCount}
                </span>
            )}
            <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-400 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
      {border && <div className="absolute bottom-0 left-16 right-0 h-px bg-slate-100/80" />}
  </div>
);

export default MinePage;
