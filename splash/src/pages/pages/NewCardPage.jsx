import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, HelpCircle } from 'lucide-react';

const NewCardPage = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const formatCardNumber = (value) => {
    // Remove non-digits
    const cleaned = value.replace(/\D/g, '');
    
    // Add spaces every 4 digits
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    // Limit to 16 digits
    return formatted.slice(0, 19);
  };

  const formatExpiry = (value) => {
    // Remove non-digits
    const cleaned = value.replace(/\D/g, '');
    
    // Format as MM/YY
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    
    return cleaned;
  };

  const formatCVC = (value) => {
    // Remove non-digits and limit to 3-4 digits
    return value.replace(/\D/g, '').slice(0, 4);
  };

  const handleAddCard = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!cardNumber.trim() || !expiry.trim() || !cvc.trim()) {
      alert('Please fill in all card details');
      return;
    }

    // Retrieve existing saved cards
    const savedCards = JSON.parse(localStorage.getItem('savedCards') || '[]');

    // Create new card object
    const newCard = {
      number: cardNumber.replace(/\s/g, ''), // Remove spaces
      expiry: expiry,
      cvc: cvc,
      type: determineCardType(cardNumber)
    };

    // Add new card to saved cards
    savedCards.push(newCard);

    // Save updated cards to localStorage
    localStorage.setItem('savedCards', JSON.stringify(savedCards));

    // Navigate back to payment method page
    navigate('/edit-card');
  };

  const determineCardType = (cardNum) => {
    // Basic card type detection
    const firstDigit = cardNum.replace(/\s/g, '')[0];
    if (firstDigit === '4') return 'VISA';
    if (firstDigit === '5') return 'MasterCard';
    return 'Card';
  };

  return (
    <div className="p-4 bg-white min-h-screen">
      <div className="flex items-center mb-6 relative">
        <button 
          onClick={() => navigate(-1)} 
          className="absolute left-0 top-1/2 -translate-y-1/2"
        >
          <ChevronLeft />
        </button>
        <h2 className="text-xl font-bold text-center w-full">New Card</h2>
      </div>

      <form onSubmit={handleAddCard} className="space-y-4">
        <div>
          <label className="block font-semibold mb-2">Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            placeholder="Enter your card number"
            maxLength="19"
            className="w-full border p-3 rounded"
            required
          />
        </div>

        <div className="flex gap-4">
          <div className="w-2/3">
            <label className="block font-semibold mb-2">Expiry Date</label>
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              placeholder="MM/YY"
              maxLength="5"
              className="w-full border p-3 rounded"
              required
            />
          </div>
          <div className="w-1/3 relative">
            <label className="block font-semibold mb-2">Security Code</label>
            <input
              type="text"
              value={cvc}
              onChange={(e) => setCvc(formatCVC(e.target.value))}
              placeholder="CVC"
              maxLength="4"
              className="w-full border p-3 rounded"
              required
            />
            <HelpCircle className="absolute right-3 top-10 text-gray-400" />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-4 rounded-xl mt-6"
        >
          Add Card
        </button>
      </form>
    </div>
  );
};

export default NewCardPage;