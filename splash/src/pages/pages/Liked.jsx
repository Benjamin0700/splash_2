import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Liked = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const storedFavorites = localStorage.getItem('favorites');
        const favoriteIds = storedFavorites ? JSON.parse(storedFavorites) : [];

        const response = await fetch('https://splash-server-jiqb.onrender.com/api/products');
        const allProducts = await response.json();

        // Filter products based on the stored favorite IDs
        const filtered = allProducts.filter(p => favoriteIds.includes(p._id));
        setFavorites(filtered);
      } catch (err) {
        console.error('Error fetching or filtering products:', err);
      }
    };

    fetchFavorites();
  }, []);

  const handleProductClick = (productId) => {
    if (productId) {
      navigate(`/product/${productId}`);
    }
  };

  return (
    <div className="pb-16 bg-white min-h-screen">
      <div className="p-10 text-center text-gray-600">
        <h2 className="text-2xl font-semibold">Liked Products</h2>
        <div className="grid grid-cols-2 gap-4 px-4 mt-2">
          {favorites.length === 0 ? (
            <div className="col-span-2 flex justify-center items-center">
              <p className="text-center text-gray-500">No favorite products yet.</p>
            </div>
          ) : (
            favorites.map(product => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleProductClick(product._id)}
              >
                <div className="relative rounded-t-2xl overflow-hidden bg-gray-50">
                  <img
                    src={product.img || `/api/placeholder/240/320`}
                    alt={product.title || "Product"}
                    className="w-full h-[400px] object-contain bg-white mx-auto"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `/api/placeholder/240/320`;
                    }}
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-base text-gray-900 truncate">{product.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-black font-bold text-sm">${product.price}</span>
                    {product.discountPercentage && (
                      <span className="text-gray-400 line-through text-xs">
                        ${Math.round(Number(product.price) * (1 + Number(product.discountPercentage) / 100))}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Liked;
