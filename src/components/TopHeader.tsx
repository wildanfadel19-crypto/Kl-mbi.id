'use client';
import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

interface TopHeaderProps {
  title?: string;
  showBack?: boolean;
  backHref?: string;
  headerRight?: React.ReactNode;
}

export default function TopHeader({
  title,
  showBack = false,
  backHref = '/',
  headerRight,
}: TopHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border h-16 flex items-center px-4 shadow-card">
      <div className="max-w-screen-2xl mx-auto w-full flex items-center justify-between gap-3">
        {/* Left */}
        <div className="flex items-center gap-3 min-w-0">
          {showBack ? (
            <Link
              href={backHref}
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-muted hover:bg-secondary transition-colors flex-shrink-0"
              aria-label="Kembali"
            >
              <Icon name="ArrowLeftIcon" size={20} className="text-foreground" />
            </Link>
          ) : null}
          {!showBack && (
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <AppLogo src="/assets/images/app_logo.png" width={130} height={34} />
            </Link>
          )}
          {title && (
            <h1 className="text-base font-700 text-foreground truncate">
              {title}
            </h1>
          )}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {headerRight ?? (
            <>
              <button
                className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-muted hover:bg-secondary transition-colors"
                aria-label="Notifikasi"
              >
                <Icon name="BellIcon" size={20} className="text-foreground" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-warning border-2 border-card" />
              </button>
              <button
                className="flex items-center justify-center w-9 h-9 rounded-full overflow-hidden border-2 border-accent"
                aria-label="Profil pengguna"
              >
                <div className="w-full h-full gradient-green flex items-center justify-center">
                  <span className="text-xs font-bold text-white">RA</span>
                </div>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}