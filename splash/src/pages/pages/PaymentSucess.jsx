import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

    const completedCart = storedCart.map(item => ({
      ...item,
      isCompleted: true,
    }));

    localStorage.setItem('cart', JSON.stringify(completedCart));

    // Optionally redirect after a few seconds or on button click
    const timeout = setTimeout(() => {
      navigate('/cart');
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="text-center mt-20">
      <h2 className="text-3xl font-bold text-green-600 mb-4">To‘lov muvaffaqiyatli amalga oshirildi!</h2>
      <p className="mb-6">Buyurtmalaringiz yakunlandi.</p>
      <button
        className="bg-black text-white px-6 py-2 rounded-lg"
        onClick={() => navigate('/cart')}
      >
        Close
      </button>
    </div>
  );
};

export default PaymentSuccess;
