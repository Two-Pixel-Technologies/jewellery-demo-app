import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import {
  TrendingUp, Package, Users, AlertTriangle,
  ShoppingBag, Clock, ArrowRight, Zap, Star
} from 'lucide-react';
import { ORDERS, MONTHLY_ORDERS, PRODUCTS, DEALERS, AI_DIGEST, NOTIFICATIONS } from '../mockData';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const fmt = (n) => n >= 100000 ? `₹${(n/100000).toFixed(1)}L` : `₹${(n/1000).toFixed(0)}K`;

function OwnerDashboard() {
  const navigate = useNavigate();
  const pendingOrders = ORDERS.filter(o => o.status === 'Pending').length;
  const lowStock = PRODUCTS.filter(p => p.quantity > 0 && p.quantity <= 5).length;
  const outOfStock = PRODUCTS.filter(p => p.quantity === 0).length;
  const totalRevenue = MONTHLY_ORDERS.reduce((s, m) => s + m.revenue, 0);
  const activeProducts = PRODUCTS.filter(p => p.status === 'Active').length;

  const recentActivity = [
    { text: 'Diamond Palace placed Order #ORD-2026-0048 · ₹3,48,000', time: '35 min ago', color: 'var(--blue)', icon: '📦' },
    { text: 'Jhumki Cluster Earrings went out of stock', time: '1 hr ago', color: 'var(--red)', icon: '🔴' },
    { text: 'Krishna Gold House Order #ORD-2026-0047 approved', time: '2 hr ago', color: 'var(--green)', icon: '✅' },
    { text: 'AI Alert: Restart Kundan Bridal Necklace — demand spike expected', time: '4 hr ago', color: 'var(--purple)', icon: '🤖' },
    { text: '3 new products added by staff', time: '5 hr ago', color: 'var(--gold-primary)', icon: '✨' },
    { text: 'Shree Ornaments Order #ORD-2026-0044 rejected (price renegotiation)', time: '1 day ago', color: 'var(--amber)', icon: '⚠️' },
  ];

  return (
    <div className="page-container fade-in">
      <div className="flex items-center justify-between page-header">
        <div>
          <div className="page-title">Good morning, Kanchan Jewels ✨</div>
          <div className="page-subtitle">Thursday, 17 April 2026 · Here's your business overview</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/ai-digest')}>
            <Zap size={14}/> AI Digest
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/orders')}>
            {pendingOrders} Pending Orders <ArrowRight size={14}/>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: 'var(--gold-muted)' }}>
            <TrendingUp size={20} color="var(--gold-primary)"/>
          </div>
          <div className="kpi-value">{fmt(totalRevenue)}</div>
          <div className="kpi-label">12-Month Revenue</div>
          <div className="kpi-trend up">↑ 18% vs last year</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: 'var(--blue-bg)' }}>
            <ShoppingBag size={20} color="var(--blue)"/>
          </div>
          <div className="kpi-value">{ORDERS.length}</div>
          <div className="kpi-label">Total Orders (MTD)</div>
          <div className="kpi-trend up">↑ 14% vs last month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: 'var(--green-bg)' }}>
            <Package size={20} color="var(--green)"/>
          </div>
          <div className="kpi-value">{activeProducts}</div>
          <div className="kpi-label">Active Products</div>
          <div className="kpi-trend up">↑ 3 this week</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: 'var(--purple-bg)' }}>
            <Users size={20} color="var(--purple)"/>
          </div>
          <div className="kpi-value">{DEALERS.filter(d=>d.status==='Active').length}</div>
          <div className="kpi-label">Active Dealers</div>
          <div className="kpi-trend up">↑ 2 this month</div>
        </div>
        <div className="kpi-card" style={{ borderColor: pendingOrders > 0 ? 'var(--amber-bg)' : '' }}>
          <div className="kpi-icon" style={{ background: 'var(--amber-bg)' }}>
            <Clock size={20} color="var(--amber)"/>
          </div>
          <div className="kpi-value" style={{ color: pendingOrders > 0 ? 'var(--amber)' : '' }}>{pendingOrders}</div>
          <div className="kpi-label">Pending Approvals</div>
          <button className="btn btn-sm" style={{ background: 'var(--amber-bg)', color: 'var(--amber)', border: 'none', marginTop: 8, cursor: 'pointer' }} onClick={() => navigate('/orders')}>
            Review Now <ArrowRight size={12}/>
          </button>
        </div>
        <div className="kpi-card" style={{ borderColor: outOfStock > 0 ? 'var(--red-bg)' : '' }}>
          <div className="kpi-icon" style={{ background: 'var(--red-bg)' }}>
            <AlertTriangle size={20} color="var(--red)"/>
          </div>
          <div className="kpi-value" style={{ color: outOfStock > 0 ? 'var(--red)' : '' }}>{outOfStock}</div>
          <div className="kpi-label">Out of Stock</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--amber)', marginTop: 6 }}>+{lowStock} low stock</div>
        </div>
      </div>

      <div className="grid-2" style={{ gap: 20 }}>
        {/* Revenue Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <div className="chart-title">Revenue Trend</div>
              <div className="chart-subtitle">May 2025 – April 2026</div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/analytics')}>
              Full Report <ArrowRight size={13}/>
            </button>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={MONTHLY_ORDERS}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)"/>
              <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/100000).toFixed(0)}L`}/>
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--gold-border)', borderRadius: 8, fontSize: 12 }} formatter={(v) => [`₹${(v/100000).toFixed(2)}L`, 'Revenue']}/>
              <Line type="monotone" dataKey="revenue" stroke="var(--gold-primary)" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: 'var(--gold-primary)' }}/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Feed */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <div className="chart-title">Activity Feed</div>
              <div className="chart-subtitle">Live platform events</div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/notifications')}>
              All <ArrowRight size={13}/>
            </button>
          </div>
          <div>
            {recentActivity.map((act, i) => (
              <div key={i} className="activity-item">
                <div className="activity-dot" style={{ background: act.color }}/>
                <div style={{ flex: 1 }}>
                  <div className="activity-text">{act.text}</div>
                  <div className="activity-time">{act.time}</div>
                </div>
                <span style={{ fontSize: '1rem' }}>{act.icon}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Digest Preview */}
      <div style={{ marginTop: 20 }} className="ai-digest-card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="ai-badge">🤖 AI DIGEST</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Apr 7 – 16, 2026</span>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/ai-digest')}>
            Full Digest + Q&A <ArrowRight size={13}/>
          </button>
        </div>
        <div className="grid-4" style={{ marginBottom: 16 }}>
          {AI_DIGEST.highlights.map((h, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: 8 }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: h.up ? 'var(--green)' : 'var(--red)' }}>{h.value}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>{h.label}</div>
              <div style={{ fontSize: '0.7rem', color: h.up ? 'var(--green)' : 'var(--red)', fontWeight: 700 }}>{h.change}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          This week saw <strong style={{color:'var(--text-primary)'}}>87 orders from 18 active dealers</strong> — up <strong style={{color:'var(--green)'}}>↑14% vs last week</strong>. Revenue totalled <strong style={{color:'var(--gold-primary)'}}>₹52.4L</strong>. <strong style={{color:'var(--red)'}}>⚠️ Kundan Bridal Necklace demand spike expected — restock now.</strong> Golden Era Jewels (Delhi) hasn't ordered in 55 days.
        </p>
      </div>

      {/* Recent Orders Quick View */}
      <div style={{ marginTop: 20 }}>
        <div className="flex items-center justify-between mb-3">
          <div className="chart-title">Recent Orders</div>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/orders')}>View All <ArrowRight size={13}/></button>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Dealer</th>
                <th>Items</th>
                <th>Total MRP</th>
                <th>Status</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {ORDERS.slice(0, 5).map(order => (
                <tr key={order.id}>
                  <td><span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--gold-primary)' }}>{order.id}</span></td>
                  <td><span style={{ fontWeight: 600 }}>{order.dealerName}</span></td>
                  <td style={{ color: 'var(--text-muted)' }}>{order.items.length} items</td>
                  <td style={{ fontWeight: 700 }}>₹{order.totalMRP.toLocaleString()}</td>
                  <td>
                    <span className={`order-status status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                  <td>
                    <button className="btn btn-ghost btn-sm" onClick={() => navigate(`/orders/${order.id}`)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function DealerDashboard() {
  const navigate = useNavigate();
  const { cartCount } = useApp();

  return (
    <div className="page-container fade-in">
      <div className="flex items-center justify-between page-header">
        <div>
          <div className="page-title">Welcome back, Diamond Palace 💎</div>
          <div className="page-subtitle">Browse & order from Kanchan Jewels' latest collection</div>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/catalogue')}>
          Browse Catalogue <ArrowRight size={15}/>
        </button>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: 'var(--blue-bg)' }}>
            <ShoppingBag size={20} color="var(--blue)"/>
          </div>
          <div className="kpi-value">89</div>
          <div className="kpi-label">Total Orders</div>
          <div className="kpi-trend up">↑ Best among dealers</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: 'var(--gold-muted)' }}>
            <TrendingUp size={20} color="var(--gold-primary)"/>
          </div>
          <div className="kpi-value">₹78L</div>
          <div className="kpi-label">Total Order Value</div>
          <div className="kpi-trend up">↑ 18% this month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: 'var(--amber-bg)' }}>
            <Clock size={20} color="var(--amber)"/>
          </div>
          <div className="kpi-value">2</div>
          <div className="kpi-label">Pending Orders</div>
          <button className="btn btn-sm" style={{ background: 'var(--amber-bg)', color: 'var(--amber)', border: 'none', marginTop: 8, cursor: 'pointer' }} onClick={() => navigate('/my-orders')}>
            Track Now <ArrowRight size={12}/>
          </button>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: 'var(--purple-bg)' }}>
            <Star size={20} color="var(--purple)"/>
          </div>
          <div className="kpi-value">35</div>
          <div className="kpi-label">Wishlist Items</div>
          <button className="btn btn-sm" style={{ background: 'var(--purple-bg)', color: 'var(--purple)', border: 'none', marginTop: 8, cursor: 'pointer' }} onClick={() => navigate('/wishlist')}>
            View <ArrowRight size={12}/>
          </button>
        </div>
      </div>

      {/* New Arrivals */}
      <div style={{ marginTop: 4 }}>
        <div className="flex items-center justify-between mb-3">
          <div className="chart-title">New Arrivals This Week</div>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/catalogue')}>View All <ArrowRight size={13}/></button>
        </div>
        <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {PRODUCTS.filter(p => p.tags.includes('New Arrival')).slice(0, 4).map(product => (
            <div key={product.id} className="product-card" onClick={() => navigate(`/catalogue/${product.id}`)}>
              <div className="img-wrapper">
                <img src={product.images[0]} alt={product.name} loading="lazy"/>
                <div className="stock-badge">
                  <span className={`badge ${product.quantity === 0 ? 'badge-red' : product.quantity <= 5 ? 'badge-amber' : 'badge-green'}`}>
                    {product.quantity === 0 ? 'Out of Stock' : product.quantity <= 5 ? `${product.quantity} left` : 'In Stock'}
                  </span>
                </div>
                <div className="tag-badge"><span className="badge badge-blue">New</span></div>
              </div>
              <div className="card-body">
                <div className="product-name">{product.name}</div>
                <div className="product-meta">{product.metalType} · {product.purity} · {product.grossWeight}g</div>
                <div className="product-price">₹{product.mrp.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ marginTop: 20 }}>
        <div className="chart-title mb-3">Quick Actions</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {[
            { label: 'AI Visual Search', desc: 'Upload a photo to find similar products', icon: '🔍', path: '/ai-search', color: 'var(--purple)' },
            { label: 'Browse Collections', desc: 'Diwali, Bridal, Diamond Specials...', icon: '🏛️', path: '/collections', color: 'var(--gold-primary)' },
            { label: 'My Cart', desc: `${cartCount} items ready to order`, icon: '🛒', path: '/cart', color: 'var(--blue)' },
            { label: 'Track Orders', desc: 'Check status of placed orders', icon: '📋', path: '/my-orders', color: 'var(--green)' },
          ].map(action => (
            <div key={action.path} className="card" style={{ cursor: 'pointer' }} onClick={() => navigate(action.path)}>
              <div style={{ fontSize: '2rem', marginBottom: 10 }}>{action.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4, color: action.color }}>{action.label}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{action.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { role } = useApp();
  return role === 'owner' ? <OwnerDashboard /> : <DealerDashboard />;
}
