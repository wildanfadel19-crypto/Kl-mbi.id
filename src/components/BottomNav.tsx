'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

const navItems = [
  { href: '/', label: 'Scan', icon: 'CameraIcon' as const },
  { href: '/menu-perawatan', label: 'Perawatan', icon: 'SparklesIcon' as const },
  { href: '/trift-marketplace', label: 'Trift', icon: 'ShoppingBagIcon' as const },
  { href: '/profil', label: 'Profil', icon: 'UserCircleIcon' as const },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border bottom-safe">
      <div className="flex items-center justify-around px-2 pt-2 pb-2 max-w-screen-sm mx-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);
          return (
            <Link
              key={`nav-${item.href}`}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 min-w-[60px] ${
                isActive
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div
                className={`flex items-center justify-center w-10 h-8 rounded-xl transition-all duration-200 ${
                  isActive ? 'bg-secondary' : ''
                }`}
              >
                <Icon
                  name={item.icon}
                  size={22}
                  variant={isActive ? 'solid' : 'outline'}
                  className={isActive ? 'text-primary' : 'text-muted-foreground'}
                />
              </div>
              <span
                className={`text-[11px] font-600 transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}