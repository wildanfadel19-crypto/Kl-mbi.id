'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import Badge from '@/components/ui/Badge';
import { toast } from 'sonner';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatarText: string;
  memberTier: string;
  points: number;
  clothesRescued: number;
  waterSavedLitres: number;
  co2SavedKg: number;
  moneySavedRp: number;
}

const initialProfile: UserProfile = {
  name: 'Raditya Ardhani',
  email: 'raditya.ardhani@gmail.com',
  phone: '+62 812-3456-7890',
  address: 'Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan 12190',
  avatarText: 'RA',
  memberTier: 'Eco Warrior Level 2',
  points: 2450,
  clothesRescued: 14,
  waterSavedLitres: 37800,
  co2SavedKg: 56.4,
  moneySavedRp: 1680000,
};

const scanHistoryData = [
  {
    id: 'scan-1',
    itemName: 'Kemeja Katun Linen Uniqlo',
    date: '21 Agu 2026',
    score: 84,
    condition: 'Sangat Baik',
    badgeVariant: 'success' as const,
    material: '100% Katun Premium',
    recommendation: 'Jual di Trift Marketplace atau Deep Clean',
    estimatedValue: 'Rp 145.000',
  },
  {
    id: 'scan-2',
    itemName: 'Celana Jeans Selvedge Denim',
    date: '18 Agu 2026',
    score: 68,
    condition: 'Cukup Baik',
    badgeVariant: 'warning' as const,
    material: 'Denim Katun 14oz',
    recommendation: 'Perbaikan Hemming & Restorasi Warna',
    estimatedValue: 'Rp 220.000',
  },
  {
    id: 'scan-3',
    itemName: 'Jaket Windbreaker Vintage',
    date: '10 Agu 2026',
    score: 92,
    condition: 'Istimewa',
    badgeVariant: 'success' as const,
    material: 'Polyester Daur Ulang',
    recommendation: 'Kondisi Koleksi - Siap Pakai / Listing',
    estimatedValue: 'Rp 310.000',
  },
  {
    id: 'scan-4',
    itemName: 'Kaos Graphic Oversized',
    date: '02 Agu 2026',
    score: 54,
    condition: 'Perlu Perhatian',
    badgeVariant: 'danger' as const,
    material: 'Katun Combed 24s',
    recommendation: 'Rework / Upcycling Patching Desain',
    estimatedValue: 'Rp 65.000',
  },
];

const activeOrders = [
  {
    id: 'KLM-2026-0881',
    service: 'Deep Clean & Anti-Odor Spa',
    partner: 'CleanCare Signature Workshop',
    date: '20 Agu 2026',
    status: 'Sedang Proses Pengerjaan',
    statusBadge: 'info' as const,
    total: 'Rp 75.000',
    itemCount: 2,
  },
  {
    id: 'KLM-2026-0742',
    service: 'Permak & Restorasi Jahitan',
    partner: 'Taylor Studio Artisan',
    date: '12 Agu 2026',
    status: 'Selesai & Diterima',
    statusBadge: 'success' as const,
    total: 'Rp 60.000',
    itemCount: 1,
  },
];

const availableVouchers = [
  {
    id: 'vouch-1',
    title: 'Diskon 25% Jasa Perawatan',
    code: 'KLAMBICLEAN25',
    expiry: 'Berlaku s/d 31 Agu 2026',
    minSpend: 'Min. transaksi Rp 80.000',
    pointsCost: 500,
  },
  {
    id: 'vouch-2',
    title: 'Gratis Ongkir Penjemputan',
    code: 'FREEDELIVERY',
    expiry: 'Berlaku s/d 15 Sep 2026',
    minSpend: 'Tanpa min. transaksi',
    pointsCost: 350,
  },
  {
    id: 'vouch-3',
    title: 'Cashback Rp 50.000 Trift',
    code: 'TRIFTKLAMBI50',
    expiry: 'Berlaku s/d 30 Sep 2026',
    minSpend: 'Min. belanja Rp 150.000',
    pointsCost: 750,
  },
];

type ActiveTab = 'riwayat' | 'pesanan' | 'rewards' | 'pengaturan';

export default function ProfileContent() {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [activeTab, setActiveTab] = useState<ActiveTab>('riwayat');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    address: profile.address,
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Nama dan email wajib diisi!');
      return;
    }
    const initials = formData.name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join('');

    setProfile((prev) => ({
      ...prev,
      ...formData,
      avatarText: initials || 'RA',
    }));
    setIsEditing(false);
    toast.success('Profil berhasil diperbarui!');
  };

  const handleRedeemVoucher = (voucherTitle: string, cost: number) => {
    if (profile.points < cost) {
      toast.error('Poin tidak mencukupi untuk menukar voucher ini.');
      return;
    }
    setProfile((prev) => ({
      ...prev,
      points: prev.points - cost,
    }));
    toast.success(`Voucher "${voucherTitle}" berhasil ditukarkan!`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Profile Header Card */}
      <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/10 to-accent/20 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl gradient-green flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-md border-2 border-white">
                {profile.avatarText}
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-card border border-border rounded-full flex items-center justify-center text-primary hover:bg-secondary transition-colors shadow-sm"
                title="Edit Profil"
                aria-label="Edit Profil"
              >
                <Icon name="PencilSquareIcon" size={14} />
              </button>
            </div>

            {/* User Meta */}
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-bold text-foreground">
                  {profile.name}
                </h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-secondary text-primary border border-accent/30">
                  <Icon name="SparklesIcon" size={12} variant="solid" />
                  {profile.memberTier}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                {profile.email} • {profile.phone}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                📍 {profile.address}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="btn-secondary text-xs sm:text-sm py-2 px-4 flex items-center gap-1.5 w-full sm:w-auto justify-center"
          >
            <Icon name="UserIcon" size={15} />
            Edit Info
          </button>
        </div>

        {/* Eco Impact Metrics Bar */}
        <div className="mt-6 pt-5 border-t border-border grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-secondary/50 rounded-xl border border-border/60">
            <div className="flex items-center gap-1.5 text-primary text-xs font-medium mb-1">
              <Icon name="SparklesIcon" size={14} />
              Baju Terselamatkan
            </div>
            <p className="text-lg font-extrabold text-foreground">
              {profile.clothesRescued}{' '}
              <span className="text-xs font-normal text-muted-foreground">helai</span>
            </p>
          </div>

          <div className="p-3 bg-secondary/50 rounded-xl border border-border/60">
            <div className="flex items-center gap-1.5 text-info text-xs font-medium mb-1">
              <Icon name="CloudArrowDownIcon" size={14} />
              Air Dihemat
            </div>
            <p className="text-lg font-extrabold text-foreground">
              {(profile.waterSavedLitres / 1000).toFixed(1)}k{' '}
              <span className="text-xs font-normal text-muted-foreground">Liter</span>
            </p>
          </div>

          <div className="p-3 bg-secondary/50 rounded-xl border border-border/60">
            <div className="flex items-center gap-1.5 text-accent text-xs font-medium mb-1">
              <Icon name="GlobeAmericasIcon" size={14} />
              Jejak Karbon
            </div>
            <p className="text-lg font-extrabold text-foreground">
              -{profile.co2SavedKg}{' '}
              <span className="text-xs font-normal text-muted-foreground">kg CO₂</span>
            </p>
          </div>

          <div className="p-3 bg-secondary/50 rounded-xl border border-border/60">
            <div className="flex items-center gap-1.5 text-warning text-xs font-medium mb-1">
              <Icon name="CurrencyDollarIcon" size={14} />
              Klámbi Poin
            </div>
            <p className="text-lg font-extrabold text-primary">
              {profile.points.toLocaleString('id-ID')}{' '}
              <span className="text-xs font-normal text-muted-foreground">pts</span>
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-border gap-2 overflow-x-auto scrollbar-hide pb-0.5">
        <button
          onClick={() => setActiveTab('riwayat')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all duration-150 whitespace-nowrap ${
            activeTab === 'riwayat'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name="ClockIcon" size={16} />
          Riwayat Scan ({scanHistoryData.length})
        </button>

        <button
          onClick={() => setActiveTab('pesanan')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all duration-150 whitespace-nowrap ${
            activeTab === 'pesanan'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name="TruckIcon" size={16} />
          Pesanan Layanan ({activeOrders.length})
        </button>

        <button
          onClick={() => setActiveTab('rewards')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all duration-150 whitespace-nowrap ${
            activeTab === 'rewards'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name="GiftIcon" size={16} />
          Tukar Poin & Voucher
        </button>

        <button
          onClick={() => setActiveTab('pengaturan')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all duration-150 whitespace-nowrap ${
            activeTab === 'pengaturan'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name="Cog6ToothIcon" size={16} />
          Pengaturan
        </button>
      </div>

      {/* Tab 1: Riwayat Scan */}
      {activeTab === 'riwayat' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground">
              Hasil Analisis Pakaian Terbaru
            </h3>
            <span className="text-xs text-muted-foreground">
              Disimpan otomatis oleh AI Klámbi
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {scanHistoryData.map((item) => (
              <div
                key={item.id}
                className="bg-card border border-border rounded-xl p-4 hover:border-accent transition-colors shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-foreground">
                        {item.itemName}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.date} • {item.material}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-secondary text-primary font-bold text-xs">
                        <span>Skor AI:</span>
                        <span className="text-sm">{item.score}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 p-2.5 bg-muted/60 rounded-lg text-xs">
                    <span className="text-muted-foreground font-medium">
                      Rekomendasi AI:
                    </span>{' '}
                    <span className="text-foreground font-semibold">
                      {item.recommendation}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-border/70 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    Estimasi Nilai:{' '}
                    <strong className="text-primary">{item.estimatedValue}</strong>
                  </span>
                  <button
                    onClick={() =>
                      toast.info(`Membuka opsi tindak lanjut untuk ${item.itemName}`)
                    }
                    className="text-primary hover:underline font-semibold flex items-center gap-1"
                  >
                    Tindak Lanjut <Icon name="ArrowRightIcon" size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Pesanan Layanan */}
      {activeTab === 'pesanan' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground">
              Daftar Pesanan & Tracking Perawatan
            </h3>
          </div>

          <div className="space-y-3">
            {activeOrders.map((order) => (
              <div
                key={order.id}
                className="bg-card border border-border rounded-xl p-4 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      #{order.id}
                    </span>
                    <h4 className="font-bold text-sm text-foreground mt-1">
                      {order.service}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Mitra: {order.partner} • {order.itemCount} Pakaian
                    </p>
                  </div>
                  <div className="flex sm:flex-col sm:items-end justify-between items-center gap-1">
                    <span className="text-sm font-extrabold text-primary">
                      {order.total}
                    </span>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                        order.statusBadge === 'info'
                          ? 'bg-info-bg text-info border border-info/30'
                          : 'bg-secondary text-primary border border-accent/30'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Tanggal: {order.date}</span>
                  <button
                    onClick={() => toast.success(`Lacak kurir pesanan #${order.id}`)}
                    className="btn-secondary py-1 px-3 text-xs"
                  >
                    Lacak Status
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Rewards & Voucher */}
      {activeTab === 'rewards' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-primary to-accent text-white p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
            <div>
              <p className="text-xs text-white/80 font-medium">Saldo Klámbi Poin Kamu</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold mt-0.5">
                {profile.points.toLocaleString('id-ID')}{' '}
                <span className="text-sm font-normal text-white/90">Poin</span>
              </h3>
              <p className="text-xs text-white/80 mt-1">
                Dapatkan poin dari setiap scan baju, reparasi, dan transaksi sirkular!
              </p>
            </div>
            <button
              onClick={() => toast.info('Cara dapat poin: Lakukan scan baju baru (+50 pts) atau booking layanan (+150 pts)')}
              className="bg-white text-primary px-4 py-2 rounded-xl text-xs font-bold hover:bg-white/90 transition-colors shadow-sm"
            >
              Cara Dapat Poin
            </button>
          </div>

          <h4 className="text-sm font-bold text-foreground">Voucher Tersedia</h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {availableVouchers.map((v) => (
              <div
                key={v.id}
                className="bg-card border border-border rounded-xl p-4 flex flex-col justify-between hover:border-accent transition-colors shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-accent bg-secondary px-2 py-0.5 rounded-md">
                      {v.pointsCost} Poin
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {v.expiry}
                    </span>
                  </div>
                  <h5 className="font-bold text-sm text-foreground">{v.title}</h5>
                  <p className="text-xs text-muted-foreground mt-1">{v.minSpend}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-primary bg-muted px-2 py-1 rounded">
                    {v.code}
                  </span>
                  <button
                    onClick={() => handleRedeemVoucher(v.title, v.pointsCost)}
                    className="btn-primary py-1 px-3 text-xs"
                  >
                    Tukar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Pengaturan */}
      {activeTab === 'pengaturan' && (
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-2xl divide-y divide-border shadow-sm">
            <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/40 transition-colors" onClick={() => setIsEditing(true)}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-primary">
                  <Icon name="UserIcon" size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Edit Profil & Kontak</h4>
                  <p className="text-xs text-muted-foreground">Ubah nama, nomor telepon, dan email</p>
                </div>
              </div>
              <Icon name="ChevronRightIcon" size={18} className="text-muted-foreground" />
            </div>

            <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/40 transition-colors" onClick={() => setIsEditing(true)}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-primary">
                  <Icon name="MapPinIcon" size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Alamat Penjemputan</h4>
                  <p className="text-xs text-muted-foreground">{profile.address}</p>
                </div>
              </div>
              <Icon name="ChevronRightIcon" size={18} className="text-muted-foreground" />
            </div>

            <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/40 transition-colors" onClick={() => toast.info('Preferensi notifikasi telah disimpan')}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-primary">
                  <Icon name="BellIcon" size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Notifikasi & Pengingat Perawatan</h4>
                  <p className="text-xs text-muted-foreground">Pengingat berkala deep-clean pakaian kesayangan</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-primary">Aktif</span>
            </div>

            <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/40 transition-colors" onClick={() => toast.info('Pusat Bantuan Klámbi: Hubungi kami di support@klambi.id')}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-primary">
                  <Icon name="QuestionMarkCircleIcon" size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Pusat Bantuan & FAQ</h4>
                  <p className="text-xs text-muted-foreground">Panduan menggunakan AI scan & sistem escrow</p>
                </div>
              </div>
              <Icon name="ChevronRightIcon" size={18} className="text-muted-foreground" />
            </div>

            <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-danger-bg/40 transition-colors" onClick={() => toast.info('Fitur keluar akun')}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-danger-bg flex items-center justify-center text-danger">
                  <Icon name="ArrowLeftOnRectangleIcon" size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-danger">Keluar Akun</h4>
                  <p className="text-xs text-muted-foreground">Keluar dari sesi perangkat ini</p>
                </div>
              </div>
              <Icon name="ChevronRightIcon" size={18} className="text-danger" />
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-xl animate-scale-in">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Icon name="UserCircleIcon" size={20} className="text-primary" />
                Edit Profil Pengguna
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground"
                aria-label="Tutup"
              >
                <Icon name="XMarkIcon" size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                  className="w-full bg-input border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                  className="w-full bg-input border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Nomor WhatsApp / Telepon
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  required
                  className="w-full bg-input border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Alamat Lengkap Penjemputan
                </label>
                <textarea
                  rows={3}
                  value={formData.address}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, address: e.target.value }))
                  }
                  required
                  className="w-full bg-input border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn-secondary flex-1 py-2.5 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1 py-2.5 text-xs font-semibold"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
