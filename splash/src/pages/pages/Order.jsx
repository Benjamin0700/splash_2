import React from "react";
import { useState, useEffect } from "react";
import { ChevronLeft, Bell, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

function MyOrders() {
    const [activeTab, setActiveTab] = useState("ongoing");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

        const transformed = storedCart.map((item) => ({
            id: item._id,
            name: item.title || "Unnamed Product",
            price: `$${item.price}`,
            image: item.img || "/placeholder.png",
            status: item.isCompleted ? "delivered" : "in-transit",
            rating: item.isCompleted ? 4.5 : null,
        }));

        setOrders(transformed);
        setLoading(false);
    }, []);


    const filteredOrders = orders.filter((order) =>
        activeTab === "ongoing" ? order.status !== "delivered" : order.status === "delivered"
    );

    const renderStatusBadge = (status) => (
        <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
            {status === "in-transit" ? "In Transit" : "Delivered"}
        </span>
    );

    const renderRating = (rating) =>
        rating ? (
            <div className="flex items-center">
                <span className="text-yellow-500">★</span>
                <span className="text-xs ml-1">{rating}</span>
            </div>
        ) : null;

    if (loading) {
        return (
            <div className="min-h-screen w-full max-w-md mx-auto flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <Loader className="h-8 w-8 text-gray-700 animate-spin" />
                    <p className="mt-2 text-gray-600">Loading orders...</p>
                </div>
            </div>
        );
    }

    const handleGoBack = () => {
        navigate('/account');
    };

    const notiGoBack = () => {
        navigate('/notifications');
    };
    return (
        <div className="bg-gray-50 min-h-screen w-full mx-auto">
            <div className="bg-white p-4 flex items-center justify-between border-b">
                <div className="flex items-center">
                    <button onClick={handleGoBack}>
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="text-lg font-medium text-center ml-4">My Orders</h1>
                </div>
                <button className="p-2" aria-label="Notifications" onClick={notiGoBack}>
                    <Bell size={24} />
                </button>
            </div>

            <div className="px-4 py-2">
                <div className="bg-white rounded-lg flex mb-4">
                    <button
                        className={`flex-1 py-3 text-center font-medium text-sm ${activeTab === "ongoing"
                            ? "text-black border-b-2 border-black"
                            : "text-gray-500"
                            }`}
                        onClick={() => setActiveTab("ongoing")}
                    >
                        Ongoing
                    </button>
                    <button
                        className={`flex-1 py-3 text-center font-medium text-sm ${activeTab === "completed"
                            ? "text-black border-b-2 border-black"
                            : "text-gray-500"
                            }`}
                        onClick={() => setActiveTab("completed")}
                    >
                        Completed
                    </button>
                </div>

                <div className="space-y-3">
                    {filteredOrders.length === 0 ? (
                        <div className="bg-white p-6 rounded-lg text-center">
                            <p className="text-gray-500">No {activeTab} orders found</p>
                        </div>
                    ) : (
                        filteredOrders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white p-3 rounded-lg border border-gray-200 flex items-center"
                            >
                                <img
                                    src={order.image}
                                    alt={order.name}
                                    className="w-16 h-16 rounded-md object-contain bg-white"
                                />
                                <div className="ml-3 flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium text-sm">{order.name}</h3>
                                            <p className="text-sm text-gray-700 mt-1">{order.price}</p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            {renderStatusBadge(order.status)}
                                            {renderRating(order.rating)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyOrders;
