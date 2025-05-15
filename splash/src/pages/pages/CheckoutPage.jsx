import React, { useState, useEffect } from 'react';
import { ChevronLeft, Bell, MapPin, Pencil, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Address from './AddressPage';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const total = Number(localStorage.getItem('cartTotal')) || 0;
  const shipping = 80;
  const final = total + shipping;

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('**** **** **** 2512');

  const notiGoBack = () => navigate('/notifications');

  useEffect(() => {
    const savedAddresses = JSON.parse(localStorage.getItem('addresses')) || [];
    setAddresses(savedAddresses);

    const savedSelectedAddress = localStorage.getItem('selectedAddress');
    if (savedSelectedAddress) {
      setSelectedAddress(JSON.parse(savedSelectedAddress));
    } else if (savedAddresses.length > 0) {
      setSelectedAddress(savedAddresses[0]);
    }

    const savedCard = JSON.parse(localStorage.getItem('cardInfo'));
    if (savedCard && savedCard.number) {
      setCardNumber(savedCard.number);
    } else {
      setCardNumber('**** **** **** 2512');
    }
  }, []);

  const handleDeleteAddress = (addressId) => {
    const updated = addresses.filter((a) => a.id !== addressId);
    setAddresses(updated);
    localStorage.setItem('addresses', JSON.stringify(updated));

    if (selectedAddress?.id === addressId) {
      const fallback = updated.length > 0 ? updated[0] : null;
      setSelectedAddress(fallback);
      localStorage.setItem('selectedAddress', JSON.stringify(fallback));
    }
  };

  useEffect(() => {
    if (selectedAddress) {
      localStorage.setItem('selectedAddress', JSON.stringify(selectedAddress));
    }
  }, [selectedAddress]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-gray-200 flex justify-between items-center">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Checkout</h1>
        <button className="p-2" aria-label="Notifications" onClick={notiGoBack}>
          <Bell size={24} />
        </button>
      </header>

      <div className="flex-1 p-4 space-y-6">
        {/* Delivery Address */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-md">Delivery Address</h2>
            <button
              className="text-sm font-medium text-black underline"
              onClick={() => setShowAddressModal(true)}
            >
              Change
            </button>
          </div>

          {selectedAddress ? (
            <div className="flex items-start space-x-3">
              <MapPin className="mt-1 text-gray-500" />
              <div>
                <p className="font-medium">{selectedAddress.nickname}</p>
                <p className="text-gray-600 text-sm">
                  {selectedAddress.fullAddress}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 text-sm">No address selected.</p>
          )}
        </div>

        <hr />

        {/* Payment Method */}
        <div>
          <h2 className="font-semibold text-md mb-3">Payment Method</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setPaymentMethod('card')}
              className={`flex-1 border rounded-lg px-4 py-2 flex justify-center items-center font-semibold ${paymentMethod === 'card' ? 'bg-black text-white border-black' : ''
                }`}
            >
              Card
            </button>
            <button
              onClick={() => setPaymentMethod('cash')}
              className={`flex-1 border rounded-lg px-4 py-2 flex justify-center items-center font-semibold ${paymentMethod === 'cash' ? 'bg-black text-white border-black' : ''
                }`}
            >
              Cash
            </button>
            <button
              onClick={() => setPaymentMethod('apple')}
              className={`flex-1 border rounded-lg px-4 py-2 flex justify-center items-center font-semibold ${paymentMethod === 'apple' ? 'bg-black text-white border-black' : ''
                }`}
            >
               Pay
            </button>
          </div>

          {/* Card input only for card payment */}
          {paymentMethod === 'card' && (
            <div className="mt-4 border rounded-lg p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">VISA</p>
                <input
                  className="text-gray-700 tracking-widest border border-gray-300 rounded px-2 py-1 mt-1"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
              <button
                onClick={() => navigate('/edit-card')}
                className="ml-2 text-gray-500 hover:text-black"
              >
                <Pencil size={20} className="text-gray-500" />
              </button>
            </div>
          )}
        </div>

        <hr />

        {/* Order Summary */}
        <div>
          <h2 className="font-semibold text-md mb-3">Order Summary</h2>
          <div className="flex justify-between text-gray-700 mb-1">
            <span>Sub-total</span>
            <span>${total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-700 mb-1">
            <span>VAT (%)</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between text-gray-700 mb-1">
            <span>Shipping fee</span>
            <span>${shipping}</span>
          </div>
          <div className="border-t mt-2 mb-2"></div>
          <div className="flex justify-between font-bold text-black text-lg">
            <span>Total</span>
            <span>${final.toLocaleString()}</span>
          </div>
        </div>

        {/* Promo Code */}
        <div className="flex">
          <input
            type="text"
            placeholder="Enter promo code"
            className="flex-1 border rounded-l-lg p-3 text-sm"
          />
          <button
            type="button"  // Qo‘shilishi kerak
            className="bg-black text-white px-6 rounded-r-lg font-semibold"
          >
            Add
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <button
          type="button"  // ✅ type aniq ko‘rsatilgan
          className="w-full bg-black text-white py-4 rounded-lg font-semibold text-lg"
          onClick={() => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];

            const completed = cart.map(item => ({
              ...item,
              isCompleted: true,
            }));

            localStorage.setItem('cart', JSON.stringify(completed));
            localStorage.setItem('cartTotal', '0');

            setShowSuccess(true);
          }}
        >
          Place Order
        </button>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 text-center">
            <CheckCircle size={60} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Successfully Paid!</h2>
            <p className="text-gray-600 mb-4">Your order has been placed.</p>
            <button
              className="bg-black text-white px-6 py-2 rounded-lg"
              onClick={() => navigate('/order')}
            >
              Go to Completed Orders
            </button>
          </div>
        </div>
      )}
    </div>
  );
}