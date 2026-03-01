import React, { useState } from 'react';
import { ChevronLeft, Camera, MapPin, Save, Upload, Building2, Phone, FileText, Trash } from 'lucide-react';

interface InstitutionInfoProps {
  onBack: () => void;
}

const InstitutionInfo: React.FC<InstitutionInfoProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '星星托管',
    phone: '17770091273',
    address: '中福城对面30号店铺',
    description: '精品小班、作业规范、习惯养成、营养膳食。活动期间（2月24日-3月4日）报名有礼，老带新立减100元！'
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
    <div className="bg-background min-h-screen flex flex-col font-sans">
      {/* Header */}
      <div className="bg-background/90 backdrop-blur-xl px-4 py-3 border-b-2 border-border-main/10 sticky top-0 z-10 flex items-center justify-between shadow-sm transition-all duration-300">
        <button 
          onClick={onBack} 
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-border-main text-text-main shadow-pop active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
        >
          <ChevronLeft size={24} strokeWidth={3} />
        </button>
        <h1 className="font-black text-lg text-text-main tracking-tight">机构信息</h1>
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="text-white font-black text-sm bg-primary px-4 py-1.5 rounded-full hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-pop border-2 border-border-main active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
        >
          {isSaving ? '保存中...' : (
            <>
              <Save size={16} strokeWidth={2.5} /> 保存
            </>
          )}
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-6 pb-10">
        {/* Logo Upload */}
        <div className="flex flex-col items-center justify-center space-y-3 py-4">
          <div className="relative group cursor-pointer">
            <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center border-2 border-border-main shadow-pop overflow-hidden group-hover:scale-105 transition-all duration-300">
              <Building2 className="text-text-light group-hover:text-primary transition-all duration-300" size={40} strokeWidth={2} />
            </div>
            <div className="absolute bottom-0 right-0 bg-primary text-white p-2.5 rounded-full shadow-sm border-2 border-border-main group-hover:scale-110 transition-all duration-300">
              <Camera size={16} strokeWidth={2.5} />
            </div>
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer rounded-full z-20" accept="image/*" />
          </div>
          <span className="text-xs font-black text-text-light group-hover:text-primary transition-colors">点击上传机构 Logo</span>
        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-[2rem] p-5 shadow-pop border-2 border-border-main space-y-5">
          <div>
            <label className="block text-xs font-black text-text-light mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 size={14} className="text-primary" strokeWidth={2.5} /> 机构名称
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background border-2 border-border-main rounded-xl text-sm font-bold text-text-main focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all placeholder:font-normal"
              placeholder="请输入机构名称"
            />
          </div>
          
          <div>
            <label className="block text-xs font-black text-text-light mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
              <Phone size={14} className="text-secondary" strokeWidth={2.5} /> 联系电话
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background border-2 border-border-main rounded-xl text-sm font-bold text-text-main focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all placeholder:font-normal"
              placeholder="请输入联系电话"
            />
          </div>
          
          <div>
            <label className="block text-xs font-black text-text-light mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin size={14} className="text-accent" strokeWidth={2.5} /> 机构地址
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="flex-1 px-4 py-3 bg-background border-2 border-border-main rounded-xl text-sm font-bold text-text-main focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all placeholder:font-normal"
                placeholder="请输入详细地址"
              />
              <button className="px-4 bg-secondary text-text-main rounded-xl hover:bg-secondary/80 active:scale-95 transition-all flex items-center justify-center shadow-sm border-2 border-border-main">
                <MapPin size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-[2rem] p-5 shadow-pop border-2 border-border-main">
          <label className="block text-xs font-black text-text-light mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
            <FileText size={14} className="text-text-main" strokeWidth={2.5} /> 机构简介
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 bg-background border-2 border-border-main rounded-xl text-sm font-bold text-text-main focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all resize-none placeholder:font-normal"
            placeholder="请输入机构简介..."
          />
        </div>

        {/* Environment Photos */}
        <div className="bg-white rounded-[2rem] p-5 shadow-pop border-2 border-border-main">
          <label className="block text-xs font-black text-text-light mb-3 uppercase tracking-wider flex items-center gap-1.5">
            <Camera size={14} className="text-secondary" strokeWidth={2.5} /> 环境照片
          </label>
          <div className="grid grid-cols-3 gap-3">
            <div className="aspect-square bg-background rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-border-main cursor-pointer hover:bg-surface-sun hover:border-primary transition-all group active:scale-95">
              <Upload className="text-text-light group-hover:text-primary transition-colors mb-1" size={24} strokeWidth={2.5} />
              <span className="text-[10px] text-text-light font-black group-hover:text-primary transition-colors">上传照片</span>
            </div>
            {/* Mock uploaded photos */}
            <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden relative group shadow-sm cursor-pointer border-2 border-border-main">
               <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=200" alt="环境1" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Trash size={20} className="text-white hover:text-primary transition-colors" strokeWidth={2.5} />
               </div>
            </div>
             <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden relative group shadow-sm cursor-pointer border-2 border-border-main">
               <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=200" alt="环境2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Trash size={20} className="text-white hover:text-primary transition-colors" strokeWidth={2.5} />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionInfo;
