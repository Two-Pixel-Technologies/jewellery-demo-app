import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Catalogue from './pages/Catalogue';
import ProductDetail from './pages/ProductDetail';
import AddProduct from './pages/AddProduct';
import OrderManagement from './pages/OrderManagement';
import OrderDetail from './pages/OrderDetail';
import Analytics from './pages/Analytics';
import DealerManagement from './pages/DealerManagement';
import Collections from './pages/Collections';
import AIVisualSearch from './pages/AIVisualSearch';
import AIDigest from './pages/AIDigest';
import CartPage from './pages/CartPage';
import MyOrders from './pages/MyOrders';
import WishlistPage from './pages/WishlistPage';
import NotificationsPage from './pages/NotificationsPage';

// Layout
import AppLayout from './components/AppLayout';

// Context
export const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

export default function App() {
  const [user, setUser] = useState(null); // null = not logged in
  const [role, setRole] = useState('owner'); // 'owner' | 'dealer'
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState(['P002', 'P008', 'P009', 'P022', 'P024']);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const login = (selectedRole) => {
    const profiles = {
      owner: { name: 'Kanchan Jewels', initials: 'KJ', role: 'Owner', email: 'owner@kanchan.in' },
      dealer: { name: 'Diamond Palace', initials: 'DP', role: 'Dealer', email: 'vikram@diamondpalace.in' },
    };
    setUser(profiles[selectedRole]);
    setRole(selectedRole);
  };

  const logout = () => { setUser(null); };

  const addToCart = (product, qty = 1) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.productId === product.id);
      if (existing) return prev.map(i => i.productId === product.id ? { ...i, quantity: i.quantity + qty } : i);
      return [...prev, { productId: product.id, name: product.name, sku: product.sku, quantity: qty, mrp: product.mrp, image: product.images[0] }];
    });
  };

  const removeFromCart = (productId) => setCartItems(prev => prev.filter(i => i.productId !== productId));
  const updateCartQty = (productId, qty) => {
    if (qty <= 0) return removeFromCart(productId);
    setCartItems(prev => prev.map(i => i.productId === productId ? { ...i, quantity: qty } : i));
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  if (!user) {
    return (
      <AppContext.Provider value={{ login, role, setRole }}>
        <LoginPage />
      </AppContext.Provider>
    );
  }

  return (
    <AppContext.Provider value={{
      user, role, logout,
      cartItems, addToCart, removeFromCart, updateCartQty, cartCount,
      wishlist, toggleWishlist,
      sidebarCollapsed, setSidebarCollapsed,
    }}>
      <BrowserRouter basename="/jewellery-demo-app">
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/catalogue/:id" element={<ProductDetail />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/orders/:id" element={<OrderDetail />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/dealers" element={<DealerManagement />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/ai-search" element={<AIVisualSearch />} />
            <Route path="/ai-digest" element={<AIDigest />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </AppContext.Provider>
  );
}
