import { useState } from 'react';
import type { User } from '../types';
import { dataManager } from '../utils/dataManager';

interface LoginProps {
  onLogin: (user: User) => void;
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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-slate-800">未来托管助手</h1>
          <p className="text-slate-500 mt-2">教师家长统一服务平台</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">手机号</label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="请输入手机号"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">验证码</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="任意输入"
              />
              <button className="px-4 py-3 bg-slate-100 text-slate-600 rounded-xl font-medium hover:bg-slate-200 transition-colors">
                获取验证码
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            onClick={handleLogin}
            className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all"
          >
            登 录
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100">
          <p className="text-center text-xs text-slate-400 mb-4">开发调试入口</p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                setMobile('13800000001');
                const user = dataManager.login('13800000001');
                if (user) onLogin(user);
              }}
              className="py-3 px-4 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors"
            >
              我是老师 (张老师)
            </button>
            <button
              onClick={() => {
                setMobile('13800138005');
                const user = dataManager.login('13800138005');
                if (user) onLogin(user);
              }}
              className="py-3 px-4 bg-emerald-50 text-emerald-600 rounded-lg text-sm font-medium hover:bg-emerald-100 transition-colors"
            >
              我是家长 (孙悟空)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
