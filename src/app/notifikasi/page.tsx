'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import AppLayout from '@/components/AppLayout';
import Icon from '@/components/ui/AppIcon';

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  type: 'order' | 'care' | 'promo' | 'ai';
  categoryLabel: string;
  targetHref?: string;
  actionText?: string;
  details?: string;
}

const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Pesanan Telah Tiba di Lokasi! 📦',
    desc: 'Jaket Denim Vintage Levi\'s 501 pesanan Anda telah tiba. Mohon konfirmasi penerimaan di Profil untuk menyelesaikan pencairan escrow aman.',
    time: '10 menit lalu',
    unread: true,
    type: 'order',
    categoryLabel: 'Transaksi',
    targetHref: '/profil',
    actionText: 'Konfirmasi Pesanan',
    details: 'Nomor Resi: JNE-KLM-992148. Pembayaran disimpan aman oleh sistem Escrow Klámbi.',
  },
  {
    id: 'notif-2',
    title: 'Pengingat Perawatan Baju Mingguan 👕',
    desc: 'Kemeja Flannel Sage Green sudah 3 minggu belum di-spa. Yuk lakukan Deep Clean berkala agar serat katun organik tetap lembut dan tahan lama!',
    time: '2 jam lalu',
    unread: true,
    type: 'care',
    categoryLabel: 'Perawatan',
    targetHref: '/rawat',
    actionText: 'Lihat Care Plan',
    details: 'Rekomendasi tindakan: Cuci dengan air dingin dan gunakan 1 lembar Kindfoam eco-detergent.',
  },
  {
    id: 'notif-3',
    title: 'Hasil Diagnosis Wearwise AI Tersedia 🔍',
    desc: 'Scan Jaket Patchwork Denim telah selesai dianalisis. Skor kesehatan serat kain: 92/100 (Sangat Baik).',
    time: '5 jam lalu',
    unread: true,
    type: 'ai',
    categoryLabel: 'Info AI',
    targetHref: '/rawat',
    actionText: 'Buka Hasil AI',
    details: 'AI mendeteksi kain bebas jamur dan jahitan kelim dalam kondisi sangat kokoh.',
  },
  {
    id: 'notif-4',
    title: 'Promo Trift & Upcycle Drop Minggu Ini ♻️',
    desc: 'Diskon 30% untuk produk upcycle artisan & koleksi vintage denim baru saja dirilis di Marketplace.',
    time: 'Kemarin',
    unread: false,
    type: 'promo',
    categoryLabel: 'Promo',
    targetHref: '/trift-marketplace',
    actionText: 'Cek Koleksi Promo',
    details: 'Gunakan kode promo SIRKULAR30 saat checkout untuk mendapatkan potongan harga langsung.',
  },
  {
    id: 'notif-5',
    title: 'Saldo Escrow Rp 185.000 Berhasil Dicairkan 💰',
    desc: 'Pembeli telah mengonfirmasi penerimaan Jaket Upcycle Anda. Saldo dompet Klámbi bertambah.',
    time: '2 hari lalu',
    unread: false,
    type: 'order',
    categoryLabel: 'Transaksi',
    targetHref: '/profil',
    actionText: 'Lihat Dompet Escrow',
    details: 'Dana dapat ditarik langsung ke rekening BCA/Mandiri atau e-wallet tanpa biaya admin.',
  },
];

export default function NotifikasiPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'order' | 'care' | 'promo' | 'ai'>('all');
  const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);

  const filterTabs = [
    { id: 'all', label: 'Semua' },
    { id: 'order', label: 'Transaksi' },
    { id: 'care', label: 'Perawatan' },
    { id: 'ai', label: 'Info AI' },
    { id: 'promo', label: 'Promo' },
  ];

  const filteredNotifications = notifications.filter((n) => {
    if (selectedFilter === 'all') return true;
    return n.type === selectedFilter;
  });

  const unreadTotal = notifications.filter((n) => n.unread).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    toast.success('Semua notifikasi telah ditandai dibaca');
  };

  const handleNotificationClick = (item: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, unread: false } : n))
    );
    setSelectedNotification(item);
  };

  const handleDeleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.info('Notifikasi dihapus');
  };

  return (
    <AppLayout
      title="Notifikasi"
      showBack
      backHref="/"
      headerRight={
        unreadTotal > 0 ? (
          <button
            onClick={markAllAsRead}
            className="text-[11px] font-extrabold text-[#10284D] bg-secondary hover:bg-muted px-2.5 py-1.5 rounded-xl transition-all active:scale-95"
          >
            Tandai Dibaca
          </button>
        ) : null
      }
    >
      <div className="max-w-2xl mx-auto space-y-4 pb-24 select-none">
        {/* Banner Summary */}
        <div className="bg-[#10284D] text-white rounded-3xl p-5 shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-sm sm:text-base font-extrabold">Pusat Notifikasi & Pengingat</h2>
            <p className="text-xs text-white/80">
              {unreadTotal > 0
                ? `Kamu punya ${unreadTotal} pesan baru yang belum dibaca`
                : 'Semua notifikasi sudah dibaca dengan rapi'}
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-2xl">
            🔔
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedFilter === tab.id
                  ? 'bg-[#10284D] text-white shadow-xs'
                  : 'bg-card border border-border text-muted-foreground hover:border-[#10284D]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notification List */}
        {filteredNotifications.length === 0 ? (
          <div className="bg-card rounded-3xl p-8 border border-border text-center space-y-2 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-muted mx-auto flex items-center justify-center text-2xl">
              📭
            </div>
            <h3 className="text-xs font-bold text-foreground">Tidak Ada Notifikasi</h3>
            <p className="text-[11px] text-muted-foreground">
              Belum ada notifikasi pada kategori ini.
            </p>
          </div>
        ) : (
          <div className="bg-card rounded-2xl border border-border divide-y divide-border shadow-sm overflow-hidden">
            {filteredNotifications.map((n) => (
              <div
                key={n.id}
                onClick={() => handleNotificationClick(n)}
                className={`p-4 flex items-start gap-3.5 transition-colors cursor-pointer hover:bg-slate-50 relative ${
                  n.unread ? 'bg-blue-50/40' : ''
                }`}
              >
                {/* Unread indicator dot */}
                {n.unread && (
                  <span className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-[#E86D50] animate-pulse" />
                )}

                {/* Icon Box */}
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 text-xl shadow-xs ${
                    n.type === 'order'
                      ? 'bg-blue-100 text-blue-700'
                      : n.type === 'care'
                      ? 'bg-emerald-100 text-emerald-700'
                      : n.type === 'ai'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-purple-100 text-purple-700'
                  }`}
                >
                  <span>
                    {n.type === 'order' ? '📦' : n.type === 'care' ? '👕' : n.type === 'ai' ? '✨' : '🎁'}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pr-4 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] bg-secondary text-primary font-bold px-1.5 py-0.2 rounded">
                      {n.categoryLabel}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{n.time}</span>
                  </div>

                  <h4 className="text-xs font-extrabold text-[#10284D] leading-tight">{n.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {n.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* INTERACTIVE BUBBLE MODAL FOR NOTIFICATION DETAIL */}
        {selectedNotification && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 w-full max-w-md text-gray-800 space-y-4 animate-scale-in shadow-2xl">
              <div className="flex items-start justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl">
                    {selectedNotification.type === 'order'
                      ? '📦'
                      : selectedNotification.type === 'care'
                      ? '👕'
                      : selectedNotification.type === 'ai'
                      ? '✨'
                      : '🎁'}
                  </div>
                  <div>
                    <span className="text-[10px] bg-secondary text-primary font-bold px-2 py-0.5 rounded">
                      {selectedNotification.categoryLabel}
                    </span>
                    <h3 className="font-extrabold text-sm text-[#10284D] mt-1 leading-snug">
                      {selectedNotification.title}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNotification(null)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <Icon name="XMarkIcon" size={20} />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <p className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-2xl border border-gray-100">
                  {selectedNotification.desc}
                </p>

                {selectedNotification.details && (
                  <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100 text-blue-950 text-[11px] space-y-1">
                    <strong className="block">Informasi Tambahan:</strong>
                    <p>{selectedNotification.details}</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setSelectedNotification(null)}
                  className="border border-gray-300 text-gray-700 py-3 rounded-2xl text-xs font-bold hover:bg-gray-50 active:scale-95 transition-all"
                >
                  Tutup
                </button>

                {selectedNotification.targetHref && (
                  <button
                    onClick={() => {
                      const href = selectedNotification.targetHref!;
                      setSelectedNotification(null);
                      router.push(href);
                    }}
                    className="bg-[#10284D] text-white py-3 rounded-2xl text-xs font-bold shadow-md hover:bg-[#152248] active:scale-95 transition-all text-center"
                  >
                    {selectedNotification.actionText || 'Lihat Detail →'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
