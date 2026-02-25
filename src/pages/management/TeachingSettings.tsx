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
    <div className="bg-slate-50/50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md px-4 py-3 border-b border-slate-200/60 sticky top-0 z-20 flex items-center justify-between shadow-sm transition-all duration-300">
        <button 
          onClick={onBack} 
          className="p-2 -ml-2 text-slate-600 hover:bg-slate-100/80 active:scale-95 rounded-full transition-all"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className="font-bold text-lg text-slate-800 tracking-tight">教学设置</h1>
        <div className="w-8"></div>
      </div>

      {/* Tabs */}
      <div className="bg-white/80 backdrop-blur-md px-4 pt-2 border-b border-slate-200/60 flex gap-8 overflow-x-auto no-scrollbar sticky top-[53px] z-10 shadow-sm">
        {([
          { id: 'subjects', label: '学科设置' },
          { id: 'homework', label: '作业类型' },
          { id: 'tags', label: '表现标签' },
        ] as const).map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-sm font-bold whitespace-nowrap transition-all relative ${
              activeTab === tab.id ? 'text-blue-600 scale-105' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-1 bg-blue-600 rounded-full shadow-sm shadow-blue-200 transition-all duration-300" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 space-y-5">
        <div className="bg-white rounded-3xl border border-slate-200/60 p-6 min-h-[300px] shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md">
          {/* Add Input */}
          <div className="flex gap-3 mb-6 relative z-10">
            <input
              type="text"
              value={newItem}
              onChange={e => setNewItem(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdd()}
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-800 placeholder:text-slate-400 font-medium hover:bg-slate-100/50"
              placeholder={`添加${
                activeTab === 'subjects' ? '学科' : 
                activeTab === 'homework' ? '作业类型' : '表现标签'
              }`}
            />
            <button 
              onClick={handleAdd}
              disabled={!newItem.trim()}
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 rounded-2xl font-bold text-sm shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 active:scale-95 transition-all disabled:opacity-50 disabled:shadow-none whitespace-nowrap flex items-center gap-1"
            >
              <Plus size={18} />
              添加
            </button>
          </div>

          {/* List */}
          <div className="flex flex-wrap gap-3 relative z-10">
            {getList().map((item, index) => (
              <div 
                key={index}
                className={`group flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-bold transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-default animate-in zoom-in-50 fade-in duration-300 ${
                  activeTab === 'tags' 
                    ? 'bg-orange-50 border-orange-100 text-orange-600 hover:bg-orange-100 hover:border-orange-200' 
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-blue-200 hover:text-blue-600'
                }`}
              >
                {activeTab === 'tags' && <Tag size={14} className="opacity-60" />}
                <span>{item}</span>
                <button 
                  onClick={() => handleDelete(index)}
                  className="w-5 h-5 rounded-full flex items-center justify-center text-slate-400 hover:bg-red-100 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            {getList().length === 0 && (
              <div className="w-full flex flex-col items-center justify-center py-16 text-slate-400">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 animate-pulse">
                  <Plus size={32} className="text-slate-300" />
                </div>
                <p className="text-sm font-medium text-slate-400">暂无数据，请添加</p>
              </div>
            )}
          </div>
          
          {/* Decorative background element */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-slate-50 rounded-full opacity-50 blur-3xl pointer-events-none"></div>
        </div>
        
        <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100/30 rounded-bl-full -mr-4 -mt-4"></div>
          <h4 className="text-sm font-bold text-blue-700 mb-3 flex items-center gap-2 relative z-10">
            <div className="w-1.5 h-4 bg-blue-500 rounded-full shadow-sm shadow-blue-300"></div>
            功能说明
          </h4>
          <div className="text-xs text-slate-600 leading-relaxed space-y-2 pl-3 border-l-2 border-blue-200 ml-0.5 relative z-10">
            <p>• <span className="font-bold text-slate-800">学科设置</span>：用于作业发布和错题录入。</p>
            <p>• <span className="font-bold text-slate-800">作业类型</span>：用于区分不同形式的作业任务。</p>
            <p>• <span className="font-bold text-slate-800">表现标签</span>：用于每日点评时快速评价学生表现。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachingSettings;
