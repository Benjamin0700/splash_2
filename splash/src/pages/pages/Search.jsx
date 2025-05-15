import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMicrophone, FaTimes, FaChevronRight } from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialQuery = location.state?.searchQuery || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchHistory, setSearchHistory] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Base URL for images (To‘g‘ri URL bilan almashtiring)
  const BASE_URL = 'https://your-correct-image-base-url.com'; // Bu yerni o‘zingizning to‘g‘ri URL manzilingiz bilan almashtiring

  // Load search history from localStorage on mount and check timer
  useEffect(() => {
    const savedData = localStorage.getItem('searchHistoryData');
    if (savedData) {
      try {
        const { history, timestamp } = JSON.parse(savedData);
        const TEN_MINUTES = 10 * 60 * 1000; // 10 minutes in milliseconds
        const currentTime = Date.now();

        // If more than 10 minutes have passed, clear the history
        if (currentTime - timestamp > TEN_MINUTES) {
          setSearchHistory([]);
          localStorage.setItem('searchHistoryData', JSON.stringify({
            history: [],
            timestamp: currentTime
          }));
        } else {
          setSearchHistory(Array.isArray(history) ? history : []);
        }
      } catch (e) {
        console.error('Failed to parse search history', e);
        setSearchHistory([]);
      }
    }
  }, []);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://splash-server-jiqb.onrender.com/api/products');
        const data = await response.json();
        console.log('API Response:', data);

        // Ensure each product has a valid image URL
        const formattedProducts = data.map(product => ({
          ...product,
          title: product.title || 'Untitled Product',
          price: typeof product.price === 'number' ? product.price : null,
          img: product.img || 'https://via.placeholder.com/160',
          category: product.category || 'Uncategorized'
        }));

        setProducts(formattedProducts);
        setFilteredProducts(formattedProducts); // Initialize filtered products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery && products.length > 0) {
      const filtered = products.filter((product) =>
        product.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);

      // Add the first matching product's title to search history if there's a match
      if (filtered.length > 0) {
        const firstMatchTitle = filtered[0].title;
        if (!searchHistory.includes(firstMatchTitle)) {
          setSearchHistory([firstMatchTitle, ...searchHistory]);
        }
      } else {
        // If no products match, add the search term itself to history
        if (!searchHistory.includes(searchQuery)) {
          setSearchHistory([searchQuery, ...searchHistory]);
        }
      }
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery, products]);  // Handle search submission
  const handleSearch = () => {
    if (searchQuery) {
      // If there are matching products, add the first product's title to history
      if (filteredProducts.length > 0) {
        const firstMatchTitle = filteredProducts[0].title;
        if (!searchHistory.includes(firstMatchTitle)) {
          setSearchHistory([firstMatchTitle, ...searchHistory]);
        }
      } else {
        // If no products match, add the search term itself
        if (!searchHistory.includes(searchQuery)) {
          setSearchHistory([searchQuery, ...searchHistory]);
        }
      }
    }
  };

  // Clear a single search item
  const handleClearItem = (item) => {
    setSearchHistory(searchHistory.filter((historyItem) => historyItem !== item));
  };

  // Clear all search history
  const handleClearAll = () => {
    setSearchHistory([]);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Search</h1>
          </div>
          <IoIosNotifications className="text-2xl" />
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search for clothes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full p-3 pl-4 pr-10 rounded-full bg-gray-200 text-gray-700 focus:outline-none"
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Filtered Products */}
        {searchQuery && (
          <>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const imageUrl = product.img || 'https://via.placeholder.com/64';
                console.log('Attempting to load image:', imageUrl); // Debug log
                return (
                  <div
                    key={product._id}
                    className="flex items-center justify-between py-4 border-b border-gray-200"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={imageUrl}
                        alt={product.title || 'Product'}
                        className="w-16 h-16 object-cover rounded-md"
                        onError={(e) => {
                          console.error('Image failed to load:', imageUrl);
                          e.target.src = 'https://via.placeholder.com/160'; // Fallback on error
                        }}
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-700">
                          {product.title ? product.title.toUpperCase() : 'No Title Available'}
                        </p>
                        <p className="text-sm text-gray-600">
                          ${product.price || 'Price Unavailable'}
                        </p>
                      </div>
                    </div>
                    <FaChevronRight className="text-gray-500" />
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500">No products found</p>
            )}
          </>
        )}        {/* Recent Search Section */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Recent Search</h2>
            {searchHistory.length > 0 && (
              <button onClick={handleClearAll} className="text-sm text-gray-500">
                Clear all
              </button>
            )}
          </div>

          {/* Search History Items */}
          {searchHistory.length > 0 ? (
            searchHistory.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                <span
                  className="text-gray-700 cursor-pointer"
                  onClick={() => setSearchQuery(item)}
                >
                  {item}
                </span>
                <FaTimes
                  className="text-gray-500 cursor-pointer"
                  onClick={() => handleClearItem(item)}
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500">No recent searches</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;