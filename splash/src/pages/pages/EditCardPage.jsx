import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Plus } from 'lucide-react';

const EditCardPage = () => {
  const navigate = useNavigate();
  const [savedCards, setSavedCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    // Retrieve saved cards from localStorage
    const cards = JSON.parse(localStorage.getItem('savedCards') || '[]');
    
    // Retrieve default card if exists
    const defaultCard = JSON.parse(localStorage.getItem('defaultCard'));
    
    setSavedCards(cards);
    
    // If there's a default card, pre-select it
    if (defaultCard) {
      setSelectedCard(defaultCard);
    } else if (cards.length > 0) {
      // If no default card, select the first card
      setSelectedCard(cards[0]);
    }
  }, []);

  const handleAddNewCard = () => {
    navigate('/new-card');
  };

  const handleCardSelect = (card) => {
    setSelectedCard(card);
  };

  const handleApply = () => {
    if (selectedCard) {
      // Store card info in multiple storage mechanisms for redundancy
      localStorage.setItem('defaultCard', JSON.stringify(selectedCard));
      localStorage.setItem('cardInfo', JSON.stringify({
        number: selectedCard.number,
        expiry: selectedCard.expiry,
        cvc: selectedCard.cvc
      }));

      // Navigate to checkout
      navigate('/payment');
    }
  };

  const maskCardNumber = (number) => {
    if (!number) return '';
    // Mask all but last 4 digits
    return `**** **** **** ${number.slice(-4)}`;
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
        <h2 className="text-xl font-bold text-center w-full">Payment Method</h2>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Saved Cards</h3>
        
        {savedCards.map((card, index) => (
          <div 
            key={index} 
            className={`flex items-center border rounded-lg p-4 cursor-pointer ${
              selectedCard === card ? 'border-black border-2' : ''
            }`}
            onClick={() => handleCardSelect(card)}
          >
            <div className="flex-grow flex items-center">
              <CreditCard className="mr-4" />
              <div>
                <p>{card.type || 'VISA'} {maskCardNumber(card.number)}</p>
                {selectedCard === card && (
                  <span className="text-xs text-gray-500 ml-2">Selected</span>
                )}
              </div>
            </div>
            <input 
              type="radio" 
              checked={selectedCard === card}
              onChange={() => handleCardSelect(card)}
              className="form-radio"
            />
          </div>
        ))}

        <button 
          onClick={handleAddNewCard}
          className="w-full flex items-center justify-center border rounded-lg p-4 mt-4"
        >
          <Plus className="mr-2" />
          <span>Add New Card</span>
        </button>

        {selectedCard && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Selected Card Details</h3>
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{selectedCard.type || 'VISA'}</p>
                  <p className="text-gray-600">{maskCardNumber(selectedCard.number)}</p>
                  <p className="text-gray-600">Expiry: {selectedCard.expiry}</p>
                </div>
                <CreditCard size={40} className="text-gray-500" />
              </div>
            </div>
          </div>
        )}

        {selectedCard && (
          <button
            onClick={handleApply}
            className="w-full bg-black text-white py-4 rounded-xl mt-6"
          >
            Apply Selected Card
          </button>
        )}
      </div>
    </div>
  );
};

export default EditCardPage;