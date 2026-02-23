import React, { useState } from 'react';
import { ChevronLeft, Camera, MapPin, Save, Upload } from 'lucide-react';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Mock save
    alert('保存成功');
    onBack();
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-slate-100 sticky top-0 z-10 flex items-center justify-between">
        <button onClick={onBack} className="p-1 -ml-1 text-slate-600 active:bg-slate-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg text-slate-800">机构信息</h1>
        <button onClick={handleSave} className="text-blue-600 font-medium text-sm">
          保存
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Logo Upload */}
        <div className="bg-white p-4 rounded-xl border border-slate-100 flex flex-col items-center justify-center space-y-3">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center border-2 border-dashed border-slate-300 relative overflow-hidden group cursor-pointer">
            <Camera className="text-slate-400 group-hover:text-slate-500 transition-colors" size={32} />
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
          </div>
          <span className="text-xs text-slate-500">点击上传机构Logo</span>
        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
          <div className="p-4 border-b border-slate-50">
            <label className="block text-sm font-medium text-slate-700 mb-1">机构名称</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="请输入机构名称"
            />
          </div>
          <div className="p-4 border-b border-slate-50">
            <label className="block text-sm font-medium text-slate-700 mb-1">联系电话</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="请输入联系电话"
            />
          </div>
          <div className="p-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">机构地址</label>
            <div className="flex gap-2">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="请输入详细地址"
              />
              <button className="px-3 py-2 bg-slate-100 text-slate-600 rounded-lg active:bg-slate-200 transition-colors">
                <MapPin size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl border border-slate-100 p-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">机构简介</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
            placeholder="请输入机构简介..."
          />
        </div>

        {/* Environment Photos */}
        <div className="bg-white rounded-xl border border-slate-100 p-4">
          <label className="block text-sm font-medium text-slate-700 mb-3">环境照片</label>
          <div className="grid grid-cols-3 gap-3">
            <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300 cursor-pointer hover:bg-slate-50 transition-colors">
              <Upload className="text-slate-400" size={24} />
            </div>
            {/* Mock uploaded photos */}
            <div className="aspect-square bg-slate-200 rounded-lg overflow-hidden relative group">
               <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=200" alt="环境1" className="w-full h-full object-cover" />
            </div>
             <div className="aspect-square bg-slate-200 rounded-lg overflow-hidden relative group">
               <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=200" alt="环境2" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionInfo;
