import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);
  const [activeTab, setActiveTab] = useState('ongoing');
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

    // Clean up cart items, removing any unexpected properties
    const cleanedCart = storedCart.map(item => ({
      _id: item._id,
      title: item.title,
      price: item.price,
      img: item.img,
      size: item.size,
      quantity: item.quantity || 1
    }));

    const completed = cleanedCart.filter(item => item.isCompleted);
    const inProgress = cleanedCart.filter(item => !item.isCompleted);

    // Update localStorage with cleaned cart
    localStorage.setItem('cart', JSON.stringify(cleanedCart));

    setCompletedItems(completed);
    setCartItems(inProgress);
  }, []);

  // In other methods like increaseQty, decreaseQty, removeFromCart
  // Make sure to use the same cleaning approach
  const cleanCartItem = (item) => ({
    _id: item._id,
    title: item.title,
    price: item.price,
    img: item.img,
    size: item.size,
    quantity: item.quantity || 1
  });

  const updateLocalStorage = (items) => {
    const cleanedItems = items.map(cleanCartItem);
    const combinedItems = [...cleanedItems, ...completedItems];
    localStorage.setItem('cart', JSON.stringify(combinedItems));
  };

  const increaseQty = (id, size) => {
    const updated = cartItems.map(item =>
      item._id === id && item.size === size
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartItems(updated);
    updateLocalStorage(updated);
  };

  const decreaseQty = (id, size) => {
    const updated = cartItems.map(item =>
      item._id === id && item.size === size && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updated);
    updateLocalStorage(updated);
  };

  const removeFromCart = (id, size) => {
    const updatedCartItems = cartItems.filter(
      item => !(item._id === id && item.size === size)
    );
    setCartItems(updatedCartItems);

    const combinedItems = [...updatedCartItems, ...completedItems];
    localStorage.setItem('cart', JSON.stringify(combinedItems));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = 80;
  const finalTotal = total + shippingFee;

  const handleCheckout = () => {
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-bold text-center w-full">Cart</h1>
      </div>

      {/* Ongoing Items */}
      {activeTab === 'ongoing' && (
        <div>
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map(item => (
                <div
                  key={`${item._id}-${item.size}`}
                  className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img src={item.img} alt={item.title} className="w-16 h-16 object-contain" />
                    <div>
                      <h2 className="font-semibold text-sm">{item.title}</h2>
                      <p className="text-gray-500 text-sm">Size: {item.size}</p>
                      <p className="text-gray-800 font-bold">${item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => decreaseQty(item._id, item.size)} className="text-xl">−</button>
                    <span className="text-lg">{item.quantity}</span>
                    <button onClick={() => increaseQty(item._id, item.size)} className="text-xl">+</button>
                    <button onClick={() => removeFromCart(item._id, item.size)} className="text-red-500">🗑</button>
                  </div>
                </div>
              ))}

              <div className="text-right mt-4 font-bold text-lg">
                Sub-total: ${total.toFixed(2)}
                <br />
                Shipping fee: ${shippingFee}
                <br />
                <span className="text-xl">Total: ${finalTotal.toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-6 w-full bg-black text-white py-4 text-lg rounded-xl"
              >
                Go To Checkout →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Completed Items */}
      {activeTab === 'completed' && (
        <div>
          {completedItems.length === 0 ? (
            <p className="text-center text-gray-500">No completed orders</p>
          ) : (
            <div className="space-y-4">
              {completedItems.map(item => (
                <div
                  key={`${item._id}-${item.size}`}
                  className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img src={item.img} alt={item.title} className="w-16 h-16 object-contain" />
                    <div>
                      <h2 className="font-semibold text-sm">{item.title}</h2>
                      <p className="text-gray-500 text-sm">Size: {item.size}</p>
                      <p className="text-gray-800 font-bold">${item.price}</p>
                    </div>
                  </div>
                  <div className="text-green-500">Completed</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
