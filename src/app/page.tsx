'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/AppLayout';
import Icon from '@/components/ui/AppIcon';

const promoSlides = [
  {
    title: 'kindfoam',
    badge: 'BARU!',
    subtitle: '1 Lembar. Cukup Bersih. 1 Cucian.',
    description: 'Deterjen lembaran praktis, bersih maksimal, dan ramah untuk bumi.',
    cta: 'BELI SEKARANG! →',
    link: '/trift-marketplace',
    isKindfoam: true,
  },
  {
    title: 'Scan & Rawat Bajumu 👕',
    badge: 'AI CARE',
    subtitle: 'Analisis AI gratis untuk 5 baju pertamamu',
    description: 'Kenali kondisi serat & rawat pakaian kesayanganmu.',
    cta: 'Mulai Scan',
    link: '/wearwise-ai',
    isKindfoam: false,
  },
  {
    title: 'Eco-Fashion Sale 🌿',
    badge: 'PROMO',
    subtitle: 'Diskon 30% produk upcycle & vintage pilihan',
    description: 'Kurangi limbah tekstil dengan berbelanja sirkular.',
    cta: 'Lihat Koleksi',
    link: '/trift-marketplace',
    isKindfoam: false,
  },
];

const categories = ['Semua', 'Kemeja', 'Celana', 'Dress', 'Jaket', 'Kaos', 'Aksesoris'];

const featuredProducts = [
  {
    categoryTitle: 'Patchwork Denim Jacket',
    name: 'Jaket warna-warni',
    priceNow: 185000,
    priceOrig: 250000,
    condition: 'Sangat Baik',
  },
  {
    categoryTitle: 'Graphic Long Sleeve Tee',
    name: 'Atasan biru motif',
    priceNow: 120000,
    priceOrig: 200000,
    condition: 'Baik',
  },
  {
    categoryTitle: 'Graphic Mini Skirt',
    name: 'Bawahan motif',
    priceNow: 95000,
    priceOrig: 150000,
    condition: 'Baik',
  },
  {
    categoryTitle: 'Windbreaker 90s Vintage',
    name: 'Jaket parasut retro',
    priceNow: 175000,
    priceOrig: 350000,
    condition: 'Sangat Baik',
  },
];

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 6) return 'Malam';
  if (h < 12) return 'Pagi';
  if (h < 15) return 'Siang';
  if (h < 18) return 'Sore';
  return 'Malam';
}

export default function BerandaPage() {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Count-up animation state for Impact Tracker
  const [countProgress, setCountProgress] = useState(0);
  const [countKg, setCountKg] = useState(0);
  const [countRank, setCountRank] = useState(1);
  const [countScan, setCountScan] = useState(0);

  useEffect(() => {
    // Simulasi alur entry: jika belum melintasi splash screen pada sesi ini, arahkan ke splash screen
    const hasSplashed = sessionStorage.getItem('klambi_splashed');

    if (!hasSplashed) {
      sessionStorage.setItem('klambi_splashed', 'true');
      router.push('/splash');
    }
  }, [router]);

  useEffect(() => {
    // Promo banner carousel timer
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % promoSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Count-up animation for impact metrics on page load
    const duration = 1200; // ms
    const steps = 30;
    const intervalTime = duration / steps;
    let currentStep = 0;

    const countInterval = setInterval(() => {
      currentStep++;
      const factor = currentStep / steps;

      setCountProgress(Math.round(32 * factor));
      setCountKg(Number((12.5 * factor).toFixed(1)));
      setCountRank(Math.max(8, Math.round(50 - 42 * factor)));
      setCountScan(Math.round(12 * factor));

      if (currentStep >= steps) {
        clearInterval(countInterval);
      }
    }, intervalTime);

    return () => clearInterval(countInterval);
  }, []);

  const greeting = getGreeting();

  return (
    <AppLayout
      headerRight={
        <div className="flex items-center gap-2">
          {/* Icon Keranjang -> /keranjang */}
          <button
            onClick={() => router.push('/keranjang')}
            className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-muted hover:bg-secondary transition-colors active:scale-95"
            aria-label="Keranjang"
          >
            <Icon name="ShoppingCartIcon" size={20} className="text-foreground" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#E86D50] text-white text-[9px] font-bold flex items-center justify-center">
              3
            </span>
          </button>
          {/* Icon Chat -> /chat */}
          <button
            onClick={() => router.push('/chat')}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-muted hover:bg-secondary transition-colors active:scale-95"
            aria-label="Chat"
          >
            <Icon name="ChatBubbleLeftRightIcon" size={20} className="text-foreground" />
          </button>
        </div>
      }
    >
      <div className="max-w-2xl mx-auto space-y-5">
        {/* a. Kartu Sapaan */}
        <div
          onClick={() => router.push('/profil')}
          className="bg-card rounded-2xl shadow-sm border border-border p-4 flex items-center gap-4 cursor-pointer hover:shadow-md active:scale-[0.99] transition-all"
        >
          {/* Avatar Illustration */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-inner overflow-hidden border-2 border-white">
            <span className="text-lg">🧑‍🦱</span>
          </div>
          <div>
            <h2 className="text-base font-extrabold text-foreground">
              {greeting}, Muhammad Hafiz Maulana
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Kenali Kondisinya, Tentukan Langkahnya!
            </p>
          </div>
        </div>

        {/* b. Banner Promosi Carousel (Kindfoam) */}
        <div>
          <div className="relative overflow-hidden rounded-2xl shadow-sm">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {promoSlides.map((slide, i) => (
                <div
                  key={i}
                  className="w-full flex-shrink-0 bg-gradient-to-r from-[#0F3875] via-[#1E5FA8] to-[#4294E3] rounded-2xl p-5 min-h-[145px] flex flex-col justify-between text-white relative overflow-hidden"
                >
                  {/* Decorative bubble effect */}
                  <div className="absolute right-4 top-4 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none" />
                  <div className="absolute right-16 bottom-2 w-16 h-16 rounded-full bg-cyan-300/20 blur-lg pointer-events-none" />

                  <div className="relative z-10 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-cyan-400/30 text-cyan-200 text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider border border-cyan-300/30">
                        {slide.badge}
                      </span>
                      <span className="text-lg font-black tracking-tight">{slide.title}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white/95">{slide.subtitle}</h3>
                    <p className="text-[11px] text-white/80 max-w-xs leading-tight">
                      {slide.description}
                    </p>
                  </div>

                  <div className="relative z-10 pt-2">
                    <button
                      onClick={() => router.push(slide.link)}
                      className="bg-white text-[#10284D] rounded-full px-4 py-1.5 text-[11px] font-extrabold hover:bg-white/90 active:scale-95 transition-all shadow-sm flex items-center gap-1"
                    >
                      {slide.cta}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {promoSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeSlide
                    ? 'bg-[#10284D] w-6'
                    : 'bg-[#10284D]/30 w-2 hover:bg-[#10284D]/50'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* c. Kartu Impact Tracker (Count-up Animation) */}
        <div
          onClick={() => router.push('/dampak')}
          className="bg-card rounded-2xl shadow-sm border border-border p-4 cursor-pointer hover:shadow-md active:scale-[0.99] transition-all"
        >
          <div className="grid grid-cols-4 gap-0">
            {/* Donut Chart Progress */}
            <div className="flex flex-col items-center justify-center border-r border-border pr-2">
              <svg width="44" height="44" viewBox="0 0 44 44" className="mb-1">
                <circle cx="22" cy="22" r="18" fill="none" stroke="#ECEEF3" strokeWidth="5" />
                <circle
                  cx="22" cy="22" r="18" fill="none"
                  stroke="#10284D" strokeWidth="5"
                  strokeDasharray="113.1" strokeDashoffset={113.1 * (1 - countProgress / 100)}
                  strokeLinecap="round"
                  transform="rotate(-90 22 22)"
                />
                <text x="22" y="22" textAnchor="middle" dy="0.35em" className="text-[10px] font-extrabold fill-foreground">
                  {countProgress}%
                </text>
              </svg>
              <span className="text-[10px] text-muted-foreground font-medium">Target</span>
            </div>

            {/* Weight Saved */}
            <div className="flex flex-col items-center justify-center border-r border-border px-2">
              <span className="text-emerald-600 text-sm mb-0.5">🍃</span>
              <span className="text-base font-extrabold text-foreground">{countKg} kg</span>
              <span className="text-[10px] text-muted-foreground">Diselamatkan</span>
            </div>

            {/* Ranking */}
            <div className="flex flex-col items-center justify-center border-r border-border px-2">
              <span className="text-sm mb-0.5">🏆</span>
              <span className="text-base font-extrabold text-foreground">#{countRank}</span>
              <span className="text-[10px] text-muted-foreground">Peringkat</span>
            </div>

            {/* Scan Count */}
            <div className="flex flex-col items-center justify-center pl-2">
              <span className="text-sm mb-0.5">👔</span>
              <span className="text-base font-extrabold text-foreground">{countScan}</span>
              <span className="text-[10px] text-muted-foreground">Discan</span>
            </div>
          </div>
        </div>

        {/* d. 3 Kartu Fitur Utama (Styliss AI, Care Plan, Wearwise AI) */}
        <div className="grid grid-cols-3 gap-3">
          {/* Styliss AI */}
          <div
            onClick={() => router.push('/styliss-ai')}
            className="bg-[#D1FAE5]/60 border border-[#D1FAE5] rounded-2xl p-3.5 text-center cursor-pointer hover:shadow-md active:scale-95 transition-all"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#D1FAE5] mx-auto mb-2 flex items-center justify-center shadow-inner">
              <span className="text-xl">🧍</span>
            </div>
            <h4 className="font-bold text-xs text-foreground">Styliss AI</h4>
            <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">See Your Style in 3D</p>
          </div>

          {/* Care Plan */}
          <div
            onClick={() => router.push('/care-plan')}
            className="bg-[#FCE4EC]/60 border border-[#FCE4EC] rounded-2xl p-3.5 text-center cursor-pointer hover:shadow-md active:scale-95 transition-all"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#FCE4EC] mx-auto mb-2 flex items-center justify-center shadow-inner">
              <span className="text-xl">❤️</span>
            </div>
            <h4 className="font-bold text-xs text-foreground">Care Plan</h4>
            <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">Your Guide to Better Care</p>
          </div>

          {/* Wearwise AI */}
          <div
            onClick={() => router.push('/wearwise-ai')}
            className="bg-[#FFF3E0]/60 border border-[#FFF3E0] rounded-2xl p-3.5 text-center cursor-pointer hover:shadow-md active:scale-95 transition-all"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#FFF3E0] mx-auto mb-2 flex items-center justify-center shadow-inner">
              <Icon name="QrCodeIcon" size={22} className="text-amber-800" />
            </div>
            <h4 className="font-bold text-xs text-foreground">Wearwise AI</h4>
            <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">Know Before You Decide</p>
          </div>
        </div>

        {/* e. Filter Kategori Pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#10284D] text-white shadow-sm'
                  : 'bg-white text-foreground border border-border hover:border-[#10284D]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* f. Featured Drops Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-extrabold text-foreground">Featured Drops</h3>
            <button
              onClick={() => router.push('/trift-marketplace')}
              className="text-[#E86D50] text-xs font-bold hover:underline"
            >
              Lihat lainnya
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {featuredProducts.map((product, i) => (
              <div
                key={i}
                onClick={() => router.push('/trift-marketplace')}
                className="w-[160px] flex-shrink-0 bg-card rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md active:scale-95 transition-all cursor-pointer"
              >
                {/* Image Placeholder */}
                <div className="w-full h-[125px] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-3">
                  <Icon name="ShoppingBagIcon" size={32} className="text-slate-400" />
                </div>

                {/* Content */}
                <div className="p-3 space-y-1">
                  <span className="text-[10px] text-muted-foreground block truncate">
                    {product.categoryTitle}
                  </span>
                  <h4 className="text-xs font-bold text-foreground truncate">
                    {product.name}
                  </h4>
                  <div className="flex items-baseline gap-1 pt-0.5">
                    <span className="text-[#E86D50] text-xs font-extrabold">
                      Rp{product.priceNow.toLocaleString('id-ID')},00
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-[9px] text-muted-foreground line-through">
                      Rp{product.priceOrig.toLocaleString('id-ID')},00
                    </span>
                    <span className="bg-[#D1FAE5] text-[#166534] text-[9px] font-bold px-1.5 py-0.5 rounded">
                      {product.condition}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}