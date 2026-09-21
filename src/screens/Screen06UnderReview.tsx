import React from 'react';
import { Clock, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';

interface Screen06UnderReviewProps {
  onSimulateApproved: () => void;
  onGoToAdminPanel: () => void;
}

export const Screen06UnderReview: React.FC<Screen06UnderReviewProps> = ({
  onSimulateApproved,
  onGoToAdminPanel,
}) => {
  return (
    <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 bg-neutral-50 dark:bg-[#0e1017] text-neutral-900 dark:text-neutral-100 overflow-y-auto font-sans transition-colors">
      {/* Top Logo */}
      <div className="pt-4 flex justify-center">
        <BrandLogo size="md" />
      </div>

      {/* Main Review Status */}
      <div className="my-auto py-6 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
          <Clock className="w-7 h-7" />
        </div>

        <h1 className="text-2xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
          Başvurun İnceleniyor
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-[280px]">
          Moderatör ekibimiz belgelerini inceliyor. Onaylandığında SMS ile bilgilendirileceksin.
        </p>

        {/* Minimal Timeline */}
        <div className="w-full max-w-xs mt-8 space-y-2 text-left">
          <div className="p-3 rounded-2xl bg-white dark:bg-[#151720] ring-1 ring-black/[0.04] dark:ring-white/[0.06] flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-neutral-900 dark:text-white block">
                Kimlik Doğrulandı
              </span>
              <span className="text-[10px] text-neutral-400">T.C. sorgusu başarılı</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-[#151720] ring-1 ring-emerald-500/30 flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Clock className="w-3.5 h-3.5 animate-spin" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-neutral-900 dark:text-white block">
                Belge Değerlendirmesi
              </span>
              <span className="text-[10px] text-neutral-400">Sürücü ekranı kontrol ediliyor</span>
            </div>
          </div>
        </div>
      </div>

      {/* Simulator Action Button */}
      <div className="space-y-2 pb-2">
        <button
          onClick={onSimulateApproved}
          className="w-full py-4 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-950 font-bold text-xs transition active:scale-[0.98] shadow-sm flex items-center justify-center gap-2"
        >
          <span>Onayı Simüle Et (Uygulamaya Gir)</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={onGoToAdminPanel}
          className="w-full py-2.5 text-center text-xs font-semibold text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition"
        >
          Yönetici Paneline Geç →
        </button>
      </div>
    </div>
  );
};
