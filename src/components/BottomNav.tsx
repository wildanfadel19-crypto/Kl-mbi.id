'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon as HomeOutline,
  WrenchScrewdriverIcon as WrenchOutline,
  ShoppingBagIcon as BagOutline,
  SparklesIcon as SparklesOutline,
  BellIcon as BellOutline,
  UserCircleIcon as UserOutline,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeSolid,
  WrenchScrewdriverIcon as WrenchSolid,
  ShoppingBagIcon as BagSolid,
  SparklesIcon as SparklesSolid,
  BellIcon as BellSolid,
  UserCircleIcon as UserSolid,
} from '@heroicons/react/24/solid';

const NAV_ITEMS = [
  { name: 'Beranda', href: '/', OutlineIcon: HomeOutline, SolidIcon: HomeSolid },
  { name: 'Jasa', href: '/menu-perawatan', OutlineIcon: WrenchOutline, SolidIcon: WrenchSolid },
  { name: 'Market', href: '/trift-marketplace', OutlineIcon: BagOutline, SolidIcon: BagSolid },
  { name: 'Rawat', href: '/rawat', OutlineIcon: SparklesOutline, SolidIcon: SparklesSolid },
  { name: 'Notifikasi', href: '/notifikasi', OutlineIcon: BellOutline, SolidIcon: BellSolid },
  { name: 'Saya', href: '/profil', OutlineIcon: UserOutline, SolidIcon: UserSolid },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <nav className="bg-[#1A2B5C] rounded-[28px] mx-3 mb-2 flex items-center justify-between px-2 py-2 bottom-safe shadow-modal">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = isActive ? item.SolidIcon : item.OutlineIcon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center w-[15%] h-12 transition-all ${
                  isActive ? 'bg-white/20 rounded-2xl' : ''
                }`}
              >
                <Icon
                  className={`w-6 h-6 mb-0.5 ${
                    isActive ? 'text-white' : 'text-white/70'
                  }`}
                />
                <span
                  className={`text-[10px] font-semibold ${
                    isActive ? 'text-white' : 'text-white/70'
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}