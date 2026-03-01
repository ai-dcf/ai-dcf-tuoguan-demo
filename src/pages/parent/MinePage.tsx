import React from 'react';
import { Settings, ChevronRight, UserCircle, Phone, Info, MessageSquare, HelpCircle, LogOut, ShieldCheck, User } from 'lucide-react';
import type { Student as Child } from '../../types';

interface MinePageProps {
  activeChild: Child;
  children: Child[];
}

const MinePage: React.FC<MinePageProps> = ({ activeChild, children }) => {
  return (
    <div className="flex flex-col min-h-full bg-[#FFF9F2] font-sans">
      {/* Header Card */}
      <div className="px-5 pt-8 pb-6">
        <div className="bg-[#2D3436] rounded-[2.5rem] p-6 text-white shadow-[8px_8px_0px_0px_#636E72] relative overflow-hidden border-2 border-[#2D3436]">
          {/* Decorative shapes */}
          <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-[#FF6B6B] rounded-full opacity-20 blur-xl"></div>
          <div className="absolute bottom-[-10px] left-[-10px] w-24 h-24 bg-[#4ECDC4] rounded-full opacity-20 blur-xl"></div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#FFF9F2] rounded-2xl flex items-center justify-center border-2 border-white/20 shadow-inner text-[#2D3436]">
                <User size={36} strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tight mb-1">王大宝家长</h2>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full w-fit backdrop-blur-sm border border-white/10">
                  <Phone size={12} className="text-[#FFE66D]" />
                  <span className="text-xs font-bold tracking-wide text-white/90">138****8888</span>
                </div>
              </div>
            </div>
            <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all active:scale-95 backdrop-blur-md border border-white/10">
              <Settings size={20} className="text-white" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      <div className="px-5 pb-24 space-y-8">
        {/* My Children */}
        <section>
          <h3 className="text-xs font-black text-[#2D3436] uppercase tracking-wider mb-4 ml-1 flex items-center gap-2">
            <div className="w-2 h-2 bg-[#FF6B6B] rounded-full"></div>
            我的孩子
          </h3>
          <div className="space-y-3">
            {children.map((child, index) => (
              <div 
                key={child.id} 
                className={`bg-white p-4 rounded-2xl border-2 border-[#2D3436] shadow-[4px_4px_0px_0px_#2D3436] flex items-center justify-between group active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#2D3436] transition-all cursor-pointer ${activeChild.id === child.id ? 'ring-2 ring-[#4ECDC4] ring-offset-2' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm border-2 border-[#2D3436] shadow-[2px_2px_0px_0px_#2D3436] transition-transform group-hover:rotate-6 ${activeChild.id === child.id ? 'bg-[#4ECDC4] text-[#2D3436]' : 'bg-[#F7F1E3] text-[#2D3436]'}`}>
                    {child.name[0]}
                  </div>
                  <div>
                    <div className="font-black text-base text-[#2D3436]">{child.name}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-[#636E72] font-bold bg-[#F7F1E3] px-2 py-0.5 rounded-md border border-[#2D3436]/10">{child.school}</span>
                      <span className="text-[10px] text-[#636E72] font-bold">{child.grade}{child.class}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {activeChild.id === child.id && (
                    <span className="text-[10px] font-black text-[#2D3436] bg-[#FFE66D] px-2.5 py-1 rounded-full border-2 border-[#2D3436]">当前</span>
                  )}
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-[#2D3436] flex items-center justify-center group-hover:bg-[#2D3436] group-hover:text-white transition-colors">
                    <ChevronRight size={16} strokeWidth={3} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Common Tools */}
        <section>
          <h3 className="text-xs font-black text-[#2D3436] uppercase tracking-wider mb-4 ml-1 flex items-center gap-2">
            <div className="w-2 h-2 bg-[#4ECDC4] rounded-full"></div>
            常用工具
          </h3>
          <div className="bg-white rounded-[2rem] border-2 border-[#2D3436] shadow-[4px_4px_0px_0px_#2D3436] overflow-hidden">
            {[
              { icon: Info, label: '机构信息', color: 'bg-[#A8E6CF]' },
              { icon: ShieldCheck, label: '订阅设置', color: 'bg-[#FF8B94]' },
              { icon: MessageSquare, label: '意见反馈', color: 'bg-[#FFE66D]' },
              { icon: Phone, label: '联系老师', color: 'bg-[#F7F1E3]' },
            ].map((tool, index, arr) => (
              <button 
                key={tool.label}
                onClick={() => {
                  if (tool.label === '联系老师') {
                    alert('正在拨打班主任电话: 13800138000');
                  }
                }}
                className={`w-full p-4 flex items-center justify-between group hover:bg-[#F7F1E3] active:bg-[#FFE66D] transition-colors ${index !== arr.length - 1 ? 'border-b-2 border-[#2D3436]/10' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 ${tool.color} rounded-xl border-2 border-[#2D3436] flex items-center justify-center transition-transform group-hover:scale-110 shadow-[2px_2px_0px_0px_#2D3436] group-active:shadow-none group-active:translate-x-[1px] group-active:translate-y-[1px]`}>
                    <tool.icon size={20} strokeWidth={2.5} className="text-[#2D3436]" />
                  </div>
                  <span className="font-bold text-[#2D3436] text-sm">{tool.label}</span>
                </div>
                <ChevronRight size={18} className="text-[#B2BEC3] group-hover:text-[#2D3436] stroke-[3px] transition-colors" />
              </button>
            ))}
          </div>
        </section>
        
        <button className="w-full py-4 bg-[#FFE66D] rounded-2xl border-2 border-[#2D3436] shadow-[4px_4px_0px_0px_#2D3436] font-black text-[#2D3436] flex items-center justify-center gap-2 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#2D3436] transition-all hover:bg-[#FFD93D]">
          <LogOut size={20} strokeWidth={3} />
          退出登录
        </button>
      </div>
    </div>
  );
};

export default MinePage;
