import React, { useState } from 'react';
import { Bell, ChevronLeft } from 'lucide-react';  // Update the import
import { useNavigate } from 'react-router-dom';

const FAQs = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('General');
    const [openFaq, setOpenFaq] = useState(null);

    const handleGoBack = () => {
        navigate('/account');
    };
    const notiGoBack = () => {
        navigate('/notifications');
    };

    const faqData = [
        {
            question: "How do I make a purchase?",
            answer: "When you find a product you want to purchase, tap on it to view the product details..."
        },
        {
            question: "What payment methods are accepted?",
            answer: "We accept credit cards, PayPal, Apple Pay, Google Pay, and more."
        },
        {
            question: "How do I track my orders?",
            answer: "Go to 'My Orders' in your account to see the status and tracking info."
        },
        {
            question: "Can I cancel or return an order?",
            answer: "Yes, cancel within 24h or return within 30 days from your account."
        },
        {
            question: "How can I contact customer support?",
            answer: "Use 'Help Center', email support@example.com, or call 1-800-123-4567."
        },
        {
            question: "How do I create an account?",
            answer: "Click 'Sign Up' under Account and follow the steps to register."
        }
    ];

    const tabs = ['General', 'Account', 'Service'];

    const handleFaqToggle = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className='w-full mx-auto min-h-screen bg-white p-4'>
            {/* Header */}
            <div className='flex items-center justify-between mb-6'>
                <button onClick={handleGoBack}>
                    <ChevronLeft size={24} />  {/* Use ChevronLeft here */}
                </button>
                <h1 className='text-2xl font-bold'>FAQs</h1>
                <button className="p-2" aria-label="Notifications" onClick={notiGoBack}>
                    <Bell size={24} />
                </button>
            </div>

            {/* Tabs */}
            <div className='flex justify-between gap-2 mb-4'>
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-2 rounded-lg border transition-all
                            ${activeTab === tab
                                ? 'bg-black text-white'
                                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className='relative mb-4'>
                <input
                    type="text"
                    placeholder="Search for questions..."
                    className='w-full px-4 py-2 rounded-full border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black'
                />
                <svg className="absolute right-4 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 10.5a7.5 7.5 0 0013.65 6.15z" />
                </svg>
            </div>

            {/* FAQ Accordion */}
            <div className='space-y-3 max-h-[420px] overflow-y-auto pr-1'>
                {faqData.map((faq, index) => (
                    <div key={index} className='border border-gray-200 rounded-lg'>
                        <button
                            className='flex justify-between items-center w-full px-4 py-3 text-left'
                            onClick={() => handleFaqToggle(index)}
                        >
                            <span className='font-medium text-[15px]'>{faq.question}</span>
                            <svg
                                className={`w-5 h-5 text-gray-500 transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {openFaq === index && (
                            <div className='px-4 pb-3 text-sm text-gray-600'>
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQs;
