import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Upload, Check, ShieldCheck } from 'lucide-react';

interface Screen05CompleteApplicationProps {
  onBack: () => void;
  onSubmit: (applicationData: any) => void;
}

export const Screen05CompleteApplication: React.FC<Screen05CompleteApplicationProps> = ({
  onBack,
  onSubmit,
}) => {
  const [profileDoc, setProfileDoc] = useState(true);
  const [historyDoc, setHistoryDoc] = useState(true);
  const [refCode, setRefCode] = useState('REF-8490');
  const [agreed, setAgreed] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileDoc || !historyDoc || !agreed) return;
    onSubmit({
      profileDoc,
      historyDoc,
      refCode,
    });
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-neutral-50 dark:bg-[#0e1017] text-neutral-900 dark:text-neutral-100 overflow-y-auto font-sans transition-colors">
      {/* Top Header */}
      <header className="px-5 pt-3 pb-3 flex items-center justify-between shrink-0">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-white dark:bg-[#181a24] ring-1 ring-black/5 dark:ring-white/10 flex items-center justify-center text-neutral-700 dark:text-neutral-300 transition"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
          Adım 3 / 3
        </span>
        <div className="w-8" />
      </header>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="flex-1 px-5 py-2 flex flex-col justify-between space-y-5">
        <div className="space-y-5">
          <div>
            <h1 className="text-2xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
              Belgeleri Yükle
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Topluluk onayınız için sürücü profil ekran görüntünüzü yükleyin.
            </p>
          </div>

          {/* Document Upload Cards */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setProfileDoc(!profileDoc)}
              className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all text-left ${
                profileDoc
                  ? 'bg-white dark:bg-[#151720] ring-2 ring-emerald-500/80 shadow-xs'
                  : 'bg-white dark:bg-[#151720] ring-1 ring-black/[0.04] dark:ring-white/[0.06] opacity-70'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    profileDoc
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                    Sürücü Profil Ekranı
                  </h4>
                  <p className="text-[11px] text-neutral-400">Puan ve isim görünen ekran görüntüsü</p>
                </div>
              </div>

              {profileDoc && (
                <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}
            </button>

            <button
              type="button"
              onClick={() => setHistoryDoc(!historyDoc)}
              className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all text-left ${
                historyDoc
                  ? 'bg-white dark:bg-[#151720] ring-2 ring-emerald-500/80 shadow-xs'
                  : 'bg-white dark:bg-[#151720] ring-1 ring-black/[0.04] dark:ring-white/[0.06] opacity-70'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    historyDoc
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                    Yolculuk Geçmişi Kanıtı
                  </h4>
                  <p className="text-[11px] text-neutral-400">Son tamamlanan seferlerin görüntüsü</p>
                </div>
              </div>

              {historyDoc && (
                <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}
            </button>
          </div>

          {/* Reference Code */}
          <div>
            <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1.5 px-1">
              Referans Sürücü Kodu (Opsiyonel)
            </label>
            <input
              type="text"
              value={refCode}
              onChange={(e) => setRefCode(e.target.value)}
              placeholder="REF-XXXX"
              className="w-full p-3.5 rounded-2xl bg-white dark:bg-[#151720] ring-1 ring-black/[0.06] dark:ring-white/[0.08] text-xs font-semibold text-neutral-900 dark:text-white uppercase focus:outline-none"
            />
          </div>

          {/* Terms checkbox */}
          <label className="flex items-start gap-2.5 px-1 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-neutral-950 dark:text-white focus:ring-0 accent-neutral-950 dark:accent-white"
            />
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-tight">
              Topluluk kurallarını, gizlilik sözleşmesini ve şoför dayanışma ilkelerini kabul ediyorum.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4 pb-2">
          <button
            type="submit"
            disabled={!profileDoc || !historyDoc || !agreed}
            className={`w-full py-4 rounded-2xl font-bold text-xs transition shadow-sm flex items-center justify-center gap-2 ${
              profileDoc && historyDoc && agreed
                ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 active:scale-[0.98]'
                : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed'
            }`}
          >
            <span>Başvuruyu Gönder</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
