import React, { useState } from 'react';
import { useApp } from '../App';
import { Gem, ArrowRight, Shield, Zap, BarChart3 } from 'lucide-react';

const DEMO_ACCOUNTS = [
  {
    id: 'owner',
    title: 'Owner / Admin',
    subtitle: 'Full platform access',
    description: 'Manage inventory, approve orders, view analytics & AI insights',
    initials: 'KJ',
    name: 'Kanchan Jewels',
    email: 'owner@kanchan.in',
    features: ['Order Approval', 'Business Analytics', 'Dealer Management', 'AI Digest'],
  },
  {
    id: 'dealer',
    title: 'Dealer',
    subtitle: 'Self-service ordering portal',
    description: 'Browse catalogue, add to cart, punch orders & track status',
    initials: 'DP',
    name: 'Diamond Palace',
    email: 'vikram@diamondpalace.in',
    features: ['Visual Catalogue', 'Cart & Orders', 'AI Visual Search', 'Wishlist'],
  },
];

export default function LoginPage() {
  const { login } = useApp();
  const [selected, setSelected] = useState('owner');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => { login(selected); setLoading(false); }, 800);
  };

  return (
    <div className="login-page">
      {/* Left Panel */}
      <div className="login-left">
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 480 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
            <div className="logo-mark" style={{ width: 52, height: 52, fontSize: '1.4rem' }}>K</div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>Kanchan</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>B2B Jewellery Platform</div>
            </div>
          </div>

          <h1 className="serif" style={{ fontSize: '2.8rem', lineHeight: 1.2, marginBottom: 20 }}>
            The <span style={{ color: 'var(--gold-primary)' }}>Smartest</span> Way to Sell Jewellery B2B
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: 40 }}>
            Give your 100+ dealers a beautiful self-service portal to browse real-time inventory, punch orders, and get AI-powered product discovery — all from one platform.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { icon: <Zap size={16}/>, text: 'Dealer self-service ordering — no more WhatsApp chaos' },
              { icon: <Gem size={16}/>, text: 'AI visual search — "show me something like this photo"' },
              { icon: <BarChart3 size={16}/>, text: 'Business intelligence competitors don\'t offer' },
              { icon: <Shield size={16}/>, text: 'Real-time inventory with live stock updates' },
            ].map((feat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--gold-primary)', display: 'flex' }}>{feat.icon}</span>
                {feat.text}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 52, padding: '16px 20px', background: 'rgba(212,175,55,0.08)', border: '1px solid var(--gold-border)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--gold-primary)', fontWeight: 700, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Competitor Gap</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Jwelly, SwarnaVyapar & JewelMaker have <strong style={{color:'var(--text-primary)'}}>no dealer self-service portal</strong> with cart + order workflow. That's your moat.
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="login-right">
        <div className="login-form-box">
          <div className="login-title">Demo Access</div>
          <div className="login-subtitle">Select a role to explore the platform</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
            {DEMO_ACCOUNTS.map(acc => (
              <div
                key={acc.id}
                onClick={() => setSelected(acc.id)}
                style={{
                  padding: 18,
                  borderRadius: 'var(--radius-lg)',
                  border: `2px solid ${selected === acc.id ? 'var(--gold-primary)' : 'var(--border-subtle)'}`,
                  background: selected === acc.id ? 'var(--gold-muted)' : 'var(--bg-card)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                  <div className="role-avatar" style={{
                    width: 44, height: 44, borderRadius: 'var(--radius-md)',
                    background: selected === acc.id
                      ? 'linear-gradient(135deg, var(--gold-primary), var(--gold-light))'
                      : 'var(--bg-surface)',
                    fontSize: '0.85rem',
                    color: selected === acc.id ? '#08080F' : 'var(--text-secondary)',
                  }}>{acc.initials}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{acc.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{acc.name} · {acc.email}</div>
                  </div>
                  {selected === acc.id && (
                    <div style={{marginLeft: 'auto'}}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--gold-primary)', display:'flex', alignItems:'center', justifyContent:'center', fontSize: '0.7rem', color: '#08080F', fontWeight: 800 }}>✓</div>
                    </div>
                  )}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 10 }}>{acc.description}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {acc.features.map(f => (
                    <span key={f} style={{
                      fontSize: '0.68rem', fontWeight: 600,
                      padding: '2px 8px', borderRadius: 'var(--radius-full)',
                      background: selected === acc.id ? 'rgba(212,175,55,0.2)' : 'var(--bg-surface)',
                      color: selected === acc.id ? 'var(--gold-primary)' : 'var(--text-muted)',
                    }}>{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            className="btn btn-primary w-full btn-lg"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Signing in...' : `Enter as ${DEMO_ACCOUNTS.find(a => a.id === selected)?.title}`}
            {!loading && <ArrowRight size={16}/>}
          </button>

          <div style={{ textAlign: 'center', marginTop: 16, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            This is an investor demo — all data is mock
          </div>
        </div>
      </div>
    </div>
  );
}
