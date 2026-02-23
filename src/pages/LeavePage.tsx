import { useState } from 'react';
import { ChevronLeft, Check, X, Clock, Calendar, FileText } from 'lucide-react';

interface LeaveRequest {
  id: string;
  studentName: string;
  type: 'sick' | 'personal';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export default function LeavePage({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');
  const [requests, setRequests] = useState<LeaveRequest[]>([
    {
      id: '1',
      studentName: '张小明',
      type: 'sick',
      startDate: '2026-02-24 14:00',
      endDate: '2026-02-24 18:00',
      reason: '发烧去医院',
      status: 'pending',
      createdAt: '2026-02-23 10:30'
    },
    {
      id: '2',
      studentName: '李华',
      type: 'personal',
      startDate: '2026-02-25',
      endDate: '2026-02-25',
      reason: '家里有事',
      status: 'approved',
      createdAt: '2026-02-22 15:00'
    },
    {
      id: '3',
      studentName: '王强',
      type: 'sick',
      startDate: '2026-02-20',
      endDate: '2026-02-21',
      reason: '重感冒',
      status: 'rejected',
      createdAt: '2026-02-19 09:00'
    }
  ]);

  const handleApprove = (id: string) => {
    setRequests(requests.map(r => 
      r.id === id ? { ...r, status: 'approved' } : r
    ));
  };

  const handleReject = (id: string) => {
    setRequests(requests.map(r => 
      r.id === id ? { ...r, status: 'rejected' } : r
    ));
  };

  const filteredRequests = requests.filter(r => 
    activeTab === 'pending' 
      ? r.status === 'pending'
      : r.status !== 'pending'
  );

  return (
    <div className="min-h-screen bg-slate-50/50 pb-6 font-sans selection:bg-blue-100">
      <div className="bg-white/80 backdrop-blur-xl px-4 py-3 border-b border-slate-200/60 sticky top-0 z-10 shadow-sm transition-all duration-300">
        <div className="flex items-center gap-2 mb-3">
          <button 
            onClick={onBack} 
            className="p-2 -ml-2 text-slate-600 hover:bg-slate-100/80 active:scale-95 rounded-full transition-all"
          >
            <ChevronLeft size={22} />
          </button>
          <h1 className="font-bold text-lg text-slate-800 tracking-tight">请假审批</h1>
        </div>
        
        {/* Tabs */}
        <div className="flex p-1 bg-slate-100/80 rounded-2xl backdrop-blur-sm border border-slate-200/50">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${
              activeTab === 'pending' 
                ? 'bg-white text-blue-600 shadow-sm scale-[1.02] ring-1 ring-black/5' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
            }`}
          >
            待审批 
            {requests.filter(r => r.status === 'pending').length > 0 && (
              <span className="ml-1.5 inline-flex items-center justify-center bg-red-500 text-white text-[10px] h-5 min-w-[20px] px-1.5 rounded-full shadow-lg shadow-red-500/30">
                {requests.filter(r => r.status === 'pending').length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${
              activeTab === 'history' 
                ? 'bg-white text-blue-600 shadow-sm scale-[1.02] ring-1 ring-black/5' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
            }`}
          >
            历史记录
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4 max-w-2xl mx-auto">
        {filteredRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400 animate-in fade-in duration-500">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg shadow-slate-100 border border-slate-50">
              <FileText size={40} className="text-slate-200" />
            </div>
            <p className="text-sm font-medium">暂无{activeTab === 'pending' ? '待审批' : '历史'}记录</p>
          </div>
        ) : (
          filteredRequests.map(request => (
            <div 
              key={request.id} 
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shadow-sm transition-transform group-hover:scale-110 ${
                    request.type === 'sick' 
                      ? 'bg-red-50 text-red-500 ring-2 ring-red-100' 
                      : 'bg-blue-50 text-blue-500 ring-2 ring-blue-100'
                  }`}>
                    {request.studentName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 flex items-center gap-2 text-base">
                      {request.studentName}
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${
                        request.type === 'sick' 
                          ? 'bg-red-50 text-red-600 border-red-100' 
                          : 'bg-blue-50 text-blue-600 border-blue-100'
                      }`}>
                        {request.type === 'sick' ? '病假' : '事假'}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5 font-medium">
                      <Clock size={12} className="text-slate-300" />
                      {request.createdAt}
                    </div>
                  </div>
                </div>
                {activeTab === 'history' && (
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border shadow-sm ${
                    request.status === 'approved' 
                      ? 'bg-green-50 text-green-600 border-green-100' 
                      : 'bg-red-50 text-red-600 border-red-100'
                  }`}>
                    {request.status === 'approved' ? '已通过' : '已驳回'}
                  </span>
                )}
              </div>

              <div className="bg-slate-50/80 rounded-xl p-4 space-y-2.5 mb-5 border border-slate-100">
                <div className="flex gap-2 text-sm">
                  <span className="text-slate-400 w-16 flex-shrink-0 flex items-center gap-1.5 font-medium">
                    <Calendar size={14} /> 时间
                  </span>
                  <span className="text-slate-700 font-bold break-all tracking-tight">
                    {request.startDate} 至 {request.endDate}
                  </span>
                </div>
                <div className="flex gap-2 text-sm">
                  <span className="text-slate-400 w-16 flex-shrink-0 flex items-center gap-1.5 font-medium">
                    <FileText size={14} /> 原因
                  </span>
                  <span className="text-slate-700 font-medium break-all leading-relaxed">{request.reason}</span>
                </div>
              </div>

              {request.status === 'pending' && (
                <div className="flex gap-3 pt-1">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReject(request.id);
                    }}
                    className="flex-1 py-3 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:border-slate-300"
                  >
                    <X size={18} /> 驳回
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApprove(request.id);
                    }}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:bg-blue-700 hover:shadow-blue-300"
                  >
                    <Check size={18} strokeWidth={2.5} /> 通过
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
