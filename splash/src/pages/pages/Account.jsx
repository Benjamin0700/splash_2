import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Package, Users, BookOpen, CreditCard, Bell, HelpCircle, Headphones, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext'; // Adjust path as needed
import ConfirmLogoutModal from './ConfirmLogoutModal'; // Import the modal

// MenuLink component
const MenuLink = ({ icon, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center px-4 py-5 hover:bg-gray-100 transition-colors"
    >
      <div className="mr-4 text-gray-700">{icon}</div>
      <span className="flex-1 text-left text-lg">{text}</span>
      <ChevronRight size={24} className="text-gray-400" />
    </button>
  );
};

const Account = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    setIsModalOpen(true); // Show the custom modal
  };

  const handleConfirmLogout = () => {
    logout();
    setIsModalOpen(false); // Close the modal after logout
  };

  const handleCancelLogout = () => {
    setIsModalOpen(false); // Close the modal without logging out
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Account</h1>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <button onClick={() => navigate('/notifications')}>
            <Bell size={24} />
          </button>
        </button>
      </header>

      {/* User Info */}
      {user && (
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
              {user.username ? user.username[0].toUpperCase() : ''}
            </div>
            <div>
              <h2 className="text-lg font-semibold">{user.username || 'User'}</h2>
              <p className="text-gray-500">{user.email || 'user@example.com'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Account Menu */}
      <div className="flex-1">
        <MenuLink
          icon={<Package size={24} />}
          text="My Orders"
          onClick={() => navigate('/order')}
        />
        <div className="h-2 bg-gray-100" />
        <MenuLink
          icon={<Users size={24} />}
          text="My Details"
          onClick={() => navigate('/details')}
        />
        <div className="border-t border-gray-200" />
        <MenuLink
          icon={<BookOpen size={24} />}
          text="Address Book"
          onClick={() => navigate('/address-book')}
        />
        <div className="border-t border-gray-200" />
        <MenuLink
          icon={<CreditCard size={24} />}
          text="Payment Methods"
          onClick={() => navigate('/payment')}
        />
        <div className="border-t border-gray-200" />
        <MenuLink
          icon={<Bell size={24} />}
          text="Notifications"
          onClick={() => navigate('/notifications')}
        />
        <div className="h-2 bg-gray-100" />
        <MenuLink
          icon={<HelpCircle size={24} />}
          text="FAQs"
          onClick={() => navigate('/faqs')}
        />
        <div className="border-t border-gray-200" />
        <MenuLink
          icon={<Headphones size={24} />}
          text="Help Center"
          onClick={() => navigate('/help')}
        />
        <div className="h-2 bg-gray-100" />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-5 text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut size={24} className="mr-4" />
          <span className="flex-1 text-left text-lg">Logout</span>
        </button>
      </div>

      {/* Confirmation Modal */}
      <ConfirmLogoutModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
    </div>
  );
};

export default Account;
