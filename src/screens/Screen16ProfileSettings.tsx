import React, { useState } from 'react';
import {
  ShieldCheck,
  Camera,
  Car,
  Bell,
  Navigation,
  Lock,
  LogOut,
  ChevronRight,
  ArrowLeft,
  Check,
} from 'lucide-react';
import { ScreenId } from '../types';
import { BottomNav } from '../components/BottomNav';

interface Screen16ProfileSettingsProps {
  onNavigate: (screen: ScreenId) => void;
  onLogout: () => void;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=160&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=160&q=80',
];

export const Screen16ProfileSettings: React.FC<Screen16ProfileSettingsProps> = ({
  onNavigate,
  onLogout,
}) => {
  const [currentAvatar, setCurrentAvatar] = useState(PRESET_AVATARS[0]);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  // Settings Toggles
  const [radarAlerts, setRadarAlerts] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [directMessages, setDirectMessages] = useState(true);

  return (
    <div className="flex-1 flex flex-col justify-between bg-neutral-50 dark:bg-[#0e1017] text-neutral-900 dark:text-neutral-100 font-sans transition-colors overflow-hidden">
      {/* Top Header */}
      <header className="px-5 pt-3 pb-3 flex items-center justify-between shrink-0">
        <button
          onClick={() => onNavigate('home')}
          className="w-8 h-8 rounded-full bg-white dark:bg-[#181a24] ring-1 ring-black/5 dark:ring-white/10 flex items-center justify-center text-neutral-700 dark:text-neutral-300 transition"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="text-xs font-bold tracking-tight text-neutral-900 dark:text-white">
          Profil & Ayarlar
        </span>
        <div className="w-8" />
      </header>

      {/* Main Settings List */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
        {/* User Card */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#151720] ring-1 ring-black/[0.04] dark:ring-white/[0.06] flex items-center gap-4">
          <div className="relative">
            <img
              src={currentAvatar}
              alt="Furkan Güler"
              className="w-14 h-14 rounded-full object-cover ring-2 ring-black/5 dark:ring-white/10"
            />
            <button
              onClick={() => setShowAvatarPicker(!showAvatarPicker)}
              className="absolute -bottom-1 -right-1 p-1 rounded-full bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-sm"
            >
              <Camera className="w-3 h-3" />
            </button>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-extrabold text-sm text-neutral-950 dark:text-white truncate">
                Furkan Güler
              </h3>
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            </div>
            <p className="text-xs text-neutral-400">@furkan_surucu</p>
            <div className="mt-1 flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400">
              <Car className="w-3.5 h-3.5 text-neutral-400" />
              <span>34 SRA 102 • Egea Lounge</span>
            </div>
          </div>
        </div>

        {/* Avatar Picker Drawer */}
        {showAvatarPicker && (
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#151720] ring-1 ring-black/[0.04] dark:ring-white/[0.06] flex items-center justify-around">
            {PRESET_AVATARS.map((av, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentAvatar(av);
                  setShowAvatarPicker(false);
                }}
                className="relative rounded-full hover:scale-105 transition"
              >
                <img src={av} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
                {currentAvatar === av && (
                  <div className="absolute inset-0 rounded-full ring-2 ring-emerald-500 bg-emerald-500/20 flex items-center justify-center text-emerald-600">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Grouped Settings Section 1: Tercihler */}
        <div className="rounded-3xl bg-white dark:bg-[#151720] ring-1 ring-black/[0.04] dark:ring-white/[0.06] divide-y divide-neutral-100 dark:divide-neutral-800 overflow-hidden">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-neutral-900 dark:text-white block">
                  Radar & Çevirme Bildirimleri
                </span>
                <span className="text-[10px] text-neutral-400">Sesli ve anlık harita uyarıları</span>
              </div>
            </div>

            <button
              onClick={() => setRadarAlerts(!radarAlerts)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                radarAlerts ? 'bg-neutral-950 dark:bg-white' : 'bg-neutral-200 dark:bg-neutral-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full transition-transform ${
                  radarAlerts
                    ? 'translate-x-5 bg-white dark:bg-neutral-950'
                    : 'translate-x-0 bg-white dark:bg-neutral-400'
                }`}
              />
            </button>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300">
                <Navigation className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-neutral-900 dark:text-white block">
                  Canlı Bölge Paylaşımı
                </span>
                <span className="text-[10px] text-neutral-400">Sadece aynı ilçedeki şoförlere açık</span>
              </div>
            </div>

            <button
              onClick={() => setLocationSharing(!locationSharing)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                locationSharing ? 'bg-neutral-950 dark:bg-white' : 'bg-neutral-200 dark:bg-neutral-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full transition-transform ${
                  locationSharing
                    ? 'translate-x-5 bg-white dark:bg-neutral-950'
                    : 'translate-x-0 bg-white dark:bg-neutral-400'
                }`}
              />
            </button>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-neutral-900 dark:text-white block">
                  Birebir Mesajlaşma
                </span>
                <span className="text-[10px] text-neutral-400">Diğer onaylı sürücülerden mesaj al</span>
              </div>
            </div>

            <button
              onClick={() => setDirectMessages(!directMessages)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                directMessages ? 'bg-neutral-950 dark:bg-white' : 'bg-neutral-200 dark:bg-neutral-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full transition-transform ${
                  directMessages
                    ? 'translate-x-5 bg-white dark:bg-neutral-950'
                    : 'translate-x-0 bg-white dark:bg-neutral-400'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Grouped Settings Section 2: Yönetici & Çıkış */}
        <div className="rounded-3xl bg-white dark:bg-[#151720] ring-1 ring-black/[0.04] dark:ring-white/[0.06] divide-y divide-neutral-100 dark:divide-neutral-800 overflow-hidden">
          <button
            onClick={() => onNavigate('admin_panel')}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-neutral-50 dark:hover:bg-[#1a1c26] transition"
          >
            <span className="text-xs font-bold text-neutral-900 dark:text-white">
              Yönetici Paneli (Demo)
            </span>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          </button>

          <button
            onClick={onLogout}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-rose-50/50 dark:hover:bg-rose-950/20 transition text-rose-600 dark:text-rose-400"
          >
            <span className="text-xs font-bold">Hesaptan Çıkış Yap</span>
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Nav */}
      <BottomNav currentScreen="home" onSelectScreen={onNavigate} />
    </div>
  );
};
