import React, { useState } from 'react';
import {
  Plus,
  Minus,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  TrendingUp,
  MapPin,
  Car,
  Fuel,
  Coffee,
  CheckCircle2,
  Navigation,
} from 'lucide-react';
import { ScreenId } from '../types';
import { BottomNav } from '../components/BottomNav';

interface Screen07HomeDashboardProps {
  onNavigate: (screen: ScreenId) => void;
  driverName?: string;
  driverAvatar?: string;
  netEarnings?: number;
  totalIncome?: number;
  totalExpense?: number;
  cashAmount?: number;
  accountAmount?: number;
}

export const Screen07HomeDashboard: React.FC<Screen07HomeDashboardProps> = ({
  onNavigate,
  driverName = 'Furkan Güler',
  driverAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80',
  netEarnings = 2450,
  totalIncome = 3100,
  totalExpense = 650,
  cashAmount = 1850,
  accountAmount = 1250,
}) => {
  const [shiftStatus, setShiftStatus] = useState<'online' | 'break' | 'offline'>('online');
  const [activeFilter, setActiveFilter] = useState<'today' | 'week'>('today');

  const recentTransactions = [
    {
      id: 'tx-1',
      type: 'income',
      title: 'Kadıköy → Beşiktaş',
      category: 'Yolculuk',
      amount: 420,
      payment: 'Nakit',
      time: '14:20',
      icon: Navigation,
    },
    {
      id: 'tx-2',
      type: 'expense',
      title: 'Opet Yakıt Alımı',
      category: 'Benzin (15.2 L)',
      amount: 650,
      payment: 'Banka',
      time: '12:45',
      icon: Fuel,
    },
    {
      id: 'tx-3',
      type: 'income',
      title: 'Üsküdar → Ataşehir',
      category: 'Yolculuk',
      amount: 310,
      payment: 'FAST / IBAN',
      time: '11:15',
      icon: Navigation,
    },
    {
      id: 'tx-4',
      type: 'income',
      title: 'Sabiha Gökçen → Maltepe',
      category: 'Havalimanı',
      amount: 680,
      payment: 'Nakit',
      time: '09:30',
      icon: Navigation,
    },
  ];

  return (
    <div className="flex-1 flex flex-col justify-between bg-neutral-50 dark:bg-[#0e1017] text-neutral-900 dark:text-neutral-100 overflow-hidden font-sans transition-colors">
      {/* Top Header */}
      <header className="px-5 pt-3 pb-3 flex items-center justify-between shrink-0">
        <button
          onClick={() => onNavigate('profile_settings')}
          className="flex items-center gap-3 group text-left"
        >
          <div className="relative">
            <img
              src={driverAvatar}
              alt={driverName}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-black/5 dark:ring-white/10"
            />
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-white dark:ring-[#0e1017] ${
                shiftStatus === 'online'
                  ? 'bg-emerald-500'
                  : shiftStatus === 'break'
                  ? 'bg-amber-500'
                  : 'bg-neutral-400'
              }`}
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm tracking-tight text-neutral-950 dark:text-white">
                {driverName}
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/10" />
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">İstanbul • Kadıköy</p>
          </div>
        </button>

        {/* Minimal Shift Pill Switcher */}
        <button
          onClick={() => {
            if (shiftStatus === 'online') setShiftStatus('break');
            else if (shiftStatus === 'break') setShiftStatus('offline');
            else setShiftStatus('online');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all ${
            shiftStatus === 'online'
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20'
              : shiftStatus === 'break'
              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/20'
              : 'bg-neutral-200/60 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              shiftStatus === 'online'
                ? 'bg-emerald-500 animate-pulse'
                : shiftStatus === 'break'
                ? 'bg-amber-500'
                : 'bg-neutral-400'
            }`}
          />
          <span>
            {shiftStatus === 'online' ? 'Vardiyada' : shiftStatus === 'break' ? 'Mola' : 'Kapalı'}
          </span>
        </button>
      </header>

      {/* Main Scrollable Canvas */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
        {/* Hero Card: Net Kazanç */}
        <div className="p-6 rounded-[28px] bg-white dark:bg-[#151720] shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.06] relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Net Kazanç
            </span>

            {/* Time Filter Segment */}
            <div className="flex bg-neutral-100 dark:bg-neutral-800 p-0.5 rounded-full text-[10px] font-semibold">
              <button
                onClick={() => setActiveFilter('today')}
                className={`px-2.5 py-0.5 rounded-full transition ${
                  activeFilter === 'today'
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs'
                    : 'text-neutral-500'
                }`}
              >
                Bugün
              </button>
              <button
                onClick={() => setActiveFilter('week')}
                className={`px-2.5 py-0.5 rounded-full transition ${
                  activeFilter === 'week'
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs'
                    : 'text-neutral-500'
                }`}
              >
                Hafta
              </button>
            </div>
          </div>

          <div className="mt-2">
            <div className="text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white flex items-baseline gap-1">
              <span className="text-2xl font-bold text-neutral-400 dark:text-neutral-500">₺</span>
              <span>{netEarnings.toLocaleString('tr-TR')}</span>
            </div>
          </div>

          {/* Revenue vs Expense Row */}
          <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800/80 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <ArrowUpRight className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-medium text-neutral-400">Toplam Gelir</p>
                <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  ₺{totalIncome.toLocaleString('tr-TR')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
                <ArrowDownRight className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-medium text-neutral-400">Toplam Gider</p>
                <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  ₺{totalExpense.toLocaleString('tr-TR')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            id="btn-add-income"
            onClick={() => onNavigate('add_income')}
            className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-950 font-semibold text-xs transition active:scale-[0.98] shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Kazanç Ekle</span>
          </button>

          <button
            id="btn-add-expense"
            onClick={() => onNavigate('add_expense')}
            className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-white hover:bg-neutral-100 text-neutral-900 dark:bg-[#1a1c26] dark:hover:bg-[#202330] dark:text-white font-semibold text-xs ring-1 ring-black/[0.06] dark:ring-white/[0.08] transition active:scale-[0.98] shadow-xs"
          >
            <Minus className="w-4 h-4 text-rose-500" />
            <span>Gider Ekle</span>
          </button>
        </div>

        {/* Quick Micro-Metrics */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#151720] ring-1 ring-black/[0.04] dark:ring-white/[0.06]">
            <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wide">
              Kasa Dağılımı
            </span>
            <div className="mt-1 flex flex-col gap-0.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-500 dark:text-neutral-400">Nakit:</span>
                <span className="font-bold text-neutral-900 dark:text-white">₺{cashAmount}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-500 dark:text-neutral-400">Banka:</span>
                <span className="font-bold text-neutral-900 dark:text-white">₺{accountAmount}</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#151720] ring-1 ring-black/[0.04] dark:ring-white/[0.06]">
            <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wide">
              Mesafe & Boş Yol
            </span>
            <div className="mt-1 flex flex-col gap-0.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-500 dark:text-neutral-400">Toplam:</span>
                <span className="font-bold text-neutral-900 dark:text-white">142 km</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-500 dark:text-neutral-400">Boş Yol:</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">28 km (%20)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Son Hareketler (Minimalist List) */}
        <div className="pt-1">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-bold text-neutral-900 dark:text-white">
              Son Hareketler
            </span>
            <span className="text-[11px] text-neutral-400">Bugün</span>
          </div>

          <div className="space-y-1.5">
            {recentTransactions.map((item) => {
              const Icon = item.icon;
              const isIncome = item.type === 'income';

              return (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-white dark:bg-[#151720] ring-1 ring-black/[0.04] dark:ring-white/[0.06] flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        isIncome
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-neutral-900 dark:text-white leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-neutral-400 mt-0.5">
                        {item.category} • {item.payment} • {item.time}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-bold ${
                      isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-900 dark:text-white'
                    }`}
                  >
                    {isIncome ? `+₺${item.amount}` : `-₺${item.amount}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modern Bottom Navigation */}
      <BottomNav currentScreen="home" onSelectScreen={onNavigate} />
    </div>
  );
};
