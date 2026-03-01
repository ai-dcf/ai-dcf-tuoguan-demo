import React, { useState } from 'react';
import { ChevronLeft, Camera, Image as ImageIcon, XCircle, Check, Save } from 'lucide-react';

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
    reason?: string;
  };
}

const MistakeEntry: React.FC<MistakeEntryProps> = ({ onBack, onSave, initialData }) => {
  const [step, setStep] = useState<'photo' | 'edit'>('photo');
  const [data, setData] = useState<MistakeEntryData>({
    subject: initialData?.subject || 'math',
    mode: 'mistake' as any,
    student: initialData?.student || '',
    knowledgePoint: initialData?.knowledgePoint || '',
    reason: initialData?.reason || '粗心大意'
  });

  // Handle saving with current data
  const handleSave = () => {
    onSave(data);
  };

  if (step === 'photo') {
    return (
      <div className="bg-black h-full flex flex-col absolute inset-0 z-50 font-sans">
        <div className="px-4 py-3 flex justify-between items-center text-white sticky top-0 bg-black z-10">
          <button onClick={onBack} className="p-1 hover:bg-white/20 rounded-full transition-colors"><XCircle size={28} /></button>
          <span className="font-black text-lg">拍照录题</span>
          <div className="w-9"></div>
        </div>
        
        <div className="flex justify-center gap-4 py-4 z-10">
          <select 
            className="bg-zinc-800 text-white px-4 py-2 rounded-full text-sm font-bold outline-none appearance-none border border-zinc-600 focus:border-white transition-colors"
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
            className="bg-zinc-800 text-white px-4 py-2 rounded-full text-sm font-bold outline-none appearance-none border border-zinc-600 focus:border-white transition-colors"
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

        <div className="flex-1 relative mx-4 border-2 border-yellow-400 rounded-3xl overflow-hidden bg-zinc-900">
          <div className="absolute inset-0 flex items-center justify-center text-zinc-500">
            <span className="text-sm font-bold">请将题目置于框内，保持水平</span>
          </div>
          {/* Mock Grid Lines */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
            <div className="border-r border-white/10"></div>
            <div className="border-r border-white/10"></div>
            <div className="border-r border-transparent"></div>
            <div className="border-b border-white/10 col-span-3"></div>
            <div className="border-b border-white/10 col-span-3"></div>
          </div>
        </div>

        <div className="h-40 bg-black flex items-center justify-around px-8 shrink-0 pb-6">
          <button className="text-white flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center">
                <ImageIcon size={24} />
            </div>
            <span className="text-xs font-bold">相册</span>
          </button>
          <button 
            onClick={() => setStep('edit')}
            className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center bg-white/20 active:bg-white/40 active:scale-95 transition-all"
          >
            <div className="w-16 h-16 bg-white rounded-full"></div>
          </button>
          <div className="w-12"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background h-full flex flex-col absolute inset-0 z-50 animate-in slide-in-from-right duration-300 font-sans">
      <div className="px-4 py-3 border-b-2 border-border-main/10 flex items-center justify-between sticky top-0 bg-background/90 backdrop-blur-md z-10 safe-area-top">
        <button onClick={() => setStep('photo')} className="text-text-main hover:bg-black/5 rounded-full p-1 transition-colors">
            <ChevronLeft size={24} strokeWidth={3} />
        </button>
        <h1 className="font-black text-lg text-text-main">编辑错题</h1>
        <button 
            onClick={handleSave} 
            className="bg-primary text-white px-4 py-1.5 rounded-full text-sm font-black shadow-sm active:scale-95 transition-transform border-2 border-border-main"
        >
            保存
        </button>
      </div>

      <div className="p-4 space-y-5 overflow-y-auto flex-1">
        {/* Mock Image Preview */}
        <div className="h-64 bg-white rounded-[2rem] flex items-center justify-center text-text-light border-2 border-border-main shrink-0 shadow-pop relative overflow-hidden group">
          <div className="absolute inset-0 bg-surface-sun/30 pattern-dots opacity-50"></div>
          <div className="flex flex-col items-center gap-2 relative z-10">
             <div className="w-16 h-16 bg-surface-sun rounded-full flex items-center justify-center border-2 border-border-main text-text-main group-hover:scale-110 transition-transform">
                <Camera size={32} strokeWidth={2.5} />
             </div>
             <span className="font-bold text-sm">错题图片预览</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-[2rem] shadow-pop border-2 border-border-main space-y-4">
          <div>
            <label className="block text-sm font-black text-text-main mb-2">关联学生</label>
            <input 
              type="text" 
              placeholder="请输入学生姓名"
              className="w-full bg-background border-2 border-border-main rounded-xl px-4 py-3 text-sm font-bold text-text-main placeholder:text-text-light focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all"
              value={data.student}
              onChange={e => setData({...data, student: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-black text-text-main mb-2">知识点</label>
            <input 
              type="text" 
              placeholder="搜索或输入知识点"
              className="w-full bg-background border-2 border-border-main rounded-xl px-4 py-3 text-sm font-bold text-text-main placeholder:text-text-light focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all"
              value={data.knowledgePoint}
              onChange={e => setData({...data, knowledgePoint: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-black text-text-main mb-3">错题归因</label>
            <div className="flex gap-2 flex-wrap">
              {['粗心大意', '审题不清', '概念模糊', '运算错误', '字体潦草'].map(reason => (
                <button
                  key={reason}
                  onClick={() => setData({...data, reason})}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all active:scale-95 ${
                    data.reason === reason 
                      ? 'bg-secondary text-text-main border-border-main shadow-sm' 
                      : 'bg-background border-border-main/20 text-text-light hover:border-border-main hover:text-text-main'
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
