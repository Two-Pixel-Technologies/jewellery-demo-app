import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { Heart, ShoppingCart, ChevronLeft, ChevronRight, ArrowLeft, Sparkles, Star, Package } from 'lucide-react';
import { PRODUCTS } from '../mockData';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role, addToCart, toggleWishlist, wishlist } = useApp();
  const [imgIdx, setImgIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return (
    <div className="page-container"><div className="empty-state"><div className="empty-icon">💎</div><div className="empty-title">Product not found</div></div></div>
  );

  const isWished = wishlist?.includes(product.id);

  // Similar products (same category or metal type, different product)
  const similar = PRODUCTS.filter(p =>
    p.id !== product.id &&
    (p.category === product.category || p.metalType === product.metalType)
  ).slice(0, 5);

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const stockStyle = product.quantity === 0 ? 'badge-red' :
    product.quantity <= 5 ? 'badge-amber' : 'badge-green';
  const stockText = product.quantity === 0 ? 'Out of Stock' :
    product.quantity <= 5 ? `Only ${product.quantity} left` : `${product.quantity} in stock`;

  return (
    <div className="page-container fade-in">
      <button className="btn btn-ghost btn-sm mb-4" onClick={() => navigate(-1)}>
        <ArrowLeft size={14}/> Back to Catalogue
      </button>

      <div className="grid-2" style={{ gap: 32, alignItems: 'start' }}>
        {/* Image Gallery */}
        <div>
          <div style={{
            position: 'relative',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            border: '1px solid var(--border-subtle)',
            aspectRatio: '1',
            marginBottom: 12,
          }}>
            <img
              src={product.images[imgIdx]}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {product.images.length > 1 && (
              <>
                <button onClick={() => setImgIdx(p => (p - 1 + product.images.length) % product.images.length)}
                  style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}>
                  <ChevronLeft size={18}/>
                </button>
                <button onClick={() => setImgIdx(p => (p + 1) % product.images.length)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}>
                  <ChevronRight size={18}/>
                </button>
              </>
            )}
          </div>
          {product.images.length > 1 && (
            <div style={{ display: 'flex', gap: 8 }}>
              {product.images.map((img, i) => (
                <div key={i} onClick={() => setImgIdx(i)} style={{
                  width: 64, height: 64, borderRadius: 8, overflow: 'hidden', cursor: 'pointer',
                  border: `2px solid ${i === imgIdx ? 'var(--gold-primary)' : 'var(--border-subtle)'}`,
                }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
            {product.tags.map(t => (
              <span key={t} className={`badge ${t === 'Bestseller' ? 'badge-gold' : t === 'New Arrival' ? 'badge-blue' : 'badge-purple'}`}>{t}</span>
            ))}
            <span className={`badge ${stockStyle}`}>{stockText}</span>
          </div>

          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 4 }}>{product.name}</h1>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 20 }}>
            SKU: <span style={{ fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{product.sku}</span> · {product.category} / {product.subCategory}
          </div>

          <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--gold-primary)', marginBottom: 8 }}>
            ₹{product.mrp.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 24 }}>
            Making charges: ₹{product.makingCharges.toLocaleString()} · This is a quotation price for negotiation
          </div>

          {/* Specs Grid */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '16px 20px', marginBottom: 20 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>Product Specifications</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 20px' }}>
              {[
                ['Category', product.category], ['Sub-Category', product.subCategory],
                ['Metal Type', product.metalType], ['Purity', product.purity],
                ['Gross Weight', `${product.grossWeight}g`], ['Net Weight', `${product.netWeight}g`],
                ['Making Charges', `₹${product.makingCharges.toLocaleString()}`], ['Status', product.status],
              ].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 2 }}>{k}</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Stone Details */}
          {product.stones.length > 0 && (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '14px 20px', marginBottom: 20 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Stone Details</div>
              {product.stones.map((stone, i) => (
                <div key={i} style={{ display: 'flex', gap: 20, marginBottom: 8 }}>
                  <span style={{ fontWeight: 600, minWidth: 80 }}>{stone.type}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {stone.carat > 0 && `${stone.carat}ct · `}{stone.count} pcs · {stone.setting}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Analytics (Owner) */}
          {role === 'owner' && (
            <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
              {[
                { label: 'Views', value: product.views, icon: '👁️' },
                { label: 'Cart Adds', value: product.cartAdds, icon: '🛒' },
                { label: 'Orders', value: product.orders, icon: '📦' },
              ].map(s => (
                <div key={s.label} style={{ flex: 1, background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 10, padding: '12px 14px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.3rem', marginBottom: 2 }}>{s.icon}</div>
                  <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>{s.value}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24 }}>
            {product.description}
          </p>

          {/* Actions */}
          {role === 'dealer' && (
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20 }}>
              <div className="cart-qty">
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span className="qty-value">{qty}</span>
                <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleAdd} disabled={product.quantity === 0}>
                <ShoppingCart size={15}/>
                {added ? '✓ Added to Cart!' : product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button
                className="btn btn-ghost btn-icon"
                style={{ color: isWished ? 'var(--red)' : 'var(--text-muted)' }}
                onClick={() => toggleWishlist(product.id)}
              >
                <Heart size={18} fill={isWished ? 'var(--red)' : 'none'}/>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Similar Products */}
      <div style={{ marginTop: 40 }}>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={16} color="var(--gold-primary)"/>
          <div className="chart-title">Similar Products</div>
          <span className="ai-badge">AI Powered</span>
        </div>
        <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8 }}>
          {similar.map(p => (
            <div key={p.id} className="product-card" style={{ minWidth: 180, flexShrink: 0 }} onClick={() => { navigate(`/catalogue/${p.id}`); setImgIdx(0); }}>
              <div className="img-wrapper" style={{ aspectRatio: '1', height: 150 }}>
                <img src={p.images[0]} alt={p.name} loading="lazy"/>
              </div>
              <div className="card-body">
                <div className="product-name" style={{ fontSize: '0.82rem' }}>{p.name}</div>
                <div className="product-meta">{p.metalType} · {p.purity}</div>
                <div className="product-price" style={{ fontSize: '0.9rem' }}>₹{p.mrp.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
