import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { Bell, ShoppingCart, Search } from 'lucide-react';

const crumbMap = {
  '/': 'Dashboard',
  '/catalogue': 'Catalogue',
  '/add-product': 'Add Product',
  '/orders': 'Order Management',
  '/analytics': 'Business Analytics',
  '/dealers': 'Dealer Management',
  '/collections': 'Collections',
  '/ai-search': 'AI Visual Search',
  '/ai-digest': 'AI Digest',
  '/cart': 'My Cart',
  '/my-orders': 'My Orders',
  '/wishlist': 'Wishlist',
  '/notifications': 'Notifications',
};

export default function Topbar() {
  const { user, role, sidebarCollapsed, cartCount } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const crumb = crumbMap[location.pathname] || location.pathname.replace('/', '').replace(/-/g, ' ');

  return (
    <header className={`topbar ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="topbar-left">
        <div className="topbar-breadcrumb">
          <span style={{color: 'var(--text-muted)'}}>Kanchan</span>
          <span style={{margin: '0 6px', color: 'var(--border-default)'}}>›</span>
          <span style={{color: 'var(--text-primary)', fontWeight: 600, textTransform: 'capitalize'}}>{crumb}</span>
        </div>
      </div>

      <div className="topbar-right">
        {role === 'dealer' && (
          <button className="notification-btn" onClick={() => navigate('/cart')} title="Cart">
            <ShoppingCart size={17}/>
            {cartCount > 0 && <span className="notification-dot" style={{background: 'var(--gold-primary)'}}/>}
          </button>
        )}
        <button className="notification-btn" onClick={() => navigate('/notifications')} title="Notifications">
          <Bell size={17}/>
          <span className="notification-dot"/>
        </button>

        <div className="role-badge" onClick={() => navigate('/notifications')} title={`Logged in as ${user?.role}`}>
          <div className="role-avatar">{user?.initials}</div>
          <div>
            <div className="role-name">{user?.name}</div>
            <div className="role-type">{user?.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
