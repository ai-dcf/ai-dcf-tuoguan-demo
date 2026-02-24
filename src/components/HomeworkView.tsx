import { useState } from 'react';
import { Plus, Trash2, Edit2, Calendar, ChevronDown, Send, Clock, FileText, CheckCircle, ArrowLeft, BookOpen, Sparkles, Save } from 'lucide-react';

interface Homework {
  id: number;
  subject: string;
  title: string;
  type: string;
  time: string;
  req: string;
  published: boolean;
  knowledgePoints: string;
}

const HomeworkView = () => {
  const [view, setView] = useState<'list' | 'create' | 'edit' | 'detail'>('list');
  const [selectedHomework, setSelectedHomework] = useState<Homework | null>(null);
  const [homeworks, setHomeworks] = useState<Homework[]>([
    { id: 1, subject: '数学', title: '口算第3页', type: '口算', time: '15分钟', req: '完成第3页，注意计算速度', published: false, knowledgePoints: '两位数加减法' },
    { id: 2, subject: '英语', title: '抄写 Unit 1', type: '书写', time: '20分钟', req: '每个单词抄写3遍', published: true, knowledgePoints: 'Unit 1 核心词汇' },
  ]);

  const handleCreate = (data: Omit<Homework, 'id'>) => {
    const newHw = {
      id: Date.now(),
      ...data
    };
    setHomeworks([newHw, ...homeworks]);
    setView('list');
  };

  const handleUpdate = (id: number, data: Omit<Homework, 'id'>) => {
    setHomeworks(homeworks.map(h => h.id === id ? { ...h, ...data } : h));
    setView('list');
    setSelectedHomework(null);
  };

  const handleDelete = (id: number) => {
    if (confirm('确定要删除这项作业吗？')) {
      setHomeworks(homeworks.filter(h => h.id !== id));
      if (view === 'detail') setView('list');
    }
  };

  const handlePublish = (id: number) => {
    setHomeworks(homeworks.map(h => h.id === id ? { ...h, published: true } : h));
    if (selectedHomework && selectedHomework.id === id) {
      setSelectedHomework({ ...selectedHomework, published: true });
    }
  };

  if (view === 'create') {
    return <HomeworkForm onBack={() => setView('list')} onSave={handleCreate} />;
  }

  if (view === 'edit' && selectedHomework) {
    return (
      <HomeworkForm 
        initialData={selectedHomework} 
        onBack={() => setView('list')} 
        onSave={(data) => handleUpdate(selectedHomework.id, data)} 
        isEdit 
      />
    );
  }

  if (view === 'detail' && selectedHomework) {
    return (
      <HomeworkDetail 
        homework={selectedHomework} 
        onBack={() => setView('list')}
        onEdit={() => setView('edit')}
        onDelete={() => handleDelete(selectedHomework.id)}
        onPublish={() => handlePublish(selectedHomework.id)}
      />
    );
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
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors active:scale-95"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Homework List */}
      <div className="p-4 space-y-3 overflow-y-auto">
        {homeworks.map((hw) => (
          <div 
            key={hw.id} 
            onClick={() => {
              setSelectedHomework(hw);
              setView('detail');
            }}
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 transition-all active:scale-[0.99] hover:shadow-md cursor-pointer"
          >
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
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedHomework(hw);
                    setView('edit');
                  }}
                  className="text-slate-400 hover:text-blue-600 p-1.5 hover:bg-blue-50 rounded-full transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(hw.id);
                  }}
                  className="text-slate-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 size={16} />
                </button>
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
            
            <div className="text-sm text-slate-600 bg-slate-50/80 p-3 rounded-xl mb-3 border border-slate-100/50 leading-relaxed line-clamp-2">
              <span className="font-medium text-slate-700">要求：</span>{hw.req}
            </div>

            <div className="flex justify-between items-center">
               <div className="flex items-center gap-1 text-xs text-slate-400">
                 <Sparkles size={12} />
                 <span>{hw.knowledgePoints || '未填写知识点'}</span>
               </div>
               {hw.published ? (
                <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                  <CheckCircle size={12} /> 已发布
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs font-medium text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100">
                  <Clock size={12} /> 草稿
                </span>
              )}
            </div>
          </div>
        ))}
        
        <div className="text-center text-xs text-slate-400 mt-6 mb-2">
          此处不再展示学生提交列表，请前往“点评”页批改
        </div>
      </div>
    </div>
  );
};

const HomeworkForm: React.FC<{ 
  initialData?: Homework;
  onBack: () => void; 
  onSave: (data: Omit<Homework, 'id'>) => void;
  isEdit?: boolean;
}> = ({ initialData, onBack, onSave, isEdit = false }) => {
  const [data, setData] = useState({
    subject: initialData?.subject || '数学',
    title: initialData?.title || '',
    type: initialData?.type || '书写',
    time: initialData?.time || '20分钟',
    req: initialData?.req || '',
    published: initialData?.published || false,
    knowledgePoints: initialData?.knowledgePoints || ''
  });

  return (
    <div className="bg-slate-50 h-full flex flex-col fixed inset-0 z-50 animate-in slide-in-from-right duration-300">
      <div className="px-4 py-3 border-b border-slate-200/60 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10 safe-area-top">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-800 p-1 flex items-center gap-1">
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">返回</span>
        </button>
        <h1 className="font-bold text-lg text-slate-800">{isEdit ? '编辑作业' : '新建作业'}</h1>
        <button 
          onClick={() => onSave(data)}
          disabled={!data.title}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save size={20} />
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

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <label className="block text-sm font-bold text-slate-800 mb-3">知识点（用于统计）</label>
          <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-4 py-3.5 border border-slate-100 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <Sparkles size={18} className="text-blue-500" />
            <input
              type="text"
              placeholder="如：两位数加减法"
              className="w-full bg-transparent border-0 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
              value={data.knowledgePoints}
              onChange={e => setData({ ...data, knowledgePoints: e.target.value })}
            />
          </div>
        </div>

        <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-800">立即发布</span>
            <span className="text-xs text-slate-400">关闭后仅保存为草稿</span>
          </div>
          <button 
            onClick={() => setData({ ...data, published: !data.published })}
            className={`w-12 h-7 rounded-full transition-colors relative ${
              data.published ? 'bg-blue-600' : 'bg-slate-200'
            }`}
          >
            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
              data.published ? 'left-6' : 'left-1'
            }`} />
          </button>
        </div>
      </div>
    </div>
  );
};

const HomeworkDetail: React.FC<{
  homework: Homework;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onPublish: () => void;
}> = ({ homework, onBack, onEdit, onDelete, onPublish }) => {
  return (
    <div className="bg-slate-50 h-full flex flex-col fixed inset-0 z-50 animate-in slide-in-from-right duration-300">
      <div className="px-4 py-3 border-b border-slate-200/60 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10 safe-area-top">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-800 p-1 flex items-center gap-1">
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">返回</span>
        </button>
        <h1 className="font-bold text-lg text-slate-800">作业详情</h1>
        <div className="flex gap-1">
           <button onClick={onEdit} className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
             <Edit2 size={20} />
           </button>
           <button onClick={onDelete} className="p-2 text-red-500 hover:bg-red-50 rounded-full">
             <Trash2 size={20} />
           </button>
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <span className={`px-3 py-1 rounded-xl text-sm font-bold ${
              homework.subject === '数学' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
            }`}>
              {homework.subject}
            </span>
            {homework.published ? (
              <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                <CheckCircle size={12} /> 已发布
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs font-medium text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100">
                <Clock size={12} /> 草稿
              </span>
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-slate-800 mb-6">{homework.title}</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 p-4 rounded-2xl">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <FileText size={14} />
                <span>类型</span>
              </div>
              <div className="font-bold text-slate-700">{homework.type}</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Clock size={14} />
                <span>预计时长</span>
              </div>
              <div className="font-bold text-slate-700">{homework.time}</div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              <BookOpen size={18} className="text-blue-500" />
              作业要求
            </h3>
            <div className="bg-slate-50 p-4 rounded-2xl text-slate-700 leading-relaxed border border-slate-100/50">
              {homework.req || '无具体要求'}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Sparkles size={18} className="text-orange-500" />
              知识点
            </h3>
            <div className="flex flex-wrap gap-2">
              {homework.knowledgePoints ? (
                <span className="bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg text-sm font-medium border border-orange-100">
                  {homework.knowledgePoints}
                </span>
              ) : (
                <span className="text-slate-400 text-sm italic">未填写知识点</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {!homework.published && (
        <div className="p-4 bg-white border-t border-slate-100 safe-area-bottom">
          <button 
            onClick={onPublish}
            className="w-full bg-blue-600 text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Send size={20} /> 立即发布
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeworkView;
