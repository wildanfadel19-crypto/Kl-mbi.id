'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/AppLayout';
import Icon from '@/components/ui/AppIcon';

export default function RawatPage() {
  const router = useRouter();

  return (
    <AppLayout title="Rawat & Fitur AI" showBack backHref="/">
      <div className="max-w-2xl mx-auto space-y-4 pb-20">
        {/* Banner */}
        <div className="bg-[#10284D] text-white rounded-3xl p-6 shadow-md space-y-2">
          <h2 className="text-base font-extrabold text-[#E8C547]">
            Rawat Pakaian & Perpanjang Usianya!
          </h2>
          <p className="text-xs text-white/90 leading-relaxed">
            Gunakan fitur AI Klámbi untuk menganalisis kondisi serat kain, fitting manekin 3D, dan mencari tukang permak / spa terdekat.
          </p>
        </div>

        {/* Feature Buttons Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div
            onClick={() => router.push('/wearwise-ai')}
            className="bg-card rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-all cursor-pointer space-y-2 text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FFF3E0] text-[#E65100] mx-auto flex items-center justify-center">
              <Icon name="QrCodeIcon" size={24} />
            </div>
            <h3 className="text-xs font-bold text-foreground">Wearwise AI</h3>
            <p className="text-[10px] text-muted-foreground">Scan kondisi baju & diagnosis AI</p>
          </div>

          <div
            onClick={() => router.push('/care-plan')}
            className="bg-card rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-all cursor-pointer space-y-2 text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FCE4EC] text-[#C62828] mx-auto flex items-center justify-center">
              <Icon name="HeartIcon" size={24} />
            </div>
            <h3 className="text-xs font-bold text-foreground">Care Plan</h3>
            <p className="text-[10px] text-muted-foreground">Histori & panduan cuci/simpan</p>
          </div>

          <div
            onClick={() => router.push('/styliss-ai')}
            className="bg-card rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-all cursor-pointer space-y-2 text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#D1FAE5] text-[#166534] mx-auto flex items-center justify-center">
              <Icon name="UserIcon" size={24} />
            </div>
            <h3 className="text-xs font-bold text-foreground">Styliss AI</h3>
            <p className="text-[10px] text-muted-foreground">Mannequin 3D fitting 360°</p>
          </div>

          <div
            onClick={() => router.push('/cari-jasa')}
            className="bg-card rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-all cursor-pointer space-y-2 text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#EDF0F7] text-[#10284D] mx-auto flex items-center justify-center">
              <Icon name="WrenchScrewdriverIcon" size={24} />
            </div>
            <h3 className="text-xs font-bold text-foreground">Cari Jasa</h3>
            <p className="text-[10px] text-muted-foreground">Cari tailor & spa terdekat</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
