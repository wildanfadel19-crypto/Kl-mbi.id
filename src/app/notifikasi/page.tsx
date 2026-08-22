'use client';

import React from 'react';
import AppLayout from '@/components/AppLayout';
import Icon from '@/components/ui/AppIcon';

const notifications = [
  {
    id: 'notif-1',
    title: 'Pesanan Telah Tiba! 📦',
    desc: 'Jaket Denim Vintage Levi\'s 501 telah tiba di alamat Anda. Mohon konfirmasi penerimaan di Profil untuk mencairkan saldo escrow.',
    time: '10 menit lalu',
    unread: true,
    type: 'order',
  },
  {
    id: 'notif-2',
    title: 'Pengingat Perawatan Baju 👕',
    desc: 'Kemeja Flannel Sage Green Anda sudah 3 minggu belum di-spa. Yuk lakukan Deep Clean berkala agar serat kain tetap awet!',
    time: '2 jam lalu',
    unread: true,
    type: 'care',
  },
  {
    id: 'notif-[#10284D]',
    title: 'Promo Trift Drop Minggu Ini ♻️',
    desc: 'Diskon 30% untuk produk upcycle & koleksi vintage pilihan baru saja dirilis.',
    time: 'Kemarin',
    unread: false,
    type: 'promo',
  },
];

export default function NotifikasiPage() {
  return (
    <AppLayout title="Notifikasi" showBack backHref="/">
      <div className="max-w-2xl mx-auto space-y-3 pb-20">
        <div className="bg-card rounded-2xl border border-border divide-y divide-border shadow-sm overflow-hidden">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 flex items-start gap-3 transition-colors ${
                n.unread ? 'bg-secondary/30' : 'hover:bg-muted/40'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#10284D] text-white flex items-center justify-center flex-shrink-0">
                <Icon name={n.type === 'order' ? 'TruckIcon' : n.type === 'care' ? 'SparklesIcon' : 'TagIcon'} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-foreground">{n.title}</h4>
                  <span className="text-[10px] text-muted-foreground">{n.time}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{n.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
