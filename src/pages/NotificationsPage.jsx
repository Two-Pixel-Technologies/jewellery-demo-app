import React, { useState } from 'react';
import { Bell, Check, CheckCheck } from 'lucide-react';
import { NOTIFICATIONS } from '../mockData';

const typeColors = {
  order: 'var(--blue)',
  stock: 'var(--amber)',
  ai: 'var(--purple)',
  dealer: 'var(--green)',
  product: 'var(--gold-primary)',
};

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(NOTIFICATIONS);
  const unread = notifs.filter(n => !n.read).length;

  const markAll = () => setNotifs(ns => ns.map(n => ({ ...n, read: true })));
  const markRead = (id) => setNotifs(ns => ns.map(n => n.id === id ? { ...n, read: true } : n));

  return (
    <div className="page-container fade-in">
      <div className="flex items-center justify-between page-header">
        <div>
          <div className="page-title">Notifications</div>
          <div className="page-subtitle">{unread} unread · {notifs.length} total</div>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={markAll}>
          <CheckCheck size={14}/> Mark All Read
        </button>
      </div>

      {/* Filter tabs */}
      <div className="tabs mb-4">
        {['All','Orders','Stock','AI','Dealers'].map(t => (
          <button key={t} className={`tab-btn ${t === 'All' ? 'active' : ''}`}>{t}</button>
        ))}
      </div>

      <div>
        {notifs.map(notif => (
          <div key={notif.id} className={`notif-item ${!notif.read ? 'unread' : ''}`} onClick={() => markRead(notif.id)}>
            <div className="notif-icon-wrap" style={{ background: `${typeColors[notif.type]}20` }}>
              <span style={{ fontSize: '1rem' }}>{notif.icon}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{notif.title}</span>
                {!notif.read && <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gold-primary)', flexShrink: 0 }}/>}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{notif.message}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>{notif.time}</div>
            </div>
            {!notif.read && (
              <button className="btn btn-ghost btn-sm" style={{flexShrink: 0}} onClick={e => { e.stopPropagation(); markRead(notif.id); }}>
                <Check size={13}/>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
