import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Download, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import {
  MONTHLY_ORDERS, CATEGORY_BREAKDOWN, TOP_PRODUCTS_CHART,
  DEALER_LEADERBOARD, INVENTORY_HEALTH
} from '../mockData';

const COLORS = ['#D4AF37', '#5B8CF5', '#4CAF7D', '#F0A830', '#E05A6A', '#9B6FE8', '#F0D060'];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="tooltip-label">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="tooltip-value" style={{ color: p.color }}>
          {p.name}: {typeof p.value === 'number' && p.value > 10000 ? `₹${(p.value/100000).toFixed(2)}L` : p.value}
        </div>
      ))}
    </div>
  );
}

export default function Analytics() {
  const [period, setPeriod] = useState('12m');

  const data = period === '3m' ? MONTHLY_ORDERS.slice(-3) :
               period === '6m' ? MONTHLY_ORDERS.slice(-6) : MONTHLY_ORDERS;

  return (
    <div className="page-container fade-in">
      <div className="flex items-center justify-between page-header">
        <div>
          <div className="page-title">Business Analytics</div>
          <div className="page-subtitle">Performance insights and actionable intelligence</div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div className="tabs">
            {['3m','6m','12m'].map(p => (
              <button key={p} className={`tab-btn ${period === p ? 'active' : ''}`} onClick={() => setPeriod(p)}>{p}</button>
            ))}
          </div>
          <button className="btn btn-secondary btn-sm"><Download size={13}/> Export</button>
        </div>
      </div>

      {/* KPIs Row */}
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: 28 }}>
        {[
          { label: 'Total Revenue', value: '₹48.2L', trend: '+18%', up: true },
          { label: 'Orders', value: '762', trend: '+14%', up: true },
          { label: 'Avg Order Value', value: '₹63K', trend: '+4%', up: true },
          { label: 'Active Products', value: '29', trend: '+3', up: true },
          { label: 'Active Dealers', value: '7', trend: '−1', up: false },
        ].map((k, i) => (
          <div key={i} className="kpi-card">
            <div className="kpi-value" style={{ fontSize: '1.6rem' }}>{k.value}</div>
            <div className="kpi-label">{k.label}</div>
            <div className={`kpi-trend ${k.up ? 'up' : 'down'}`}>{k.up ? '↑' : '↓'} {k.trend}</div>
          </div>
        ))}
      </div>

      {/* Revenue + Orders Chart */}
      <div className="chart-card mb-4">
        <div className="chart-header">
          <div>
            <div className="chart-title">Revenue & Orders Trend</div>
            <div className="chart-subtitle">Monthly performance</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false}/>
            <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false}/>
            <YAxis yAxisId="left" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/100000).toFixed(0)}L`}/>
            <YAxis yAxisId="right" orientation="right" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false}/>
            <Tooltip content={<CustomTooltip />}/>
            <Legend wrapperStyle={{ fontSize: 12, color: 'var(--text-muted)' }}/>
            <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="var(--gold-primary)" radius={[4,4,0,0]} opacity={0.9}/>
            <Bar yAxisId="right" dataKey="orders" name="Orders" fill="var(--blue)" radius={[4,4,0,0]} opacity={0.7}/>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid-2 mb-4" style={{ gap: 20 }}>
        {/* Category Breakdown */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <div className="chart-title">Category Breakdown</div>
              <div className="chart-subtitle">Orders by jewellery type</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie data={CATEGORY_BREAKDOWN} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3}>
                  {CATEGORY_BREAKDOWN.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]}/>)}
                </Pie>
                <Tooltip formatter={(v) => [`${v}%`, 'Share']}/>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1 }}>
              {CATEGORY_BREAKDOWN.map((cat, i) => (
                <div key={cat.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: COLORS[i], flexShrink: 0 }}/>
                  <span style={{ flex: 1, fontSize: '0.8rem' }}>{cat.name}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: COLORS[i] }}>{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Inventory Health */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <div className="chart-title">Inventory Health</div>
              <div className="chart-subtitle">Stock status overview</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 16 }}>
            <ResponsiveContainer width="50%" height={160}>
              <PieChart>
                <Pie data={INVENTORY_HEALTH} dataKey="value" cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3}>
                  {INVENTORY_HEALTH.map((entry, i) => <Cell key={i} fill={entry.color}/>)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1 }}>
              {INVENTORY_HEALTH.map(item => (
                <div key={item.name} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.name}</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: item.color }}>{item.value}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${(item.value / 30) * 100}%`, background: item.color }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Slow Moving Alert */}
          <div style={{ padding: '10px 12px', background: 'var(--amber-bg)', border: '1px solid rgba(240,168,48,0.3)', borderRadius: 8 }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--amber)', marginBottom: 2 }}>⚠️ Slow-Moving Inventory</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tricolor Gold Ring & Antique Bangle Pair — 60+ days, low orders. Consider discount.</div>
          </div>
        </div>
      </div>

      {/* Top Products Chart */}
      <div className="chart-card mb-4">
        <div className="chart-header">
          <div>
            <div className="chart-title">Top Selling Products</div>
            <div className="chart-subtitle">By order count (last 12 months)</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={TOP_PRODUCTS_CHART} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" horizontal={false}/>
            <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false}/>
            <YAxis type="category" dataKey="name" width={170} tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false}/>
            <Tooltip content={<CustomTooltip />}/>
            <Bar dataKey="orders" name="Orders" fill="var(--gold-primary)" radius={[0,4,4,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Dealer Leaderboard */}
      <div className="chart-card mb-4">
        <div className="chart-header">
          <div>
            <div className="chart-title">Dealer Leaderboard</div>
            <div className="chart-subtitle">Top dealers by order value · Unique to this platform</div>
          </div>
          <span className="badge badge-gold">Exclusive Feature</span>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Dealer</th>
                <th>Orders</th>
                <th>Revenue</th>
                <th>Growth</th>
                <th>Share</th>
              </tr>
            </thead>
            <tbody>
              {DEALER_LEADERBOARD.map((d, i) => {
                const maxRev = DEALER_LEADERBOARD[0].revenue;
                return (
                  <tr key={d.name}>
                    <td>
                      <span style={{
                        width: 24, height: 24, borderRadius: '50%',
                        background: i === 0 ? 'var(--gold-primary)' : i === 1 ? 'rgba(255,255,255,0.15)' : 'var(--bg-surface)',
                        color: i === 0 ? '#08080F' : 'var(--text-primary)',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.75rem', fontWeight: 800,
                      }}>{i + 1}</span>
                    </td>
                    <td style={{ fontWeight: 700 }}>{d.name}</td>
                    <td>{d.orders}</td>
                    <td style={{ fontWeight: 700, color: 'var(--gold-primary)' }}>₹{(d.revenue/100000).toFixed(1)}L</td>
                    <td>
                      <span style={{ color: d.growth > 0 ? 'var(--green)' : 'var(--red)', fontWeight: 700, fontSize: '0.85rem' }}>
                        {d.growth > 0 ? '↑' : '↓'} {Math.abs(d.growth)}%
                      </span>
                    </td>
                    <td style={{ width: 120 }}>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${(d.revenue / maxRev) * 100}%` }}/>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Seasonal Demand */}
      <div className="chart-card">
        <div className="chart-header">
          <div>
            <div className="chart-title">Seasonal Demand Pattern</div>
            <div className="chart-subtitle">Monthly order volume — identify festive peaks</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={MONTHLY_ORDERS}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false}/>
            <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false}/>
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false}/>
            <Tooltip content={<CustomTooltip />}/>
            <Line type="monotone" dataKey="orders" name="Orders" stroke="var(--purple)" strokeWidth={2.5} dot={{ r: 4, fill: 'var(--purple)' }} activeDot={{ r: 6 }}/>
          </LineChart>
        </ResponsiveContainer>
        <div style={{ marginTop: 12, padding: '10px 12px', background: 'rgba(212,175,55,0.08)', border: '1px solid var(--gold-border)', borderRadius: 8, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          💡 <strong style={{color: 'var(--gold-primary)'}}>AI Insight:</strong> Demand peaks in Oct–Nov (Diwali) and Mar–Apr (Akshaya Tritiya). Restock Kundan and Temple jewellery 4–6 weeks before these periods.
        </div>
      </div>
    </div>
  );
}
