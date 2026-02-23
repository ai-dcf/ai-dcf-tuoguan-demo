import React from 'react';
import { User, Settings, LogOut, ChevronRight } from 'lucide-react';

const MinePage = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-blue-600 px-6 pt-12 pb-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm">
            <User size={32} />
          </div>
          <div>
            <h1 className="font-bold text-xl">张老师</h1>
            <p className="text-blue-100 text-sm">主讲教师 | 徐汇校区</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3 -mt-4">
        <MenuItem icon={<Settings size={20} />} label="个人设置" />
        <MenuItem icon={<LogOut size={20} />} label="退出登录" isDestructive />
      </div>
    </div>
  );
};

const MenuItem = ({ icon, label, isDestructive }: { icon: React.ReactNode, label: string, isDestructive?: boolean }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between active:bg-slate-50">
    <div className={`flex items-center gap-3 ${isDestructive ? 'text-red-500' : 'text-slate-700'}`}>
      {icon}
      <span className="font-medium">{label}</span>
    </div>
    <ChevronRight size={16} className="text-slate-400" />
  </div>
);

export default MinePage;
