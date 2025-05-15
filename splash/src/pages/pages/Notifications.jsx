import React from 'react';
import {
    Bell,
    Percent,
    Wallet,
    MapPin,
    CreditCard,
    User,
    ChevronLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Notifications = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // 1 sahifa orqaga qaytish
    };

    return (
        <div className='w-full mx-auto min-h-screen bg-white p-4'>
            {/* Header */}
            <div className='flex items-center justify-between mb-6'>
                <button onClick={goBack}>
                    <ChevronLeft size={24} />
                </button>
                <h1 className='text-2xl font-bold'>Notifications</h1>
                <Bell className='w-6 h-6 text-gray-700' />
            </div>

            <div className='border-t border-gray-300 mx-[24px] mt-[24px]' />
            <p className='text-[16px] font-semibold pl-[24px] pt-[20px]'>Today</p>

            {/* Notification 1 */}
            <div className='flex gap-[13px] container mx-auto pl-[24px] pt-[23px]'>
                <Percent size={24} className='mt-[10px]' />
                <div>
                    <p className='text-[14px] font-bold'>30% Special Discount!</p>
                    <p className='text-[12px] font-extralight'>Special promotion only valid today.</p>
                </div>
            </div>

            <div className='border-t border-gray-300 mx-[24px] mt-[20px]' />
            <p className='text-[16px] font-semibold pl-[24px] pt-[20px]'>Yesterday</p>

            {/* Notification 2 */}
            <div className='flex gap-[13px] container mx-auto pl-[24px] pt-[23px]'>
                <Wallet size={24} className='mt-[10px]' />
                <div>
                    <p className='text-[14px] font-bold'>Top Up E-wallet Successfully!</p>
                    <p className='text-[12px] font-extralight'>You have top up your e-wallet.</p>
                </div>
            </div>

            <div className='border-t border-gray-300 mx-[24px] mt-[20px]' />

            {/* Notification 3 */}
            <div className='flex gap-[13px] container mx-auto pl-[24px] pt-[23px]'>
                <MapPin size={24} className='mt-[10px]' />
                <div>
                    <p className='text-[14px] font-bold'>New Service Available!</p>
                    <p className='text-[12px] font-extralight'>Now you can track order in real-time.</p>
                </div>
            </div>

            <div className='border-t border-gray-300 mx-[24px] mt-[20px]' />
            <p className='text-[16px] font-semibold pl-[24px] pt-[20px]'>June 7, 2023</p>

            {/* Notification 4 */}
            <div className='flex gap-[13px] container mx-auto pl-[24px] pt-[23px]'>
                <CreditCard size={24} className='mt-[10px]' />
                <div>
                    <p className='text-[14px] font-bold'>New Service Available!</p>
                    <p className='text-[12px] font-extralight'>Now you can track order in real-time.</p>
                </div>
            </div>

            <div className='border-t border-gray-300 mx-[24px] mt-[20px]' />

            {/* Notification 5 */}
            <div className='flex gap-[13px] container mx-auto pl-[24px] pt-[23px]'>
                <User size={24} className='mt-[10px]' />
                <div>
                    <p className='text-[14px] font-bold'>Account Setup Successfully!</p>
                    <p className='text-[12px] font-extralight'>Your account has been created.</p>
                </div>
            </div>
        </div>
    );
};

export default Notifications;
