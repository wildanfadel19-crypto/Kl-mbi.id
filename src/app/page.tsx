'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/AppLayout';
import Icon from '@/components/ui/AppIcon';

const promoSlides = [
  { title: 'Eco-Fashion Sale 🌿', subtitle: 'Diskon 30% produk upcycle pilihan', cta: 'Belanja Sekarang', link: '/trift-marketplace' },
  { title: 'Scan & Rawat Bajumu 👕', subtitle: 'Analisis AI gratis untuk 5 baju pertamamu', cta: 'Mulai Scan', link: '/wearwise-ai' },
  { title: 'Trift Drop Minggu Ini ♻️', subtitle: 'Koleksi vintage premium baru tersedia', cta: 'Lihat Koleksi', link: '/trift-marketplace' },
];

const categories = ['Semua', 'Kemeja', 'Celana', 'Dress', 'Jaket', 'Kaos', 'Aksesoris'];

const featuredProducts = [
  { cat: 'Kemeja', name: 'Patchwork Denim Jacket', priceNow: 185000, priceOrig: 250000, condition: 'Sangat Baik' },
  { cat: 'Atasan', name: 'Graphic Long Sleeve Tee', priceNow: 120000, priceOrig: 200000, condition: 'Baik' },
  { cat: 'Bawahan', name: 'Graphic Mini Skirt', priceNow: 95000, priceOrig: 150000, condition: 'Baik' },
  { cat: 'Outer', name: 'Windbreaker Vintage 90s', priceNow: 175000, priceOrig: 350000, condition: 'Sangat Baik' },
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
    // Simulasi alur entry: jika belum login / belum melintasi splash, arahkan ke splash screen
    const isAuth = localStorage.getItem('klambi_auth');
    const hasSplashed = sessionStorage.getItem('klambi_splashed');

    if (!isAuth && !hasSplashed) {
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
          <div className="w-12 h-12 rounded-full gradient-navy flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            MH
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

        {/* b. Banner Promosi Carousel */}
        <div>
          <div className="relative overflow-hidden rounded-2xl shadow-sm">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {promoSlides.map((slide, i) => (
                <div
                  key={i}
                  className="w-full flex-shrink-0 bg-gradient-to-r from-[#1E3A8A] via-[#3B82F6] to-[#60A5FA] rounded-2xl p-6 min-h-[140px] flex flex-col justify-center text-white"
                >
                  <h3 className="text-white text-xl font-extrabold">{slide.title}</h3>
                  <p className="text-white/80 text-sm mt-1">{slide.subtitle}</p>
                  <button
                    onClick={() => router.push(slide.link)}
                    className="mt-3 bg-white text-[#1A2B5C] rounded-xl px-5 py-2 text-xs font-bold hover:bg-white/90 active:scale-95 transition-all self-start shadow-sm"
                  >
                    {slide.cta}
                  </button>
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
                    ? 'bg-[#1A2B5C] w-6'
                    : 'bg-[#1A2B5C]/30 w-2 hover:bg-[#1A2B5C]/50'
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
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon name="GlobeAmericasIcon" size={16} className="text-primary" />
              <span className="text-xs font-bold text-foreground">Dampak Sirkularmu</span>
            </div>
            <span className="text-[11px] font-bold text-primary hover:underline">Lihat Detail →</span>
          </div>
          <div className="grid grid-cols-4 gap-0">
            {/* Donut Chart Progress */}
            <div className="flex flex-col items-center justify-center border-r border-border pr-2">
              <svg width="44" height="44" viewBox="0 0 44 44" className="mb-1">
                <circle cx="22" cy="22" r="18" fill="none" stroke="#ECEEF3" strokeWidth="5" />
                <circle
                  cx="22" cy="22" r="18" fill="none"
                  stroke="#1A2B5C" strokeWidth="5"
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
              <Icon name="ScaleIcon" size={14} className="text-emerald-600 mb-1" />
              <span className="text-base font-extrabold text-foreground">{countKg}</span>
              <span className="text-[10px] text-muted-foreground">kg Diselamatkan</span>
            </div>

            {/* Ranking */}
            <div className="flex flex-col items-center justify-center border-r border-border px-2">
              <span className="text-sm mb-1">🏆</span>
              <span className="text-base font-extrabold text-foreground">#{countRank}</span>
              <span className="text-[10px] text-muted-foreground">Peringkat</span>
            </div>

            {/* Scan Count */}
            <div className="flex flex-col items-center justify-center pl-2">
              <Icon name="CameraIcon" size={14} className="text-primary mb-1" />
              <span className="text-base font-extrabold text-foreground">{countScan}</span>
              <span className="text-[10px] text-muted-foreground">Discan</span>
            </div>
          </div>
        </div>

        {/* d. 3 Kartu Fitur Utama (Styliss AI, Care Plan, Wearwise AI) */}
        <div className="grid grid-cols-3 gap-3">
          <div
            onClick={() => router.push('/styliss-ai')}
            className="bg-[#D1FAE5]/50 border border-[#D1FAE5] rounded-2xl p-3.5 text-center cursor-pointer hover:shadow-md active:scale-95 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-[#D1FAE5] mx-auto mb-2 flex items-center justify-center">
              <Icon name="UserIcon" size={20} className="text-[#166534]" />
            </div>
            <h4 className="font-bold text-xs text-foreground">Styliss AI</h4>
            <p className="text-[10px] text-muted-foreground mt-0.5">See Your Style in 3D</p>
          </div>

          <div
            onClick={() => router.push('/care-plan')}
            className="bg-[#FCE4EC]/50 border border-[#FCE4EC] rounded-2xl p-3.5 text-center cursor-pointer hover:shadow-md active:scale-95 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FCE4EC] mx-auto mb-2 flex items-center justify-center">
              <Icon name="HeartIcon" size={20} className="text-[#C62828]" />
            </div>
            <h4 className="font-bold text-xs text-foreground">Care Plan</h4>
            <p className="text-[10px] text-muted-foreground mt-0.5">Your Guide to Better Care</p>
          </div>

          <div
            onClick={() => router.push('/wearwise-ai')}
            className="bg-[#FFF3E0]/50 border border-[#FFF3E0] rounded-2xl p-3.5 text-center cursor-pointer hover:shadow-md active:scale-95 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FFF3E0] mx-auto mb-2 flex items-center justify-center">
              <Icon name="QrCodeIcon" size={20} className="text-[#E65100]" />
            </div>
            <h4 className="font-bold text-xs text-foreground">Wearwise AI</h4>
            <p className="text-[10px] text-muted-foreground mt-0.5">Know Before You Decide</p>
          </div>
        </div>

        {/* e. Filter Kategori Pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
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
              Lihat lainnya →
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {featuredProducts
              .filter((p) => selectedCategory === 'Semua' || p.cat === selectedCategory)
              .map((product, i) => (
                <div
                  key={i}
                  onClick={() => router.push('/trift-marketplace')}
                  className="w-[155px] flex-shrink-0 bg-card rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  {/* Image Placeholder */}
                  <div className="w-full h-[120px] bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
                    <Icon name="ShoppingBagIcon" size={28} className="text-muted-foreground/40" />
                  </div>

                  {/* Content */}
                  <div className="p-3">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      {product.cat}
                    </span>
                    <h4 className="text-xs font-bold text-foreground mt-0.5 line-clamp-1">
                      {product.name}
                    </h4>
                    <div className="flex items-baseline gap-1 mt-1.5">
                      <span className="text-[#E86D50] text-xs font-extrabold">
                        Rp {product.priceNow.toLocaleString('id-ID')}
                      </span>
                      <span className="text-[10px] text-muted-foreground line-through">
                        Rp {product.priceOrig.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <span className="mt-1.5 inline-block bg-[#D1FAE5] text-[#166534] text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {product.condition}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}