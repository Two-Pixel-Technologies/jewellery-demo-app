import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Sparkles, ShoppingCart, X } from 'lucide-react';
import { PRODUCTS } from '../mockData';
import { useApp } from '../App';

const SAMPLE_QUERIES = [
  'A gold ring with ruby stone settings',
  'Traditional south indian necklace with pearls',
  'Diamond pendant with halo design',
  'Oxidised silver bracelet with tribal motifs',
];

export default function AIVisualSearch() {
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [preview, setPreview] = useState(null);
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useApp();

  const handleSearch = (overrideQuery) => {
    const q = overrideQuery || query;
    setSearching(true);
    setSearched(false);
    setTimeout(() => {
      // Simulate AI visual similarity — return relevant products
      const mockResults = PRODUCTS
        .sort(() => Math.random() - 0.5)
        .slice(0, 8)
        .map(p => ({ ...p, similarity: (Math.random() * 25 + 72).toFixed(0) }));
      setResults(mockResults);
      setSearching(false);
      setSearched(true);
    }, 2000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { setPreview(reader.result); setQuery('Uploaded image'); };
    reader.readAsDataURL(file);
  };

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <div className="flex items-center gap-3 mb-1">
          <div className="page-title">AI Visual Search</div>
          <span className="ai-badge"><Sparkles size={10}/> Powered by CLIP Embeddings</span>
        </div>
        <div className="page-subtitle">Upload a reference photo or describe what you want — AI finds visually similar products from inventory</div>
      </div>

      {/* Competitor callout */}
      <div style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid var(--gold-border)', borderRadius: 'var(--radius-md)', padding: '12px 16px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: '1.2rem' }}>🏆</span>
        <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          <strong style={{ color: 'var(--gold-primary)' }}>Only platform offering this to dealers.</strong> Jwelly's image search is internal-staff only. SwarnaVyapar & JewelMaker have no visual search at all.
        </span>
      </div>

      <div className="grid-2" style={{ gap: 28 }}>
        {/* Upload Panel */}
        <div>
          <div className="card mb-4">
            <div style={{ fontWeight: 700, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Upload size={15}/> Upload Reference Image
            </div>

            {preview ? (
              <div style={{ position: 'relative', marginBottom: 14 }}>
                <img src={preview} alt="Reference" style={{ width: '100%', maxHeight: 240, objectFit: 'contain', borderRadius: 12, background: 'var(--bg-surface)' }}/>
                <button onClick={() => { setPreview(null); setSearched(false); setResults([]); }}
                  style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}>
                  <X size={14}/>
                </button>
              </div>
            ) : (
              <label className="upload-zone" style={{ display: 'block', cursor: 'pointer' }}>
                <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }}/>
                <div className="upload-zone-icon"><Upload size={28}/></div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>Drop or click to upload</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>JPG, PNG, WEBP — photos from your phone work great</div>
              </label>
            )}

            <div style={{ position: 'relative', marginTop: 12 }}>
              <input
                className="form-input"
                placeholder="Or describe the jewellery in words..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
              />
            </div>

            <button
              className="btn btn-primary w-full mt-3"
              onClick={() => handleSearch()}
              disabled={searching || (!preview && !query)}
            >
              <Sparkles size={14}/>
              {searching ? 'AI Searching Inventory...' : 'Find Similar Products'}
            </button>
          </div>

          {/* Sample Queries */}
          <div className="card">
            <div style={{ fontWeight: 700, marginBottom: 12, fontSize: '0.85rem' }}>Try a sample query</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {SAMPLE_QUERIES.map(q => (
                <button key={q} className="btn btn-ghost btn-sm" style={{ justifyContent: 'flex-start', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                  onClick={() => { setQuery(q); handleSearch(q); }}>
                  🔍 "{q}"
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          {searching && (
            <div className="ai-section" style={{ textAlign: 'center', padding: 40 }}>
              <div style={{ fontSize: '2rem', marginBottom: 16 }}>🤖</div>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Encoding image with CLIP model...</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 20 }}>Finding nearest neighbours via cosine similarity in product embedding space</div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold-primary)', animation: `pulse 1.2s ${i*0.2}s infinite` }}/>
                ))}
              </div>
            </div>
          )}

          {!searching && searched && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <div style={{ fontWeight: 700 }}>{results.length} Similar Products Found</div>
                <span className="badge badge-green">Visual Match</span>
              </div>
              <div className="product-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                {results.map(p => (
                  <div key={p.id} className="product-card">
                    <div className="img-wrapper" style={{ height: 130 }} onClick={() => navigate(`/catalogue/${p.id}`)}>
                      <img src={p.images[0]} alt={p.name} loading="lazy"/>
                      <div style={{ position: 'absolute', bottom: 6, left: 6 }}>
                        <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>
                          {p.similarity}% match
                        </span>
                      </div>
                    </div>
                    <div className="card-body" style={{ padding: '10px 12px' }}>
                      <div className="product-name" style={{ fontSize: '0.8rem' }}>{p.name}</div>
                      <div className="product-meta">{p.metalType} · {p.purity}</div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="product-price" style={{ fontSize: '0.85rem' }}>₹{p.mrp.toLocaleString()}</div>
                        <button className="btn btn-primary btn-sm" style={{ padding: '4px 10px', fontSize: '0.72rem' }}
                          onClick={() => addToCart(p)} disabled={p.quantity === 0}>
                          <ShoppingCart size={11}/> Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {!searching && !searched && (
            <div className="empty-state" style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)', padding: 50 }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔍</div>
              <div style={{ fontWeight: 700, marginBottom: 8, color: 'var(--text-secondary)' }}>Upload an image to search</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', maxWidth: 260, margin: '0 auto' }}>
                A dealer's customer shows them a reference photo — this feature finds matching products from your inventory instantly
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
