import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, Minus, FileText, MessageSquare } from 'lucide-react';
import { ORDERS } from '../mockData';

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = ORDERS.find(o => o.id === id);

  const [itemStatuses, setItemStatuses] = useState(
    order ? order.items.reduce((acc, item) => { acc[item.productId] = item.status; return acc; }, {}) : {}
  );
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);

  if (!order) return (
    <div className="page-container"><div className="empty-state"><div className="empty-icon">📋</div><div className="empty-title">Order not found</div></div></div>
  );

  const allApproved = order.items.every(i => itemStatuses[i.productId] === 'Approved');
  const allRejected = order.items.every(i => itemStatuses[i.productId] === 'Rejected');
  const isPartial = !allApproved && !allRejected && Object.values(itemStatuses).some(s => s !== 'Pending');

  const handleBulkAction = (action) => {
    setItemStatuses(order.items.reduce((acc, item) => { acc[item.productId] = action; return acc; }, {}));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => navigate('/orders'), 1500);
  };

  return (
    <div className="page-container fade-in">
      <button className="btn btn-ghost btn-sm mb-4" onClick={() => navigate('/orders')}>
        <ArrowLeft size={14}/> Back to Orders
      </button>

      <div className="flex items-center justify-between page-header">
        <div>
          <div className="page-title" style={{ fontFamily: 'monospace', fontSize: '1.4rem' }}>{order.id}</div>
          <div className="page-subtitle">
            Dealer: <strong style={{color: 'var(--text-primary)'}}>{order.dealerName}</strong> ·
            Placed: {new Date(order.createdAt).toLocaleString('en-IN')}
          </div>
        </div>
        <span className={`order-status status-${order.status.toLowerCase()}`} style={{ fontSize: '0.85rem', padding: '6px 16px' }}>
          {order.status}
        </span>
      </div>

      <div className="grid-2" style={{ gap: 28, alignItems: 'start' }}>
        {/* Line Items */}
        <div>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ fontWeight: 700 }}>Order Items ({order.items.length})</div>
              {order.status === 'Pending' && (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-success btn-sm" onClick={() => handleBulkAction('Approved')}>
                    <Check size={13}/> Approve All
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleBulkAction('Rejected')}>
                    <X size={13}/> Reject All
                  </button>
                </div>
              )}
            </div>

            {order.items.map((item, i) => (
              <div key={item.productId} style={{
                padding: '14px 0',
                borderBottom: i < order.items.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{item.productName}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{item.productId}</div>
                    <div style={{ marginTop: 4 }}>
                      Qty: <strong>{item.quantity}</strong> ·
                      MRP: <strong style={{color: 'var(--gold-primary)'}}>₹{item.mrp.toLocaleString()}</strong> ·
                      Total: <strong>₹{(item.mrp * item.quantity).toLocaleString()}</strong>
                    </div>
                    {item.rejectReason && (
                      <div style={{ fontSize: '0.76rem', color: 'var(--red)', marginTop: 4 }}>
                        ✗ {item.rejectReason}
                      </div>
                    )}
                  </div>
                  <span className={`order-status status-${itemStatuses[item.productId]?.toLowerCase() || 'pending'}`}>
                    {itemStatuses[item.productId] || 'Pending'}
                  </span>
                </div>

                {/* Line-level actions for pending orders */}
                {order.status === 'Pending' && (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      className={`btn btn-sm ${itemStatuses[item.productId] === 'Approved' ? 'btn-success' : 'btn-ghost'}`}
                      onClick={() => setItemStatuses(s => ({...s, [item.productId]: 'Approved'}))}
                    >
                      <Check size={12}/> Approve
                    </button>
                    <button
                      className={`btn btn-sm ${itemStatuses[item.productId] === 'Rejected' ? 'btn-danger' : 'btn-ghost'}`}
                      onClick={() => setItemStatuses(s => ({...s, [item.productId]: 'Rejected'}))}
                    >
                      <X size={12}/> Reject
                    </button>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => setItemStatuses(s => ({...s, [item.productId]: 'Pending'}))}
                    >
                      <Minus size={12}/> Reset
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Total */}
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ color: 'var(--text-muted)' }}>Total Order MRP</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--gold-primary)' }}>
                ₹{order.totalMRP.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div>
          {/* Dealer Info */}
          <div className="card mb-4">
            <div style={{ fontWeight: 700, marginBottom: 14 }}>Dealer Information</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div><span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Business</span><div style={{ fontWeight: 600 }}>{order.dealerName}</div></div>
              {order.notes && <div><span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Dealer Note</span><div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', background: 'var(--bg-surface)', padding: '8px 12px', borderRadius: 8, marginTop: 4 }}>"{order.notes}"</div></div>}
            </div>
          </div>

          {/* Notes */}
          {order.status === 'Pending' && (
            <div className="card mb-4">
              <div style={{ fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <MessageSquare size={15}/> Owner Notes / Remarks
              </div>
              <textarea
                className="form-textarea"
                placeholder="Add a note visible to the dealer (optional)..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                style={{ minHeight: 80 }}
              />
            </div>
          )}

          {/* Actions */}
          {order.status === 'Pending' && (
            <div className="card">
              <div style={{ fontWeight: 700, marginBottom: 14 }}>Confirm Decision</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 16 }}>
                {allApproved && <span style={{ color: 'var(--green)' }}>✓ All items approved — inventory will be auto-deducted on save</span>}
                {allRejected && <span style={{ color: 'var(--red)' }}>✗ All items rejected — stock unchanged</span>}
                {isPartial && <span style={{ color: 'var(--blue)' }}>⚡ Partial approval — only approved items will be deducted</span>}
                {!allApproved && !allRejected && !isPartial && 'Set the approval status for each line item above.'}
              </div>
              <button
                className="btn btn-primary w-full"
                onClick={handleSave}
                disabled={Object.values(itemStatuses).every(s => s === 'Pending')}
              >
                {saved ? '✓ Decision Saved!' : 'Confirm & Save Decision'}
              </button>
              <button className="btn btn-ghost btn-sm w-full mt-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <FileText size={13}/> Generate PDF Quotation
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
