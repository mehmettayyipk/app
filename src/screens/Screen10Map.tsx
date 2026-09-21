import React, { useState } from 'react';
import {
  Search,
  Crosshair,
  Plus,
  AlertTriangle,
  Flame,
  Truck,
  ShieldAlert,
  Car,
  X,
  Check,
  MapPin,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { HazardPoint, HazardCategory, ScreenId } from '../types';
import { INITIAL_HAZARDS } from '../data/mockData';
import { BottomNav } from '../components/BottomNav';

interface Screen10MapProps {
  onNavigate: (screen: ScreenId) => void;
  selectedHazard?: HazardPoint | null;
  onSelectHazard?: (hazard: HazardPoint | null) => void;
}

export const Screen10Map: React.FC<Screen10MapProps> = ({
  onNavigate,
  selectedHazard: externalSelectedHazard,
  onSelectHazard: externalOnSelectHazard,
}) => {
  const [hazards, setHazards] = useState<HazardPoint[]>(INITIAL_HAZARDS);
  const [internalSelectedHazard, setInternalSelectedHazard] = useState<HazardPoint | null>(
    INITIAL_HAZARDS[0]
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | HazardCategory>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<HazardCategory>('kaza');
  const [banner, setBanner] = useState('');

  const currentSelectedHazard =
    externalSelectedHazard !== undefined ? externalSelectedHazard : internalSelectedHazard;

  const setSelectedHazard = (hz: HazardPoint | null) => {
    if (externalOnSelectHazard) externalOnSelectHazard(hz);
    setInternalSelectedHazard(hz);
  };

  const filteredHazards = hazards.filter((hz) => {
    const matchesCategory = activeFilter === 'all' || hz.category === activeFilter;
    const matchesSearch =
      hz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hz.locationName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleVerify = (id: string) => {
    setHazards((prev) =>
      prev.map((h) => (h.id === id ? { ...h, verifiedCount: h.verifiedCount + 1 } : h))
    );
    setBanner('İhbar teyit edildi.');
    setTimeout(() => setBanner(''), 2500);
  };

  const handleResolved = (id: string) => {
    setHazards((prev) => prev.filter((h) => h.id !== id));
    setSelectedHazard(null);
    setBanner('İhbar kaldırıldı.');
    setTimeout(() => setBanner(''), 2500);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const item: HazardPoint = {
      id: `hz-${Date.now()}`,
      category: newCategory,
      title: newTitle,
      description: 'Sürücü tarafından haritada anlık bildirildi.',
      locationName: 'Kadıköy / E-5 Çıkışı',
      coordinates: { x: 55, y: 48 },
      reporterName: 'Furkan Güler',
      reporterBadge: 'Onaylı Sürücü',
      reportedAt: 'Şimdi',
      timeAgo: 'Şimdi',
      distance: '0.1 km',
      verifiedCount: 1,
    };
    setHazards([item, ...hazards]);
    setSelectedHazard(item);
    setShowAddModal(false);
    setNewTitle('');
    setBanner('Yeni ihbar haritaya işlendi.');
    setTimeout(() => setBanner(''), 2500);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-neutral-100 dark:bg-[#0c0d12] text-neutral-900 dark:text-neutral-100 overflow-hidden font-sans transition-colors relative">
      {/* Top Floating Search & Filter Pill Container */}
      <div className="absolute top-3 left-3 right-3 z-20 space-y-2 pointer-events-auto">
        <div className="flex items-center gap-2 bg-white/95 dark:bg-[#151720]/95 backdrop-blur-xl p-1.5 rounded-2xl ring-1 ring-black/[0.08] dark:ring-white/[0.1] shadow-sm">
          <Search className="w-4 h-4 ml-2.5 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Bölge veya ihbar ara..."
            className="w-full bg-transparent py-1.5 px-2 text-xs font-semibold text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 mr-1 text-neutral-400 hover:text-neutral-900"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition shadow-xs ${
              activeFilter === 'all'
                ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950'
                : 'bg-white/90 dark:bg-[#151720]/90 backdrop-blur-md text-neutral-600 dark:text-neutral-400 ring-1 ring-black/[0.06] dark:ring-white/[0.08]'
            }`}
          >
            Tümü ({hazards.length})
          </button>
          <button
            onClick={() => setActiveFilter('kaza')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition shadow-xs ${
              activeFilter === 'kaza'
                ? 'bg-rose-600 text-white'
                : 'bg-white/90 dark:bg-[#151720]/90 backdrop-blur-md text-neutral-600 dark:text-neutral-400 ring-1 ring-black/[0.06] dark:ring-white/[0.08]'
            }`}
          >
            Kaza
          </button>
          <button
            onClick={() => setActiveFilter('yol_calismasi')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition shadow-xs ${
              activeFilter === 'yol_calismasi'
                ? 'bg-amber-600 text-white'
                : 'bg-white/90 dark:bg-[#151720]/90 backdrop-blur-md text-neutral-600 dark:text-neutral-400 ring-1 ring-black/[0.06] dark:ring-white/[0.08]'
            }`}
          >
            Yol Çalışması
          </button>
          <button
            onClick={() => setActiveFilter('trafik_yogunlugu')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition shadow-xs ${
              activeFilter === 'trafik_yogunlugu'
                ? 'bg-orange-600 text-white'
                : 'bg-white/90 dark:bg-[#151720]/90 backdrop-blur-md text-neutral-600 dark:text-neutral-400 ring-1 ring-black/[0.06] dark:ring-white/[0.08]'
            }`}
          >
            Yoğunluk
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {banner && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30 bg-neutral-900/90 dark:bg-white/90 text-white dark:text-neutral-900 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold shadow-lg animate-fade-in flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5" />
          <span>{banner}</span>
        </div>
      )}

      {/* Minimalist Interactive Map Surface */}
      <div className="relative flex-1 w-full h-full bg-[#e8ecf2] dark:bg-[#11131a] overflow-hidden select-none">
        {/* Subtle Map SVG Graphics (Road network, Bosphorus curve, Bridges) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-80 dark:opacity-60"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Waterway (Istanbul Strait) */}
          <path
            d="M 120 -50 C 130 150, 190 280, 240 450 C 270 550, 290 700, 310 900"
            fill="none"
            stroke="currentColor"
            className="text-sky-200 dark:text-[#182030]"
            strokeWidth="54"
          />

          {/* Highways: E-5 & TEM */}
          <path
            d="M -50 240 Q 180 260, 450 310"
            fill="none"
            stroke="currentColor"
            className="text-neutral-300 dark:text-neutral-800"
            strokeWidth="10"
          />
          <path
            d="M -50 480 Q 200 460, 450 510"
            fill="none"
            stroke="currentColor"
            className="text-neutral-300 dark:text-neutral-800"
            strokeWidth="8"
          />
          <path
            d="M 60 -50 L 80 900"
            fill="none"
            stroke="currentColor"
            className="text-neutral-200 dark:text-neutral-850"
            strokeWidth="4"
          />
          <path
            d="M 330 -50 L 350 900"
            fill="none"
            stroke="currentColor"
            className="text-neutral-200 dark:text-neutral-850"
            strokeWidth="4"
          />

          {/* 15 Temmuz Bridge & FSM Bridge */}
          <line
            x1="180"
            y1="260"
            x2="225"
            y2="265"
            stroke="currentColor"
            className="text-amber-500/80"
            strokeWidth="6"
            strokeDasharray="2 2"
          />
          <line
            x1="225"
            y1="465"
            x2="265"
            y2="470"
            stroke="currentColor"
            className="text-amber-500/80"
            strokeWidth="6"
            strokeDasharray="2 2"
          />
        </svg>

        {/* Current Driver Position with Minimal Radar Pulse */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ left: '60%', top: '56%' }}
        >
          <div className="relative flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 animate-ping" />
            <div className="absolute w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-neutral-900 shadow-md" />
          </div>
        </div>

        {/* Hazard Markers */}
        {filteredHazards.map((hz) => {
          const isSelected = currentSelectedHazard?.id === hz.id;
          return (
            <button
              key={hz.id}
              onClick={() => setSelectedHazard(hz)}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:scale-110 active:scale-95 group focus:outline-none"
              style={{ left: `${hz.coordinates.x}%`, top: `${hz.coordinates.y}%` }}
            >
              <div
                className={`p-2 rounded-2xl flex items-center justify-center shadow-lg transition-all ${
                  isSelected
                    ? 'ring-4 ring-neutral-950 dark:ring-white scale-110'
                    : 'ring-1 ring-black/10'
                } ${
                  hz.category === 'kaza'
                    ? 'bg-rose-600 text-white'
                    : hz.category === 'yol_calismasi'
                    ? 'bg-amber-500 text-neutral-950'
                    : 'bg-orange-600 text-white'
                }`}
              >
                {hz.category === 'kaza' ? (
                  <Car className="w-4 h-4" />
                ) : hz.category === 'yol_calismasi' ? (
                  <Truck className="w-4 h-4" />
                ) : (
                  <Flame className="w-4 h-4" />
                )}
              </div>
            </button>
          );
        })}

        {/* Floating Action Controls on Map */}
        <div className="absolute right-3.5 bottom-32 z-20 flex flex-col gap-2.5">
          <button
            onClick={() => setShowAddModal(true)}
            className="w-11 h-11 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-950 flex items-center justify-center shadow-lg transition active:scale-95"
            title="İhbar Ekle"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            onClick={() => {
              setSelectedHazard(null);
              setBanner('Konumunuza odaklanıldı');
              setTimeout(() => setBanner(''), 2000);
            }}
            className="w-11 h-11 rounded-2xl bg-white dark:bg-[#151720] ring-1 ring-black/[0.08] dark:ring-white/[0.1] text-neutral-700 dark:text-neutral-300 flex items-center justify-center shadow-lg transition active:scale-95"
            title="Konumuma Git"
          >
            <Crosshair className="w-5 h-5" />
          </button>
        </div>

        {/* Minimal Bottom Sheet for Selected Hazard */}
        {currentSelectedHazard && (
          <div className="absolute left-3 right-3 bottom-2 z-20 bg-white/95 dark:bg-[#151720]/95 backdrop-blur-xl p-4 rounded-3xl ring-1 ring-black/[0.06] dark:ring-white/[0.08] shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                  {currentSelectedHazard.locationName} • {currentSelectedHazard.reportedAt}
                </span>
                <h3 className="text-sm font-bold text-neutral-950 dark:text-white mt-0.5">
                  {currentSelectedHazard.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-1">
                  {currentSelectedHazard.description}
                </p>
              </div>

              <button
                onClick={() => setSelectedHazard(null)}
                className="w-6 h-6 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-neutral-900"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-2">
              <button
                onClick={() => handleVerify(currentSelectedHazard.id)}
                className="flex-1 py-2 px-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95"
              >
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Hâlâ Orada ({currentSelectedHazard.verifiedCount})</span>
              </button>

              <button
                onClick={() => handleResolved(currentSelectedHazard.id)}
                className="py-2 px-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-semibold text-xs transition active:scale-95"
              >
                Kalktı
              </button>

              <button
                onClick={() => onNavigate('hazard_detail')}
                className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Minimal Add Hazard Modal */}
      {showAddModal && (
        <div className="absolute inset-0 z-40 bg-black/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-3">
          <form
            onSubmit={handleAddSubmit}
            className="w-full max-w-sm bg-white dark:bg-[#151720] rounded-3xl p-5 shadow-2xl ring-1 ring-black/[0.08] dark:ring-white/[0.1] space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-neutral-950 dark:text-white">
                Yeni İhbar Bildir
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="w-6 h-6 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                İhbar Başlığı
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Örn: E-5 Kozyatağı Çevirme"
                className="w-full p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none"
                autoFocus
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                Kategori
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'kaza', label: 'Kaza' },
                  { id: 'yol_calismasi', label: 'Çalışma' },
                  { id: 'trafik_yogunlugu', label: 'Yoğunluk' },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setNewCategory(c.id as HazardCategory)}
                    className={`py-2 text-xs font-bold rounded-xl transition ${
                      newCategory === c.id
                        ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-950 font-bold text-xs transition active:scale-[0.98]"
            >
              Haritada Paylaş
            </button>
          </form>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNav currentScreen="map" onSelectScreen={onNavigate} />
    </div>
  );
};
