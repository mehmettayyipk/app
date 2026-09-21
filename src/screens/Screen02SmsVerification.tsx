import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShieldCheck, RefreshCw } from 'lucide-react';

interface Screen02SmsVerificationProps {
  phoneNumber: string;
  onBack: () => void;
  onVerifySuccess: () => void;
}

export const Screen02SmsVerification: React.FC<Screen02SmsVerificationProps> = ({
  phoneNumber,
  onBack,
  onVerifySuccess,
}) => {
  const [code, setCode] = useState(['5', '4', '9', '', '', '']);
  const [secondsLeft, setSecondsLeft] = useState(90);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (secondsLeft <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleInputChange = (index: number, val: string) => {
    const digit = val.replace(/\D/g, '').slice(-1);
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);

    if (digit && index < 5) {
      const nextInput = document.getElementById(`sms-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`sms-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const isComplete = code.every((d) => d !== '');

  const handleResend = () => {
    if (!canResend) return;
    setSecondsLeft(90);
    setCanResend(false);
  };

  const formatTimer = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 bg-neutral-50 dark:bg-[#0e1017] text-neutral-900 dark:text-neutral-100 overflow-y-auto font-sans transition-colors">
      {/* Header */}
      <div>
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-white dark:bg-[#181a24] ring-1 ring-black/5 dark:ring-white/10 flex items-center justify-center text-neutral-700 dark:text-neutral-300 transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
          <ShieldCheck className="w-5 h-5" />
        </div>

        <h1 className="text-2xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
          Kodu Girin
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          <span className="font-semibold text-neutral-900 dark:text-white">+90 {phoneNumber || '532 840 19 23'}</span>{' '}
          numarasına SMS ile kod gönderdik.
        </p>
      </div>

      {/* 6 Digit Inputs */}
      <div className="my-auto py-6">
        <div className="flex items-center justify-between gap-2 max-w-xs mx-auto">
          {code.map((digit, idx) => (
            <input
              key={idx}
              id={`sms-input-${idx}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className="w-11 h-13 sm:w-12 sm:h-14 rounded-2xl bg-white dark:bg-[#151720] ring-1 ring-black/[0.08] dark:ring-white/[0.1] focus:ring-2 focus:ring-neutral-950 dark:focus:ring-white text-center text-xl font-bold text-neutral-950 dark:text-white transition-all focus:outline-none"
            />
          ))}
        </div>

        {/* Resend & Demo Autocomplete */}
        <div className="mt-6 flex flex-col items-center gap-2">
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-xs font-semibold text-neutral-900 dark:text-white underline underline-offset-4"
            >
              Kodu Tekrar Gönder
            </button>
          ) : (
            <span className="text-xs font-medium text-neutral-400">
              Yeni kod için: <strong className="text-neutral-700 dark:text-neutral-300 font-mono">{formatTimer(secondsLeft)}</strong>
            </span>
          )}

          <button
            type="button"
            onClick={() => setCode(['5', '4', '9', '2', '0', '1'])}
            className="text-[11px] text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 mt-2"
          >
            (Kodu Otomatik Doldur: 549201)
          </button>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="pb-4">
        <button
          onClick={onVerifySuccess}
          disabled={!isComplete}
          className={`w-full py-4 rounded-2xl font-bold text-xs transition shadow-sm ${
            isComplete
              ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 active:scale-[0.98]'
              : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed'
          }`}
        >
          Doğrula ve Devam Et
        </button>
      </div>
    </div>
  );
};
