import React from 'react';
import { User, Settings, LogOut, ChevronRight, Bell, Shield, CircleHelp } from 'lucide-react';

const MinePage = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-24">
      {/* Header Profile Card */}
      <div className="bg-white pb-8 rounded-b-[2.5rem] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 to-indigo-600 opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-12 -left-12 w-48 h-48 bg-indigo-400/20 rounded-full blur-3xl"></div>
        
        <div className="px-6 pt-12 pb-4 relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-200 border-4 border-white">
              <User size={36} />
            </div>
            <div>
              <h1 className="font-bold text-2xl text-slate-800 mb-1">张老师</h1>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full border border-blue-200">
                  主讲教师
                </span>
                <span className="text-slate-500 text-sm font-medium">徐汇校区</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-6 relative z-20 space-y-4">
        {/* Stats Card */}
        <div className="bg-white rounded-2xl p-4 shadow-lg shadow-slate-200/50 border border-slate-100 flex justify-around">
            <div className="text-center">
                <div className="text-lg font-bold text-slate-800">12</div>
                <div className="text-xs text-slate-400 font-medium">负责班级</div>
            </div>
            <div className="w-px bg-slate-100"></div>
            <div className="text-center">
                <div className="text-lg font-bold text-slate-800">45</div>
                <div className="text-xs text-slate-400 font-medium">学生总数</div>
            </div>
            <div className="w-px bg-slate-100"></div>
            <div className="text-center">
                <div className="text-lg font-bold text-slate-800">4.9</div>
                <div className="text-xs text-slate-400 font-medium">评分</div>
            </div>
        </div>

        {/* Menu Group 1 */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100/50 overflow-hidden">
          <MenuItem icon={<Bell size={20} />} iconColor="text-orange-500" iconBg="bg-orange-50" label="消息通知" hasBadge badgeCount={3} />
          <MenuItem icon={<Shield size={20} />} iconColor="text-green-500" iconBg="bg-green-50" label="账号安全" />
          <MenuItem icon={<Settings size={20} />} iconColor="text-blue-500" iconBg="bg-blue-50" label="个人设置" border={false} />
        </div>

        {/* Menu Group 2 */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100/50 overflow-hidden">
          <MenuItem icon={<CircleHelp size={20} />} iconColor="text-purple-500" iconBg="bg-purple-50" label="帮助与反馈" />
          <MenuItem icon={<LogOut size={20} />} iconColor="text-slate-400" iconBg="bg-slate-50" label="退出登录" isDestructive border={false} />
        </div>
        
        <p className="text-center text-xs text-slate-400 pt-4 pb-8">
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
  <div className="relative group active:bg-slate-50 transition-colors cursor-pointer">
      <div className="flex items-center justify-between p-4">
        <div className={`flex items-center gap-4 ${isDestructive ? 'text-red-500' : 'text-slate-700'}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${iconBg} ${isDestructive ? 'text-red-500 bg-red-50' : iconColor}`}>
                {icon}
            </div>
            <span className="font-bold text-sm">{label}</span>
        </div>
        <div className="flex items-center gap-2">
            {hasBadge && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm shadow-red-200">
                    {badgeCount}
                </span>
            )}
            <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-400 transition-colors" />
        </div>
      </div>
      {border && <div className="absolute bottom-0 left-16 right-0 h-px bg-slate-50" />}
  </div>
);

export default MinePage;
