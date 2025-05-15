import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, Heart, Star } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState('M');
  const [liked, setLiked] = useState(false);

  const goBack = () => navigate(-1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get('https://splash-server-jiqb.onrender.com/api/products');
        const foundProduct = response.data.find(p => p._id === id);
        setProduct(foundProduct);
      } catch (err) {
        console.error('Product fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];
    const alreadyLiked = likedItems.some(p => p._id === id);
    setLiked(alreadyLiked);
  }, [id]);

  const handleLike = () => {
    const likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];
    const alreadyLiked = likedItems.some(p => p._id === product._id);

    if (!alreadyLiked) {
      likedItems.push(product);
      localStorage.setItem('likedItems', JSON.stringify(likedItems));
      setLiked(true);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    // Create a clean cart product object, explicitly picking only needed properties
    const cartProduct = {
      _id: product._id,
      title: product.title,
      price: product.price,
      img: product.img,
      size: size,
      quantity: 1
    };

    // Retrieve existing cart or initialize an empty array
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the exact same product (with same ID and size) already exists
    const existingIndex = cart.findIndex(
      item => item._id === cartProduct._id && item.size === cartProduct.size
    );

    if (existingIndex !== -1) {
      // If product exists, increase quantity
      cart[existingIndex].quantity += 1;
    } else {
      // If product doesn't exist, add new product
      cart.push(cartProduct);
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Log to help with debugging
    console.log('Product added to cart:', cartProduct);
    console.log('Updated cart:', cart);

    // Navigate to cart
    navigate('/cart');
  };

  if (loading) return <div className="text-center p-10">Yuklanmoqda...</div>;
  if (!product) return <div className="text-center p-10 text-red-500">Mahsulot topilmadi</div>;

  return (
    <div className="bg-white min-h-screen pb-16">
      <div className="relative">
        <img
          src={product.img}
          alt={product.title}
          className="w-full h-[400px] object-contain bg-white"
        />

        <div className="absolute top-4 left-4">
          <button
            onClick={goBack}
            className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        <div className="absolute top-4 right-4">
          <button
            onClick={handleLike}
            className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <Heart className={liked ? 'text-red-500 fill-red-500' : ''} />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <h2 className="text-xl font-semibold">{product.title}</h2>

        <div className="flex items-center gap-1 text-yellow-500">
          <Star />
          <span>{product.rating?.rate || 4.0}/5 ({product.rating?.count || 45} reviews)</span>
        </div>

        <p className="text-gray-600">
          The name says it all, the right size slightly snugs the body leaving enough room for comfort in the sleeves and waist.
        </p>

        <div>
          <h4 className="font-semibold mb-2">Choose size</h4>
          <div className="flex gap-3">
            {['S', 'M', 'L'].map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`w-10 h-10 rounded-full border 
                  ${size === s ? 'bg-black text-white' : 'bg-white text-black'} transition`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="text-xl font-bold">${product.price}</div>
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
