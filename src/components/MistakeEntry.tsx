import React, { useState } from 'react';
import { ChevronLeft, Camera, Image as ImageIcon, XCircle } from 'lucide-react';

export type MistakeEntryData = {
  subject: 'math' | 'chinese' | 'english';
  mode: 'mistake' | 'exercise';
  student: string;
  knowledgePoint: string;
  reason: string;
};

interface MistakeEntryProps {
  onBack: () => void;
  onSave: (data: MistakeEntryData) => void;
  initialData?: {
    student?: string;
    subject?: MistakeEntryData['subject'];
    knowledgePoint?: string;
    reason?: MistakeEntryData['reason'];
  };
}

const MistakeEntry: React.FC<MistakeEntryProps> = ({ onBack, onSave, initialData }) => {
  const [step, setStep] = useState<'photo' | 'edit'>('photo');
  const [data, setData] = useState<MistakeEntryData>({
    subject: initialData?.subject || 'math',
    mode: 'mistake',
    student: initialData?.student || '',
    knowledgePoint: initialData?.knowledgePoint || '',
    reason: initialData?.reason || 'careless'
  });

  // Handle saving with current data
  const handleSave = () => {
    onSave(data);
  };

  if (step === 'photo') {
    return (
      <div className="bg-black h-full flex flex-col absolute inset-0 z-50">
        <div className="px-4 py-3 flex justify-between items-center text-white sticky top-0 bg-black z-10">
          <button onClick={onBack}><XCircle size={24} /></button>
          <span className="font-bold">拍照录题</span>
          <div className="w-6"></div>
        </div>
        
        <div className="flex justify-center gap-4 py-4">
          <select 
            className="bg-zinc-800 text-white px-4 py-1.5 rounded-full text-sm outline-none appearance-none border border-zinc-700"
            value={data.subject}
            onChange={(e) => {
              const value = e.target.value;
              if (value === 'math' || value === 'chinese' || value === 'english') {
                setData({ ...data, subject: value });
              }
            }}
          >
            <option value="math">数学</option>
            <option value="chinese">语文</option>
            <option value="english">英语</option>
          </select>
          <select 
            className="bg-zinc-800 text-white px-4 py-1.5 rounded-full text-sm outline-none appearance-none border border-zinc-700"
            value={data.mode}
            onChange={(e) => {
              const value = e.target.value;
              if (value === 'mistake' || value === 'exercise') {
                setData({ ...data, mode: value });
              }
            }}
          >
            <option value="mistake">错题</option>
            <option value="exercise">练习</option>
          </select>
        </div>

        <div className="flex-1 relative mx-4 border-2 border-yellow-400 rounded-lg overflow-hidden bg-zinc-900">
          <div className="absolute inset-0 flex items-center justify-center text-zinc-500">
            <span className="text-sm">请将题目置于框内，保持水平</span>
          </div>
          {/* Mock Grid Lines */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
            <div className="border-r border-white/20"></div>
            <div className="border-r border-white/20"></div>
            <div className="border-r border-transparent"></div>
            <div className="border-b border-white/20 col-span-3"></div>
            <div className="border-b border-white/20 col-span-3"></div>
          </div>
        </div>

        <div className="h-32 bg-black flex items-center justify-around px-8 shrink-0">
          <button className="text-white flex flex-col items-center gap-1 opacity-80 hover:opacity-100">
            <ImageIcon size={24} />
            <span className="text-xs">相册</span>
          </button>
          <button 
            onClick={() => setStep('edit')}
            className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center bg-white/20 active:bg-white/40 transition-colors"
          >
            <div className="w-12 h-12 bg-white rounded-full"></div>
          </button>
          <div className="w-8"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white h-full flex flex-col absolute inset-0 z-50 animate-in slide-in-from-right duration-300">
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
        <button onClick={() => setStep('photo')} className="text-slate-600"><ChevronLeft size={24} /></button>
        <h1 className="font-bold text-lg text-slate-800">编辑错题</h1>
        <button onClick={handleSave} className="text-blue-600 font-medium">保存</button>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto flex-1">
        {/* Mock Image Preview */}
        <div className="h-48 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 border border-slate-200 shrink-0">
          <Camera size={32} className="mr-2" />
          错题图片预览
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">关联学生</label>
            <input 
              type="text" 
              placeholder="请输入学生姓名"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={data.student}
              onChange={e => setData({...data, student: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">知识点</label>
            <input 
              type="text" 
              placeholder="搜索或输入知识点"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={data.knowledgePoint}
              onChange={e => setData({...data, knowledgePoint: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">错题归因</label>
            <div className="flex gap-2 flex-wrap">
              {['粗心大意', '审题不清', '概念模糊', '运算错误', '字体潦草'].map(reason => (
                <button
                  key={reason}
                  onClick={() => setData({...data, reason})}
                  className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                    data.reason === reason 
                      ? 'bg-blue-50 border-blue-200 text-blue-600' 
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {reason}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MistakeEntry;
