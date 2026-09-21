import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Wrench,
  UserX,
  X,
  PhoneCall,
  Check,
  Radio,
} from 'lucide-react';
import { ScreenId } from '../types';
import { BottomNav } from '../components/BottomNav';

interface Screen14EmergencySosProps {
  onNavigate: (screen: ScreenId) => void;
  onActivateSos: (reason?: string) => void;
}

export const Screen14EmergencySos: React.FC<Screen14EmergencySosProps> = ({
  onNavigate,
  onActivateSos,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState('Fiziksel Tehdit / Güvenlik');

  const emergencyReasons = [
    { id: 'tehdit', label: 'Fiziksel Tehdit', icon: ShieldAlert },
    { id: 'kaza', label: 'Trafik Kazası', icon: AlertTriangle },
    { id: 'ariza', label: 'Mekanik Arıza', icon: Wrench },
    { id: 'supheli', label: 'Şüpheli Durum', icon: UserX },
  ];

  const handleConfirmStart = () => {
    setShowConfirmModal(false);
    onActivateSos(selectedReason);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-neutral-50 dark:bg-[#0e1017] text-neutral-900 dark:text-neutral-100 font-sans transition-colors overflow-hidden">
      {/* Top Header */}
      <header className="px-5 pt-3 pb-2 text-center shrink-0">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[11px] font-bold">
          <Radio className="w-3.5 h-3.5" />
          <span>Sürücü Güvenlik Ağı</span>
        </span>
        <h1 className="text-xl font-extrabold text-neutral-950 dark:text-white tracking-tight mt-2">
          Acil Durum (SOS)
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-[280px] mx-auto">
          Basıldığında yakındaki onaylı meslektaşlara canlı konumunuz ve alarm iletilir.
        </p>
      </header>

      {/* Big Concentric SOS Actuator */}
      <div className="flex-1 flex flex-col items-center justify-center my-auto py-4">
        <div className="relative flex items-center justify-center">
          {/* Subtle Radar Wave */}
          <div className="absolute w-60 h-60 rounded-full bg-rose-500/10 animate-ping" />
          <div className="absolute w-52 h-52 rounded-full bg-rose-500/15" />

          {/* Core Trigger Button */}
          <button
            id="btn-emergency-sos-activate"
            onClick={() => setShowConfirmModal(true)}
            className="relative w-40 h-40 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-black flex flex-col items-center justify-center shadow-2xl transition active:scale-95 select-none"
          >
            <span className="text-3xl font-black tracking-widest">SOS</span>
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-90 mt-1">
              Yardım Çağır
            </span>
          </button>
        </div>

        <span className="text-[11px] text-neutral-400 mt-6">
          Yanlışlıkla basmaya karşı onay istenir
        </span>
      </div>

      {/* Emergency Reasons Grid */}
      <div className="px-5 pb-3 space-y-2 shrink-0">
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block px-1">
          Durum Türü
        </span>
        <div className="grid grid-cols-2 gap-2">
          {emergencyReasons.map((r) => {
            const Icon = r.icon;
            const isSelected = selectedReason === r.label;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedReason(r.label)}
                className={`p-3 rounded-2xl flex items-center gap-2.5 text-xs font-bold transition-all text-left ${
                  isSelected
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white dark:bg-[#151720] text-neutral-700 dark:text-neutral-300 ring-1 ring-black/[0.04] dark:ring-white/[0.06]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{r.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-[#151720] rounded-3xl p-6 shadow-2xl ring-1 ring-black/[0.08] dark:ring-white/[0.1] space-y-4">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-600 mx-auto flex items-center justify-center mb-2">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-neutral-950 dark:text-white">
                Alarm Gönderilsin mi?
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Kadıköy ve çevresindeki <strong className="text-neutral-900 dark:text-white">38 sürücüye</strong> ve merkeze konumunuz gönderilecek.
              </p>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={handleConfirmStart}
                className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition active:scale-[0.98] shadow-sm"
              >
                Evet, Alarmı Başlat
              </button>

              <button
                onClick={() => setShowConfirmModal(false)}
                className="w-full py-3 rounded-2xl text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition"
              >
                İptal Et
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNav currentScreen="emergency_sos" onSelectScreen={onNavigate} />
    </div>
  );
};
