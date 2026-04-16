import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { Search, Grid, List, Filter, Plus, Heart, ShoppingCart, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../mockData';

const CATEGORIES = ['All', 'Ring', 'Necklace', 'Earring', 'Bangle', 'Bracelet', 'Pendant', 'Chain'];
const METALS = ['All', 'Gold', 'Silver', 'Platinum'];
const TAGS = ['All', 'Bestseller', 'New Arrival', 'Limited Edition'];

export default function Catalogue() {
  const navigate = useNavigate();
  const { role, addToCart, toggleWishlist, wishlist } = useApp();
  const [view, setView] = useState('grid');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [metal, setMetal] = useState('All');
  const [tag, setTag] = useState('All');
  const [sort, setSort] = useState('newest');
  const [nlSearch, setNlSearch] = useState('');
  const [nlResult, setNlResult] = useState('');

  const handleNLSearch = () => {
    if (!nlSearch.trim()) return;
    setNlResult(`AI parsed: "${nlSearch}" → Searching for ${nlSearch.toLowerCase().includes('gold') ? 'Gold' : 'all metals'} ${nlSearch.toLowerCase().includes('necklace') ? 'Necklaces' : 'products'} matching your description...`);
    const metal = nlSearch.toLowerCase().includes('gold') ? 'Gold' : nlSearch.toLowerCase().includes('silver') ? 'Silver' : 'All';
    const cat = nlSearch.toLowerCase().includes('necklace') ? 'Necklace' : nlSearch.toLowerCase().includes('ring') ? 'Ring' : nlSearch.toLowerCase().includes('earring') ? 'Earring' : 'All';
    setMetal(metal);
    setCategory(cat);
    setTimeout(() => setNlResult(''), 3000);
  };

  const filtered = PRODUCTS.filter(p => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || p.category === category;
    const matchMetal = metal === 'All' || p.metalType === metal;
    const matchTag = tag === 'All' || p.tags.includes(tag);
    return matchSearch && matchCat && matchMetal && matchTag;
  }).sort((a, b) => {
    if (sort === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sort === 'price-asc') return a.mrp - b.mrp;
    if (sort === 'price-desc') return b.mrp - a.mrp;
    if (sort === 'popular') return b.orders - a.orders;
    return 0;
  });

  return (
    <div className="page-container fade-in">
      <div className="flex items-center justify-between page-header">
        <div>
          <div className="page-title">Product Catalogue</div>
          <div className="page-subtitle">{filtered.length} products · Real-time inventory</div>
        </div>
        {role === 'owner' && (
          <button className="btn btn-primary" onClick={() => navigate('/add-product')}>
            <Plus size={15}/> Add Product
          </button>
        )}
      </div>

      {/* AI NLP Search */}
      <div className="ai-section mb-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="ai-badge"><Sparkles size={10}/> AI NATURAL LANGUAGE SEARCH</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Type what you're looking for in plain language</span>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <input
            className="form-input"
            placeholder='Try: "22K gold necklace under 50 grams with kundan work around ₹1.5 lakh"'
            value={nlSearch}
            onChange={e => setNlSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleNLSearch()}
            style={{ flex: 1 }}
          />
          <button className="btn btn-primary btn-sm" onClick={handleNLSearch}>
            <Sparkles size={14}/> Search with AI
          </button>
        </div>
        {nlResult && (
          <div style={{ marginTop: 8, fontSize: '0.8rem', color: 'var(--purple)', background: 'rgba(155,111,232,0.1)', padding: '8px 12px', borderRadius: 6 }}>
            🤖 {nlResult}
          </div>
        )}
      </div>

      {/* Search + Controls */}
      <div className="flex items-center gap-3 mb-3" style={{ flexWrap: 'wrap' }}>
        <div className="search-bar" style={{ flex: 1, minWidth: 200 }}>
          <Search size={16} color="var(--text-muted)"/>
          <input placeholder="Search by name, SKU..." value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
        <select className="form-select" style={{ width: 130 }} value={sort} onChange={e => setSort(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="popular">Most Popular</option>
        </select>
        <div className="tabs">
          <button className={`tab-btn ${view === 'grid' ? 'active' : ''}`} onClick={() => setView('grid')}><Grid size={14}/></button>
          <button className={`tab-btn ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')}><List size={14}/></button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="filters-bar">
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}><Filter size={12}/></span>
        {CATEGORIES.map(c => (
          <button key={c} className={`filter-chip ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>{c}</button>
        ))}
        <div className="divider" style={{ height: 20, width: 1, margin: '0 4px', background: 'var(--border-subtle)' }}/>
        {METALS.map(m => (
          <button key={m} className={`filter-chip ${metal === m ? 'active' : ''}`} onClick={() => setMetal(m)}>{m}</button>
        ))}
        <div className="divider" style={{ height: 20, width: 1, margin: '0 4px', background: 'var(--border-subtle)' }}/>
        {TAGS.map(t => (
          <button key={t} className={`filter-chip ${tag === t ? 'active' : ''}`} onClick={() => setTag(t)}>{t}</button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">💎</div>
          <div className="empty-title">No products found</div>
          <div className="empty-desc">Try adjusting your filters or search term</div>
        </div>
      ) : view === 'grid' ? (
        <div className="product-grid">
          {filtered.map(product => {
            const isWished = wishlist.includes(product.id);
            return (
              <div key={product.id} className="product-card">
                <div className="img-wrapper" onClick={() => navigate(`/catalogue/${product.id}`)}>
                  <img src={product.images[0]} alt={product.name} loading="lazy"/>
                  <div className="stock-badge">
                    <span className={`badge ${product.quantity === 0 ? 'badge-red' : product.quantity <= 5 ? 'badge-amber' : 'badge-green'}`}>
                      {product.quantity === 0 ? 'Out' : product.quantity <= 5 ? `${product.quantity} left` : 'In Stock'}
                    </span>
                  </div>
                  {product.tags.length > 0 && (
                    <div className="tag-badge">
                      <span className={`badge ${product.tags.includes('Bestseller') ? 'badge-gold' : product.tags.includes('New Arrival') ? 'badge-blue' : 'badge-purple'}`}>
                        {product.tags[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div className="card-body" onClick={() => navigate(`/catalogue/${product.id}`)}>
                  <div className="product-name">{product.name}</div>
                  <div className="product-meta">{product.metalType} · {product.purity} · {product.grossWeight}g</div>
                  <div className="product-price">₹{product.mrp.toLocaleString()}</div>
                </div>
                {role === 'dealer' && (
                  <div className="product-actions">
                    <button
                      className={`btn btn-ghost btn-sm`}
                      style={{ color: isWished ? 'var(--red)' : 'var(--text-muted)' }}
                      onClick={() => toggleWishlist(product.id)}
                    >
                      <Heart size={14} fill={isWished ? 'var(--red)' : 'none'}/>
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1 }}
                      disabled={product.quantity === 0}
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart size={13}/> Add to Cart
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Metal</th>
                <th>Weight</th>
                <th>MRP</th>
                <th>Stock</th>
                <th>Tags</th>
                {role === 'dealer' && <th></th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map(product => (
                <tr key={product.id} style={{ cursor: 'pointer' }}>
                  <td onClick={() => navigate(`/catalogue/${product.id}`)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <img src={product.images[0]} alt={product.name} style={{ width: 40, height: 40, borderRadius: 6, objectFit: 'cover' }}/>
                      <span style={{ fontWeight: 600 }}>{product.name}</span>
                    </div>
                  </td>
                  <td><span style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{product.sku}</span></td>
                  <td>{product.category}</td>
                  <td>{product.metalType} · {product.purity}</td>
                  <td>{product.grossWeight}g</td>
                  <td style={{ fontWeight: 700, color: 'var(--gold-primary)' }}>₹{product.mrp.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${product.quantity === 0 ? 'badge-red' : product.quantity <= 5 ? 'badge-amber' : 'badge-green'}`}>
                      {product.quantity === 0 ? 'Out' : `${product.quantity}`}
                    </span>
                  </td>
                  <td>{product.tags.map(t => <span key={t} className="badge badge-gold" style={{ marginRight: 4 }}>{t}</span>)}</td>
                  {role === 'dealer' && (
                    <td>
                      <button className="btn btn-primary btn-sm" disabled={product.quantity === 0} onClick={() => addToCart(product)}>
                        <ShoppingCart size={12}/> Add
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
