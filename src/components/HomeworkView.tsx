import { useState } from 'react';
import { Plus, Trash2, Edit2, Calendar, ChevronDown, Send, X, Clock, FileText, CheckCircle } from 'lucide-react';

const HomeworkView = () => {
  const [view, setView] = useState<'list' | 'create'>('list');
  const [homeworks, setHomeworks] = useState([
    { id: 1, subject: '数学', title: '口算第3页', type: '口算', time: '15分钟', req: '完成第3页，注意计算速度', published: false },
    { id: 2, subject: '英语', title: '抄写 Unit 1', type: '书写', time: '20分钟', req: '每个单词抄写3遍', published: true },
  ]);

  const handleCreate = (data: any) => {
    const newHw = {
      id: Date.now(),
      subject: data.subject,
      title: data.title,
      type: data.type,
      time: data.time,
      req: data.req,
      published: data.publish
    };
    setHomeworks([newHw, ...homeworks]);
    setView('list');
  };

  if (view === 'create') {
    return <CreateHomework onBack={() => setView('list')} onSave={handleCreate} />;
  }

  return (
    <div className="flex flex-col h-full pb-20 bg-slate-50 relative">
      {/* Top Bar - Glassmorphism */}
      <div className="bg-white/80 backdrop-blur-md px-4 py-3 border-b border-slate-200/60 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2 text-slate-700 font-bold">
          <Calendar size={18} className="text-blue-600" />
          <span>2026-02-23</span>
          <ChevronDown size={16} className="text-slate-400" />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 shadow-sm active:scale-95 transition-transform">
            全部学科 <ChevronDown size={12} />
          </button>
          <button 
            onClick={() => setView('create')}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-full text-xs font-medium shadow-md shadow-blue-200 active:scale-95 transition-transform hover:bg-blue-700"
          >
            <Plus size={14} /> 新建
          </button>
        </div>
      </div>

      {/* Homework List */}
      <div className="p-4 space-y-3 overflow-y-auto">
        {homeworks.map((hw) => (
          <div key={hw.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 transition-all active:scale-[0.99] hover:shadow-md">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                  hw.subject === '数学' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                }`}>
                  {hw.subject}
                </span>
                <h3 className="font-bold text-slate-800 text-base">{hw.title}</h3>
              </div>
              <div className="flex gap-1">
                <button className="text-slate-400 hover:text-blue-600 p-1.5 hover:bg-blue-50 rounded-full transition-colors">
                  <Edit2 size={16} />
                </button>
                {!hw.published && (
                  <button className="text-slate-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-full transition-colors">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex gap-4 text-xs text-slate-500 mb-3">
              <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded text-slate-600">
                <FileText size={12} /> {hw.type}
              </span>
              <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded text-slate-600">
                <Clock size={12} /> {hw.time}
              </span>
            </div>
            
            <div className="text-sm text-slate-600 bg-slate-50/80 p-3 rounded-xl mb-3 border border-slate-100/50 leading-relaxed">
              <span className="font-medium text-slate-700">要求：</span>{hw.req}
            </div>

            {hw.published ? (
              <div className="flex justify-end">
                <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                  <CheckCircle size={12} /> 已发布
                </span>
              </div>
            ) : (
              <div className="flex justify-end">
                <span className="flex items-center gap-1 text-xs font-medium text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100">
                  <Clock size={12} /> 草稿
                </span>
              </div>
            )}
          </div>
        ))}
        
        <div className="text-center text-xs text-slate-400 mt-6 mb-2">
          此处不再展示学生提交列表，请前往“点评”页批改
        </div>
      </div>

      {/* Footer Action */}
      <div className="fixed bottom-4 left-4 right-4 z-20">
        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3.5 rounded-2xl shadow-lg shadow-blue-200 font-bold text-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all hover:shadow-xl">
          <Send size={20} /> 一键发布作业
        </button>
      </div>
    </div>
  );
};

const CreateHomework: React.FC<{ onBack: () => void, onSave: (data: any) => void }> = ({ onBack, onSave }) => {
  const [data, setData] = useState({
    subject: '数学',
    title: '',
    type: '书写',
    time: '20分钟',
    req: '',
    publish: true
  });

  return (
    <div className="bg-slate-50 h-full flex flex-col absolute inset-0 z-30">
      <div className="px-4 py-3 border-b border-slate-200/60 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-800 p-1">
            <span className="text-sm">取消</span>
        </button>
        <h1 className="font-bold text-lg text-slate-800">新建作业</h1>
        <button 
          onClick={() => onSave(data)}
          disabled={!data.title}
          className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-md shadow-blue-200 disabled:opacity-50 disabled:shadow-none"
        >
          保存
        </button>
      </div>

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <label className="block text-sm font-bold text-slate-800 mb-3">选择学科</label>
          <div className="flex gap-3">
            {['数学', '语文', '英语'].map(sub => (
              <button
                key={sub}
                onClick={() => setData({ ...data, subject: sub })}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  data.subject === sub 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <label className="block text-sm font-bold text-slate-800 mb-3">作业内容</label>
          <input
            type="text"
            placeholder="如：口算第3页 / Unit 1 单词"
            className="w-full bg-slate-50 border-0 rounded-xl px-4 py-3.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-100 transition-all"
            value={data.title}
            onChange={e => setData({ ...data, title: e.target.value })}
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <label className="block text-sm font-bold text-slate-800 mb-3">类型</label>
            <select
              className="w-full bg-slate-50 border-0 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-100"
              value={data.type}
              onChange={e => setData({ ...data, type: e.target.value })}
            >
              <option>书写</option>
              <option>口算</option>
              <option>背诵</option>
              <option>预习</option>
            </select>
          </div>
          <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <label className="block text-sm font-bold text-slate-800 mb-3">预计时长</label>
            <select
              className="w-full bg-slate-50 border-0 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-100"
              value={data.time}
              onChange={e => setData({ ...data, time: e.target.value })}
            >
              <option>10分钟</option>
              <option>15分钟</option>
              <option>20分钟</option>
              <option>30分钟</option>
              <option>45分钟</option>
            </select>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <label className="block text-sm font-bold text-slate-800 mb-3">作业要求</label>
          <textarea
            placeholder="输入具体要求，如：字迹工整，拍照上传..."
            className="w-full bg-slate-50 border-0 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-100 min-h-[120px] resize-none"
            value={data.req}
            onChange={e => setData({ ...data, req: e.target.value })}
          />
        </div>

        <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-800">立即发布</span>
            <span className="text-xs text-slate-400">关闭后仅保存为草稿</span>
          </div>
          <button 
            onClick={() => setData({ ...data, publish: !data.publish })}
            className={`w-12 h-7 rounded-full transition-colors relative ${
              data.publish ? 'bg-blue-600' : 'bg-slate-200'
            }`}
          >
            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
              data.publish ? 'left-6' : 'left-1'
            }`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeworkView;
