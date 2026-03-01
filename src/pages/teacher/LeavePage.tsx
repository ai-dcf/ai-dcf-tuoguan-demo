import { useState, useEffect } from 'react';
import { ChevronLeft, Check, X, Calendar, FileText } from 'lucide-react';
import { dataManager } from '../../utils/dataManager';
import type { LeaveRequest } from '../../types';

export default function LeavePage({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');
  const [requests, setRequests] = useState<LeaveRequest[]>([]);

  useEffect(() => {
    const fetchData = () => {
      setRequests(dataManager.getLeaveRequests());
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleApprove = (id: string) => {
    dataManager.approveLeaveRequest(id);
    setRequests(prev => prev.map(r => 
      r.id === id ? { ...r, status: 'approved' } : r
    ));
  };

  const handleReject = (id: string) => {
    const reason = window.prompt('请输入拒绝理由', '暂不批准');
    if (reason !== null) {
      dataManager.rejectLeaveRequest(id, reason);
      setRequests(prev => prev.map(r => 
        r.id === id ? { ...r, status: 'rejected', rejectReason: reason } : r
      ));
    }
  };

  const filteredRequests = requests.filter(r => 
    activeTab === 'pending' 
      ? r.status === 'pending'
      : r.status !== 'pending'
  );

  return (
    <div className="min-h-screen bg-background pb-6 font-sans">
      <div className="bg-background/90 backdrop-blur-xl px-5 py-4 border-b-2 border-border-main/10 sticky top-0 z-10">
        <div className="flex items-center gap-2 mb-4">
          <button 
            onClick={onBack} 
            className="w-10 h-10 rounded-full bg-white border-2 border-border-main flex items-center justify-center text-text-main shadow-pop-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
          >
            <ChevronLeft size={24} strokeWidth={3} />
          </button>
          <h1 className="font-black text-xl text-text-main tracking-tight">请假审批</h1>
        </div>
        
        <div className="flex p-1.5 bg-white rounded-2xl border-2 border-border-main shadow-pop-sm">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 py-2.5 text-sm font-black rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === 'pending' 
                ? 'bg-primary text-white shadow-sm border-2 border-border-main -translate-y-0.5' 
                : 'text-text-muted hover:bg-surface-muted'
            }`}
          >
            待审批 
            {requests.filter(r => r.status === 'pending').length > 0 && (
              <span className="inline-flex items-center justify-center bg-white text-primary text-[10px] h-5 min-w-[20px] px-1.5 rounded-full font-black border-2 border-border-main">
                {requests.filter(r => r.status === 'pending').length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2.5 text-sm font-black rounded-xl transition-all duration-300 ${
              activeTab === 'history' 
                ? 'bg-primary text-white shadow-sm border-2 border-border-main -translate-y-0.5' 
                : 'text-text-muted hover:bg-surface-muted'
            }`}
          >
            历史记录
          </button>
        </div>
      </div>

      <div className="p-5 space-y-4 max-w-2xl mx-auto">
        {filteredRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-text-muted animate-in fade-in duration-500">
            <div className="w-24 h-24 bg-surface-muted rounded-full flex items-center justify-center mb-4 border-2 border-border-main opacity-50">
              <FileText size={40} className="text-text-main" strokeWidth={2} />
            </div>
            <p className="text-sm font-bold">暂无{activeTab === 'pending' ? '待审批' : '历史'}记录</p>
          </div>
        ) : (
          filteredRequests.map(request => (
            <div 
              key={request.id} 
              className="bg-white rounded-[2rem] p-5 shadow-pop border-2 border-border-main group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary text-primary font-black text-lg">
                    {request.studentName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-black text-lg text-text-main flex items-center gap-2">
                      {request.studentName}
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border-2 ${
                        request.type === '病假' 
                          ? 'bg-primary/10 text-primary border-primary' 
                          : 'bg-accent/20 text-text-main border-border-main'
                      }`}>
                        {request.type}
                      </span>
                    </h3>
                    <p className="text-xs text-text-muted font-bold mt-0.5">申请时间: {request.submitTime}</p>
                  </div>
                </div>
                {request.status !== 'pending' && (
                  <span className={`px-3 py-1 rounded-full text-xs font-black border-2 ${
                    request.status === 'approved' 
                      ? 'bg-secondary/20 text-secondary-dark border-secondary' 
                      : 'bg-text-light/20 text-text-muted border-text-muted'
                  }`}>
                    {request.status === 'approved' ? '已通过' : '已驳回'}
                  </span>
                )}
              </div>

              <div className="bg-surface-muted rounded-2xl p-4 mb-4 border-2 border-border-main/20 space-y-2">
                <div className="flex items-start gap-2">
                  <Calendar size={16} className="text-text-muted mt-0.5" strokeWidth={2.5} />
                  <div>
                    <span className="text-xs font-bold text-text-muted block mb-0.5">请假时间</span>
                    <span className="text-sm font-black text-text-main">
                      {request.startDate} {request.startTime} - {request.endDate} {request.endTime}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2 pt-2 border-t-2 border-border-main/10">
                  <FileText size={16} className="text-text-muted mt-0.5" strokeWidth={2.5} />
                  <div>
                    <span className="text-xs font-bold text-text-muted block mb-0.5">请假事由</span>
                    <span className="text-sm font-bold text-text-main">{request.reason}</span>
                  </div>
                </div>
              </div>

              {request.status === 'pending' && (
                <div className="flex gap-3 pt-2">
                  <button 
                    onClick={() => handleReject(request.id)}
                    className="flex-1 py-3 border-2 border-border-main rounded-xl font-black text-text-main hover:bg-surface-muted active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <X size={18} strokeWidth={3} /> 驳回
                  </button>
                  <button 
                    onClick={() => handleApprove(request.id)}
                    className="flex-1 py-3 bg-secondary text-text-main border-2 border-border-main rounded-xl font-black shadow-pop-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center gap-2 hover:bg-secondary-light"
                  >
                    <Check size={18} strokeWidth={3} /> 通过
                  </button>
                </div>
              )}
              
              {request.status === 'rejected' && request.rejectReason && (
                <div className="mt-3 text-xs bg-primary/5 text-primary p-3 rounded-xl border-2 border-primary/20 font-bold">
                  驳回原因: {request.rejectReason}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
