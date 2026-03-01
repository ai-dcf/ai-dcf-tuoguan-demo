import React, { useState } from 'react';
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
    <div className="flex flex-col h-full pb-20 bg-background relative font-sans">
      {/* Top Bar */}
      <div className="bg-background/90 backdrop-blur-md px-4 py-3 border-b-2 border-border-main/10 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2 text-text-main font-bold">
          <Calendar size={18} className="text-primary" strokeWidth={2.5} />
          <span>2026-02-23</span>
          <ChevronDown size={16} className="text-text-light" />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 px-3 py-1.5 bg-white border-2 border-border-main rounded-full text-xs font-bold text-text-main shadow-sm active:scale-95 transition-transform">
            全部学科 <ChevronDown size={12} strokeWidth={3} />
          </button>
          <button 
            onClick={() => setView('create')}
            className="w-8 h-8 flex items-center justify-center bg-secondary text-text-main border-2 border-border-main rounded-full shadow-sm active:scale-95 transition-transform"
          >
            <Plus size={20} strokeWidth={3} />
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
            className="bg-white rounded-[2rem] p-4 shadow-pop border-2 border-border-main transition-all active:scale-[0.99] cursor-pointer"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-xl text-xs font-black border-2 border-border-main ${
                  hw.subject === '数学' ? 'bg-secondary text-text-main' : 'bg-accent text-text-main'
                }`}>
                  {hw.subject}
                </span>
                <h3 className="font-black text-text-main text-base">{hw.title}</h3>
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedHomework(hw);
                    setView('edit');
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-sun border-2 border-border-main text-text-main hover:bg-secondary transition-colors"
                >
                  <Edit2 size={14} strokeWidth={2.5} />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(hw.id);
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-sun border-2 border-border-main text-text-main hover:bg-primary hover:text-white transition-colors"
                >
                  <Trash2 size={14} strokeWidth={2.5} />
                </button>
              </div>
            </div>
            
            <div className="flex gap-2 text-xs text-text-light mb-3 font-bold">
              <span className="flex items-center gap-1 bg-background px-2 py-1 rounded-lg border border-border-main/20">
                <FileText size={12} strokeWidth={2.5} /> {hw.type}
              </span>
              <span className="flex items-center gap-1 bg-background px-2 py-1 rounded-lg border border-border-main/20">
                <Clock size={12} strokeWidth={2.5} /> {hw.time}
              </span>
            </div>
            
            <div className="text-sm text-text-main bg-background p-3 rounded-xl mb-3 border border-border-main/20 leading-relaxed line-clamp-2">
              <span className="font-black text-text-main">要求：</span>{hw.req}
            </div>

            <div className="flex justify-between items-center">
               <div className="flex items-center gap-1 text-xs text-text-light font-bold">
                 <Sparkles size={12} strokeWidth={2.5} />
                 <span>{hw.knowledgePoints || '未填写知识点'}</span>
               </div>
               {hw.published ? (
                <span className="flex items-center gap-1 text-xs font-black text-text-main bg-secondary px-2.5 py-1 rounded-full border-2 border-border-main shadow-sm">
                  <CheckCircle size={12} strokeWidth={3} /> 已发布
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs font-black text-text-main bg-accent px-2.5 py-1 rounded-full border-2 border-border-main shadow-sm">
                  <Clock size={12} strokeWidth={3} /> 草稿
                </span>
              )}
            </div>
          </div>
        ))}
        
        <div className="text-center text-xs text-text-light mt-6 mb-2 font-bold">
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
    <div className="bg-background h-full flex flex-col fixed inset-0 z-50 animate-in slide-in-from-right duration-300 font-sans">
      <div className="px-4 py-3 border-b-2 border-border-main/10 flex items-center justify-between sticky top-0 bg-background/90 backdrop-blur-md z-10 safe-area-top">
        <button onClick={onBack} className="text-text-main p-1 flex items-center gap-1 font-bold">
            <ArrowLeft size={20} strokeWidth={3} />
            <span className="text-sm">返回</span>
        </button>
        <h1 className="font-black text-lg text-text-main">{isEdit ? '编辑作业' : '新建作业'}</h1>
        <button 
          onClick={() => onSave(data)}
          disabled={!data.title}
          className="w-9 h-9 flex items-center justify-center bg-secondary text-text-main rounded-full border-2 border-border-main shadow-sm disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform"
        >
          <Save size={18} strokeWidth={2.5} />
        </button>
      </div>

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        <div className="bg-white p-5 rounded-[2rem] shadow-pop border-2 border-border-main">
          <label className="block text-sm font-black text-text-main mb-3">选择学科</label>
          <div className="flex gap-3">
            {['数学', '语文', '英语'].map(sub => (
              <button
                key={sub}
                onClick={() => setData({ ...data, subject: sub })}
                className={`flex-1 py-3 rounded-xl text-sm font-black transition-all border-2 ${
                  data.subject === sub 
                    ? 'bg-primary text-white border-border-main shadow-sm' 
                    : 'bg-background text-text-light border-border-main/20 hover:bg-surface-sun'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-[2rem] shadow-pop border-2 border-border-main">
          <label className="block text-sm font-black text-text-main mb-3">作业内容</label>
          <input
            type="text"
            placeholder="如：口算第3页 / Unit 1 单词"
            className="w-full bg-background border-2 border-border-main rounded-xl px-4 py-3.5 text-sm font-bold text-text-main placeholder:text-text-light focus:ring-4 focus:ring-primary/20 transition-all outline-none"
            value={data.title}
            onChange={e => setData({ ...data, title: e.target.value })}
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1 bg-white p-5 rounded-[2rem] shadow-pop border-2 border-border-main">
            <label className="block text-sm font-black text-text-main mb-3">类型</label>
            <select
              className="w-full bg-background border-2 border-border-main rounded-xl px-3 py-3 text-sm font-bold text-text-main outline-none focus:ring-4 focus:ring-primary/20"
              value={data.type}
              onChange={e => setData({ ...data, type: e.target.value })}
            >
              <option>书写</option>
              <option>口算</option>
              <option>背诵</option>
              <option>预习</option>
            </select>
          </div>
          <div className="flex-1 bg-white p-5 rounded-[2rem] shadow-pop border-2 border-border-main">
            <label className="block text-sm font-black text-text-main mb-3">预计时长</label>
            <select
              className="w-full bg-background border-2 border-border-main rounded-xl px-3 py-3 text-sm font-bold text-text-main outline-none focus:ring-4 focus:ring-primary/20"
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

        <div className="bg-white p-5 rounded-[2rem] shadow-pop border-2 border-border-main">
          <label className="block text-sm font-black text-text-main mb-3">作业要求</label>
          <textarea
            placeholder="输入具体要求，如：字迹工整，拍照上传..."
            className="w-full bg-background border-2 border-border-main rounded-xl px-4 py-3 text-sm font-bold text-text-main placeholder:text-text-light focus:ring-4 focus:ring-primary/20 min-h-[120px] resize-none outline-none"
            value={data.req}
            onChange={e => setData({ ...data, req: e.target.value })}
          />
        </div>

        <div className="bg-white p-5 rounded-[2rem] shadow-pop border-2 border-border-main">
          <label className="block text-sm font-black text-text-main mb-3">知识点（用于统计）</label>
          <div className="flex items-center gap-2 bg-background rounded-xl px-4 py-3.5 border-2 border-border-main focus-within:ring-4 focus-within:ring-primary/20 transition-all">
            <Sparkles size={18} className="text-accent" strokeWidth={2.5} />
            <input
              type="text"
              placeholder="如：两位数加减法"
              className="w-full bg-transparent border-0 text-sm font-bold text-text-main placeholder:text-text-light focus:outline-none"
              value={data.knowledgePoints}
              onChange={e => setData({ ...data, knowledgePoints: e.target.value })}
            />
          </div>
        </div>

        <div className="flex items-center justify-between bg-white p-5 rounded-[2rem] shadow-pop border-2 border-border-main">
          <div className="flex flex-col">
            <span className="text-sm font-black text-text-main">立即发布</span>
            <span className="text-xs text-text-light font-bold">关闭后仅保存为草稿</span>
          </div>
          <button 
            onClick={() => setData({ ...data, published: !data.published })}
            className={`w-14 h-8 rounded-full transition-colors relative border-2 border-border-main ${
              data.published ? 'bg-secondary' : 'bg-gray-300'
            }`}
          >
            <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full border-2 border-border-main shadow-sm transition-all ${
              data.published ? 'left-[26px]' : 'left-0.5'
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
    <div className="bg-background h-full flex flex-col fixed inset-0 z-50 animate-in slide-in-from-right duration-300 font-sans">
      <div className="px-4 py-3 border-b-2 border-border-main/10 flex items-center justify-between sticky top-0 bg-background/90 backdrop-blur-md z-10 safe-area-top">
        <button onClick={onBack} className="text-text-main hover:text-text-main p-1 flex items-center gap-1">
          <ArrowLeft size={20} strokeWidth={3} />
          <span className="text-sm font-bold">返回</span>
        </button>
        <h1 className="font-black text-lg text-text-main">作业详情</h1>
        <div className="flex gap-2">
           <button onClick={onEdit} className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-sun border-2 border-border-main text-text-main shadow-sm">
             <Edit2 size={16} strokeWidth={2.5} />
           </button>
           <button onClick={onDelete} className="w-9 h-9 flex items-center justify-center rounded-full bg-primary text-white border-2 border-border-main shadow-sm">
             <Trash2 size={16} strokeWidth={2.5} />
           </button>
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        <div className="bg-white rounded-[2rem] p-6 shadow-pop border-2 border-border-main">
          <div className="flex items-center justify-between mb-4">
            <span className={`px-3 py-1 rounded-xl text-sm font-black border-2 border-border-main ${
              homework.subject === '数学' ? 'bg-secondary text-text-main' : 'bg-accent text-text-main'
            }`}>
              {homework.subject}
            </span>
            {homework.published ? (
              <span className="flex items-center gap-1 text-xs font-black text-text-main bg-secondary px-2.5 py-1 rounded-full border-2 border-border-main">
                <CheckCircle size={12} strokeWidth={3} /> 已发布
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs font-black text-text-main bg-accent px-2.5 py-1 rounded-full border-2 border-border-main">
                <Clock size={12} strokeWidth={3} /> 草稿
              </span>
            )}
          </div>
          
          <h2 className="text-2xl font-black text-text-main mb-6">{homework.title}</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-background p-4 rounded-2xl border-2 border-border-main/20">
              <div className="flex items-center gap-2 text-text-light text-xs mb-1 font-bold">
                <FileText size={14} strokeWidth={2.5} />
                <span>类型</span>
              </div>
              <div className="font-black text-text-main">{homework.type}</div>
            </div>
            <div className="bg-background p-4 rounded-2xl border-2 border-border-main/20">
              <div className="flex items-center gap-2 text-text-light text-xs mb-1 font-bold">
                <Clock size={14} strokeWidth={2.5} />
                <span>预计时长</span>
              </div>
              <div className="font-black text-text-main">{homework.time}</div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-black text-text-main mb-3 flex items-center gap-2">
              <BookOpen size={18} className="text-primary" strokeWidth={2.5} />
              作业要求
            </h3>
            <div className="bg-background p-4 rounded-2xl text-text-main leading-relaxed border-2 border-border-main/20 font-medium">
              {homework.req || '无具体要求'}
            </div>
          </div>

          <div>
            <h3 className="font-black text-text-main mb-3 flex items-center gap-2">
              <Sparkles size={18} className="text-accent" strokeWidth={2.5} />
              知识点
            </h3>
            <div className="flex flex-wrap gap-2">
              {homework.knowledgePoints ? (
                <span className="bg-accent text-text-main px-3 py-1.5 rounded-lg text-sm font-bold border-2 border-border-main">
                  {homework.knowledgePoints}
                </span>
              ) : (
                <span className="text-text-light text-sm italic font-bold">未填写知识点</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {!homework.published && (
        <div className="p-4 bg-white border-t-2 border-border-main/10 safe-area-bottom">
          <button 
            onClick={onPublish}
            className="w-full bg-primary text-white py-3.5 rounded-2xl font-black shadow-pop border-2 border-border-main active:scale-[0.98] transition-all flex items-center justify-center gap-2 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            <Send size={20} strokeWidth={2.5} /> 立即发布
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeworkView;