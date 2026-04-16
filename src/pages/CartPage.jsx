import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowRight, CheckCircle } from 'lucide-react';
import { useApp } from '../App';

export default function CartPage() {
  const { cartItems, removeFromCart, updateCartQty } = useApp();
  const navigate = useNavigate();
  const [ordered, setOrdered] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.mrp * item.quantity, 0);

  const handlePunchOrder = () => {
    setOrdered(true);
    setTimeout(() => navigate('/my-orders'), 2000);
  };

  if (ordered) return (
    <div className="page-container fade-in">
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <div style={{ fontSize: '4rem', marginBottom: 20 }}>✅</div>
        <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 8 }}>Order Submitted!</div>
        <div style={{ color: 'var(--text-muted)', marginBottom: 4 }}>Your order is awaiting approval from Kanchan Jewels</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>You'll be notified when the status changes. Redirecting to My Orders...</div>
      </div>
    </div>
  );

  if (cartItems.length === 0) return (
    <div className="page-container fade-in">
      <div className="empty-state">
        <div className="empty-icon"><ShoppingCart size={48} style={{ opacity: 0.3 }}/></div>
        <div className="empty-title">Your cart is empty</div>
        <div className="empty-desc">Browse the catalogue and add products to your cart</div>
        <button className="btn btn-primary" onClick={() => navigate('/catalogue')}>Browse Catalogue <ArrowRight size={14}/></button>
      </div>
    </div>
  );

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <div className="page-title">My Cart</div>
        <div className="page-subtitle">{cartItems.length} items · Ready to punch order</div>
      </div>

      <div className="grid-2" style={{ gap: 28, alignItems: 'start' }}>
        {/* Cart Items */}
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 14 }}>Order Items</div>
          {cartItems.map(item => (
            <div key={item.productId} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-img"/>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, marginBottom: 2 }}>{item.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{item.sku}</div>
                <div style={{ fontWeight: 800, color: 'var(--gold-primary)', marginTop: 4 }}>₹{item.mrp.toLocaleString()}/pc</div>
              </div>
              <div className="cart-qty">
                <button className="qty-btn" onClick={() => updateCartQty(item.productId, item.quantity - 1)}>−</button>
                <span className="qty-value">{item.quantity}</span>
                <button className="qty-btn" onClick={() => updateCartQty(item.productId, item.quantity + 1)}>+</button>
              </div>
              <div style={{ textAlign: 'right', minWidth: 80 }}>
                <div style={{ fontWeight: 800, fontSize: '1rem' }}>₹{(item.mrp * item.quantity).toLocaleString()}</div>
              </div>
              <button className="btn btn-ghost btn-icon" style={{ color: 'var(--red)' }} onClick={() => removeFromCart(item.productId)}>
                <Trash2 size={15}/>
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div>
          <div className="card mb-4">
            <div style={{ fontWeight: 700, marginBottom: 16 }}>Order Summary</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              {cartItems.map(item => (
                <div key={item.productId} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{item.name} × {item.quantity}</span>
                  <span style={{ fontWeight: 600 }}>₹{(item.mrp * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="divider"/>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700 }}>Total MRP Quotation</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--gold-primary)' }}>₹{total.toLocaleString()}</span>
              </div>
            </div>

            <div style={{ padding: '10px 14px', background: 'var(--bg-surface)', borderRadius: 8, fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 16 }}>
              💡 This is a quotation only — not a tax invoice. Kanchan Jewels will review and confirm pricing before shipment.
            </div>

            <button className="btn btn-primary w-full btn-lg" onClick={handlePunchOrder}>
              <CheckCircle size={16}/> Punch Order — Await Approval
            </button>
          </div>

          <div className="card">
            <div style={{ fontWeight: 700, marginBottom: 10, fontSize: '0.9rem' }}>Order Flow</div>
            {[
              { step: '1', label: 'You punch order', desc: 'Cart converts to order with "Pending Approval" status' },
              { step: '2', label: 'Owner reviews', desc: 'Kanchan Jewels approves, rejects, or partially approves each item' },
              { step: '3', label: 'Confirmation', desc: 'You get notified. Approved items are deducted from live inventory.' },
            ].map(s => (
              <div key={s.step} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--gold-muted)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800, color: 'var(--gold-primary)', flexShrink: 0 }}>{s.step}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.82rem' }}>{s.label}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
