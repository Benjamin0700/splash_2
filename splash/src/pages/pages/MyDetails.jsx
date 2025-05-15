import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthContext'; // Adjust path as needed
import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';

const MyDetails = () => {
    const { currentUser, setCurrentUser } = useAuth(); // Use setCurrentUser instead of updateUserFavorites
    const navigate = useNavigate();
    const [details, setDetails] = useState({
        dateOfBirth: currentUser?.dateOfBirth || '',
        gender: currentUser?.gender || '',
    });
    const [error, setError] = useState('');

    const notiGoBack = () => {
        navigate('/notifications');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            navigate('/auth');
            return;
        }

        try {
            const token = localStorage.getItem('userToken');
            if (!token) throw new Error('No token found');

            // Step 1: Check if the email already exists in the backend
            const emailResponse = await axios.get(`https://marsgoup-1.onrender.com/api/users/email/${currentUser?.gmail}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!emailResponse.data.exists) {
                setError("Email address not found. Cannot update profile.");
                return;
            }

            // If email exists, proceed to update user details if needed
            setCurrentUser({ ...currentUser, ...details });
            setError('');
            navigate('/account'); // Navigate back to the account page after update
        } catch (err) {
            console.error('Error updating details:', err.response?.data || err.message);
            setError("Ma'lumotlarni yangilashda xatolik yuz berdi");
        }
    };

    return (
        <div className="min-h-screen bg-white pb-16">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white px-4 py-4 flex justify-between items-center border-b border-gray-200">
                <button onClick={() => navigate('/account')} className="p-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M15 18l-6-6 6-6"></path>
                    </svg>
                </button>
                <h1 className="text-lg font-bold">My Details</h1>
                <button className="p-2" aria-label="Notifications" onClick={notiGoBack}>
                    <Bell size={24} />
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-4 py-6 space-y-6">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Full Name</h2>
                    <div className="bg-gray-100 rounded-lg p-3">
                        <p className="text-gray-800">{currentUser?.fullname || ''}</p>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Email Address</h2>
                    <div className="bg-gray-100 rounded-lg p-3">
                        <p className="text-gray-800">{currentUser?.gmail || ''}</p>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Password</h2>
                    <div className="bg-gray-100 rounded-lg p-3">
                        <p className="text-gray-800">**********</p>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Gender</h2>
                    <div className="bg-white border border-gray-300 rounded-lg p-3">
                        <select
                            name="gender"
                            value={details.gender}
                            onChange={handleChange}
                            className="w-full bg-transparent outline-none text-gray-800"
                        >
                            <option value="" disabled>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-lg text-lg font-medium"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default MyDetails;
