import React, { useState } from 'react';
import { ChevronLeft, Plus, X, Tag } from 'lucide-react';

interface TeachingSettingsProps {
  onBack: () => void;
}

const TeachingSettings: React.FC<TeachingSettingsProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'subjects' | 'homework' | 'tags'>('subjects');
  
  const [subjects, setSubjects] = useState(['语文', '数学', '英语', '科学']);
  const [homeworkTypes, setHomeworkTypes] = useState(['书面作业', '口头背诵', '预习复习', '试卷订正']);
  const [tags, setTags] = useState(['书写工整', '计算准确', '坐姿端正', '专注力高', '积极发言']);

  const [newItem, setNewItem] = useState('');

  const getList = () => {
    switch(activeTab) {
      case 'subjects': return subjects;
      case 'homework': return homeworkTypes;
      case 'tags': return tags;
    }
  };

  const setList = (newList: string[]) => {
    switch(activeTab) {
      case 'subjects': setSubjects(newList); break;
      case 'homework': setHomeworkTypes(newList); break;
      case 'tags': setTags(newList); break;
    }
  };

  const handleAdd = () => {
    if (newItem.trim()) {
      setList([...getList(), newItem.trim()]);
      setNewItem('');
    }
  };

  const handleDelete = (index: number) => {
    const list = getList();
    setList(list.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-background min-h-screen flex flex-col font-sans">
      {/* Header */}
      <div className="bg-background/90 backdrop-blur-md px-4 py-3 border-b-2 border-border-main/10 sticky top-0 z-20 flex items-center justify-between shadow-sm transition-all duration-300">
        <button 
          onClick={onBack} 
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-border-main text-text-main shadow-pop active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
        >
          <ChevronLeft size={24} strokeWidth={3} />
        </button>
        <h1 className="font-black text-lg text-text-main tracking-tight">教学设置</h1>
        <div className="w-10"></div>
      </div>

      {/* Tabs */}
      <div className="bg-background/90 backdrop-blur-md px-4 pt-2 border-b-2 border-border-main/10 flex gap-8 overflow-x-auto no-scrollbar sticky top-[68px] z-10 shadow-sm">
        {([
          { id: 'subjects', label: '学科设置' },
          { id: 'homework', label: '作业类型' },
          { id: 'tags', label: '表现标签' },
        ] as const).map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-sm font-black whitespace-nowrap transition-all relative ${
              activeTab === tab.id ? 'text-primary scale-105' : 'text-text-light hover:text-text-main'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-1 bg-primary rounded-full shadow-sm" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 space-y-5">
        <div className="bg-white rounded-[2rem] border-2 border-border-main p-6 min-h-[300px] shadow-pop relative overflow-hidden transition-all duration-300">
          {/* Add Input */}
          <div className="flex gap-3 mb-6 relative z-10">
            <input
              type="text"
              value={newItem}
              onChange={e => setNewItem(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdd()}
              className="flex-1 px-4 py-3 bg-background border-2 border-border-main rounded-xl text-sm font-bold text-text-main focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all placeholder:text-text-light"
              placeholder={`添加${
                activeTab === 'subjects' ? '学科' : 
                activeTab === 'homework' ? '作业类型' : '表现标签'
              }`}
            />
            <button 
              onClick={handleAdd}
              disabled={!newItem.trim()}
              className="bg-secondary text-text-main px-6 rounded-xl font-black text-sm border-2 border-border-main shadow-sm active:scale-95 transition-all disabled:opacity-50 disabled:shadow-none whitespace-nowrap flex items-center gap-1 hover:bg-secondary/80"
            >
              <Plus size={18} strokeWidth={3} />
              添加
            </button>
          </div>

          {/* List */}
          <div className="flex flex-wrap gap-3 relative z-10">
            {getList().map((item, index) => (
              <div 
                key={index}
                className={`group flex items-center gap-2 px-4 py-2.5 rounded-full border-2 text-sm font-black transition-all duration-300 hover:-translate-y-0.5 cursor-default animate-in zoom-in-50 fade-in duration-300 ${
                  activeTab === 'tags' 
                    ? 'bg-accent border-border-main text-text-main shadow-sm' 
                    : 'bg-background border-border-main text-text-main hover:bg-surface-sun hover:border-border-main'
                }`}
              >
                {activeTab === 'tags' && <Tag size={14} strokeWidth={2.5} className="opacity-60" />}
                <span>{item}</span>
                <button 
                  onClick={() => handleDelete(index)}
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                    activeTab === 'tags'
                      ? 'text-text-main hover:bg-black/10'
                      : 'text-text-light hover:bg-primary hover:text-white'
                  }`}
                >
                  <X size={14} strokeWidth={3} />
                </button>
              </div>
            ))}
            {getList().length === 0 && (
              <div className="w-full flex flex-col items-center justify-center py-16 text-text-light">
                <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mb-4 border-2 border-border-main opacity-50">
                  <Plus size={32} className="text-text-main" strokeWidth={2.5} />
                </div>
                <p className="text-sm font-bold text-text-light">暂无数据，请添加</p>
              </div>
            )}
          </div>
          
          {/* Decorative background element */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-surface-sun rounded-full opacity-50 blur-3xl pointer-events-none"></div>
        </div>
        
        <div className="bg-background rounded-[2rem] p-5 border-2 border-border-main relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-secondary/20 rounded-bl-full -mr-4 -mt-4 border-b-2 border-l-2 border-border-main border-dashed"></div>
          <h4 className="text-sm font-black text-text-main mb-3 flex items-center gap-2 relative z-10">
            <div className="w-1.5 h-4 bg-primary rounded-full"></div>
            功能说明
          </h4>
          <div className="text-xs text-text-light leading-relaxed space-y-2 pl-3 border-l-2 border-border-main/20 ml-0.5 relative z-10 font-bold">
            <p>• <span className="font-black text-text-main">学科设置</span>：用于作业发布和错题录入。</p>
            <p>• <span className="font-black text-text-main">作业类型</span>：用于区分不同形式的作业任务。</p>
            <p>• <span className="font-black text-text-main">表现标签</span>：用于每日点评时快速评价学生表现。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachingSettings;
