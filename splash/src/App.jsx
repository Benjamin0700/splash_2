import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext.jsx';
import AuthPage from './pages/AuthPage.jsx';
// index.css yoki App.jsx da
import 'leaflet/dist/leaflet.css';
import Dashboard from './pages/Dashboard.jsx';
import Payment from './pages/pages/CheckoutPage.jsx';
import Address from './pages/pages/AddressPage.jsx';
import Button from './pages/pages/Button.jsx'; // Bottom navigation component
import Search from './pages/pages/Search';
import Saved from './pages/pages/Liked.jsx';
import Faqs from './pages/pages/Faqs.jsx';
import Cart from './pages/pages/Cart';
import Account from './pages/pages/Account';
import HelpCenter from './pages/pages/HelpCenter.jsx';
import MyDetails from './pages/pages/MyDetails.jsx';
import Product from './pages/pages/Product.jsx';
import MyOrders from './pages/pages/Order.jsx';
import Notifications from './pages/pages/Notifications.jsx';
import EditCardPage from './pages/pages/EditCardPage.jsx';
import NewCardPage from './pages/pages/NewCardPage.jsx';

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Yuklanmoqda...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/auth" />;
  }

  return children;
};

// Layout for authenticated routes with bottom navigation
const AuthenticatedLayout = ({ children }) => (
  <>
    <div className="flex-grow overflow-y-auto pb-16">
      {children}
    </div>
    <div className="fixed bottom-0 left-0 right-0">
      <Button />
    </div>
  </>
);

// Routerga o‘rash kerak emas — bu `main.jsx`da bo‘ladi
const AppRoutes = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Yuklanmoqda...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Routes>
        <Route path="/auth" element={
          currentUser ? <Navigate to="/dashboard" /> : <AuthPage />
        } />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <Dashboard />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />

        <Route path="/faqs" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <Faqs />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />

        <Route path="/notifications" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <Notifications />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />

        <Route path="/edit-card" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <EditCardPage />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />

        <Route path="/add-card" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <NewCardPage />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />

        <Route path="/order" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <MyOrders />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />

        <Route path="/details" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <MyDetails />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />

        <Route path="/product/:id" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <Product />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />

        <Route path="/help" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <HelpCenter />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />

        <Route path="/" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <Dashboard />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />

        <Route path="/search" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <Search />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />

        <Route path="/saved" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <Saved />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />

        <Route path="/cart" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <Cart />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />

        <Route path="/payment" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <Payment />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />

        <Route path="/address" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <Address />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />

        <Route path="/account" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <Account />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to={currentUser ? "/dashboard" : "/auth"} />} />
      </Routes>
    </div>
  );
};

// ✅ Export qilinadigan App
const App = () => (
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>
);

export default App;
