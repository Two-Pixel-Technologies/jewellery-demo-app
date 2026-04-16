import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../App';
import {
  LayoutDashboard, Package, ShoppingCart, BarChart3, Users,
  Grid3X3, Sparkles, Brain, Bell, Heart, List, ChevronLeft,
  ChevronRight, LogOut, ClipboardList, Store, Search
} from 'lucide-react';

const ownerNav = [
  { section: 'Overview', items: [
    { path: '/', icon: <LayoutDashboard size={17}/>, label: 'Dashboard' },
    { path: '/analytics', icon: <BarChart3 size={17}/>, label: 'Analytics' },
  ]},
  { section: 'Inventory', items: [
    { path: '/catalogue', icon: <Package size={17}/>, label: 'Catalogue' },
    { path: '/collections', icon: <Grid3X3 size={17}/>, label: 'Collections' },
    { path: '/add-product', icon: <Store size={17}/>, label: 'Add Product' },
  ]},
  { section: 'Orders', items: [
    { path: '/orders', icon: <ClipboardList size={17}/>, label: 'Order Management', badge: 2 },
  ]},
  { section: 'Dealers', items: [
    { path: '/dealers', icon: <Users size={17}/>, label: 'Dealers' },
  ]},
  { section: 'AI Tools', items: [
    { path: '/ai-search', icon: <Search size={17}/>, label: 'Visual Search' },
    { path: '/ai-digest', icon: <Brain size={17}/>, label: 'AI Digest' },
  ]},
  { section: 'Other', items: [
    { path: '/notifications', icon: <Bell size={17}/>, label: 'Notifications', badge: 3 },
  ]},
];

const dealerNav = [
  { section: 'Browse', items: [
    { path: '/', icon: <LayoutDashboard size={17}/>, label: 'Dashboard' },
    { path: '/catalogue', icon: <Package size={17}/>, label: 'Catalogue' },
    { path: '/collections', icon: <Grid3X3 size={17}/>, label: 'Collections' },
    { path: '/ai-search', icon: <Sparkles size={17}/>, label: 'Visual Search' },
  ]},
  { section: 'Orders', items: [
    { path: '/cart', icon: <ShoppingCart size={17}/>, label: 'My Cart' },
    { path: '/my-orders', icon: <List size={17}/>, label: 'My Orders' },
    { path: '/wishlist', icon: <Heart size={17}/>, label: 'Wishlist' },
  ]},
  { section: 'Other', items: [
    { path: '/notifications', icon: <Bell size={17}/>, label: 'Notifications', badge: 1 },
  ]},
];

export default function Sidebar() {
  const { user, role, logout, sidebarCollapsed, setSidebarCollapsed, cartCount } = useApp();
  const location = useLocation();

  const nav = role === 'owner' ? ownerNav : dealerNav;

  return (
    <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-logo">
        <div className="logo-mark">K</div>
        {!sidebarCollapsed && (
          <div>
            <div className="logo-text">Kanchan</div>
            <div className="logo-tagline">B2B Jewellery Platform</div>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        {nav.map(section => (
          <div key={section.section}>
            {!sidebarCollapsed && (
              <div className="nav-section-label">{section.section}</div>
            )}
            {section.items.map(item => {
              const isActive = item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path);
              const badge = item.label === 'My Cart' && cartCount > 0 ? cartCount : item.badge;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  title={sidebarCollapsed ? item.label : ''}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {!sidebarCollapsed && <span>{item.label}</span>}
                  {!sidebarCollapsed && badge > 0 && (
                    <span className="nav-badge">{badge}</span>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        {!sidebarCollapsed && (
          <div style={{ padding: '8px 10px', marginBottom: 8 }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>{user?.name}</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--gold-primary)' }}>{user?.role}</div>
          </div>
        )}
        <button className="nav-item" onClick={logout} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', marginBottom: 2 }}>
          <span className="nav-icon"><LogOut size={17}/></span>
          {!sidebarCollapsed && <span>Sign Out</span>}
        </button>
        <button className="collapse-btn" onClick={() => setSidebarCollapsed(p => !p)}>
          {sidebarCollapsed ? <ChevronRight size={16}/> : <><ChevronLeft size={16}/><span>Collapse</span></>}
        </button>
      </div>
    </aside>
  );
}
