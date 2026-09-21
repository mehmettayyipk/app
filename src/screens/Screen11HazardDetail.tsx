import React, { useState } from 'react';
import {
  Check,
  X,
  Navigation,
  Clock,
  ShieldCheck,
  Share2,
  MapPin,
  ArrowLeft,
} from 'lucide-react';
import { HazardPoint } from '../types';

interface Screen11HazardDetailProps {
  hazard?: HazardPoint | null;
  onClose: () => void;
  onVerifyStillThere: (hazardId: string) => void;
  onMarkResolved: (hazardId: string) => void;
  onGetDirections?: (hazard: HazardPoint) => void;
}

export const Screen11HazardDetail: React.FC<Screen11HazardDetailProps> = ({
  hazard,
  onClose,
  onVerifyStillThere,
  onMarkResolved,
}) => {
  const currentHazard = hazard || {
    id: 'hz-demo',
    category: 'kaza',
    title: 'E-5 Kozyatağı Sapağı Çevirme ve Kaza',
    description: 'Sağ şeritte maddi hasarlı kaza nedeniyle 2 şerit trafiğe kapalı. Emniyet ekipleri olay yerinde.',
    locationName: 'Kadıköy / E-5 Kozyatağı Ayrımı',
    coordinates: { x: 50, y: 50 },
    reporterName: 'Furkan G.',
    reporterBadge: 'Onaylı Sürücü',
    reportedAt: '12 dakika önce',
    verifiedCount: 14,
    distance: '1.2 km',
    isResolved: false,
  };

  const [hasVoted, setHasVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(currentHazard.verifiedCount);

  const handleVote = () => {
    if (!hasVoted) {
      setVoteCount(voteCount + 1);
      setHasVoted(true);
      onVerifyStillThere(currentHazard.id);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-neutral-50 dark:bg-[#0e1017] text-neutral-900 dark:text-neutral-100 p-6 font-sans transition-colors overflow-y-auto">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white dark:bg-[#181a24] ring-1 ring-black/5 dark:ring-white/10 flex items-center justify-center text-neutral-700 dark:text-neutral-300 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-neutral-400">İhbar Detayı</span>
          <div className="w-8" />
        </div>

        {/* Hazard Title & Location */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#151720] ring-1 ring-black/[0.04] dark:ring-white/[0.06] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400">
              {currentHazard.category.toUpperCase()}
            </span>
            <span className="text-[11px] font-medium text-neutral-400">
              {currentHazard.reportedAt}
            </span>
          </div>

          <h2 className="text-base font-extrabold text-neutral-950 dark:text-white leading-snug">
            {currentHazard.title}
          </h2>

          <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
            <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{currentHazard.locationName}</span>
          </div>

          <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed pt-2 border-t border-neutral-100 dark:border-neutral-800">
            {currentHazard.description}
          </p>

          <div className="pt-1 flex items-center justify-between text-[11px] text-neutral-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Bildiren: {currentHazard.reporterName}</span>
            </div>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              {voteCount} sürücü onayladı
            </span>
          </div>
        </div>
      </div>

      {/* Confirmation Actions */}
      <div className="space-y-2.5 pt-4">
        <button
          onClick={handleVote}
          disabled={hasVoted}
          className={`w-full py-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm ${
            hasVoted
              ? 'bg-emerald-500 text-white cursor-default'
              : 'bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-950 active:scale-[0.98]'
          }`}
        >
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>{hasVoted ? 'Teyit Ettiniz (Teşekkürler)' : 'Hâlâ Orada mı? (Evet, Teyit Et)'}</span>
        </button>

        <button
          onClick={() => {
            onMarkResolved(currentHazard.id);
            onClose();
          }}
          className="w-full py-3.5 rounded-2xl bg-white dark:bg-[#151720] ring-1 ring-black/[0.06] dark:ring-white/[0.08] text-neutral-700 dark:text-neutral-300 font-semibold text-xs hover:bg-neutral-100 transition active:scale-[0.98]"
        >
          Yol Açıldı / Uyarı Artık Geçersiz
        </button>
      </div>
    </div>
  );
};
