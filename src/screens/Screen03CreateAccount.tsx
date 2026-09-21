import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface Screen03CreateAccountProps {
  onBack: () => void;
  onContinue: (formData: any) => void;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=160&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=160&q=80',
];

export const Screen03CreateAccount: React.FC<Screen03CreateAccountProps> = ({
  onBack,
  onContinue,
}) => {
  const [tcNumber, setTcNumber] = useState('28491823412');
  const [fullName, setFullName] = useState('Furkan Güler');
  const [username, setUsername] = useState('furkan_surucu');
  const [district, setDistrict] = useState('Kadıköy, İstanbul');
  const [selectedAvatar, setSelectedAvatar] = useState(PRESET_AVATARS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue({
      tcNumber,
      fullName,
      username: username.startsWith('@') ? username : `@${username}`,
      district,
      avatar: selectedAvatar,
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
          Adım 1 / 3
        </span>
        <div className="w-8" />
      </header>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="flex-1 px-5 py-2 flex flex-col justify-between space-y-5">
        <div className="space-y-5">
          <div>
            <h1 className="text-2xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
              Profil Bilgileri
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Topluluk güvenliği için resmi T.C. kimliğiniz ile kayıt olun.
            </p>
          </div>

          {/* Avatar Selector */}
          <div className="flex items-center gap-3 py-1">
            {PRESET_AVATARS.map((av, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedAvatar(av)}
                className={`relative rounded-full transition-all ${
                  selectedAvatar === av
                    ? 'ring-2 ring-neutral-950 dark:ring-white scale-105'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img src={av} alt="Avatar" className="w-12 h-12 rounded-full object-cover" />
                {selectedAvatar === av && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Input Fields */}
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1 px-1">
                T.C. Kimlik Numarası
              </label>
              <input
                type="text"
                maxLength={11}
                value={tcNumber}
                onChange={(e) => setTcNumber(e.target.value.replace(/\D/g, ''))}
                className="w-full p-3.5 rounded-2xl bg-white dark:bg-[#151720] ring-1 ring-black/[0.06] dark:ring-white/[0.08] text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-950 dark:focus:ring-white"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1 px-1">
                Ad Soyad
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-white dark:bg-[#151720] ring-1 ring-black/[0.06] dark:ring-white/[0.08] text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-950 dark:focus:ring-white"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1 px-1">
                Kullanıcı Adı (Rumuz)
              </label>
              <div className="flex items-center rounded-2xl bg-white dark:bg-[#151720] ring-1 ring-black/[0.06] dark:ring-white/[0.08] p-1">
                <span className="pl-3 text-xs font-bold text-neutral-400">@</span>
                <input
                  type="text"
                  value={username.replace(/^@/, '')}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                  className="w-full py-2.5 px-1 bg-transparent text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1 px-1">
                Çalışma Bölgesi
              </label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-white dark:bg-[#151720] ring-1 ring-black/[0.06] dark:ring-white/[0.08] text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-950 dark:focus:ring-white"
              />
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="pt-4 pb-2">
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-950 font-bold text-xs transition active:scale-[0.98] shadow-sm flex items-center justify-center gap-2"
          >
            <span>Araç Bilgilerine Geç</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
