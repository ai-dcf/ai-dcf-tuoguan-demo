import React, { useState } from 'react';
import { ChevronLeft, Camera, MapPin, Save, Upload, Building2, Phone, FileText, Trash } from 'lucide-react';

interface InstitutionInfoProps {
  onBack: () => void;
}

const InstitutionInfo: React.FC<InstitutionInfoProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '快乐托管中心',
    phone: '13800138000',
    address: '北京市海淀区中关村大街1号',
    description: '专注小学生课后托管服务，提供作业辅导、素质拓展等课程。'
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Mock save
    setTimeout(() => {
      setIsSaving(false);
      alert('保存成功');
      onBack();
    }, 800);
  };

  return (
    <div className="bg-slate-50/50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl px-4 py-3 border-b border-slate-200/60 sticky top-0 z-10 flex items-center justify-between shadow-sm transition-all duration-300">
        <button 
          onClick={onBack} 
          className="p-2 -ml-2 text-slate-600 hover:bg-slate-100/80 active:scale-95 rounded-full transition-all"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className="font-bold text-lg text-slate-800 tracking-tight">机构信息</h1>
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="text-white font-bold text-sm bg-blue-600 px-4 py-1.5 rounded-full hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-md shadow-blue-200"
        >
          {isSaving ? '保存中...' : (
            <>
              <Save size={16} /> 保存
            </>
          )}
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-6 pb-10">
        {/* Logo Upload */}
        <div className="flex flex-col items-center justify-center space-y-3 py-4">
          <div className="relative group cursor-pointer">
            <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-xl shadow-slate-200/50 overflow-hidden group-hover:shadow-2xl group-hover:shadow-blue-200/50 transition-all duration-300 transform group-hover:scale-105">
              <Building2 className="text-slate-300 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300" size={40} />
            </div>
            <div className="absolute bottom-1 right-1 bg-blue-600 text-white p-2.5 rounded-full shadow-lg border-2 border-white group-hover:bg-blue-700 group-hover:scale-110 transition-all duration-300">
              <Camera size={16} />
            </div>
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer rounded-full z-20" accept="image/*" />
          </div>
          <span className="text-xs font-bold text-slate-400 group-hover:text-blue-500 transition-colors">点击上传机构 Logo</span>
        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 size={14} className="text-blue-500" /> 机构名称
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:font-normal"
              placeholder="请输入机构名称"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
              <Phone size={14} className="text-green-500" /> 联系电话
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:font-normal"
              placeholder="请输入联系电话"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin size={14} className="text-red-500" /> 机构地址
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:font-normal"
                placeholder="请输入详细地址"
              />
              <button className="px-4 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 active:scale-95 transition-all flex items-center justify-center shadow-sm hover:shadow border border-blue-100">
                <MapPin size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
            <FileText size={14} className="text-orange-500" /> 机构简介
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none placeholder:font-normal"
            placeholder="请输入机构简介..."
          />
        </div>

        {/* Environment Photos */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <label className="block text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider flex items-center gap-1.5">
            <Camera size={14} className="text-purple-500" /> 环境照片
          </label>
          <div className="grid grid-cols-3 gap-3">
            <div className="aspect-square bg-slate-50 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-slate-200 cursor-pointer hover:bg-slate-100 hover:border-blue-300 transition-all group active:scale-95">
              <Upload className="text-slate-400 group-hover:text-blue-500 transition-colors mb-1" size={24} />
              <span className="text-[10px] text-slate-400 font-bold group-hover:text-blue-500 transition-colors">上传照片</span>
            </div>
            {/* Mock uploaded photos */}
            <div className="aspect-square bg-slate-200 rounded-xl overflow-hidden relative group shadow-sm cursor-pointer">
               <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=200" alt="环境1" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Trash size={20} className="text-white hover:text-red-400 transition-colors" />
               </div>
            </div>
             <div className="aspect-square bg-slate-200 rounded-xl overflow-hidden relative group shadow-sm cursor-pointer">
               <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=200" alt="环境2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Trash size={20} className="text-white hover:text-red-400 transition-colors" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionInfo;