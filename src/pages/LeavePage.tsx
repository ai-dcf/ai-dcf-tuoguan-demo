import React, { useState } from 'react';
import { ChevronLeft, Check, X, Calendar, User, Clock, Filter, Search } from 'lucide-react';

interface LeaveRequest {
  id: string;
  studentName: string;
  className: string;
  type: 'sick' | 'casual';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  requestTime: string;
}

const LeavePage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');
  const [requests, setRequests] = useState<LeaveRequest[]>([
    {
      id: '1',
      studentName: '张三',
      className: '午托高年级',
      type: 'sick',
      startDate: '2026-02-24',
      endDate: '2026-02-24',
      reason: '发烧去医院',
      status: 'pending',
      requestTime: '2026-02-23 19:30'
    },
    {
      id: '2',
      studentName: '李四',
      className: '晚托一年级',
      type: 'casual',
      startDate: '2026-02-25',
      endDate: '2026-02-26',
      reason: '回老家探亲',
      status: 'pending',
      requestTime: '2026-02-23 20:15'
    },
    {
      id: '3',
      studentName: '王五',
      className: '午托高年级',
      type: 'sick',
      startDate: '2026-02-20',
      endDate: '2026-02-20',
      reason: '感冒',
      status: 'approved',
      requestTime: '2026-02-19 18:00'
    }
  ]);

  const handleApprove = (id: string) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'approved' } : req
    ));
  };

  const handleReject = (id: string) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'rejected' } : req
    ));
  };

  const filteredRequests = requests.filter(req => 
    activeTab === 'pending' ? req.status === 'pending' : req.status !== 'pending'
  );

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-slate-100 sticky top-0 z-10">
        <div className="flex items-center gap-2 mb-2">
          <button onClick={onBack} className="p-1 -ml-1 text-slate-600 active:bg-slate-100 rounded-full">
            <ChevronLeft size={24} />
          </button>
          <h1 className="font-bold text-lg text-slate-800">请假审批</h1>
        </div>
        
        {/* Tabs */}
        <div className="flex p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
              activeTab === 'pending' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            待审批 ({requests.filter(r => r.status === 'pending').length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
              activeTab === 'history' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            历史记录
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {filteredRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-3">
              <Clock size={32} />
            </div>
            <p>暂无{activeTab === 'pending' ? '待审批' : '历史'}记录</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredRequests.map(req => (
              <div key={req.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      {req.studentName.slice(-1)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        {req.studentName}
                        <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                          req.type === 'sick' 
                            ? 'bg-red-50 text-red-600 border-red-100' 
                            : 'bg-orange-50 text-orange-600 border-orange-100'
                        }`}>
                          {req.type === 'sick' ? '病假' : '事假'}
                        </span>
                      </h3>
                      <p className="text-xs text-slate-500">{req.className}</p>
                    </div>
                  </div>
                  {req.status !== 'pending' && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      req.status === 'approved' 
                        ? 'bg-green-50 text-green-600' 
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {req.status === 'approved' ? '已通过' : '已驳回'}
                    </span>
                  )}
                </div>

                <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-600 space-y-2 mb-3">
                  <div className="flex gap-2">
                    <Calendar size={16} className="text-slate-400 shrink-0" />
                    <span>{req.startDate} {req.startDate !== req.endDate && `至 ${req.endDate}`}</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-4 h-4 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="block w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                    </div>
                    <span className="leading-relaxed">{req.reason}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>申请时间: {req.requestTime}</span>
                </div>

                {req.status === 'pending' && (
                  <div className="flex gap-3 mt-4 pt-3 border-t border-slate-100">
                    <button 
                      onClick={() => handleReject(req.id)}
                      className="flex-1 py-2 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 active:bg-slate-100"
                    >
                      驳回
                    </button>
                    <button 
                      onClick={() => handleApprove(req.id)}
                      className="flex-1 py-2 rounded-lg bg-blue-600 text-white font-medium shadow-sm hover:bg-blue-700 active:bg-blue-800"
                    >
                      通过
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeavePage;
