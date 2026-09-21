import React, { useState } from 'react';
import {
  ArrowLeft,
  Fuel,
  Utensils,
  ParkingCircle,
  Sparkles,
  Wrench,
  CreditCard,
  Percent,
  Shield,
  FileCheck,
  AlertOctagon,
  MoreHorizontal,
} from 'lucide-react';
import { ExpenseCategory } from '../types';

interface Screen09AddExpenseProps {
  onBack: () => void;
  onSaveExpense: (data: {
    category: ExpenseCategory;
    amount: number;
    fuelPricePerLiter?: number;
    calculatedLiters?: number;
    description?: string;
  }) => void;
}

const CATEGORIES: { id: ExpenseCategory; label: string; icon: React.ElementType }[] = [
  { id: 'Yakıt', label: 'Yakıt', icon: Fuel },
  { id: 'Yemek', label: 'Yemek', icon: Utensils },
  { id: 'Otopark', label: 'Otopark', icon: ParkingCircle },
  { id: 'Araç Yıkama', label: 'Yıkama', icon: Sparkles },
  { id: 'Bakım/Onarım', label: 'Bakım', icon: Wrench },
  { id: 'Komisyon', label: 'Komisyon', icon: Percent },
  { id: 'Sigorta', label: 'Sigorta', icon: Shield },
  { id: 'Ceza', label: 'Ceza', icon: AlertOctagon },
  { id: 'Diğer', label: 'Diğer', icon: MoreHorizontal },
];

export const Screen09AddExpense: React.FC<Screen09AddExpenseProps> = ({
  onBack,
  onSaveExpense,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory>('Yakıt');
  const [amount, setAmount] = useState('650');
  const [fuelPrice, setFuelPrice] = useState('44.20');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const numAmount = parseFloat(amount.replace(/[^0-9.]/g, '')) || 0;
  const numFuelPrice = parseFloat(fuelPrice.replace(/[^0-9.]/g, '')) || 0;
  const calculatedLiters =
    numAmount > 0 && numFuelPrice > 0 ? (numAmount / numFuelPrice).toFixed(1) : '0.0';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!numAmount || numAmount <= 0) {
      setError('Lütfen geçerli bir gider tutarı girin.');
      return;
    }

    onSaveExpense({
      category: selectedCategory,
      amount: numAmount,
      fuelPricePerLiter: selectedCategory === 'Yakıt' ? numFuelPrice : undefined,
      calculatedLiters: selectedCategory === 'Yakıt' ? parseFloat(calculatedLiters) : undefined,
      description: selectedCategory === 'Diğer' ? description : undefined,
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
          Gider Ekle
        </span>
        <div className="w-8" />
      </header>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="flex-1 px-5 py-2 flex flex-col justify-between">
        <div className="space-y-5">
          {/* Amount Display */}
          <div className="py-4 text-center">
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
              Harcama Tutarı
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
              />
            </div>
            {error && <p className="text-xs text-rose-500 mt-2 font-medium">{error}</p>}
          </div>

          {/* Minimal Category Pills */}
          <div>
            <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-2 px-1">
              Kategori Seçin
            </label>
            <div className="grid grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-semibold select-none ${
                      isSelected
                        ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-sm'
                        : 'bg-white dark:bg-[#151720] text-neutral-600 dark:text-neutral-400 ring-1 ring-black/[0.04] dark:ring-white/[0.06] hover:bg-neutral-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[11px] truncate w-full text-center">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conditional: Fuel Liters Smart Calculator */}
          {selectedCategory === 'Yakıt' && (
            <div className="p-4 rounded-2xl bg-white dark:bg-[#151720] ring-1 ring-black/[0.04] dark:ring-white/[0.06] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-neutral-900 dark:text-white block">
                  Litre Fiyatı (₺)
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  ≈ {calculatedLiters} Litre yakıt
                </span>
              </div>
              <input
                type="text"
                value={fuelPrice}
                onChange={(e) => setFuelPrice(e.target.value)}
                placeholder="44.20"
                className="w-20 text-right font-bold text-xs bg-neutral-100 dark:bg-neutral-800 p-2 rounded-xl text-neutral-900 dark:text-white focus:outline-none"
              />
            </div>
          )}

          {/* Conditional Description for Diğer */}
          {selectedCategory === 'Diğer' && (
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Gider açıklaması yazın..."
              className="w-full p-3.5 rounded-2xl bg-white dark:bg-[#151720] ring-1 ring-black/[0.04] dark:ring-white/[0.06] text-xs font-medium text-neutral-900 dark:text-white focus:outline-none"
            />
          )}
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-950 font-bold text-xs transition active:scale-[0.98] shadow-sm"
          >
            Gideri Kaydet
          </button>
        </div>
      </form>
    </div>
  );
};
