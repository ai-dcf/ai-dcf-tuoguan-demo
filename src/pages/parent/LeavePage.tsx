import React, { useState } from 'react';
import { ChevronLeft, Calendar, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import type { Student as Child, LeaveRequest } from '../../types';
import { dataManager } from '../../utils/dataManager';

interface LeavePageProps {
  activeChild: Child;
  onBack: () => void;
}

const LeavePage: React.FC<LeavePageProps> = ({ activeChild, onBack }) => {
  const [activeTab, setActiveTab] = useState<'apply' | 'history'>('apply');
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: '病假' as const,
    reason: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const history = dataManager.getLeaveRequests(activeChild.id);
  const leaveTypes: Array<LeaveRequest['type']> = ['病假', '事假', '其他'];

  const handleSubmit = () => {
    if (!formData.reason.trim()) return;

    const newRequest: LeaveRequest = {
      id: Date.now().toString(),
      studentId: activeChild.id,
      studentName: activeChild.name,
      date: formData.date,
      type: formData.type,
      reason: formData.reason,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    dataManager.addLeaveRequest(newRequest);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({ ...formData, reason: '' });
      setActiveTab('history');
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-50 border-green-100';
      case 'rejected': return 'text-red-600 bg-red-50 border-red-100';
      default: return 'text-amber-600 bg-amber-50 border-amber-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return '已通过';
      case 'rejected': return '已拒绝';
      default: return '待审批';
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <div className="glass px-4 py-3 sticky top-0 z-20 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-600 active:scale-90 transition-all hover:bg-slate-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg text-slate-800">请假申请</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-4 pb-24">
        <div className="bg-white p-1.5 rounded-[1.2rem] flex shadow-sm border border-slate-100 mb-6">
          <button 
            onClick={() => setActiveTab('apply')}
            className={`flex-1 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${activeTab === 'apply' ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            申请请假
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${activeTab === 'history' ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            申请记录
          </button>
        </div>

        {activeTab === 'apply' ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">请假学生</label>
                <div className="w-full px-4 py-4 bg-slate-50/50 rounded-2xl text-slate-600 font-bold border border-slate-100 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
                    {activeChild.name[0]}
                  </div>
                  {activeChild.name}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">请假日期</label>
                <div className="relative group">
                  <input 
                    type="date" 
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-slate-800 appearance-none"
                  />
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-blue-500 transition-colors" size={20} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">请假类型</label>
                <div className="grid grid-cols-3 gap-3">
                  {leaveTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => setFormData({ ...formData, type })}
                      className={`py-3.5 rounded-2xl text-sm font-bold border-2 transition-all active:scale-95 ${
                        formData.type === type 
                          ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-sm' 
                          : 'border-slate-100 bg-slate-50 text-slate-500 hover:bg-white hover:border-slate-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">请假事由</label>
                <textarea
                  value={formData.reason}
                  onChange={e => setFormData({...formData, reason: e.target.value})}
                  placeholder="请详细描述请假原因..."
                  className="w-full px-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800 h-32 resize-none placeholder:text-slate-300"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={!formData.reason}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4.5 rounded-2xl font-black text-lg shadow-xl shadow-blue-500/30 hover:shadow-blue-500/40 active:scale-[0.98] transition-all disabled:opacity-50 disabled:shadow-none mt-4 hover:brightness-110"
              >
                提交申请
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {history.length > 0 ? (
              history.map((record, idx) => (
                <div key={record.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 card-hover" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-sm ${
                        record.type === '病假' ? 'bg-rose-500' : 
                        record.type === '事假' ? 'bg-amber-500' : 'bg-blue-500'
                      }`}>
                        <FileText size={18} strokeWidth={2.5} />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 text-base">{record.type}</div>
                        <div className="text-xs text-slate-400 font-medium mt-0.5">{record.date}</div>
                      </div>
                    </div>
                    <span className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${getStatusColor(record.status)}`}>
                      {getStatusText(record.status)}
                    </span>
                  </div>
                  
                  <div className="bg-slate-50 p-4 rounded-2xl text-sm text-slate-600 leading-relaxed border border-slate-100 mb-3 relative">
                    <div className="absolute top-0 left-6 -mt-2 w-4 h-4 bg-slate-50 rotate-45 border-t border-l border-slate-100"></div>
                    {record.reason}
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-[10px] text-slate-400 font-medium">申请时间: {new Date(record.createdAt).toLocaleDateString()}</span>
                  </div>

                  {record.rejectReason && (
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <div className="text-xs text-red-500 font-bold flex items-center gap-1.5 mb-1.5">
                        <AlertCircle size={14} /> 拒绝原因
                      </div>
                      <p className="text-xs text-slate-600 bg-red-50/50 p-3 rounded-xl border border-red-50">{record.rejectReason}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <FileText size={40} className="opacity-30" />
                </div>
                <p className="font-bold text-lg text-slate-500">暂无申请记录</p>
              </div>
            )}
          </div>
        )}
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-slate-900/90 backdrop-blur-xl text-white px-8 py-5 rounded-3xl flex items-center gap-4 shadow-2xl animate-in fade-in zoom-in-95 duration-300 border border-white/10">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
              <CheckCircle2 size={20} strokeWidth={3} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-lg">申请已提交</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">请等待老师审批</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeavePage;
