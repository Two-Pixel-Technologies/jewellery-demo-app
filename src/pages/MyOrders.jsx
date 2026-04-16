import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { ORDERS } from '../mockData';

const dealerOrders = ORDERS.filter(o => ['D004'].includes(o.dealerId));

const statusIcon = { Pending: <Clock size={14}/>, Approved: <CheckCircle size={14}/>, Rejected: <XCircle size={14}/>, Partial: <AlertCircle size={14}/> };

export default function MyOrders() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <div className="page-title">My Orders</div>
        <div className="page-subtitle">Track your order history and approval status</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {ORDERS.map(order => (
          <div key={order.id} className="card" style={{ borderColor: order.status === 'Pending' ? 'var(--amber-bg)' : '' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer' }} onClick={() => setExpanded(expanded === order.id ? null : order.id)}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.9rem', color: 'var(--gold-primary)' }}>{order.id}</span>
                  <span className={`order-status status-${order.status.toLowerCase()}`}>
                    {statusIcon[order.status]} {order.status}
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {order.items.length} items · {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 900, fontSize: '1.1rem', color: 'var(--gold-primary)' }}>₹{order.totalMRP.toLocaleString()}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total MRP</div>
              </div>
              <ChevronRight size={16} style={{ color: 'var(--text-muted)', transform: expanded === order.id ? 'rotate(90deg)' : 'none', transition: '0.2s' }}/>
            </div>

            {expanded === order.id && (
              <div style={{ marginTop: 16, borderTop: '1px solid var(--border-subtle)', paddingTop: 16 }}>
                {order.items.map(item => (
                  <div key={item.productId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.productName}</div>
                      {item.rejectReason && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--red)', marginTop: 2 }}>✗ {item.rejectReason}</div>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, textAlign: 'right' }}>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Qty: {item.quantity}</div>
                      <div style={{ fontWeight: 700 }}>₹{(item.mrp * item.quantity).toLocaleString()}</div>
                      <span className={`order-status status-${item.status.toLowerCase()}`} style={{ fontSize: '0.68rem' }}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
                {order.notes && (
                  <div style={{ marginTop: 12, padding: '8px 12px', background: 'var(--bg-surface)', borderRadius: 6, fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    📝 {order.notes}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
