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
      {/* Top Bar */}
      <div className="bg-white px-4 py-3 border-b border-slate-200 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2 text-slate-700 font-medium">
          <Calendar size={18} />
          <span>2026-02-23</span>
          <ChevronDown size={16} />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 rounded-full text-xs font-medium text-slate-600">
            全部学科 <ChevronDown size={12} />
          </button>
          <button 
            onClick={() => setView('create')}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-medium active:bg-blue-100"
          >
            <Plus size={14} /> 新建
          </button>
        </div>
      </div>

      {/* Homework List */}
      <div className="p-4 space-y-3 overflow-y-auto">
        {homeworks.map((hw) => (
          <div key={hw.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                  hw.subject === '数学' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                }`}>
                  {hw.subject}
                </span>
                <h3 className="font-bold text-slate-800">{hw.title}</h3>
              </div>
              <div className="flex gap-2">
                <button className="text-slate-400 hover:text-blue-500 p-1">
                  <Edit2 size={16} />
                </button>
                {!hw.published && (
                  <button className="text-slate-400 hover:text-red-500 p-1">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex gap-4 text-xs text-slate-500 mb-2">
              <span>类型: {hw.type}</span>
              <span>预计: {hw.time}</span>
            </div>
            
            <div className="text-sm text-slate-600 bg-slate-50 p-2 rounded-lg mb-3">
              要求: {hw.req}
            </div>

            {hw.published ? (
              <div className="flex justify-end">
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">已发布</span>
              </div>
            ) : (
              <div className="flex justify-end">
                <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">草稿</span>
              </div>
            )}
          </div>
        ))}
        
        <div className="text-center text-xs text-slate-400 mt-4">
          此处不再展示学生提交列表，请前往“点评”页批改
        </div>
      </div>

      {/* Footer Action */}
      <div className="fixed bottom-4 left-4 right-4 z-20">
        <button className="w-full bg-blue-600 text-white py-3 rounded-xl shadow-lg font-bold text-lg flex items-center justify-center gap-2 active:bg-blue-700 transition-colors">
          <Send size={20} /> 发布作业
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
    <div className="bg-white h-full flex flex-col absolute inset-0 z-20">
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
        <button onClick={onBack} className="text-slate-600">取消</button>
        <h1 className="font-bold text-lg text-slate-800">新建作业</h1>
        <button 
          onClick={() => onSave(data)}
          disabled={!data.title}
          className="text-blue-600 font-bold disabled:text-slate-300"
        >
          保存
        </button>
      </div>

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">学科</label>
          <div className="flex gap-3">
            {['数学', '语文', '英语'].map(sub => (
              <button
                key={sub}
                onClick={() => setData({ ...data, subject: sub })}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border ${
                  data.subject === sub 
                    ? 'bg-blue-50 border-blue-200 text-blue-600' 
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">作业内容</label>
          <input
            type="text"
            placeholder="如：口算第3页 / Unit 1 单词"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100"
            value={data.title}
            onChange={e => setData({ ...data, title: e.target.value })}
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">类型</label>
            <select
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm outline-none"
              value={data.type}
              onChange={e => setData({ ...data, type: e.target.value })}
            >
              <option>书写</option>
              <option>口算</option>
              <option>背诵</option>
              <option>预习</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">预计时长</label>
            <select
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm outline-none"
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

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">作业要求</label>
          <textarea
            placeholder="输入具体要求..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 min-h-[100px]"
            value={data.req}
            onChange={e => setData({ ...data, req: e.target.value })}
          />
        </div>

        <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100">
          <span className="text-sm font-medium text-slate-700">立即发布</span>
          <button 
            onClick={() => setData({ ...data, publish: !data.publish })}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              data.publish ? 'bg-blue-600' : 'bg-slate-300'
            }`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
              data.publish ? 'left-7' : 'left-1'
            }`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeworkView;
