import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Phone, Mail, AlertTriangle, TrendingUp, Eye, ShoppingBag, Clock } from 'lucide-react';
import { DEALERS } from '../mockData';

export default function DealerManagement() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  const filtered = DEALERS.filter(d => {
    const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.city.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || d.status === filter || (filter === 'Inactive30' && daysSince(d.lastLogin) > 30);
    return matchSearch && matchFilter;
  });

  const daysSince = (dateStr) => Math.floor((Date.now() - new Date(dateStr)) / 86400000);

  return (
    <div className="page-container fade-in">
      <div className="flex items-center justify-between page-header">
        <div>
          <div className="page-title">Dealer Management</div>
          <div className="page-subtitle">{DEALERS.length} dealers · {DEALERS.filter(d=>d.status==='Active').length} active</div>
        </div>
        <button className="btn btn-primary"><Plus size={15}/> Add Dealer</button>
      </div>

      {/* Alert: Inactive Dealers */}
      <div style={{ background: 'var(--amber-bg)', border: '1px solid rgba(240,168,48,0.3)', borderRadius: 'var(--radius-lg)', padding: '14px 18px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
        <AlertTriangle size={18} color="var(--amber)"/>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--amber)' }}>Inactive Dealer Alert</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <strong>Golden Era Jewels</strong> (55 days) and <strong>Trendy Trinkets</strong> (35 days) haven't ordered in 30+ days. Consider reaching out before Akshaya Tritiya.
          </div>
        </div>
        <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto', whiteSpace: 'nowrap' }}>View Inactive</button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        <div className="search-bar" style={{ flex: 1, minWidth: 200 }}>
          <Search size={15} color="var(--text-muted)"/>
          <input placeholder="Search dealer name, city..." value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
        {['All','Active','Inactive','Inactive30'].map(f => (
          <button key={f} className={`filter-chip ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {f === 'Inactive30' ? '30+ Day Inactive' : f}
          </button>
        ))}
      </div>

      {/* Dealer Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(dealer => {
          const dayInactive = daysSince(dealer.lastLogin);
          const isInactive = dayInactive > 30;
          return (
            <div key={dealer.id} className="card" style={{ borderColor: isInactive ? 'rgba(240,168,48,0.2)' : '' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div className="dealer-avatar">{dealer.name.split(' ').map(w => w[0]).join('').slice(0,2)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                    <span style={{ fontWeight: 800, fontSize: '1rem' }}>{dealer.name}</span>
                    <span className={`badge ${dealer.status === 'Active' ? 'badge-green' : 'badge-red'}`}>{dealer.status}</span>
                    <span className={`badge ${dealer.tier === 'Platinum' ? 'badge-purple' : dealer.tier === 'Gold' ? 'badge-gold' : 'badge-muted'}`}>{dealer.tier}</span>
                    {isInactive && <span className="badge badge-amber">⚠ Inactive {dayInactive}d</span>}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {dealer.contact} · {dealer.city} · {dealer.email}
                  </div>
                </div>

                {/* Stats */}
                <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                  {[
                    { icon: <ShoppingBag size={13}/>, val: dealer.orders, label: 'Orders' },
                    { icon: <TrendingUp size={13}/>, val: `₹${(dealer.totalMRP/100000).toFixed(1)}L`, label: 'Revenue' },
                    { icon: <Clock size={13}/>, val: `${dayInactive}d`, label: 'Last Active' },
                  ].map(s => (
                    <div key={s.label} style={{ textAlign: 'center', minWidth: 60 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center', color: 'var(--text-muted)', marginBottom: 2 }}>{s.icon}</div>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', color: isInactive && s.label === 'Last Active' ? 'var(--amber)' : 'var(--text-primary)' }}>{s.val}</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Preferences */}
                <div style={{ textAlign: 'right', minWidth: 120 }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 3 }}>Prefers</div>
                  <span className="badge badge-gold">{dealer.preferredCategory}</span>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 6 }}>
                    {dealer.cartItems > 0 && `🛒 ${dealer.cartItems} in cart`}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <a href={`tel:${dealer.phone}`} className="btn btn-ghost btn-sm"><Phone size={13}/></a>
                  <a href={`mailto:${dealer.email}`} className="btn btn-ghost btn-sm"><Mail size={13}/></a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
