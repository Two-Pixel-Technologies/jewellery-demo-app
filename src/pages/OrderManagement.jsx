import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Search, CheckCircle, XCircle, Clock, ChevronRight } from 'lucide-react';
import { ORDERS } from '../mockData';

export default function OrderManagement() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const statuses = ['All', 'Pending', 'Approved', 'Partial', 'Rejected'];

  const filtered = ORDERS.filter(o => {
    const matchStatus = filter === 'All' || o.status === filter;
    const matchSearch = !search || o.dealerName.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const counts = statuses.reduce((acc, s) => {
    acc[s] = s === 'All' ? ORDERS.length : ORDERS.filter(o => o.status === s).length;
    return acc;
  }, {});

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <div className="page-title">Order Management</div>
        <div className="page-subtitle">Review, approve and manage all dealer orders</div>
      </div>

      {/* Status Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {statuses.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`filter-chip ${filter === s ? 'active' : ''}`}
            style={{ position: 'relative' }}
          >
            {s}
            <span style={{
              marginLeft: 6, fontSize: '0.68rem', fontWeight: 700,
              padding: '1px 6px', borderRadius: 'var(--radius-full)',
              background: s === 'Pending' ? 'var(--amber-bg)' : s === 'Approved' ? 'var(--green-bg)' : s === 'Rejected' ? 'var(--red-bg)' : 'var(--bg-surface)',
              color: s === 'Pending' ? 'var(--amber)' : s === 'Approved' ? 'var(--green)' : s === 'Rejected' ? 'var(--red)' : 'var(--text-muted)',
            }}>{counts[s]}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="search-bar mb-4" style={{ maxWidth: 400 }}>
        <Search size={15} color="var(--text-muted)"/>
        <input placeholder="Search by dealer name or order ID..." value={search} onChange={e => setSearch(e.target.value)}/>
      </div>

      {/* Orders Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Dealer</th>
              <th>Items</th>
              <th>Total MRP</th>
              <th>Status</th>
              <th>Date & Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>No orders found</td></tr>
            ) : filtered.map(order => (
              <tr key={order.id}>
                <td>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: 'var(--gold-primary)', fontWeight: 700 }}>{order.id}</span>
                </td>
                <td>
                  <div style={{ fontWeight: 600 }}>{order.dealerName}</div>
                  {order.notes && <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>{order.notes.slice(0, 35)}...</div>}
                </td>
                <td>
                  <div style={{ fontSize: '0.85rem' }}>{order.items.length} items</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {order.items.slice(0, 2).map(i => i.productName).join(', ')}
                    {order.items.length > 2 && ` +${order.items.length - 2}`}
                  </div>
                </td>
                <td style={{ fontWeight: 800, fontSize: '1rem' }}>₹{order.totalMRP.toLocaleString()}</td>
                <td>
                  <span className={`order-status status-${order.status.toLowerCase()}`}>
                    {order.status === 'Pending' && <Clock size={10}/>}
                    {order.status === 'Approved' && <CheckCircle size={10}/>}
                    {order.status === 'Rejected' && <XCircle size={10}/>}
                    {order.status}
                  </span>
                </td>
                <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <div>{new Date(order.createdAt).toLocaleDateString('en-IN')}</div>
                  <div style={{ color: 'var(--text-muted)' }}>{new Date(order.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</div>
                </td>
                <td>
                  <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/orders/${order.id}`)}>
                    {order.status === 'Pending' ? 'Review' : 'View'} <ChevronRight size={13}/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
