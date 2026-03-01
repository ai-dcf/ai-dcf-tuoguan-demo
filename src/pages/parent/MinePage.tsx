import React from 'react';
import { Settings, ChevronRight, UserCircle, Phone, Info, MessageSquare, HelpCircle, LogOut, ShieldCheck } from 'lucide-react';
import type { Student as Child } from '../../types';

interface MinePageProps {
  activeChild: Child;
  children: Child[];
}

const MinePage: React.FC<MinePageProps> = ({ activeChild, children }) => {
  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* Header Card */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="px-5 py-6">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2rem] p-6 text-white shadow-xl shadow-slate-200/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
            
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 shadow-inner">
                  <UserCircle size={40} className="text-white/90" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight">王大宝家长</h2>
                  <div className="flex items-center gap-2 mt-1.5 bg-white/10 px-3 py-1 rounded-full w-fit backdrop-blur-sm border border-white/5">
                    <Phone size={12} className="text-blue-200" />
                    <span className="text-xs font-medium tracking-wide text-blue-50">138****8888</span>
                  </div>
                </div>
              </div>
              <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all active:scale-95 backdrop-blur-md border border-white/10">
                <Settings size={20} className="text-white/90" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pb-24 space-y-6 -mt-2">
        {/* My Children */}
        <section>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 ml-1">我的孩子</h3>
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 overflow-hidden">
            {children.map((child, index) => (
              <div 
                key={child.id} 
                className={`p-4 flex items-center justify-between group active:bg-slate-50 transition-colors cursor-pointer ${index !== children.length - 1 ? 'border-b border-slate-50' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-all group-hover:scale-105 ${activeChild.id === child.id ? 'bg-blue-600 text-white shadow-blue-200' : 'bg-slate-100 text-slate-500'}`}>
                    {child.name[0]}
                  </div>
                  <div>
                    <div className={`font-bold text-base transition-colors ${activeChild.id === child.id ? 'text-blue-600' : 'text-slate-800'}`}>{child.name}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-400 font-medium bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">{child.school}</span>
                      <span className="text-xs text-slate-400 font-medium">{child.grade}{child.class}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {activeChild.id === child.id && (
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">当前</span>
                  )}
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Common Tools */}
        <section>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 ml-1">常用工具</h3>
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 overflow-hidden">
            {[
              { icon: Info, label: '机构信息', color: 'text-blue-500', bg: 'bg-blue-50' },
              { icon: ShieldCheck, label: '订阅设置', color: 'text-emerald-500', bg: 'bg-emerald-50' },
              { icon: MessageSquare, label: '意见反馈', color: 'text-amber-500', bg: 'bg-amber-50' },
              { icon: Phone, label: '联系老师', color: 'text-violet-500', bg: 'bg-violet-50' },
            ].map((tool, index, arr) => (
              <button 
                key={tool.label}
                onClick={() => {
                  if (tool.label === '联系老师') {
                    alert('正在拨打班主任电话: 13800138000');
                  }
                }}
                className={`w-full p-4 flex items-center justify-between group active:bg-slate-50 transition-colors ${index !== arr.length - 1 ? 'border-b border-slate-50' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 ${tool.bg} ${tool.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm`}>
                    <tool.icon size={20} strokeWidth={2} />
                  </div>
                  <span className="font-bold text-slate-700 text-sm group-hover:text-slate-900 transition-colors">{tool.label}</span>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-400 transition-colors" />
              </button>
            ))}
          </div>
        </section>

        {/* System */}
        <section>
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 overflow-hidden">
            {[
              { icon: HelpCircle, label: '使用指南' },
              { icon: Info, label: '版本信息', extra: 'v1.0.0' },
            ].map((item, index, arr) => (
              <button 
                key={item.label}
                className={`w-full p-4 flex items-center justify-between group active:bg-slate-50 transition-colors ${index !== arr.length - 1 ? 'border-b border-slate-50' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-slate-100 transition-colors">
                    <item.icon size={20} strokeWidth={2} />
                  </div>
                  <span className="font-bold text-slate-700 text-sm group-hover:text-slate-900 transition-colors">{item.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  {item.extra && <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">{item.extra}</span>}
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-400 transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </section>

        <button className="w-full py-4 bg-white border border-red-100 text-red-500 rounded-[1.5rem] font-bold text-sm shadow-lg shadow-red-100/50 active:scale-95 transition-all mt-4 hover:bg-red-50/50 flex items-center justify-center gap-2">
          <LogOut size={18} />
          退出登录
        </button>
      </div>
    </div>
  );
};

export default MinePage;
