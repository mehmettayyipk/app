import React, { useState } from 'react';
import { ArrowLeft, Wallet, Building2, Check, Navigation } from 'lucide-react';
import { PaymentMethod } from '../types';

interface Screen08AddIncomeProps {
  onBack: () => void;
  onSaveIncome: (data: { amount: number; method: PaymentMethod; km?: number }) => void;
}

export const Screen08AddIncome: React.FC<Screen08AddIncomeProps> = ({
  onBack,
  onSaveIncome,
}) => {
  const [amount, setAmount] = useState('380');
  const [method, setMethod] = useState<PaymentMethod>('Nakit');
  const [km, setKm] = useState('16');
  const [error, setError] = useState('');

  const quickAmounts = [100, 250, 400, 600, 1000];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount.replace(/[^0-9.]/g, ''));
    if (!numAmount || numAmount <= 0) {
      setError('Lütfen geçerli bir tutar girin.');
      return;
    }
    const numKm = km ? parseFloat(km) : undefined;
    onSaveIncome({
      amount: numAmount,
      method,
      km: numKm,
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
        <span className="text-xs font-bold tracking-tight text-neutral-900 dark:text-white">
          Kazanç Ekle
        </span>
        <div className="w-8" />
      </header>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="flex-1 px-5 py-4 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Amount Display */}
          <div className="py-6 text-center">
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
              Yolculuk Tutarı
            </span>
            <div className="mt-2 flex items-baseline justify-center gap-1">
              <span className="text-3xl font-bold text-neutral-400">₺</span>
              <input
                type="text"
                inputMode="numeric"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  if (error) setError('');
                }}
                placeholder="0"
                className="text-5xl font-black text-neutral-950 dark:text-white bg-transparent text-center w-52 focus:outline-none tracking-tight"
                autoFocus
              />
            </div>
            {error && <p className="text-xs text-rose-500 mt-2 font-medium">{error}</p>}

            {/* Quick Add Pills */}
            <div className="mt-4 flex items-center justify-center flex-wrap gap-1.5">
              {quickAmounts.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setAmount(q.toString())}
                  className="px-3 py-1 rounded-full bg-white dark:bg-[#181a24] ring-1 ring-black/5 dark:ring-white/10 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 transition active:scale-95"
                >
                  +{q}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method Segment */}
          <div>
            <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-2 px-1">
              Ödeme Türü
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-200/50 dark:bg-[#181a24] rounded-2xl">
              <button
                type="button"
                onClick={() => setMethod('Nakit')}
                className={`py-3 px-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                  method === 'Nakit'
                    ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Wallet className="w-4 h-4" />
                <span>Nakit</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('Hesap')}
                className={`py-3 px-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                  method === 'Hesap'
                    ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>FAST / IBAN</span>
              </button>
            </div>
          </div>

          {/* Trip KM input */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#151720] ring-1 ring-black/[0.04] dark:ring-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300">
                <Navigation className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-neutral-900 dark:text-white block">
                  Yolculuk Mesafesi
                </span>
                <span className="text-[10px] text-neutral-400">İsteğe bağlı mesafe kaydı</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <input
                type="number"
                value={km}
                onChange={(e) => setKm(e.target.value)}
                placeholder="0"
                className="w-14 text-right font-bold text-xs bg-transparent text-neutral-900 dark:text-white focus:outline-none"
              />
              <span className="text-xs text-neutral-400">km</span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-950 font-bold text-xs transition active:scale-[0.98] shadow-sm"
          >
            Kazancı Kaydet
          </button>
        </div>
      </form>
    </div>
  );
};
