import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const { login, register, error, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Agar foydalanuvchi tizimga kirgan bo'lsa, dashboard'ga yo'naltiramiz
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  // Formaning to'ldirilganligini tekshirish
  const isSignUpFormValid = fullName !== '' && email !== '' && password !== '';
  const isLoginFormValid = email !== '' && password !== '';

  const handleSignUp = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!isSignUpFormValid) {
      setFormError('Barcha maydonlarni to\'ldiring');
      return;
    }

    setLoading(true);
    try {
      await register(fullName, email, password);
      alert('Hisob muvaffaqiyatli yaratildi! Iltimos, tizimga kiring.');
      setIsLogin(true);
      setFullName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setFormError(error || 'Ro\'yxatdan o\'tishda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!isLoginFormValid) {
      setFormError('Email va parolni kiriting');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      // Muvaffaqiyatli login bo'lgandan so'ng, navigatsiya useEffect orqali amalga oshiriladi
    } catch (err) {
      setFormError(error || 'Kirishda xatolik');
    } finally {
      setLoading(false);
    }
  };

  // Ro'yxatdan o'tish formasi
  const SignUpForm = (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
      <h2 className="text-2xl font-bold mb-1">Hisob yaratish</h2>
      <p className="text-gray-500 mb-6">Keling, hisobingizni yaratamiz.</p>

      <form onSubmit={handleSignUp}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">To'liq ism</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="To'liq ismingizni kiriting"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Email manzilingizni kiriting"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Parol</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Parolingizni kiriting"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
        </div>

        {formError && <div className="mb-4 text-red-500">{formError}</div>}

        <p className="text-sm mb-4">
          Ro'yxatdan o'tish orqali siz bizning <a href="/terms" className="text-blue-500">Shartlar</a>,
          <a href="/privacy" className="text-blue-500"> Maxfiylik siyosati</a>, va
          <a href="/cookies" className="text-blue-500"> Cookie foydalanish</a> siyosatimizga rozilik bildirasiz
        </p>

        <button
          type="submit"
          className={`w-full py-2 rounded-md ${isSignUpFormValid && !loading
            ? "bg-black text-white hover:bg-gray-800"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
            } mb-4`}
          disabled={!isSignUpFormValid || loading}
        >
          {loading ? "Hisob yaratilmoqda..." : "Hisobni yaratish"}
        </button>
      </form>

      <div className="text-center mb-4">Yoki</div>

      <button className="w-full mb-3 flex items-center justify-center py-2 border border-gray-300 rounded-md hover:bg-gray-50">
        <img
          src="https://cdn-teams-slug.flaticon.com/google.jpg"
          alt="Google"
          className="w-5 h-5 mr-2 object-contain"
        />
        Google orqali kirish
      </button>

      <button className="w-full bg-blue-500 text-white flex items-center justify-center py-2 rounded-md hover:bg-blue-600">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png"
          alt="Facebook"
          className="w-5 h-5 mr-2 object-contain"
        />
        Facebook orqali kirish
      </button>

      <div className="mt-6 text-center">
        Hisobingiz bormi?
        <button
          className="text-blue-500 ml-1"
          onClick={() => setIsLogin(true)}
        >
          Kirish
        </button>
      </div>
    </div>
  );

  // Kirish formasi
  const LoginForm = (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
      <h2 className="text-2xl font-bold mb-1">Hisobingizga kirish</h2>
      <p className="text-gray-500 mb-6">Sizni qayta ko'rganimizdan xursandmiz.</p>

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Email manzilingizni kiriting"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Parol</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Parolingizni kiriting"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
        </div>

        <div className="mb-6 text-right">
          <a href="/reset-password" className="text-blue-500 text-sm">Parolni qayta tiklash</a>
        </div>

        {formError && <div className="mb-4 text-red-500">{formError}</div>}

        <button
          type="submit"
          className={`w-full py-2 rounded-md ${isLoginFormValid && !loading
            ? "bg-black text-white hover:bg-gray-800"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
            } mb-4`}
          disabled={!isLoginFormValid || loading}
        >
          {loading ? "Kirish..." : "Kirish"}
        </button>
      </form>

      <div className="text-center mb-4">Yoki</div>
      <button className="w-full mb-3 flex items-center justify-center py-2 border border-gray-300 rounded-md hover:bg-gray-50">
        <img
          src="https://cdn-teams-slug.flaticon.com/google.jpg"
          alt="Google"
          className="w-5 h-5 mr-2 object-contain"
        />
        Google orqali kirish
      </button>

      <button className="w-full bg-blue-500 text-white flex items-center justify-center py-2 rounded-md hover:bg-blue-600">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png"
          alt="Facebook"
          className="w-5 h-5 mr-2 object-contain"
        />
        Facebook orqali kirish
      </button>


      <div className="mt-6 text-center">
        Hisobingiz yo'qmi?
        <button
          className="text-blue-500 ml-1"
          onClick={() => setIsLogin(false)}
        >
          Ro'yxatdan o'tish
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      {isLogin ? LoginForm : SignUpForm}
    </div>
  );
};

export default AuthPage;