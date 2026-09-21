import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Car, Bike, Sparkles, Check } from 'lucide-react';
import { VehicleCategory } from '../types';

interface Screen04VehicleInfoProps {
  onBack: () => void;
  onContinue: (vehicleData: { plate: string; category: VehicleCategory }) => void;
}

export const Screen04VehicleInfo: React.FC<Screen04VehicleInfoProps> = ({
  onBack,
  onContinue,
}) => {
  const [plate, setPlate] = useState('34 SRA 102');
  const [selectedCategory, setSelectedCategory] = useState<VehicleCategory>('TAG');
  const [error, setError] = useState('');

  const categories: {
    id: VehicleCategory;
    title: string;
    subtitle: string;
    icon: React.ElementType;
  }[] = [
    {
      id: 'TAG',
      title: 'TAG Standart',
      subtitle: 'Binek otomobiller ile şehir içi sürüş',
      icon: Car,
    },
    {
      id: 'Motosiklet',
      title: 'Motosiklet',
      subtitle: 'Kurye & iki teker şehir içi ulaşım',
      icon: Bike,
    },
    {
      id: 'Premium',
      title: 'VIP & Premium',
      subtitle: 'Vito, Caravelle & lüks transfer araçları',
      icon: Sparkles,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plate.trim()) {
      setError('Lütfen geçerli bir araç plakası girin.');
      return;
    }
    onContinue({ plate, category: selectedCategory });
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
          Adım 2 / 3
        </span>
        <div className="w-8" />
      </header>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="flex-1 px-5 py-2 flex flex-col justify-between space-y-5">
        <div className="space-y-5">
          <div>
            <h1 className="text-2xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
              Araç Bilgisi
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Kullandığınız aracın plakasını ve kategorisini belirtin.
            </p>
          </div>

          {/* Realistic TR Plate Card */}
          <div>
            <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1.5 px-1">
              Plaka
            </label>
            <div className="flex items-center rounded-2xl bg-white dark:bg-[#151720] ring-1 ring-black/[0.08] dark:ring-white/[0.1] p-1.5 shadow-xs">
              <div className="bg-blue-600 text-white px-2.5 py-2 rounded-xl text-center shrink-0">
                <span className="text-[8px] block opacity-80 leading-none">TR</span>
                <span className="text-[10px] font-bold">★</span>
              </div>
              <input
                type="text"
                value={plate}
                onChange={(e) => {
                  setPlate(e.target.value.toUpperCase());
                  if (error) setError('');
                }}
                placeholder="34 ABC 123"
                className="w-full bg-transparent px-3 text-lg font-black tracking-widest text-neutral-950 dark:text-white focus:outline-none uppercase"
              />
            </div>
            {error && <p className="text-xs text-rose-500 mt-1 px-1">{error}</p>}
          </div>

          {/* Category Cards */}
          <div>
            <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-2 px-1">
              Araç Kategorisi
            </label>
            <div className="space-y-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full p-4 rounded-2xl flex items-center justify-between text-left transition-all ${
                      isSelected
                        ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-sm'
                        : 'bg-white dark:bg-[#151720] text-neutral-900 dark:text-white ring-1 ring-black/[0.04] dark:ring-white/[0.06] hover:bg-neutral-100'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          isSelected
                            ? 'bg-white/10 dark:bg-black/10'
                            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold leading-snug">{cat.title}</h4>
                        <p
                          className={`text-[11px] ${
                            isSelected ? 'opacity-80' : 'text-neutral-500 dark:text-neutral-400'
                          }`}
                        >
                          {cat.subtitle}
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="pt-4 pb-2">
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-950 font-bold text-xs transition active:scale-[0.98] shadow-sm flex items-center justify-center gap-2"
          >
            <span>Evrak Yüklemeye Geç</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
