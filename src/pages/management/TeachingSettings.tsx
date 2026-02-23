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
    <div className="bg-slate-50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-slate-100 sticky top-0 z-10 flex items-center justify-between">
        <button onClick={onBack} className="p-1 -ml-1 text-slate-600 active:bg-slate-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg text-slate-800">教学设置</h1>
        <div className="w-8"></div>
      </div>

      {/* Tabs */}
      <div className="bg-white px-4 pt-2 border-b border-slate-100 flex gap-6 overflow-x-auto no-scrollbar">
        {[
          { id: 'subjects', label: '学科设置' },
          { id: 'homework', label: '作业类型' },
          { id: 'tags', label: '表现标签' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 text-sm font-medium whitespace-nowrap transition-colors relative ${
              activeTab === tab.id ? 'text-blue-600' : 'text-slate-500'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 flex-1">
        <div className="bg-white rounded-xl border border-slate-100 p-4 min-h-[300px]">
          {/* Add Input */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newItem}
              onChange={e => setNewItem(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdd()}
              className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              placeholder={`添加${
                activeTab === 'subjects' ? '学科' : 
                activeTab === 'homework' ? '作业类型' : '表现标签'
              }`}
            />
            <button 
              onClick={handleAdd}
              disabled={!newItem.trim()}
              className="bg-blue-600 text-white px-4 rounded-lg font-medium text-sm disabled:opacity-50 active:scale-95 transition-transform"
            >
              添加
            </button>
          </div>

          {/* List */}
          <div className="flex flex-wrap gap-2">
            {getList().map((item, index) => (
              <div 
                key={index}
                className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-all ${
                  activeTab === 'tags' 
                    ? 'bg-orange-50 border-orange-100 text-orange-700' 
                    : 'bg-slate-50 border-slate-100 text-slate-700'
                }`}
              >
                {activeTab === 'tags' && <Tag size={12} className="opacity-50" />}
                <span>{item}</span>
                <button 
                  onClick={() => handleDelete(index)}
                  className="w-4 h-4 rounded-full flex items-center justify-center text-slate-400 hover:bg-black/10 hover:text-slate-600 transition-colors"
                >
                  <X size={10} />
                </button>
              </div>
            ))}
            {getList().length === 0 && (
              <div className="w-full text-center py-10 text-slate-400 text-sm">
                暂无数据，请添加
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-4 text-xs text-slate-400 px-2 leading-relaxed">
          提示：
          <br />• 学科设置将用于作业发布和错题录入。
          <br />• 作业类型用于区分不同形式的作业任务。
          <br />• 表现标签用于每日点评时快速评价学生表现。
        </div>
      </div>
    </div>
  );
};

export default TeachingSettings;
