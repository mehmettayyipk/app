import React, { useState } from 'react';
import {
  Radio,
  MapPin,
  CheckCircle2,
  XCircle,
  Phone,
  Navigation,
  Car,
} from 'lucide-react';
import { ScreenId } from '../types';
import { INITIAL_SOS_INCIDENT } from '../data/mockData';
import { BottomNav } from '../components/BottomNav';

interface Screen15ActiveSosProps {
  onNavigate: (screen: ScreenId) => void;
  onCancelSos: () => void;
  onCompleteSos: () => void;
}

export const Screen15ActiveSos: React.FC<Screen15ActiveSosProps> = ({
  onNavigate,
  onCancelSos,
  onCompleteSos,
}) => {
  const [viewPerspective, setViewPerspective] = useState<'requester' | 'responder'>('requester');
  const [radiusKm, setRadiusKm] = useState<number>(5);

  return (
    <div className="flex-1 flex flex-col justify-between bg-neutral-50 dark:bg-[#0e1017] text-neutral-900 dark:text-neutral-100 font-sans transition-colors overflow-hidden">
      {/* Perspective Switcher */}
      <header className="p-3 bg-white dark:bg-[#151720] border-b border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between shrink-0">
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
          Görünüm:
        </span>
        <div className="flex bg-neutral-100 dark:bg-neutral-800 p-0.5 rounded-full text-xs font-bold">
          <button
            onClick={() => setViewPerspective('requester')}
            className={`px-3 py-1 rounded-full transition ${
              viewPerspective === 'requester'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-neutral-500'
            }`}
          >
            Yardım İsteyen
          </button>
          <button
            onClick={() => setViewPerspective('responder')}
            className={`px-3 py-1 rounded-full transition ${
              viewPerspective === 'responder'
                ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-xs'
                : 'text-neutral-500'
            }`}
          >
            Yardıma Giden
          </button>
        </div>
      </header>

      {/* Main View Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {viewPerspective === 'requester' ? (
          <>
            {/* Active Distress Beacon Header */}
            <div className="p-4 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-rose-600 dark:text-rose-400 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                <span>CANLI SİNYAL YAYINDA</span>
              </div>
              <h2 className="text-base font-extrabold text-neutral-950 dark:text-white">
                Fiziksel Güvenlik & Tehdit
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {INITIAL_SOS_INCIDENT.locationName}
              </p>
            </div>

            {/* Responder Drivers Tracker */}
            <div className="p-4 rounded-3xl bg-white dark:bg-[#151720] ring-1 ring-black/[0.04] dark:ring-white/[0.06] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
                <span className="text-xs font-bold text-neutral-950 dark:text-white">
                  Size Doğru Gelenler
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {INITIAL_SOS_INCIDENT.responders.length} Sürücü Yolda
                </span>
              </div>

              <div className="space-y-2">
                {INITIAL_SOS_INCIDENT.responders.map((res) => (
                  <div
                    key={res.id}
                    className="p-3 rounded-2xl bg-neutral-50 dark:bg-[#1a1c26] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                        <Car className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-neutral-900 dark:text-white leading-tight">
                          {res.driverName}
                        </h4>
                        <p className="text-[10px] text-neutral-400">
                          {res.plate} • {res.vehicleModel}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 block">
                        {res.eta}
                      </span>
                      <span className="text-[10px] text-neutral-400">{res.distance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expand Radius option */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-[#151720] ring-1 ring-black/[0.04] dark:ring-white/[0.06] text-xs">
              <span className="text-neutral-500 dark:text-neutral-400">Yarıçapı 10 km'ye genişlet:</span>
              <button
                onClick={() => setRadiusKm(10)}
                className="px-3 py-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 font-bold text-neutral-900 dark:text-white hover:bg-neutral-200 transition"
              >
                Genişlet ({radiusKm} km)
              </button>
            </div>

            {/* Resolve or Cancel Button */}
            <div className="pt-2 space-y-2">
              <button
                onClick={onCompleteSos}
                className="w-full py-4 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-950 font-bold text-xs transition active:scale-[0.98] shadow-sm flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Alarmı Kapat (Güvendeyim)</span>
              </button>

              <button
                onClick={onCancelSos}
                className="w-full py-2.5 text-center text-xs font-semibold text-neutral-400 hover:text-rose-500 transition"
              >
                Yanlış Alarm İptal
              </button>
            </div>
          </>
        ) : (
          /* Responder View */
          <>
            <div className="p-4 rounded-3xl bg-neutral-900 text-white dark:bg-[#181a24] space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                Gelen Acil Yardım Çağrısı
              </span>
              <h2 className="text-base font-extrabold">{INITIAL_SOS_INCIDENT.driverName}</h2>
              <p className="text-xs text-neutral-400">{INITIAL_SOS_INCIDENT.locationName}</p>
              <div className="pt-2 flex items-center gap-2 text-xs">
                <span className="font-bold text-emerald-400">Tahmini Varış: 4 dk</span>
                <span className="text-neutral-400">• 1.4 km</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white dark:bg-[#151720] ring-1 ring-black/[0.04] dark:ring-white/[0.06] space-y-3">
              <button
                onClick={() => {}}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <Navigation className="w-4 h-4" />
                <span>Navigasyonu Başlat (Olay Yeri)</span>
              </button>

              <button
                onClick={() => {}}
                className="w-full py-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold text-xs flex items-center justify-center gap-2 transition"
              >
                <Phone className="w-4 h-4" />
                <span>Sürücüyü Ara (Güvenli Hat)</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Bottom Nav */}
      <BottomNav currentScreen="emergency_sos" onSelectScreen={onNavigate} />
    </div>
  );
};
