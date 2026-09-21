import React from 'react';
import { Home, Map, MessageSquare, AlertCircle } from 'lucide-react';
import { ScreenId } from '../types';

interface BottomNavProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  unreadChatsCount?: number;
  activeHazardsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onSelectScreen,
  unreadChatsCount = 2,
  activeHazardsCount = 4,
}) => {
  const isHomeActive = currentScreen === 'home' || currentScreen === 'add_income' || currentScreen === 'add_expense';
  const isMapActive = currentScreen === 'map' || currentScreen === 'hazard_detail';
  const isChatActive = currentScreen === 'chat' || currentScreen === 'create_group';
  const isSosActive = currentScreen === 'emergency_sos' || currentScreen === 'active_sos';

  const navItems = [
    {
      id: 'home' as ScreenId,
      label: 'Özet',
      icon: Home,
      isActive: isHomeActive,
      badge: null,
    },
    {
      id: 'map' as ScreenId,
      label: 'Harita',
      icon: Map,
      isActive: isMapActive,
      badge: activeHazardsCount > 0 ? activeHazardsCount : null,
      badgeVariant: 'warning',
    },
    {
      id: 'chat' as ScreenId,
      label: 'Telsiz & Sohbet',
      icon: MessageSquare,
      isActive: isChatActive,
      badge: unreadChatsCount > 0 ? unreadChatsCount : null,
      badgeVariant: 'primary',
    },
    {
      id: 'emergency_sos' as ScreenId,
      label: 'SOS Acil',
      icon: AlertCircle,
      isActive: isSosActive,
      badge: isSosActive ? '!' : null,
      badgeVariant: 'danger',
    },
  ];

  return (
    <nav
      id="bottom-navigation-bar"
      aria-label="Ana Gezinti Menüsü"
      className="shrink-0 w-full px-3 py-2 bg-white/90 dark:bg-[#11131a]/90 backdrop-blur-xl border-t border-black/[0.05] dark:border-white/[0.06] transition-colors"
    >
      <div className="grid grid-cols-4 gap-1 max-w-sm mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.isActive;
          const isSos = item.id === 'emergency_sos';

          return (
            <button
              key={item.id}
              id={`nav-btn-${item.id}`}
              onClick={() => onSelectScreen(item.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 rounded-2xl transition-all duration-200 select-none group ${
                active
                  ? isSos
                    ? 'text-rose-600 dark:text-rose-400'
                    : 'text-neutral-950 dark:text-white'
                  : 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
              }`}
            >
              {/* Icon Container with Badge */}
              <div className="relative flex items-center justify-center">
                <div
                  className={`w-10 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                    active
                      ? isSos
                        ? 'bg-rose-50 dark:bg-rose-950/50'
                        : 'bg-neutral-100 dark:bg-neutral-800'
                      : 'group-hover:bg-neutral-50 dark:group-hover:bg-neutral-900/50'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-transform duration-150 ${
                      active ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                    }`}
                  />
                </div>

                {item.badge && (
                  <span
                    className={`absolute -top-1 -right-1 text-[9px] font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center text-white shadow-sm leading-none ${
                      item.badgeVariant === 'danger'
                        ? 'bg-rose-600 animate-pulse'
                        : item.badgeVariant === 'warning'
                        ? 'bg-amber-500'
                        : 'bg-emerald-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Minimal Text Label */}
              <span
                className={`text-[10px] tracking-tight mt-0.5 transition-colors ${
                  active ? 'font-semibold' : 'font-medium opacity-80'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
