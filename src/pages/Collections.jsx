import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Package } from 'lucide-react';
import { COLLECTIONS, PRODUCTS } from '../mockData';

export default function Collections() {
  const navigate = useNavigate();

  return (
    <div className="page-container fade-in">
      <div className="flex items-center justify-between page-header">
        <div>
          <div className="page-title">Collections</div>
          <div className="page-subtitle">Curated product collections for every occasion</div>
        </div>
        <button className="btn btn-primary"><Package size={15}/> Create Collection</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
        {COLLECTIONS.map(col => (
          <div key={col.id} className="collection-card" style={{ borderRadius: 'var(--radius-xl)', cursor: 'pointer' }} onClick={() => navigate('/catalogue')}>
            <img src={col.image} alt={col.name} loading="lazy"/>
            <div className="collection-overlay">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(212,175,55,0.3)', color: 'var(--gold-light)', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>
                    {col.productCount} Products
                  </span>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(76,175,125,0.3)', color: '#81e4b0', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>
                    Active
                  </span>
                </div>
                <div className="collection-name">{col.name}</div>
                <div className="collection-count">{col.description}</div>
                <button className="btn btn-primary btn-sm" style={{ marginTop: 10 }} onClick={e => { e.stopPropagation(); navigate('/catalogue'); }}>
                  Browse <ArrowRight size={12}/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Products from Bridal */}
      <div style={{ marginTop: 36 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div className="chart-title">Featured: Bridal 2026 Collection</div>
          <span className="badge badge-purple">12 Products</span>
        </div>
        <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8 }}>
          {PRODUCTS.filter(p => p.category === 'Necklace' || p.tags.includes('Bestseller')).slice(0, 6).map(p => (
            <div key={p.id} className="product-card" style={{ minWidth: 180, cursor: 'pointer', flexShrink: 0 }} onClick={() => navigate(`/catalogue/${p.id}`)}>
              <div className="img-wrapper" style={{ height: 150 }}>
                <img src={p.images[0]} alt={p.name}/>
                <div className="stock-badge">
                  <span className={`badge ${p.quantity === 0 ? 'badge-red' : p.quantity <= 5 ? 'badge-amber' : 'badge-green'}`}>
                    {p.quantity === 0 ? 'Out' : p.quantity <= 5 ? `${p.quantity} left` : 'In Stock'}
                  </span>
                </div>
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
