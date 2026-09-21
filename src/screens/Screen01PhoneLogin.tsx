import React, { useState } from 'react';
import { BrandLogo } from '../components/BrandLogo';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface Screen01PhoneLoginProps {
  onContinue: (phoneNumber: string) => void;
  initialPhone?: string;
}

export const Screen01PhoneLogin: React.FC<Screen01PhoneLoginProps> = ({
  onContinue,
  initialPhone = '532 840 19 23',
}) => {
  const [phone, setPhone] = useState(initialPhone);
  const [error, setError] = useState('');

  const formatPhoneNumber = (value: string) => {
    const clean = value.replace(/\D/g, '').slice(0, 10);
    let formatted = '';
    if (clean.length > 0) {
      formatted = clean.substring(0, 3);
      if (clean.length > 3) formatted += ' ' + clean.substring(3, 6);
      if (clean.length > 6) formatted += ' ' + clean.substring(6, 8);
      if (clean.length > 8) formatted += ' ' + clean.substring(8, 10);
    }
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = phone.replace(/\s/g, '');
    if (clean.length < 10) {
      setError('Lütfen 10 haneli telefon numaranızı girin.');
      return;
    }
    onContinue(phone);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 bg-neutral-50 dark:bg-[#0e1017] text-neutral-900 dark:text-neutral-100 overflow-y-auto font-sans transition-colors">
      {/* Top Header */}
      <div className="pt-8 flex flex-col items-center text-center">
        <BrandLogo size="lg" className="mb-6" />

        <h1 className="text-2xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
          Sürücü Girişi
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 max-w-[280px]">
          Kapalı şoför ağına giriş yapmak veya başvurmak için cep numaranızı girin.
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="my-auto py-6 space-y-4">
        <div>
          <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-2 px-1">
            Telefon Numarası
          </label>

          <div className="flex items-center rounded-2xl bg-white dark:bg-[#151720] ring-1 ring-black/[0.08] dark:ring-white/[0.1] focus-within:ring-2 focus-within:ring-neutral-950 dark:focus-within:ring-white transition-all p-1.5">
            <div className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs font-bold text-neutral-800 dark:text-neutral-200 shrink-0">
              <span>🇹🇷</span>
              <span>+90</span>
            </div>

            <input
              id="phone-number-input"
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="5XX XXX XX XX"
              className="w-full bg-transparent px-3 py-2 text-base font-semibold tracking-wide text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none"
              autoFocus
            />
          </div>

          {error ? (
            <p className="text-xs text-rose-500 mt-2 font-medium px-1">{error}</p>
          ) : (
            <p className="text-[11px] text-neutral-400 mt-2 px-1">
              Doğrulama için tek kullanımlık SMS kodu gönderilecek.
            </p>
          )}
        </div>

        <button
          id="btn-phone-submit"
          type="submit"
          className="w-full py-4 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-950 font-bold text-xs transition active:scale-[0.98] shadow-sm flex items-center justify-center gap-2"
        >
          <span>Devam Et</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Bottom Security Note */}
      <div className="pb-4 text-center">
        <div className="inline-flex items-center gap-1.5 text-[11px] text-neutral-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Sadece onaylı sürücüler sisteme kabul edilir.</span>
        </div>
      </div>
    </div>
  );
};
