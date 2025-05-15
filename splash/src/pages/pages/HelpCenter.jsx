import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Bell,
  Headphones,
  MessageCircle,
  Globe,
  Facebook,
  Instagram,
} from 'lucide-react';

const HelpCenter = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/account');
  };

  const notiGoBack = () => {
    navigate('/notifications');
  };

  return (
    <div className='w-full mx-auto min-h-screen bg-white p-4'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <button onClick={handleGoBack}>
          <ChevronLeft size={24} />
        </button>
        <h1 className='text-2xl font-bold'>Help Center</h1>
        <button className="p-2" aria-label="Notifications" onClick={notiGoBack}>
          <Bell size={24} />
        </button>
      </div>

      <div className='border-t border-gray-300 mx-[24px] mt-[24px]' />

      {/* Options */}
      <div className='space-y-3 mt-6 px-[24px]'>
        <div className='flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3'>
          <Headphones size={24} />
          <p className='text-[16px] font-semibold'>Customer Service</p>
        </div>

        <div className='flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3'>
          <MessageCircle size={24} />
          <p className='text-[16px] font-semibold'>Whatsapp</p>
        </div>

        <div className='flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3'>
          <Globe size={24} />
          <p className='text-[16px] font-semibold'>Website</p>
        </div>

        <div className='flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3'>
          <Facebook size={24} />
          <p className='text-[16px] font-semibold'>Facebook</p>
        </div>

        <div className='flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3'>
          <Instagram size={24} />
          <p className='text-[16px] font-semibold'>Instagram</p>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
