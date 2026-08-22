'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import AppLayout from '@/components/AppLayout';
import Icon from '@/components/ui/AppIcon';

interface ScannedGarment {
  id: string;
  title: string;
  category: string;
  scanDate: string;
  score: number;
  statusBadge: 'Baik' | 'Perlu Perawatan' | 'Perlu Jasa';
  summary: string;
  fabric: string;
  parameters: {
    cleanliness: string;
    fading: string;
    fiber: string;
    damage: string;
  };
  careSteps: string[];
  recommendationAction: string;
}

const scannedGarments: ScannedGarment[] = [
  {
    id: 'sg-1',
    title: 'Kemeja Flannel Sage Green',
    category: 'Kemeja',
    scanDate: '22 Agu 2026',
    score: 86,
    statusBadge: 'Baik',
    summary: 'Kondisi serat kain sangat terjaga. Bebas noda membandel.',
    fabric: '100% Katun Organik',
    parameters: {
      cleanliness: '95/100 (Sangat Bersih)',
      fading: '90/100 (Warna Cerah)',
      fiber: '88/100 (Serat Utuh)',
      damage: 'Tidak ada robekan',
    },
    careSteps: [
      'Gunakan air dingin (suhu maksimal 30°C) saat mencuci.',
      'Balik pakaian ke dalam sebelum dicuci agar warna kain tidak tergesek.',
      'Gunakan deterjen lembaran ramah lingkungan (Kindfoam / eco-detergent).',
      'Jemur di tempat teduh dengan sirkulasi udara baik, hindari terik matahari langsung.',
    ],
    recommendationAction: 'Perawatan mandiri di rumah sudah optimal. Tidak memerlukan jasa permak.',
  },
  {
    id: 'sg-2',
    title: 'Jaket Denim Vintage Levi\'s 501',
    category: 'Outerwear',
    scanDate: '18 Agu 2026',
    score: 67,
    statusBadge: 'Perlu Perawatan',
    summary: 'Warna agak pudar di area siku & aroma serat kain lembab.',
    fabric: 'Heavyweight Denim Twill 14oz',
    parameters: {
      cleanliness: '75/100 (Perlu Deep Clean)',
      fading: '65/100 (Pudar Sedang)',
      fiber: '78/100 (Serat Kuat)',
      damage: 'Jahitan saku samping longgar',
    },
    careSteps: [
      'Lakukan Deep Clean & Spa Anti-Odor untuk menghilangkan jamur mikroba.',
      'Rendam dengan larutan cuka putih 1 sendok makan untuk mengunci pigmen indigo.',
      'Jangan diperas terlalu keras menggunakan mesin pengering putar tinggi.',
      'Gantung menggunakan hanger kayu berbahu lebar.',
    ],
    recommendationAction: 'Disarankan melakukan Deep Clean & Anti-Odor Spa agar serat kembali segar.',
  },
  {
    id: 'sg-3',
    title: 'Celana Chino Slim Fit',
    category: 'Celana',
    scanDate: '10 Agu 2026',
    score: 52,
    statusBadge: 'Perlu Jasa',
    summary: 'Jahitan kelim bawah terlepas sepanjang 8 cm & kancing longgar.',
    fabric: 'Twill Cotton Stretch 98% / Elastane 2%',
    parameters: {
      cleanliness: '80/100 (Bersih)',
      fading: '70/100 (Pudar Ringan)',
      fiber: '65/100 (Karet Mulai Melar)',
      damage: 'Kelim bawah robek 8 cm',
    },
    careSteps: [
      'Perbaiki jahitan kelim bawah menggunakan teknik chainstitch atau hemming rapi.',
      'Kencangkan kembali kancing pinggang sebelum dicuci.',
      'Hindari penggunaan pemutih klorin.',
    ],
    recommendationAction: 'Perlu bantuan tukang jahit / Taylor artisan terdekat untuk perbaikan jahitan kelim.',
  },
];

const careGuides = [
  {
    id: 'cg-1',
    icon: '💧',
    title: 'Metode Cuci Ramah Lingkungan',
    desc: 'Tips mencuci pakaian tanpa merusak serat kain dan hemat konsumsi air.',
    steps: [
      'Pilah pakaian berdasarkan warna (terang, gelap, putih) dan tingkat kotoran.',
      'Gunakan takaran deterjen ramah lingkungan yang pas agar tidak meninggalkan residu.',
      'Hindari siklus cuci air panas kecuali untuk pakaian dengan noda minyak berat.',
    ],
  },
  {
    id: 'cg-2',
    icon: '☀️',
    title: 'Pengeringan & Penjemuran Alami',
    desc: 'Mencegah pemudaran warna kain akibat sinar UV berlebih.',
    steps: [
      'Selalu jemur pakaian dalam kondisi terbalik (sisi dalam menghadap ke luar).',
      'Untuk pakaian berbahan rajut/wool, jemur secara mendatar (flat dry) agar tidak melar.',
      'Gunakan jepitan baju berlapis silikon agar tidak meninggalkan bekas pada pundak.',
    ],
  },
  {
    id: 'cg-3',
    icon: '🛡️',
    title: 'Penyimpanan Anti-Jamur & Ngengat',
    desc: 'Menjaga pakaian tetap harum dan bebas apek di dalam lemari.',
    steps: [
      'Pastikan pakaian sudah 100% kering sebelum dilipat atau dimasukkan lemari.',
      'Gunakan kantong penyerap lembab (silica gel / arang aktif) di sudut lemari.',
      'Beri ruang antar gantungan baju agar ada sirkulasi udara yang baik.',
    ],
  },
  {
    id: 'cg-4',
    icon: '🎨',
    title: 'Pemulihan Warna Pudar (Re-Colour)',
    desc: 'Cara mengembalikan ketajaman warna pakaian katun dan denim lama.',
    steps: [
      'Rendam pakaian dalam air dingin bercampur 1 cangkir garam dapur untuk mengunci warna baru.',
      'Gunakan pewarna tekstil ramah lingkungan bersertifikasi eco-friendly.',
      'Bawa ke mitra spesialis re-colour jika menginginkan hasil pewarnaan celup profesional.',
    ],
  },
];

const fabricKnowledge = [
  { name: 'Katun (Cotton)', temp: '30°C - 40°C', icon: '🌿', care: 'Cuci biasa, setrika suhu sedang, tahan lama.' },
  { name: 'Denim', temp: 'Air Dingin', icon: '👖', care: 'Jarang dicuci, cuci terbalik, jemur di tempat teduh.' },
  { name: 'Sutra & Rayon', temp: 'Handwash Dingin', icon: '✨', care: 'Cuci manual lembut, jangan diperas, setrika uap.' },
  { name: 'Wool & Rajut', temp: 'Air Dingin Khusus', icon: '🧶', care: 'Deterjen pH netral, jemur mendatar, jangan digantung.' },
  { name: 'Linen', temp: '30°C', icon: '🌾', care: 'Cepat kusut alami, setrika saat masih sedikit lembab.' },
];

export default function RawatPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'care_plan' | 'panduan' | 'kain'>('care_plan');
  const [selectedGarment, setSelectedGarment] = useState<ScannedGarment | null>(null);

  return (
    <AppLayout title="Rawat Pakaian" showBack backHref="/">
      <div className="max-w-2xl mx-auto space-y-4 pb-20">
        {/* Banner Edukasi & Scan CTA */}
        <div className="bg-[#10284D] text-white rounded-3xl p-5 shadow-md flex items-center justify-between relative overflow-hidden">
          <div className="space-y-1.5 z-10 max-w-[260px]">
            <span className="text-[10px] font-extrabold text-[#E8C547] uppercase tracking-wider">
              Care Plan & Panduan AI
            </span>
            <h2 className="text-sm sm:text-base font-extrabold leading-tight">
              Kenali Kondisinya, Rawat dengan Benar!
            </h2>
            <p className="text-[11px] text-white/80 leading-relaxed">
              Dapatkan panduan cuci, simpan, dan perbaikan sesuai hasil scan pakaianmu.
            </p>
          </div>

          <button
            onClick={() => router.push('/wearwise-ai')}
            className="z-10 bg-white text-[#10284D] px-4 py-2.5 rounded-2xl text-xs font-extrabold shadow-md hover:bg-gray-100 active:scale-95 transition-all flex items-center gap-1.5 flex-shrink-0"
          >
            <span>📷</span>
            <span>Scan Baru</span>
          </button>

          {/* Background Decorative Bubble */}
          <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-border gap-2 overflow-x-auto scrollbar-hide pb-1">
          <button
            onClick={() => setActiveTab('care_plan')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'care_plan'
                ? 'border-[#10284D] text-[#10284D]'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="HeartIcon" size={16} />
            <span>Care Plan Baju ({scannedGarments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('panduan')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'panduan'
                ? 'border-[#10284D] text-[#10284D]'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="SparklesIcon" size={16} />
            <span>Panduan Rawat Mandiri</span>
          </button>

          <button
            onClick={() => setActiveTab('kain')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'kain'
                ? 'border-[#10284D] text-[#10284D]'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="InformationCircleIcon" size={16} />
            <span>Karakter Serat Kain</span>
          </button>
        </div>

        {/* TAB 1: CARE PLAN & RIWAYAT SCAN */}
        {activeTab === 'care_plan' && (
          <div className="space-y-3">
            {scannedGarments.map((garment) => (
              <div
                key={garment.id}
                onClick={() => setSelectedGarment(garment)}
                className="bg-card rounded-2xl p-4 border border-border shadow-sm hover:shadow-md transition-all cursor-pointer space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary font-bold flex-shrink-0">
                      <Icon name="ShirtIcon" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xs font-extrabold text-foreground">{garment.title}</h3>
                      <p className="text-[10px] text-muted-foreground">
                        {garment.category} • Scanned: {garment.scanDate}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${
                      garment.statusBadge === 'Baik'
                        ? 'bg-[#D1FAE5] text-[#166534]'
                        : garment.statusBadge === 'Perlu Perawatan'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {garment.statusBadge} ({garment.score}/100)
                  </span>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {garment.summary}
                </p>

                <div className="flex items-center justify-between text-[11px] font-bold text-primary pt-2 border-t border-border">
                  <span>Lihat Detail Care Plan & Panduan</span>
                  <Icon name="ChevronRightIcon" size={14} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: PANDUAN RAWAT MANDIRI */}
        {activeTab === 'panduan' && (
          <div className="space-y-3">
            {careGuides.map((guide) => (
              <div
                key={guide.id}
                className="bg-card rounded-2xl p-4 border border-border shadow-sm space-y-2.5"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{guide.icon}</span>
                  <div>
                    <h3 className="text-xs font-extrabold text-foreground">{guide.title}</h3>
                    <p className="text-[10px] text-muted-foreground">{guide.desc}</p>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-xl p-3 space-y-1.5 border border-border">
                  {guide.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-foreground/90">
                      <span className="text-[#10284D] font-bold">{idx + 1}.</span>
                      <span className="leading-tight">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: KARAKTER SERAT KAIN */}
        {activeTab === 'kain' && (
          <div className="space-y-3">
            <div className="bg-card rounded-2xl border border-border shadow-sm divide-y divide-border overflow-hidden">
              {fabricKnowledge.map((fabric, idx) => (
                <div key={idx} className="p-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{fabric.icon}</span>
                      <h4 className="text-xs font-extrabold text-foreground">{fabric.name}</h4>
                    </div>
                    <span className="text-[10px] bg-secondary text-primary font-bold px-2 py-0.5 rounded-full">
                      Suhu: {fabric.temp}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground pl-7">{fabric.care}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Detail Care Plan & Diagnosis */}
        {selectedGarment && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 w-full max-w-md text-gray-800 space-y-4 max-h-[85vh] overflow-y-auto animate-scale-in">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <h3 className="font-extrabold text-base text-gray-900">{selectedGarment.title}</h3>
                  <p className="text-xs text-gray-500">Diagnosis AI • {selectedGarment.scanDate}</p>
                </div>
                <button
                  onClick={() => setSelectedGarment(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Icon name="XMarkIcon" size={20} />
                </button>
              </div>

              {/* Score & Material */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                  <span className="text-gray-500 block text-[10px]">Skor Kondisi</span>
                  <span className="font-extrabold text-sm text-[#10284D]">
                    {selectedGarment.score} / 100
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                  <span className="text-gray-500 block text-[10px]">Komposisi Bahan</span>
                  <span className="font-bold text-xs text-gray-800 truncate block">
                    {selectedGarment.fabric}
                  </span>
                </div>
              </div>

              {/* Diagnosis Parameters */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-gray-800 block">Detail Parameter AI:</span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-gray-400 block text-[9px]">Kebersihan</span>
                    <span className="font-semibold text-gray-700">{selectedGarment.parameters.cleanliness}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-gray-400 block text-[9px]">Kelunturan</span>
                    <span className="font-semibold text-gray-700">{selectedGarment.parameters.fading}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-gray-400 block text-[9px]">Kondisi Serat</span>
                    <span className="font-semibold text-gray-700">{selectedGarment.parameters.fiber}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-gray-400 block text-[9px]">Kerusakan</span>
                    <span className="font-semibold text-gray-700">{selectedGarment.parameters.damage}</span>
                  </div>
                </div>
              </div>

              {/* Rekomendasi Langkah Rawat */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-gray-800 block">Langkah Perawatan Mandiri:</span>
                <div className="bg-emerald-50 text-emerald-950 p-3.5 rounded-2xl border border-emerald-200 space-y-1 text-xs">
                  {selectedGarment.careSteps.map((step, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="font-bold">•</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rekomendasi Aksi */}
              <div className="bg-blue-50 p-3 rounded-2xl border border-blue-100 text-xs text-blue-900">
                <span className="font-bold block mb-0.5">Kesimpulan AI:</span>
                <p>{selectedGarment.recommendationAction}</p>
              </div>

              {/* Action Buttons: Rawat Sendiri vs Gunakan Jasa */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    toast.success('Panduan rawat mandiri siap diterapkan!');
                    setSelectedGarment(null);
                  }}
                  className="bg-[#10284D] text-white py-3 rounded-2xl text-xs font-bold shadow-md hover:bg-[#152248] active:scale-95 transition-all"
                >
                  ✨ Rawat Sendiri
                </button>

                <button
                  onClick={() => {
                    setSelectedGarment(null);
                    router.push('/cari-jasa');
                  }}
                  className="border-2 border-[#10284D] text-[#10284D] py-3 rounded-2xl text-xs font-bold hover:bg-secondary active:scale-95 transition-all"
                >
                  🔍 Gunakan Jasa
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
