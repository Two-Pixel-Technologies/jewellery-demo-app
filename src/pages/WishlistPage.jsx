import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { PRODUCTS } from '../mockData';
import { useApp } from '../App';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useApp();
  const navigate = useNavigate();
  const wished = PRODUCTS.filter(p => wishlist.includes(p.id));

  if (wished.length === 0) return (
    <div className="page-container fade-in">
      <div className="empty-state">
        <div className="empty-icon">💛</div>
        <div className="empty-title">Your wishlist is empty</div>
        <div className="empty-desc">Save products you love to easily find them later</div>
        <button className="btn btn-primary" onClick={() => navigate('/catalogue')}>Browse Catalogue</button>
      </div>
    </div>
  );

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <div className="page-title">My Wishlist</div>
        <div className="page-subtitle">{wished.length} saved products</div>
      </div>
      <div className="product-grid">
        {wished.map(product => (
          <div key={product.id} className="product-card">
            <div className="img-wrapper" onClick={() => navigate(`/catalogue/${product.id}`)}>
              <img src={product.images[0]} alt={product.name} loading="lazy"/>
              <div className="stock-badge">
                <span className={`badge ${product.quantity === 0 ? 'badge-red' : product.quantity <= 5 ? 'badge-amber' : 'badge-green'}`}>
                  {product.quantity === 0 ? 'Out' : product.quantity <= 5 ? `${product.quantity} left` : 'In Stock'}
                </span>
              </div>
            </div>
            <div className="card-body">
              <div className="product-name">{product.name}</div>
              <div className="product-meta">{product.metalType} · {product.purity} · {product.grossWeight}g</div>
              <div className="product-price">₹{product.mrp.toLocaleString()}</div>
            </div>
            <div className="product-actions">
              <button className="btn btn-ghost btn-sm" style={{ color: 'var(--red)' }} onClick={() => toggleWishlist(product.id)}>
                <Heart size={14} fill="var(--red)"/>
              </button>
              <button className="btn btn-primary btn-sm" style={{ flex: 1 }} disabled={product.quantity === 0} onClick={() => addToCart(product)}>
                <ShoppingCart size={13}/> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
