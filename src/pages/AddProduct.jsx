import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Upload, Plus, X, Info } from 'lucide-react';

const CUSTOM_FIELDS = [
  { id: 'cf1', group: 'Metal Details', label: 'Hallmark No.', type: 'text', value: '' },
  { id: 'cf2', group: 'Metal Details', label: 'Collection', type: 'text', value: '' },
  { id: 'cf3', group: 'Stone Details', label: 'Certificate No.', type: 'text', value: '' },
  { id: 'cf4', group: 'Stone Details', label: 'Lab Certified', type: 'boolean', value: false },
];

export default function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', sku: '', category: '', subCategory: '', metalType: '', purity: '',
    grossWeight: '', netWeight: '', makingCharges: '', mrp: '', quantity: '', description: '',
    tags: [], status: 'Active',
  });
  const [aiSuggesting, setAiSuggesting] = useState(false);
  const [aiSuggested, setAiSuggested] = useState(false);
  const [images, setImages] = useState([]);
  const [saved, setSaved] = useState(false);

  const handleAISuggest = () => {
    setAiSuggesting(true);
    setTimeout(() => {
      setForm(f => ({
        ...f,
        category: 'Necklace',
        subCategory: 'Kundan',
        metalType: 'Gold',
        purity: '22K',
        tags: ['New Arrival'],
        description: 'Exquisitely crafted Kundan necklace in 22K gold with traditional floral motifs and vibrant enamel work. Perfect for bridal and festive occasions.',
        name: f.name || 'Kundan Floral Necklace',
      }));
      setAiSuggesting(false);
      setAiSuggested(true);
    }, 1800);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => navigate('/catalogue'), 1500);
  };

  const autoSku = () => {
    setForm(f => ({ ...f, sku: `KNC-${f.category.slice(0,3).toUpperCase() || 'PRD'}-${Date.now().toString().slice(-4)}` }));
  };

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <div className="page-title">Add New Product</div>
        <div className="page-subtitle">Fill the form below or let AI auto-fill from your product images</div>
      </div>

      <div className="grid-2" style={{ gap: 28, alignItems: 'start' }}>
        {/* Left Column */}
        <div>
          {/* Image Upload */}
          <div className="card mb-4">
            <div style={{ fontWeight: 700, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Upload size={15}/> Product Images
            </div>
            <div className="upload-zone" onClick={() => {}}>
              <div className="upload-zone-icon"><Upload size={32}/></div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Drop images here or click to upload</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Supports JPG, PNG · Multiple images · Drag to reorder</div>
            </div>

            {/* AI Auto-Tag */}
            <div className="ai-section mt-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="ai-badge"><Sparkles size={10}/> AI AUTO-TAGGING</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 10 }}>
                Upload product images and let GPT-4o Vision analyse and auto-fill category, metal type, stone type, tags and description.
              </p>
              <button className="btn btn-primary btn-sm" onClick={handleAISuggest} disabled={aiSuggesting} style={{ width: '100%' }}>
                <Sparkles size={13}/> {aiSuggesting ? 'AI Analysing Images...' : 'Auto-Fill with AI'}
              </button>
              {aiSuggested && (
                <div style={{ marginTop: 10, padding: '10px 12px', background: 'rgba(76,175,125,0.1)', border: '1px solid rgba(76,175,125,0.3)', borderRadius: 8 }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--green)', fontWeight: 700 }}>✓ AI Suggestions Applied</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Review and confirm the auto-filled values below</div>
                </div>
              )}
            </div>
          </div>

          {/* Custom Fields */}
          <div className="card">
            <div style={{ fontWeight: 700, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              Custom Fields <span className="badge badge-gold">Dynamic Schema</span>
            </div>
            {['Metal Details', 'Stone Details'].map(group => (
              <div key={group} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 10 }}>{group}</div>
                {CUSTOM_FIELDS.filter(f => f.group === group).map(field => (
                  <div key={field.id} className="form-group">
                    <label className="form-label">{field.label}</label>
                    {field.type === 'boolean' ? (
                      <div style={{ display: 'flex', gap: 8 }}>
                        <input type="checkbox" id={field.id}/>
                        <label htmlFor={field.id} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Yes</label>
                      </div>
                    ) : (
                      <input className="form-input" placeholder={`Enter ${field.label.toLowerCase()}...`}/>
                    )}
                  </div>
                ))}
              </div>
            ))}
            <button className="btn btn-ghost btn-sm">
              <Plus size={14}/> Add Custom Field
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div>
          <div className="card">
            <div style={{ fontWeight: 700, marginBottom: 18 }}>Basic Information</div>
            <div className="form-group">
              <label className="form-label">Product Name *</label>
              <input className="form-input" placeholder="e.g. Temple Goddess Ring" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}/>
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">SKU / Item Code</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input className="form-input" placeholder="Auto-generate" value={form.sku} onChange={e => setForm(f => ({...f, sku: e.target.value}))} style={{ flex: 1 }}/>
                  <button className="btn btn-secondary btn-sm" onClick={autoSku}>Auto</button>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-select" value={form.status} onChange={e => setForm(f => ({...f, status: e.target.value}))}>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Discontinued</option>
                </select>
              </div>
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select className="form-select" value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))}>
                  <option value="">Select...</option>
                  {['Ring','Necklace','Earring','Bangle','Bracelet','Pendant','Chain'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Sub-Category</label>
                <input className="form-input" placeholder="e.g. Bridal" value={form.subCategory} onChange={e => setForm(f => ({...f, subCategory: e.target.value}))}/>
              </div>
            </div>

            <div className="divider"/>
            <div style={{ fontWeight: 700, marginBottom: 14 }}>Metal Details</div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Metal Type *</label>
                <select className="form-select" value={form.metalType} onChange={e => setForm(f => ({...f, metalType: e.target.value}))}>
                  <option value="">Select...</option>
                  {['Gold','Silver','Platinum','Diamond','Kundan'].map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Purity</label>
                <select className="form-select" value={form.purity} onChange={e => setForm(f => ({...f, purity: e.target.value}))}>
                  <option value="">Select...</option>
                  {['22K','18K','14K','925 Silver','950 Platinum'].map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Gross Weight (g)</label>
                <input className="form-input" type="number" step="0.1" placeholder="0.0" value={form.grossWeight} onChange={e => setForm(f => ({...f, grossWeight: e.target.value}))}/>
              </div>
              <div className="form-group">
                <label className="form-label">Net Weight (g)</label>
                <input className="form-input" type="number" step="0.1" placeholder="0.0" value={form.netWeight} onChange={e => setForm(f => ({...f, netWeight: e.target.value}))}/>
              </div>
            </div>

            <div className="divider"/>
            <div style={{ fontWeight: 700, marginBottom: 14 }}>Pricing & Inventory</div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">MRP / List Price (₹)</label>
                <input className="form-input" type="number" placeholder="0" value={form.mrp} onChange={e => setForm(f => ({...f, mrp: e.target.value}))}/>
              </div>
              <div className="form-group">
                <label className="form-label">Making Charges (₹)</label>
                <input className="form-input" type="number" placeholder="0" value={form.makingCharges} onChange={e => setForm(f => ({...f, makingCharges: e.target.value}))}/>
              </div>
              <div className="form-group">
                <label className="form-label">Quantity in Stock</label>
                <input className="form-input" type="number" placeholder="0" value={form.quantity} onChange={e => setForm(f => ({...f, quantity: e.target.value}))}/>
              </div>
              <div className="form-group">
                <label className="form-label">Tags / Labels</label>
                <select className="form-select">
                  <option>New Arrival</option>
                  <option>Bestseller</option>
                  <option>Limited Edition</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <div style={{ position: 'relative' }}>
                <textarea className="form-textarea" placeholder="Product description..." value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} style={{ minHeight: 80 }}/>
                <button
                  className="ai-badge"
                  style={{ position: 'absolute', bottom: 8, right: 8, cursor: 'pointer', border: 'none' }}
                  onClick={() => setForm(f => ({...f, description: 'Exquisitely crafted Kundan necklace in 22K gold with traditional floral motifs and vibrant enamel work. Perfect for bridal and festive occasions.'}))}
                >
                  <Sparkles size={9}/> AI Generate
                </button>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => navigate('/catalogue')}>Cancel</button>
              <button
                className="btn btn-primary"
                style={{ flex: 2 }}
                onClick={handleSave}
              >
                {saved ? '✓ Product Saved!' : 'Save Product'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
