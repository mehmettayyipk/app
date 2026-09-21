import React, { useState } from 'react';
import { ScreenId } from '../types';
import {
  Smartphone,
  ChevronDown,
  Sun,
  Moon,
  Layers,
  X,
} from 'lucide-react';

interface ScreenNavigatorProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  isFrameMode: boolean;
  onToggleFrameMode: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const SCREEN_CATALOG: {
  id: ScreenId;
  num: number;
  title: string;
  category: 'Kayıt & Giriş' | 'Ana Akış' | 'Güvenlik & Harita' | 'Sohbet & Grup' | 'Acil Durum' | 'Yönetim';
  description: string;
}[] = [
  { id: 'login', num: 1, title: 'Telefon Girişi', category: 'Kayıt & Giriş', description: '+90 numara girişi' },
  { id: 'sms', num: 2, title: 'SMS Doğrulama', category: 'Kayıt & Giriş', description: '6 haneli OTP kodu' },
  { id: 'create_account', num: 3, title: 'Hesap Oluştur', category: 'Kayıt & Giriş', description: 'Kimlik, ad soyad, kullanıcı adı' },
  { id: 'vehicle_info', num: 4, title: 'Araç Bilgileri', category: 'Kayıt & Giriş', description: 'Plaka, segment ve model' },
  { id: 'complete_app', num: 5, title: 'Başvuruyu Tamamla', category: 'Kayıt & Giriş', description: 'Belgeler ve onay' },
  { id: 'under_review', num: 6, title: 'Başvuru Durumu', category: 'Kayıt & Giriş', description: 'İnceleme süreci' },
  { id: 'home', num: 7, title: 'Ana Sayfa (Kazanç)', category: 'Ana Akış', description: 'Net kazanç, yakıt ve giderler' },
  { id: 'add_income', num: 8, title: 'Kazanç Ekle', category: 'Ana Akış', description: 'Hızlı sefer geliri' },
  { id: 'add_expense', num: 9, title: 'Gider Ekle', category: 'Ana Akış', description: 'Yakıt, bakım, komisyon' },
  { id: 'map', num: 10, title: 'Harita & Radar', category: 'Güvenlik & Harita', description: 'Yol durumları, kaza, çevirme' },
  { id: 'hazard_detail', num: 11, title: 'İhbar Detayı', category: 'Güvenlik & Harita', description: 'Teyit ve detay kartı' },
  { id: 'chat', num: 12, title: 'Sohbet & Telsiz', category: 'Sohbet & Grup', description: 'Birebir, grup, sesli telsiz' },
  { id: 'create_group', num: 13, title: 'Grup Kur', category: 'Sohbet & Grup', description: 'Özel ve bölgesel odalar' },
  { id: 'emergency_sos', num: 14, title: 'Acil Yardım (SOS)', category: 'Acil Durum', description: 'Tek dokunuş imdat butonu' },
  { id: 'active_sos', num: 15, title: 'Aktif Alarm Ekranı', category: 'Acil Durum', description: 'İntikal ve canlı konum' },
  { id: 'profile_settings', num: 16, title: 'Profil & Ayarlar', category: 'Ana Akış', description: 'Doğrulandı rozeti ve gizlilik' },
  { id: 'admin_panel', num: 17, title: 'Yönetici Paneli', category: 'Yönetim', description: 'Sürücü onay ve moderasyon' },
];

export const ScreenNavigator: React.FC<ScreenNavigatorProps> = ({
  currentScreen,
  onSelectScreen,
  isFrameMode,
  onToggleFrameMode,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentItem = SCREEN_CATALOG.find((s) => s.id === currentScreen) || SCREEN_CATALOG[0];

  return (
    <>
      {/* Top Prototype Utility Strip */}
      <header
        id="app-utility-bar"
        className="w-full bg-white/90 dark:bg-[#12141c]/90 backdrop-blur-md border-b border-black/[0.05] dark:border-white/[0.06] px-4 py-2 flex items-center justify-between text-xs z-40 transition-colors select-none shrink-0"
      >
        {/* Left: Quick screen dropdown */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-bold transition"
          >
            <Layers className="w-3.5 h-3.5 text-neutral-400" />
            <span>
              {currentItem.num}. {currentItem.title}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5">
          {/* Quick Home */}
          {currentScreen !== 'home' && (
            <button
              onClick={() => onSelectScreen('home')}
              className="px-2.5 py-1 rounded-full text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition"
            >
              Ana Sayfa
            </button>
          )}

          {/* Quick Admin */}
          {currentScreen !== 'admin_panel' && (
            <button
              onClick={() => onSelectScreen('admin_panel')}
              className="px-2.5 py-1 rounded-full text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition"
            >
              Yönetici
            </button>
          )}

          {/* Device Frame Toggle */}
          <button
            onClick={onToggleFrameMode}
            className={`p-1.5 rounded-full transition ${
              isFrameMode
                ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950'
                : 'text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
            title="Cihaz Çerçevesi"
          >
            <Smartphone className="w-4 h-4" />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-1.5 rounded-full text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            title="Karanlık / Aydınlık Mod"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
          </button>
        </div>
      </header>

      {/* Screen Selector Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white dark:bg-[#151720] rounded-3xl p-5 shadow-2xl ring-1 ring-black/[0.08] dark:ring-white/[0.08] max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <span className="font-extrabold text-sm text-neutral-950 dark:text-white">
                Ekran Kataloğu (17 Ekran)
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-1.5">
              {SCREEN_CATALOG.map((scr) => {
                const isSelected = currentScreen === scr.id;
                return (
                  <button
                    key={scr.id}
                    onClick={() => {
                      onSelectScreen(scr.id);
                      setIsOpen(false);
                    }}
                    className={`w-full p-3 rounded-2xl flex items-center justify-between text-left transition ${
                      isSelected
                        ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-xs'
                        : 'hover:bg-neutral-100 dark:hover:bg-[#1a1c26] text-neutral-900 dark:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-full text-[10px] font-black flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-white/20 text-white dark:bg-black/10 dark:text-neutral-950'
                            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                        }`}
                      >
                        {scr.num}
                      </span>
                      <div>
                        <span className="text-xs font-bold block">{scr.title}</span>
                        <span
                          className={`text-[10px] ${
                            isSelected ? 'opacity-80' : 'text-neutral-400'
                          }`}
                        >
                          {scr.description}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-white/10 dark:bg-black/10'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      {scr.category}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
