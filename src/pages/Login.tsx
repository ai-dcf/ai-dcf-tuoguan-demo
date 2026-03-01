import { useState } from 'react';
import { Sparkles, ArrowRight, User, GraduationCap } from 'lucide-react';
import type { User as UserType } from '../types';
import { dataManager } from '../utils/dataManager';

interface LoginProps {
  onLogin: (user: UserType) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [mobile, setMobile] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const user = dataManager.login(mobile);
    if (user) {
      onLogin(user);
    } else {
      setError('手机号未注册或验证码错误');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-accent rounded-full blur-[100px] opacity-50 z-[-1]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] bg-secondary rounded-full blur-[100px] opacity-40 z-[-1]"></div>

      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8 relative">
          <div className="inline-block relative">
            <h1 className="text-4xl font-black text-text-main tracking-tight relative z-10">
              未来托管
              <span className="text-primary">助手</span>
            </h1>
            <div className="absolute -top-6 -right-8 text-accent animate-bounce delay-700">
              <Sparkles size={32} strokeWidth={3} fill="currentColor" className="text-text-main" />
            </div>
            {/* Underline decoration */}
            <div className="absolute bottom-1 left-0 w-full h-3 bg-secondary/30 -rotate-2 rounded-full z-0"></div>
          </div>
          <p className="text-text-muted mt-4 font-bold text-lg">让成长更有趣，让教育更简单</p>
        </div>

        {/* Main Card */}
        <div className="card transform hover:scale-[1.01] transition-transform duration-300">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-text-main mb-2 ml-1">手机号</label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="input-pop"
                placeholder="请输入手机号"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-text-main mb-2 ml-1">验证码</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="input-pop flex-1"
                  placeholder="任意输入"
                />
                <button className="px-4 py-3 bg-surface-muted text-text-main rounded-xl font-bold border-2 border-border-main hover:bg-accent transition-colors whitespace-nowrap">
                  获取验证码
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-primary/10 border-2 border-primary rounded-xl p-3 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <p className="text-primary text-sm font-bold">{error}</p>
              </div>
            )}

            <button
              onClick={handleLogin}
              className="btn-primary w-full text-lg flex items-center justify-center gap-2 group"
            >
              立即登录
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Debug Tools */}
        <div className="mt-8 pt-8 border-t-2 border-border-main/10 border-dashed">
          <p className="text-center text-xs font-bold text-text-light uppercase tracking-wider mb-4">
            快速通道 (开发模式)
          </p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                setMobile('13800000001');
                const user = dataManager.login('13800000001');
                if (user) onLogin(user);
              }}
              className="group relative bg-white border-2 border-border-main rounded-2xl p-4 hover:shadow-pop transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none text-left overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <GraduationCap size={48} />
              </div>
              <div className="font-black text-text-main mb-1">我是老师</div>
              <div className="text-xs font-bold text-text-muted bg-surface-muted inline-block px-2 py-1 rounded-md">张老师</div>
            </button>
            
            <button
              onClick={() => {
                setMobile('13800138005');
                const user = dataManager.login('13800138005');
                if (user) onLogin(user);
              }}
              className="group relative bg-white border-2 border-border-main rounded-2xl p-4 hover:shadow-pop transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none text-left overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <User size={48} />
              </div>
              <div className="font-black text-text-main mb-1">我是家长</div>
              <div className="text-xs font-bold text-text-muted bg-surface-muted inline-block px-2 py-1 rounded-md">孙悟空</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
