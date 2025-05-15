import React from 'react';

const ConfirmLogoutModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
        <p>Are you sure you want to log out?</p>
        <div className="flex flex-col mt-4 space-y-4"> {/* Use flex-col for vertical stacking */}
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLogoutModal;
