import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun, Moon, ArrowLeft, Waves, Thermometer, Heart, Droplets,
  TrendingUp, LogOut, UserPlus, X, Fish, FlaskConical, ShoppingBag,
  DollarSign, AlertTriangle, Plus, ChevronDown, ChevronUp, Package,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

// ─── helpers ───────────────────────────────────────────────────────────────
const fmt = (n, dec = 0) => (n == null ? '—' : Number(n).toFixed(dec));
const fmtKsh = (n) => `KSh ${Number(n ?? 0).toLocaleString()}`;

function Badge({ status }) {
  const map = {
    good: 'bg-green-500/20 text-green-400',
    warning: 'bg-yellow-500/20 text-yellow-400',
    danger: 'bg-red-500/20 text-red-400',
    excellent: 'bg-blue-500/20 text-blue-400',
  };
  return <span className={`px-2 py-0.5 rounded-full text-xs ${map[status] ?? map.good}`}>{status}</span>;
}

function SectionCard({ icon: Icon, label, subtext, color, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="rounded-2xl p-6 cursor-pointer"
      style={{ background: color, boxShadow: `0 0 30px -5px ${color}60` }}
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(255,255,255,0.2)' }}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <p className="font-semibold text-sm text-white">{label}</p>
      <p className="text-xs mt-0.5 text-white/70">{subtext}</p>
    </motion.div>
  );
}

// ─── log form modal ─────────────────────────────────────────────────────────
function LogModal({ title, fields, onSubmit, onClose, darkMode }) {
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handle = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await onSubmit(form);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message ?? 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div
        className="rounded-2xl p-6 w-full max-w-lg shadow-2xl"
        style={{ background: darkMode ? '#1E293B' : 'white' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{title}</h3>
          <button onClick={onClose}><X className={`w-5 h-5 ${darkMode ? 'text-white/50' : 'text-gray-400'}`} /></button>
        </div>
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <form onSubmit={submit} className="space-y-3">
          {fields.map(f => (
            <div key={f.key}>
              <label className={`block text-xs mb-1 ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>{f.label}{f.required && ' *'}</label>
              {f.type === 'select' ? (
                <select
                  required={f.required}
                  value={form[f.key] ?? ''}
                  onChange={e => handle(f.key, e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg text-sm border ${darkMode ? 'bg-[#0F172A] border-white/10 text-white' : 'bg-white border-gray-200 text-gray-800'}`}
                >
                  <option value="">Select…</option>
                  {f.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              ) : f.type === 'textarea' ? (
                <textarea
                  rows={2}
                  value={form[f.key] ?? ''}
                  onChange={e => handle(f.key, e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg text-sm border ${darkMode ? 'bg-[#0F172A] border-white/10 text-white' : 'bg-white border-gray-200 text-gray-800'}`}
                />
              ) : (
                <input
                  type={f.type ?? 'text'}
                  required={f.required}
                  placeholder={f.placeholder ?? ''}
                  value={form[f.key] ?? ''}
                  onChange={e => handle(f.key, e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg text-sm border ${darkMode ? 'bg-[#0F172A] border-white/10 text-white' : 'bg-white border-gray-200 text-gray-800'}`}
                />
              )}
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className={`flex-1 py-2 rounded-lg text-sm border ${darkMode ? 'border-white/10 text-white/60' : 'border-gray-200 text-gray-500'}`}>Cancel</button>
            <button type="submit" disabled={saving} className="flex-1 py-2 rounded-lg text-sm bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50">
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── water quality status helper ────────────────────────────────────────────
function wqStatus(param, value) {
  if (value == null) return 'good';
  const v = Number(value);
  const ranges = {
    dissolved_oxygen: { good: [5, 8], warn: [3, 5] },
    temperature_c:    { good: [22, 28], warn: [18, 32] },
    ph_level:         { good: [6.5, 8.0], warn: [6.0, 8.5] },
    ammonia:          { good: [0, 0.1], warn: [0.1, 0.5] },
    nitrite:          { good: [0, 0.1], warn: [0.1, 0.5] },
  };
  const r = ranges[param];
  if (!r) return 'good';
  if (v >= r.good[0] && v <= r.good[1]) return 'good';
  if (v >= r.warn[0] && v <= r.warn[1]) return 'warning';
  return 'danger';
}

// ─── main component ──────────────────────────────────────────────────────────
export default function FishProfile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [modal, setModal] = useState(null); // { type: string }

  // data state
  const [ponds, setPonds] = useState([]);
  const [stocking, setStocking] = useState([]);
  const [mortality, setMortality] = useState([]);
  const [growth, setGrowth] = useState([]);
  const [harvests, setHarvests] = useState([]);
  const [waterQuality, setWaterQuality] = useState([]);
  const [waterExchange, setWaterExchange] = useState([]);
  const [feedRecords, setFeedRecords] = useState([]);
  const [sales, setSales] = useState([]);
  const [plSummary, setPlSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    Promise.all([
      api.get('/animal-groups').then(r => setPonds((r.data.data ?? r.data).filter(g => g.species?.category === 'fish' || true))),
      api.get('/fish/stocking').then(r => setStocking(r.data)),
      api.get('/fish/mortality').then(r => setMortality(r.data)),
      api.get('/fish/growth').then(r => setGrowth(r.data)),
      api.get('/fish/harvest').then(r => setHarvests(r.data)),
      api.get('/fish/water-quality').then(r => setWaterQuality(r.data.data ?? r.data)),
      api.get('/fish/water-exchange').then(r => setWaterExchange(r.data)),
      api.get('/fish/feed').then(r => setFeedRecords(r.data.data ?? r.data)),
      api.get('/fish/sales').then(r => setSales(r.data.data ?? r.data)),
      api.get('/fish/sales/summary').then(r => setPlSummary(r.data)),
    ]).catch(() => {}).finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleLogout = async () => { await logout(); navigate('/login'); };

  // ── derived stats ───────────────────────────────────────────────────────
  const totalStocked    = stocking.reduce((s, r) => s + Number(r.fingerling_count), 0);
  const totalMortality  = mortality.reduce((s, r) => s + Number(r.count), 0);
  const totalHarvested  = harvests.reduce((s, r) => s + Number(r.fish_count), 0);
  const estLiveStock    = totalStocked - totalMortality - totalHarvested;
  const todayMortality  = mortality.filter(r => r.recorded_date === new Date().toISOString().slice(0, 10)).reduce((s, r) => s + Number(r.count), 0);
  const latestWQ        = waterQuality[0];
  const latestFeed      = feedRecords[0];
  const mortalityOutbreak = mortality.filter(r => r.disease_outbreak).length;

  // pond options for modals
  const pondOptions = ponds.map(p => ({ value: p.id, label: p.name }));

  // ── section map ─────────────────────────────────────────────────────────
  const sections = [
    { key: 'stocking',     label: 'Stocking & Production', subtext: 'Fingerlings, growth, harvests', icon: Fish,         color: '#0ea5e9' },
    { key: 'water',        label: 'Water Quality',          subtext: 'DO, pH, temp, exchange',       icon: Droplets,     color: '#06b6d4' },
    { key: 'feeding',      label: 'Feeding & Inventory',    subtext: 'Daily feed, supplementary',    icon: Package,      color: '#f59e0b' },
    { key: 'health',       label: 'Health & Hygiene',       subtext: 'Mortality, observations',      icon: Heart,        color: '#ef4444' },
    { key: 'sales',        label: 'Sales Records',          subtext: 'Buyer details, quantities',    icon: ShoppingBag,  color: '#8b5cf6' },
    { key: 'finance',      label: 'Profit & Loss',          subtext: 'Expenses, revenue, P&L',       icon: DollarSign,   color: '#10b981' },
  ];

  // ── modal definitions ───────────────────────────────────────────────────
  const modalDefs = {
    stocking: {
      title: 'Log Stocking Report',
      fields: [
        { key: 'pond_id',          label: 'Pond',             type: 'select',  required: true, options: pondOptions },
        { key: 'stocked_at',       label: 'Date Stocked',     type: 'date',    required: true },
        { key: 'source',           label: 'Source / Hatchery',                 required: true },
        { key: 'species',          label: 'Species',          type: 'select',  required: true, options: [{value:'tilapia',label:'Tilapia'},{value:'catfish',label:'Catfish'},{value:'carp',label:'Carp'},{value:'other',label:'Other'}] },
        { key: 'fingerling_count', label: 'Fingerling Count', type: 'number',  required: true },
        { key: 'avg_weight_g',     label: 'Avg Weight (g)',   type: 'number' },
        { key: 'purchase_cost',    label: 'Purchase Cost (KSh)', type: 'number' },
        { key: 'notes',            label: 'Notes',            type: 'textarea' },
      ],
      submit: (form) => api.post('/fish/stocking', form).then(load),
    },
    mortality: {
      title: 'Record Mortality Count',
      fields: [
        { key: 'pond_id',          label: 'Pond',             type: 'select',  required: true, options: pondOptions },
        { key: 'recorded_date',    label: 'Date',             type: 'date',    required: true },
        { key: 'count',            label: 'Number of Deaths', type: 'number',  required: true },
        { key: 'species',          label: 'Species Affected' },
        { key: 'probable_cause',   label: 'Probable Cause (disease, oxygen, stress…)' },
        { key: 'disease_outbreak', label: 'Disease Outbreak?', type: 'select', options: [{value:'0',label:'No'},{value:'1',label:'Yes'}] },
        { key: 'notes',            label: 'Notes',            type: 'textarea' },
      ],
      submit: (form) => api.post('/fish/mortality', form).then(load),
    },
    growth: {
      title: 'Log Growth Sample',
      fields: [
        { key: 'pond_id',         label: 'Pond',              type: 'select', required: true, options: pondOptions },
        { key: 'sampled_at',      label: 'Sample Date',       type: 'date',   required: true },
        { key: 'sample_size',     label: 'Fish Sampled',      type: 'number', required: true },
        { key: 'avg_weight_g',    label: 'Avg Weight (g)',    type: 'number', required: true },
        { key: 'avg_length_cm',   label: 'Avg Length (cm)',   type: 'number' },
        { key: 'target_weight_g', label: 'Target Weight (g)', type: 'number' },
        { key: 'notes',           label: 'Notes',             type: 'textarea' },
      ],
      submit: (form) => api.post('/fish/growth', form).then(load),
    },
    harvest: {
      title: 'Log Harvest Report',
      fields: [
        { key: 'pond_id',          label: 'Pond',              type: 'select', required: true, options: pondOptions },
        { key: 'harvest_date',     label: 'Harvest Date',      type: 'date',   required: true },
        { key: 'species',          label: 'Species',           type: 'select', required: true, options: [{value:'tilapia',label:'Tilapia'},{value:'catfish',label:'Catfish'},{value:'carp',label:'Carp'},{value:'other',label:'Other'}] },
        { key: 'fish_count',       label: 'Fish Harvested',    type: 'number', required: true },
        { key: 'total_biomass_kg', label: 'Total Biomass (kg)', type: 'number', required: true },
        { key: 'avg_weight_kg',    label: 'Avg Weight (kg)',   type: 'number', required: true },
        { key: 'survival_rate',    label: 'Survival Rate (%)', type: 'number' },
        { key: 'notes',            label: 'Notes',             type: 'textarea' },
      ],
      submit: (form) => api.post('/fish/harvest', form).then(load),
    },
    waterQuality: {
      title: 'Log Water Quality Reading',
      fields: [
        { key: 'pond_id',          label: 'Pond',               type: 'select', required: true, options: pondOptions },
        { key: 'recorded_at',      label: 'Date & Time',        type: 'datetime-local', required: true },
        { key: 'dissolved_oxygen', label: 'Dissolved Oxygen (mg/L) — ideal 5-8', type: 'number' },
        { key: 'temperature_c',    label: 'Temperature (°C) — ideal 22-28',     type: 'number' },
        { key: 'ph_level',         label: 'pH Level — ideal 6.5-8.0',           type: 'number' },
        { key: 'ammonia',          label: 'Ammonia (mg/L) — ideal <0.1',        type: 'number' },
        { key: 'nitrite',          label: 'Nitrite (mg/L) — ideal <0.1',        type: 'number' },
        { key: 'turbidity',        label: 'Turbidity (NTU)',    type: 'number' },
        { key: 'notes',            label: 'Notes',              type: 'textarea' },
      ],
      submit: (form) => api.post('/fish/water-quality', form).then(load),
    },
    waterExchange: {
      title: 'Log Water Exchange / Treatment',
      fields: [
        { key: 'pond_id',           label: 'Pond',                type: 'select', required: true, options: pondOptions },
        { key: 'date',              label: 'Date',                type: 'date',   required: true },
        { key: 'volume_in_liters',  label: 'Water In (litres)',   type: 'number' },
        { key: 'volume_out_liters', label: 'Water Out (litres)',  type: 'number' },
        { key: 'treatment_applied', label: 'Treatment Applied (lime, salt, probiotics…)' },
        { key: 'treatment_quantity',label: 'Treatment Quantity',  type: 'number' },
        { key: 'treatment_unit',    label: 'Unit (kg, L, g)',     placeholder: 'kg' },
        { key: 'notes',             label: 'Notes',               type: 'textarea' },
      ],
      submit: (form) => api.post('/fish/water-exchange', form).then(load),
    },
    feed: {
      title: 'Log Feed Record',
      fields: [
        { key: 'pond_id',              label: 'Pond',                     type: 'select', required: true, options: pondOptions },
        { key: 'feed_date',            label: 'Date',                     type: 'date',   required: true },
        { key: 'feed_type',            label: 'Feed Type (floating pellets, sinking…)', required: true },
        { key: 'feed_size_mm',         label: 'Pellet Size (mm)',         type: 'number' },
        { key: 'quantity_kg',          label: 'Total Quantity Fed (kg)',  type: 'number', required: true },
        { key: 'feedings_per_day',     label: 'Feedings per Day',         type: 'number' },
        { key: 'supplementary_feed',   label: 'Supplementary Feed (Azolla / BSF larvae…)' },
        { key: 'supplementary_qty_kg', label: 'Supplementary Qty (kg)',  type: 'number' },
        { key: 'feed_cost',            label: 'Feed Cost (KSh)',          type: 'number' },
        { key: 'notes',                label: 'Notes',                    type: 'textarea' },
      ],
      submit: (form) => api.post('/fish/feed', form).then(load),
    },
    sale: {
      title: 'Log Sales Record',
      fields: [
        { key: 'pond_id',         label: 'Pond',               type: 'select', required: true, options: pondOptions },
        { key: 'sale_date',       label: 'Sale Date',          type: 'date',   required: true },
        { key: 'buyer_name',      label: 'Buyer Name',                         required: true },
        { key: 'buyer_contact',   label: 'Buyer Contact / Phone' },
        { key: 'species',         label: 'Species',            type: 'select', required: true, options: [{value:'tilapia',label:'Tilapia'},{value:'catfish',label:'Catfish'},{value:'carp',label:'Carp'},{value:'other',label:'Other'}] },
        { key: 'fish_count',      label: 'Number of Fish',     type: 'number' },
        { key: 'total_weight_kg', label: 'Total Weight (kg)',  type: 'number', required: true },
        { key: 'price_per_kg',    label: 'Price per kg (KSh)', type: 'number', required: true },
        { key: 'notes',           label: 'Notes',              type: 'textarea' },
      ],
      submit: (form) => api.post('/fish/sales', form).then(load),
    },
  };

  const bg = darkMode ? '#0F172A' : '#F1F5F9';
  const card = darkMode ? '#1E293B' : 'white';
  const border = darkMode ? 'rgba(255,255,255,0.08)' : '#e5e5e5';
  const text = darkMode ? 'text-white' : 'text-gray-800';
  const muted = darkMode ? 'text-white/50' : 'text-gray-500';

  return (
    <div className={`min-h-screen transition-colors duration-300`} style={{ background: bg }}>
      {/* NAV */}
      <nav className={`border-b px-8 py-4 flex items-center justify-between ${darkMode ? 'bg-[#0F2040] border-white/10' : 'bg-white border-gray-200'}`}>
        <div className="flex-1 flex items-center">
          {activeSection ? (
            <button onClick={() => setActiveSection(null)} className={`flex items-center gap-2 ${darkMode ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="relative">
              <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">{user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() ?? 'FI'}</span>
                </div>
                <div className="flex flex-col">
                  <span className={`text-sm font-medium ${text}`}>Welcome, {user?.name?.split(' ')[0] ?? 'Fish Manager'}</span>
                  <span className={`text-xs ${muted}`}>{user?.email}</span>
                </div>
              </button>
              {showProfileMenu && (
                <div className="absolute top-14 left-0 w-48 rounded-xl shadow-xl border z-50" style={{ background: card, borderColor: border }}>
                  <button onClick={handleLogout} className={`w-full flex items-center gap-3 px-4 py-3 text-sm ${text}`}><LogOut className="w-4 h-4" />Log Out</button>
                  <button onClick={() => navigate('/login')} className={`w-full flex items-center gap-3 px-4 py-3 text-sm ${text}`}><UserPlus className="w-4 h-4" />Switch Account</button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex-1 flex justify-center">
          <span className={`text-lg font-semibold ${text}`}>
            {activeSection ? sections.find(s => s.key === activeSection)?.label ?? activeSection : '🐟 Fish Farm Management'}
          </span>
        </div>
        <div className="flex-1 flex justify-end">
          <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-full ${darkMode ? 'bg-white/10' : 'bg-gray-100'}`}>
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-500" />}
          </button>
        </div>
      </nav>

      <main className="p-8">
        {/* ── HOME ─────────────────────────────────────────────────── */}
        {!activeSection && (
          <>
            {/* disease outbreak alert */}
            {mortalityOutbreak > 0 && (
              <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                <span className="text-sm text-red-300">{mortalityOutbreak} disease outbreak(s) recorded — check health section immediately.</span>
              </div>
            )}

            {/* KPI row */}
            <div className="grid grid-cols-5 gap-4 mb-8">
              {[
                { label: 'Estimated Live Stock', value: loading ? '…' : estLiveStock.toLocaleString(), color: 'text-blue-400' },
                { label: 'Total Stocked',         value: loading ? '…' : totalStocked.toLocaleString(), color: text },
                { label: 'Total Deaths',          value: loading ? '…' : totalMortality.toLocaleString(), color: 'text-red-400' },
                { label: "Today's Mortality",     value: loading ? '…' : todayMortality, color: todayMortality > 0 ? 'text-red-400' : 'text-green-400' },
                { label: 'Active Ponds',          value: loading ? '…' : ponds.length, color: 'text-cyan-400' },
              ].map((k, i) => (
                <div key={i} className="rounded-xl p-4 border" style={{ background: card, borderColor: border }}>
                  <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
                  <p className={`text-xs mt-1 ${muted}`}>{k.label}</p>
                </div>
              ))}
            </div>

            {/* section cards */}
            <div className="grid grid-cols-6 gap-4 mb-8">
              {sections.map(s => (
                <SectionCard key={s.key} icon={s.icon} label={s.label} subtext={s.subtext} color={s.color} onClick={() => setActiveSection(s.key)} />
              ))}
            </div>

            {/* summary cards */}
            <div className="grid grid-cols-3 gap-6">
              {/* Latest water quality */}
              <div className="rounded-2xl p-5 border" style={{ background: card, borderColor: border }}>
                <h3 className={`text-sm font-semibold mb-4 ${text}`}>Latest Water Quality</h3>
                {!latestWQ ? (
                  <p className={`text-xs ${muted}`}>No readings yet. Log one in Water Quality.</p>
                ) : (
                  <div className="space-y-2">
                    <p className={`text-xs ${muted}`}>{new Date(latestWQ.recorded_at).toLocaleString()} — {latestWQ.pond?.name}</p>
                    {[
                      { label: 'DO', value: latestWQ.dissolved_oxygen, unit: 'mg/L', key: 'dissolved_oxygen' },
                      { label: 'Temp', value: latestWQ.temperature_c, unit: '°C', key: 'temperature_c' },
                      { label: 'pH', value: latestWQ.ph_level, unit: '', key: 'ph_level' },
                      { label: 'Ammonia', value: latestWQ.ammonia, unit: 'mg/L', key: 'ammonia' },
                    ].map(p => (
                      <div key={p.key} className="flex items-center justify-between">
                        <span className={`text-xs ${muted}`}>{p.label}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium ${text}`}>{fmt(p.value, 2)} {p.unit}</span>
                          <Badge status={wqStatus(p.key, p.value)} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Today's feeding */}
              <div className="rounded-2xl p-5 border" style={{ background: card, borderColor: border }}>
                <h3 className={`text-sm font-semibold mb-4 ${text}`}>Latest Feed Record</h3>
                {!latestFeed ? (
                  <p className={`text-xs ${muted}`}>No feed records yet. Log one in Feeding.</p>
                ) : (
                  <div className="space-y-2">
                    <p className={`text-xs ${muted}`}>{latestFeed.feed_date} — {latestFeed.pond?.name}</p>
                    <div className="flex justify-between"><span className={`text-xs ${muted}`}>Feed Type</span><span className={`text-sm ${text}`}>{latestFeed.feed_type}</span></div>
                    <div className="flex justify-between"><span className={`text-xs ${muted}`}>Quantity</span><span className={`text-sm font-bold ${text}`}>{fmt(latestFeed.quantity_kg, 1)} kg</span></div>
                    <div className="flex justify-between"><span className={`text-xs ${muted}`}>Feedings/day</span><span className={`text-sm ${text}`}>{latestFeed.feedings_per_day}x</span></div>
                    {latestFeed.supplementary_feed && (
                      <div className="flex justify-between"><span className={`text-xs ${muted}`}>Supplement</span><span className={`text-xs text-cyan-400`}>{latestFeed.supplementary_feed} ({fmt(latestFeed.supplementary_qty_kg, 1)} kg)</span></div>
                    )}
                  </div>
                )}
              </div>

              {/* P&L snapshot */}
              <div className="rounded-2xl p-5 border" style={{ background: card, borderColor: border }}>
                <h3 className={`text-sm font-semibold mb-4 ${text}`}>Financial Snapshot</h3>
                {!plSummary ? (
                  <p className={`text-xs ${muted}`}>No financial data yet.</p>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between"><span className={`text-xs ${muted}`}>Revenue</span><span className="text-sm font-bold text-green-400">{fmtKsh(plSummary.total_revenue)}</span></div>
                    <div className="flex justify-between"><span className={`text-xs ${muted}`}>Feed Costs</span><span className="text-sm text-red-400">{fmtKsh(plSummary.feed_costs)}</span></div>
                    <div className="flex justify-between"><span className={`text-xs ${muted}`}>Stocking Costs</span><span className="text-sm text-red-400">{fmtKsh(plSummary.stocking_costs)}</span></div>
                    <div className="border-t pt-2 mt-2 flex justify-between" style={{ borderColor: border }}>
                      <span className={`text-xs font-medium ${text}`}>Net Profit</span>
                      <span className={`text-sm font-bold ${plSummary.net_profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>{fmtKsh(plSummary.net_profit)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* ── STOCKING & PRODUCTION ────────────────────────────────── */}
        {activeSection === 'stocking' && (
          <>
            <div className="flex gap-3 mb-6">
              <button onClick={() => setModal('stocking')} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-blue-500 text-white hover:bg-blue-600"><Plus className="w-4 h-4" />Log Stocking</button>
              <button onClick={() => setModal('growth')} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-cyan-500 text-white hover:bg-cyan-600"><Plus className="w-4 h-4" />Log Growth Sample</button>
              <button onClick={() => setModal('harvest')} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-green-500 text-white hover:bg-green-600"><Plus className="w-4 h-4" />Log Harvest</button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Stocking records */}
              <div className="rounded-2xl p-5 border" style={{ background: card, borderColor: border }}>
                <h3 className={`text-base font-semibold mb-4 ${text}`}>Stocking Reports</h3>
                {stocking.length === 0 ? <p className={`text-sm ${muted}`}>No stocking records yet.</p> : (
                  <div className="space-y-3 max-h-72 overflow-y-auto">
                    {stocking.map(r => (
                      <div key={r.id} className="p-3 rounded-lg border" style={{ borderColor: border, background: darkMode ? 'rgba(255,255,255,0.03)' : '#f9fafb' }}>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className={`text-sm font-medium ${text}`}>{r.species} — {r.pond?.name}</p>
                            <p className={`text-xs ${muted}`}>{r.stocked_at} · Source: {r.source}</p>
                          </div>
                          <p className={`text-sm font-bold text-blue-400`}>{Number(r.fingerling_count).toLocaleString()} fry</p>
                        </div>
                        {r.avg_weight_g && <p className={`text-xs mt-1 ${muted}`}>Avg weight: {r.avg_weight_g} g · Cost: {fmtKsh(r.purchase_cost)}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Growth samples */}
              <div className="rounded-2xl p-5 border" style={{ background: card, borderColor: border }}>
                <h3 className={`text-base font-semibold mb-4 ${text}`}>Growth Monitoring</h3>
                {growth.length === 0 ? <p className={`text-sm ${muted}`}>No growth samples yet.</p> : (
                  <>
                    <div className="h-44 mb-3">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[...growth].reverse().slice(-10)}>
                          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.08)' : '#e5e5e5'} />
                          <XAxis dataKey="sampled_at" stroke="#666" fontSize={10} />
                          <YAxis stroke="#666" fontSize={10} unit="g" />
                          <Tooltip contentStyle={{ background: card, borderRadius: 8, borderColor: border }} formatter={v => [`${v}g`, 'Avg Weight']} />
                          <Line type="monotone" dataKey="avg_weight_g" stroke="#06b6d4" strokeWidth={2} dot={false} />
                          {growth[0]?.target_weight_g && (
                            <Line type="monotone" dataKey="target_weight_g" stroke="#f59e0b" strokeWidth={1} strokeDasharray="4 4" dot={false} />
                          )}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-1">
                      {growth.slice(0, 4).map(r => (
                        <div key={r.id} className="flex justify-between text-xs">
                          <span className={muted}>{r.sampled_at} · {r.pond?.name}</span>
                          <span className={text}>{fmt(r.avg_weight_g, 1)}g avg · {r.sample_size} fish sampled</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Harvest records */}
            <div className="rounded-2xl p-5 border" style={{ background: card, borderColor: border }}>
              <h3 className={`text-base font-semibold mb-4 ${text}`}>Harvest Reports</h3>
              {harvests.length === 0 ? <p className={`text-sm ${muted}`}>No harvest records yet.</p> : (
                <table className="w-full">
                  <thead>
                    <tr className={`border-b text-xs font-medium ${muted}`} style={{ borderColor: border }}>
                      {['Date','Pond','Species','Fish Count','Total Biomass','Avg Weight','Survival Rate'].map(h => (
                        <th key={h} className="text-left py-2 px-2">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {harvests.map(r => (
                      <tr key={r.id} className={`border-b text-sm`} style={{ borderColor: border }}>
                        <td className={`py-2 px-2 ${muted}`}>{r.harvest_date}</td>
                        <td className={`py-2 px-2 ${text}`}>{r.pond?.name}</td>
                        <td className={`py-2 px-2 ${text} capitalize`}>{r.species}</td>
                        <td className={`py-2 px-2 ${text}`}>{Number(r.fish_count).toLocaleString()}</td>
                        <td className={`py-2 px-2 font-bold text-green-400`}>{fmt(r.total_biomass_kg, 1)} kg</td>
                        <td className={`py-2 px-2 ${text}`}>{fmt(r.avg_weight_kg, 3)} kg</td>
                        <td className="py-2 px-2">
                          {r.survival_rate ? <Badge status={r.survival_rate >= 80 ? 'good' : r.survival_rate >= 60 ? 'warning' : 'danger'} /> : '—'}
                          {r.survival_rate && <span className={`text-xs ml-1 ${muted}`}>{fmt(r.survival_rate, 1)}%</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* ── WATER QUALITY ────────────────────────────────────────── */}
        {activeSection === 'water' && (
          <>
            <div className="flex gap-3 mb-6">
              <button onClick={() => setModal('waterQuality')} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-cyan-500 text-white hover:bg-cyan-600"><Plus className="w-4 h-4" />Log Water Parameters</button>
              <button onClick={() => setModal('waterExchange')} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-blue-500 text-white hover:bg-blue-600"><Plus className="w-4 h-4" />Log Water Exchange</button>
            </div>

            {/* Latest reading status cards */}
            {latestWQ && (
              <div className="grid grid-cols-5 gap-4 mb-6">
                {[
                  { label: 'Dissolved O₂', value: latestWQ.dissolved_oxygen, unit: 'mg/L', key: 'dissolved_oxygen', ideal: '5.0–8.0' },
                  { label: 'Temperature',  value: latestWQ.temperature_c,    unit: '°C',   key: 'temperature_c',    ideal: '22–28°C' },
                  { label: 'pH Level',     value: latestWQ.ph_level,         unit: '',     key: 'ph_level',         ideal: '6.5–8.0' },
                  { label: 'Ammonia',      value: latestWQ.ammonia,          unit: 'mg/L', key: 'ammonia',          ideal: '<0.1' },
                  { label: 'Nitrite',      value: latestWQ.nitrite,          unit: 'mg/L', key: 'nitrite',          ideal: '<0.1' },
                ].map(p => {
                  const status = wqStatus(p.key, p.value);
                  const colMap = { good: '#22c55e', warning: '#f59e0b', danger: '#ef4444' };
                  return (
                    <div key={p.key} className="rounded-xl p-4 border" style={{ background: card, borderColor: border }}>
                      <p className={`text-xs ${muted} mb-1`}>{p.label}</p>
                      <p className="text-xl font-bold" style={{ color: colMap[status] }}>{fmt(p.value, 2)} {p.unit}</p>
                      <p className={`text-xs mt-1 ${muted}`}>Ideal: {p.ideal}</p>
                      <Badge status={status} />
                    </div>
                  );
                })}
              </div>
            )}

            {/* Water quality history */}
            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-2xl p-5 border" style={{ background: card, borderColor: border }}>
                <h3 className={`text-sm font-semibold mb-4 ${text}`}>Daily Readings History</h3>
                {waterQuality.length === 0 ? <p className={`text-sm ${muted}`}>No readings logged yet.</p> : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className={`border-b ${muted}`} style={{ borderColor: border }}>
                          {['Date / Time','Pond','DO','Temp','pH','Ammonia','Status'].map(h => (
                            <th key={h} className="text-left py-2 px-1 font-medium">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {waterQuality.slice(0, 15).map(r => {
                          const s = wqStatus('dissolved_oxygen', r.dissolved_oxygen);
                          return (
                            <tr key={r.id} className={`border-b`} style={{ borderColor: border }}>
                              <td className={`py-2 px-1 ${muted}`}>{new Date(r.recorded_at).toLocaleDateString()}</td>
                              <td className={`py-2 px-1 ${text}`}>{r.pond?.name ?? '—'}</td>
                              <td className={`py-2 px-1 ${text}`}>{fmt(r.dissolved_oxygen, 1)}</td>
                              <td className={`py-2 px-1 ${text}`}>{fmt(r.temperature_c, 1)}°</td>
                              <td className={`py-2 px-1 ${text}`}>{fmt(r.ph_level, 1)}</td>
                              <td className={`py-2 px-1 ${text}`}>{fmt(r.ammonia, 3)}</td>
                              <td className="py-2 px-1"><Badge status={s} /></td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Water exchange */}
              <div className="rounded-2xl p-5 border" style={{ background: card, borderColor: border }}>
                <h3 className={`text-sm font-semibold mb-4 ${text}`}>Water Exchange & Treatment Log</h3>
                {waterExchange.length === 0 ? <p className={`text-sm ${muted}`}>No exchange records yet.</p> : (
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {waterExchange.map(r => (
                      <div key={r.id} className="p-3 rounded-lg border text-sm" style={{ borderColor: border, background: darkMode ? 'rgba(255,255,255,0.03)' : '#f9fafb' }}>
                        <div className="flex justify-between mb-1">
                          <span className={`font-medium ${text}`}>{r.date} — {r.pond?.name}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1 text-xs">
                          {r.volume_in_liters  && <span className={muted}>In: {Number(r.volume_in_liters).toLocaleString()} L</span>}
                          {r.volume_out_liters && <span className={muted}>Out: {Number(r.volume_out_liters).toLocaleString()} L</span>}
                          {r.treatment_applied && <span className="text-cyan-400 col-span-2">Treatment: {r.treatment_applied} {r.treatment_quantity && `(${r.treatment_quantity} ${r.treatment_unit ?? ''})`}</span>}
                        </div>
                        {r.notes && <p className={`text-xs mt-1 ${muted}`}>{r.notes}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* ── FEEDING & INVENTORY ──────────────────────────────────── */}
        {activeSection === 'feeding' && (
          <>
            <div className="flex gap-3 mb-6">
              <button onClick={() => setModal('feed')} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-yellow-500 text-white hover:bg-yellow-600"><Plus className="w-4 h-4" />Log Feed Record</button>
            </div>

            {/* weekly feed chart */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="rounded-2xl p-5 border" style={{ background: card, borderColor: border }}>
                <h3 className={`text-sm font-semibold mb-4 ${text}`}>Weekly Feed Consumption (kg)</h3>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={feedRecords.slice(0, 7).map(r => ({ date: r.feed_date?.slice(5), qty: Number(r.quantity_kg) }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.08)' : '#e5e5e5'} />
                      <XAxis dataKey="date" stroke="#666" fontSize={11} />
                      <YAxis stroke="#666" fontSize={11} />
                      <Tooltip contentStyle={{ background: card, borderRadius: 8, borderColor: border }} />
                      <Bar dataKey="qty" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-2xl p-5 border" style={{ background: card, borderColor: border }}>
                <h3 className={`text-sm font-semibold mb-4 ${text}`}>Feed Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between"><span className={`text-sm ${muted}`}>Total Feed Used</span><span className={`text-sm font-bold ${text}`}>{fmt(feedRecords.reduce((s, r) => s + Number(r.quantity_kg), 0), 1)} kg</span></div>
                  <div className="flex justify-between"><span className={`text-sm ${muted}`}>Total Feed Cost</span><span className="text-sm font-bold text-red-400">{fmtKsh(feedRecords.reduce((s, r) => s + Number(r.feed_cost ?? 0), 0))}</span></div>
                  <div className="flex justify-between"><span className={`text-sm ${muted}`}>Feed Records</span><span className={`text-sm ${text}`}>{feedRecords.length}</span></div>
                  <div className="border-t pt-3 mt-2" style={{ borderColor: border }}>
                    <p className={`text-xs font-medium mb-2 ${text}`}>Supplementary Feeds Used</p>
                    {Array.from(new Set(feedRecords.filter(r => r.supplementary_feed).map(r => r.supplementary_feed))).length === 0
                      ? <p className={`text-xs ${muted}`}>None recorded</p>
                      : Array.from(new Set(feedRecords.filter(r => r.supplementary_feed).map(r => r.supplementary_feed))).map(sf => (
                        <div key={sf} className="flex justify-between text-xs"><span className={muted}>{sf}</span>
                          <span className="text-cyan-400">{fmt(feedRecords.filter(r => r.supplementary_feed === sf).reduce((s, r) => s + Number(r.supplementary_qty_kg ?? 0), 0), 1)} kg total</span>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* feed log table */}
            <div className="rounded-2xl p-5 border" style={{ background: card, borderColor: border }}>
              <h3 className={`text-sm font-semibold mb-4 ${text}`}>Feed Records Log</h3>
              {feedRecords.length === 0 ? <p className={`text-sm ${muted}`}>No feed records yet.</p> : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className={`border-b text-xs font-medium ${muted}`} style={{ borderColor: border }}>
                        {['Date','Pond','Feed Type','Size (mm)','Qty (kg)','Times/day','Supplement','Cost'].map(h => (
                          <th key={h} className="text-left py-2 px-2">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {feedRecords.map(r => (
                        <tr key={r.id} className={`border-b`} style={{ borderColor: border }}>
                          <td className={`py-2 px-2 ${muted}`}>{r.feed_date}</td>
                          <td className={`py-2 px-2 ${text}`}>{r.pond?.name}</td>
                          <td className={`py-2 px-2 ${text}`}>{r.feed_type}</td>
                          <td className={`py-2 px-2 ${muted}`}>{r.feed_size_mm ?? '—'}</td>
                          <td className={`py-2 px-2 font-bold ${text}`}>{fmt(r.quantity_kg, 1)}</td>
                          <td className={`py-2 px-2 ${text}`}>{r.feedings_per_day}x</td>
                          <td className={`py-2 px-2 text-cyan-400 text-xs`}>{r.supplementary_feed ?? '—'}</td>
                          <td className={`py-2 px-2 ${text}`}>{r.feed_cost ? fmtKsh(r.feed_cost) : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {/* ── HEALTH & HYGIENE ─────────────────────────────────────── */}
        {activeSection === 'health' && (
          <>
            <div className="flex gap-3 mb-6">
              <button onClick={() => setModal('mortality')} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-red-500 text-white hover:bg-red-600"><Plus className="w-4 h-4" />Record Mortality</button>
            </div>

            {/* outbreak alert */}
            {mortalityOutbreak > 0 && (
              <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                <span className="text-sm text-red-300">{mortalityOutbreak} disease outbreak(s) on record. Immediate action required.</span>
              </div>
            )}

            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Total Deaths Recorded', value: totalMortality, color: 'text-red-400' },
                { label: "Today's Deaths",         value: todayMortality, color: todayMortality > 0 ? 'text-red-400' : 'text-green-400' },
                { label: 'Disease Outbreaks',      value: mortalityOutbreak, color: mortalityOutbreak > 0 ? 'text-red-400' : 'text-green-400' },
                { label: 'Mortality Records',      value: mortality.length, color: text },
              ].map((k, i) => (
                <div key={i} className="rounded-xl p-4 border" style={{ background: card, borderColor: border }}>
                  <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
                  <p className={`text-xs mt-1 ${muted}`}>{k.label}</p>
                </div>
              ))}
            </div>

            {/* mortality log */}
            <div className="rounded-2xl p-5 border" style={{ background: card, borderColor: border }}>
              <h3 className={`text-sm font-semibold mb-4 ${text}`}>Mortality Records — Daily Count</h3>
              {mortality.length === 0 ? <p className={`text-sm ${muted}`}>No mortality records yet.</p> : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`border-b text-xs font-medium ${muted}`} style={{ borderColor: border }}>
                      {['Date','Pond','Deaths','Species','Probable Cause','Outbreak','Notes'].map(h => (
                        <th key={h} className="text-left py-2 px-2">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mortality.map(r => (
                      <tr key={r.id} className={`border-b`} style={{ borderColor: border }}>
                        <td className={`py-2 px-2 ${muted}`}>{r.recorded_date}</td>
                        <td className={`py-2 px-2 ${text}`}>{r.pond?.name}</td>
                        <td className={`py-2 px-2 font-bold text-red-400`}>{r.count}</td>
                        <td className={`py-2 px-2 ${text} capitalize`}>{r.species ?? '—'}</td>
                        <td className={`py-2 px-2 ${text}`}>{r.probable_cause ?? '—'}</td>
                        <td className="py-2 px-2">
                          {r.disease_outbreak ? <span className="px-2 py-0.5 rounded-full text-xs bg-red-500/20 text-red-400">YES</span> : <span className={`text-xs ${muted}`}>No</span>}
                        </td>
                        <td className={`py-2 px-2 text-xs ${muted} max-w-xs truncate`}>{r.notes ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* ── SALES RECORDS ────────────────────────────────────────── */}
        {activeSection === 'sales' && (
          <>
            <div className="flex gap-3 mb-6">
              <button onClick={() => setModal('sale')} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-purple-500 text-white hover:bg-purple-600"><Plus className="w-4 h-4" />Log Sale</button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Total Revenue',    value: fmtKsh(sales.reduce((s, r) => s + Number(r.total_amount ?? 0), 0)), color: 'text-green-400' },
                { label: 'Total Sold (kg)',  value: `${fmt(sales.reduce((s, r) => s + Number(r.total_weight_kg), 0), 1)} kg`, color: text },
                { label: 'Number of Sales',  value: sales.length, color: text },
              ].map((k, i) => (
                <div key={i} className="rounded-xl p-5 border" style={{ background: card, borderColor: border }}>
                  <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
                  <p className={`text-sm mt-1 ${muted}`}>{k.label}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl p-5 border" style={{ background: card, borderColor: border }}>
              <h3 className={`text-sm font-semibold mb-4 ${text}`}>Sales Records</h3>
              {sales.length === 0 ? <p className={`text-sm ${muted}`}>No sales recorded yet.</p> : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`border-b text-xs font-medium ${muted}`} style={{ borderColor: border }}>
                      {['Date','Buyer','Contact','Species','Fish','Weight (kg)','Price/kg','Total','Pond'].map(h => (
                        <th key={h} className="text-left py-2 px-2">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sales.map(r => (
                      <tr key={r.id} className={`border-b`} style={{ borderColor: border }}>
                        <td className={`py-2 px-2 ${muted}`}>{r.sale_date}</td>
                        <td className={`py-2 px-2 font-medium ${text}`}>{r.buyer_name}</td>
                        <td className={`py-2 px-2 ${muted}`}>{r.buyer_contact ?? '—'}</td>
                        <td className={`py-2 px-2 ${text} capitalize`}>{r.species}</td>
                        <td className={`py-2 px-2 ${text}`}>{r.fish_count ? Number(r.fish_count).toLocaleString() : '—'}</td>
                        <td className={`py-2 px-2 ${text}`}>{fmt(r.total_weight_kg, 1)}</td>
                        <td className={`py-2 px-2 ${text}`}>{fmtKsh(r.price_per_kg)}</td>
                        <td className={`py-2 px-2 font-bold text-green-400`}>{fmtKsh(r.total_amount)}</td>
                        <td className={`py-2 px-2 ${muted}`}>{r.pond?.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* ── PROFIT & LOSS ────────────────────────────────────────── */}
        {activeSection === 'finance' && (
          <>
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Total Revenue',    value: fmtKsh(plSummary?.total_revenue),  color: 'text-green-400' },
                { label: 'Feed Costs',       value: fmtKsh(plSummary?.feed_costs),     color: 'text-red-400' },
                { label: 'Stocking Costs',   value: fmtKsh(plSummary?.stocking_costs), color: 'text-red-400' },
                { label: 'Net Profit / Loss',value: fmtKsh(plSummary?.net_profit),     color: plSummary?.net_profit >= 0 ? 'text-green-400' : 'text-red-400' },
              ].map((k, i) => (
                <div key={i} className="rounded-xl p-5 border" style={{ background: card, borderColor: border }}>
                  <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
                  <p className={`text-sm mt-1 ${muted}`}>{k.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-2xl p-5 border" style={{ background: card, borderColor: border }}>
                <h3 className={`text-sm font-semibold mb-4 ${text}`}>Revenue from Sales</h3>
                {sales.length === 0 ? <p className={`text-sm ${muted}`}>No sales yet.</p> : (
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sales.slice(0, 10).map(r => ({ date: r.sale_date?.slice(5), revenue: Number(r.total_amount ?? 0) }))}>
                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.08)' : '#e5e5e5'} />
                        <XAxis dataKey="date" stroke="#666" fontSize={10} />
                        <YAxis stroke="#666" fontSize={10} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
                        <Tooltip contentStyle={{ background: card, borderRadius: 8 }} formatter={v => [fmtKsh(v), 'Revenue']} />
                        <Bar dataKey="revenue" fill="#10b981" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              <div className="rounded-2xl p-5 border" style={{ background: card, borderColor: border }}>
                <h3 className={`text-sm font-semibold mb-4 ${text}`}>Cost Breakdown</h3>
                <div className="space-y-4 mt-4">
                  {[
                    { label: 'Feed Costs',     value: plSummary?.feed_costs ?? 0,     color: '#f59e0b' },
                    { label: 'Stocking Costs', value: plSummary?.stocking_costs ?? 0, color: '#0ea5e9' },
                  ].map(item => {
                    const total = (plSummary?.total_expenses ?? 1);
                    const pct = total > 0 ? Math.round((item.value / total) * 100) : 0;
                    return (
                      <div key={item.label}>
                        <div className="flex justify-between mb-1">
                          <span className={`text-sm ${text}`}>{item.label}</span>
                          <span className={`text-sm font-bold ${text}`}>{fmtKsh(item.value)}</span>
                        </div>
                        <div className="h-2 rounded-full" style={{ background: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}>
                          <div className="h-2 rounded-full" style={{ width: `${pct}%`, background: item.color }} />
                        </div>
                      </div>
                    );
                  })}
                  <div className="border-t pt-4 mt-2" style={{ borderColor: border }}>
                    <div className="flex justify-between">
                      <span className={`text-sm font-medium ${text}`}>Total Expenses</span>
                      <span className="text-sm font-bold text-red-400">{fmtKsh(plSummary?.total_expenses)}</span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className={`text-base font-semibold ${text}`}>Net Profit</span>
                      <span className={`text-base font-bold ${plSummary?.net_profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>{fmtKsh(plSummary?.net_profit)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* ── MODAL ─────────────────────────────────────────────────── */}
      {modal && modalDefs[modal] && (
        <LogModal
          key={modal}
          title={modalDefs[modal].title}
          fields={modalDefs[modal].fields}
          onSubmit={modalDefs[modal].submit}
          onClose={() => setModal(null)}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}
