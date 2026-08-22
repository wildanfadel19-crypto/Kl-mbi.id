'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import AppLayout from '@/components/AppLayout';
import Icon from '@/components/ui/AppIcon';

interface ScannedGarment {
  id: string;
  title: string;
  category: string;
  categoryType: 'Kemeja' | 'Outerwear' | 'Celana' | 'Dress' | 'Kaos';
  scanDate: string;
  score: number;
  statusBadge: 'Baik' | 'Perlu Perawatan' | 'Perlu Jasa';
  summary: string;
  fabric: string;
  iconText: string;
  parameters: {
    cleanliness: string;
    fading: string;
    fiber: string;
    damage: string;
  };
  careSteps: { text: string; done: boolean }[];
  recommendationAction: string;
}

const initialScannedGarments: ScannedGarment[] = [
  {
    id: 'sg-1',
    title: 'Kemeja Flannel Sage Green',
    category: 'Kemeja',
    categoryType: 'Kemeja',
    scanDate: '22 Agu 2026',
    score: 86,
    statusBadge: 'Baik',
    summary: 'Kondisi serat kain sangat terjaga. Bebas noda membandel.',
    fabric: '100% Katun Organik',
    iconText: '👔',
    parameters: {
      cleanliness: '95/100 (Sangat Bersih)',
      fading: '90/100 (Warna Cerah)',
      fiber: '88/100 (Serat Utuh)',
      damage: 'Tidak ada robekan',
    },
    careSteps: [
      { text: 'Gunakan air dingin (suhu maksimal 30°C) saat mencuci.', done: true },
      { text: 'Balik pakaian ke dalam sebelum dicuci agar warna kain tidak tergesek.', done: true },
      { text: 'Gunakan deterjen lembaran ramah lingkungan (Kindfoam / eco-detergent).', done: false },
      { text: 'Jemur di tempat teduh dengan sirkulasi udara baik, hindari terik matahari langsung.', done: false },
    ],
    recommendationAction: 'Perawatan mandiri di rumah sudah optimal. Tidak memerlukan jasa permak.',
  },
  {
    id: 'sg-2',
    title: 'Jaket Denim Vintage Levi\'s 501',
    category: 'Outerwear',
    categoryType: 'Outerwear',
    scanDate: '18 Agu 2026',
    score: 67,
    statusBadge: 'Perlu Perawatan',
    summary: 'Warna agak pudar di area siku & aroma serat kain lembab.',
    fabric: 'Heavyweight Denim Twill 14oz',
    iconText: '🧥',
    parameters: {
      cleanliness: '75/100 (Perlu Deep Clean)',
      fading: '65/100 (Pudar Sedang)',
      fiber: '78/100 (Serat Kuat)',
      damage: 'Jahitan saku samping longgar',
    },
    careSteps: [
      { text: 'Lakukan Deep Clean & Spa Anti-Odor untuk menghilangkan jamur mikroba.', done: false },
      { text: 'Rendam dengan larutan cuka putih 1 sendok makan untuk mengunci pigmen indigo.', done: false },
      { text: 'Jangan diperas terlalu keras menggunakan mesin pengering putar tinggi.', done: false },
      { text: 'Gantung menggunakan hanger kayu berbahu lebar.', done: false },
    ],
    recommendationAction: 'Disarankan melakukan Deep Clean & Anti-Odor Spa agar serat kembali segar.',
  },
  {
    id: 'sg-3',
    title: 'Celana Chino Slim Fit',
    category: 'Celana',
    categoryType: 'Celana',
    scanDate: '10 Agu 2026',
    score: 52,
    statusBadge: 'Perlu Jasa',
    summary: 'Jahitan kelim bawah terlepas sepanjang 8 cm & kancing longgar.',
    fabric: 'Twill Cotton Stretch 98% / Elastane 2%',
    iconText: '👖',
    parameters: {
      cleanliness: '80/100 (Bersih)',
      fading: '70/100 (Pudar Ringan)',
      fiber: '65/100 (Karet Mulai Melar)',
      damage: 'Kelim bawah robek 8 cm',
    },
    careSteps: [
      { text: 'Perbaiki jahitan kelim bawah menggunakan teknik chainstitch atau hemming rapi.', done: false },
      { text: 'Kencangkan kembali kancing pinggang sebelum dicuci.', done: false },
      { text: 'Hindari penggunaan pemutih klorin.', done: false },
    ],
    recommendationAction: 'Perlu bantuan tukang jahit / Taylor artisan terdekat untuk perbaikan jahitan kelim.',
  },
  {
    id: 'sg-4',
    title: 'Dress Tenun Ikat Tradisional',
    category: 'Dress',
    categoryType: 'Dress',
    scanDate: '05 Agu 2026',
    score: 92,
    statusBadge: 'Baik',
    summary: 'Serat tenun tangan istimewa. Tidak ada benang lepas.',
    fabric: 'Tenun Pewarna Alami',
    iconText: '👗',
    parameters: {
      cleanliness: '98/100 (Bersih Terawat)',
      fading: '95/100 (Pewarna Alami Terkunci)',
      fiber: '92/100 (Anyaman Padat)',
      damage: 'Sempurna',
    },
    careSteps: [
      { text: 'Gunakan lerak atau sabun khusus kain tradisional saat mencuci.', done: true },
      { text: 'Cuci manual secara perlahan dengan tangan tanpa disikat.', done: true },
      { text: 'Angin-anginkan di dalam ruangan hingga kering.', done: true },
    ],
    recommendationAction: 'Kondisi pakaian sangat prima. Terus terapkan teknik cuci tradisional.',
  },
];

const careGuides = [
  {
    id: 'cg-1',
    icon: '💧',
    title: 'Metode Cuci Ramah Lingkungan',
    category: 'Pencucian',
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
    category: 'Pengeringan',
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
    category: 'Penyimpanan',
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
    category: 'Restorasi',
    desc: 'Cara mengembalikan ketajaman warna pakaian katun dan denim lama.',
    steps: [
      'Rendam pakaian dalam air dingin bercampur 1 cangkir garam dapur untuk mengunci warna baru.',
      'Gunakan pewarna tekstil ramah lingkungan bersertifikasi eco-friendly.',
      'Bawa ke mitra spesialis re-colour jika menginginkan hasil pewarnaan celup profesional.',
    ],
  },
];

const fabricKnowledge = [
  { name: 'Katun (Cotton)', temp: '30°C - 40°C', icon: '🌿', care: 'Cuci biasa, setrika suhu sedang, tahan lama & bernapas.' },
  { name: 'Denim Indigo', temp: 'Air Dingin', icon: '👖', care: 'Jarang dicuci, cuci terbalik, jemur di tempat teduh agar indigo awet.' },
  { name: 'Sutra & Rayon', temp: 'Handwash Dingin', icon: '✨', care: 'Cuci manual lembut, jangan diperas kencang, setrika uap suhu rendah.' },
  { name: 'Wool & Rajut', temp: 'Air Dingin Khusus', icon: '🧶', care: 'Deterjen pH netral, jemur mendatar (flat dry), jangan digantung di hanger.' },
  { name: 'Linen Alami', temp: '30°C', icon: '🌾', care: 'Cepat kusut alami yang estetik, setrika saat kain masih sedikit lembab.' },
];

export default function RawatPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'care_plan' | 'panduan' | 'kain'>('care_plan');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('Semua');
  const [garments, setGarments] = useState<ScannedGarment[]>(initialScannedGarments);
  const [selectedGarment, setSelectedGarment] = useState<ScannedGarment | null>(null);

  const garmentCategories = ['Semua', 'Kemeja', 'Outerwear', 'Celana', 'Dress'];

  const filteredGarments = useMemo(() => {
    if (selectedCategoryFilter === 'Semua') return garments;
    return garments.filter((g) => g.categoryType === selectedCategoryFilter);
  }, [garments, selectedCategoryFilter]);

  const toggleStepDone = (garmentId: string, stepIndex: number) => {
    setGarments((prev) =>
      prev.map((g) => {
        if (g.id === garmentId) {
          const updatedSteps = [...g.careSteps];
          updatedSteps[stepIndex] = {
            ...updatedSteps[stepIndex],
            done: !updatedSteps[stepIndex].done,
          };
          return { ...g, careSteps: updatedSteps };
        }
        return g;
      })
    );

    if (selectedGarment && selectedGarment.id === garmentId) {
      setSelectedGarment((prev) => {
        if (!prev) return null;
        const updatedSteps = [...prev.careSteps];
        updatedSteps[stepIndex] = {
          ...updatedSteps[stepIndex],
          done: !updatedSteps[stepIndex].done,
        };
        return { ...prev, careSteps: updatedSteps };
      });
    }
  };

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
            <span>Care Plan Baju ({garments.length})</span>
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
            {/* Category Sub-filter */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {garmentCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategoryFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategoryFilter === cat
                      ? 'bg-[#10284D] text-white shadow-xs'
                      : 'bg-card border border-border text-muted-foreground hover:border-[#10284D]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* List Cards */}
            {filteredGarments.map((garment) => (
              <div
                key={garment.id}
                onClick={() => setSelectedGarment(garment)}
                className="bg-card rounded-2xl p-4 border border-border shadow-sm hover:shadow-md transition-all cursor-pointer space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-xl flex-shrink-0">
                      <span>{garment.iconText}</span>
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

                {/* Progress checklist preview */}
                <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground pt-2 border-t border-border">
                  <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                    <span>✓</span>
                    <span>
                      {garment.careSteps.filter((s) => s.done).length} dari {garment.careSteps.length} langkah selesai
                    </span>
                  </div>
                  <span className="text-primary font-bold hover:underline flex items-center gap-1">
                    Buka Detail <Icon name="ChevronRightIcon" size={12} />
                  </span>
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{guide.icon}</span>
                    <div>
                      <h3 className="text-xs font-extrabold text-foreground">{guide.title}</h3>
                      <p className="text-[10px] text-muted-foreground">{guide.desc}</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-secondary text-primary font-extrabold px-2 py-0.5 rounded-full">
                    {guide.category}
                  </span>
                </div>

                <div className="bg-muted/50 rounded-xl p-3 space-y-2 border border-border">
                  {guide.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-foreground/90">
                      <span className="text-[#10284D] font-bold">{idx + 1}.</span>
                      <span className="leading-relaxed">{step}</span>
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
                  <p className="text-xs text-muted-foreground pl-7 leading-relaxed">{fabric.care}</p>
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
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{selectedGarment.iconText}</span>
                  <div>
                    <h3 className="font-extrabold text-base text-gray-900 leading-tight">
                      {selectedGarment.title}
                    </h3>
                    <p className="text-xs text-gray-500">Diagnosis AI • {selectedGarment.scanDate}</p>
                  </div>
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

              {/* Interactive Care Steps Checklist */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-gray-800 block">Checklist Langkah Perawatan:</span>
                <div className="space-y-1.5">
                  {selectedGarment.careSteps.map((step, i) => (
                    <div
                      key={i}
                      onClick={() => toggleStepDone(selectedGarment.id, i)}
                      className={`p-2.5 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                        step.done
                          ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950 line-through opacity-80'
                          : 'bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={step.done}
                        onChange={() => {}}
                        className="w-4 h-4 mt-0.5 accent-emerald-600 rounded cursor-pointer"
                      />
                      <span className="text-xs leading-relaxed">{step.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rekomendasi Aksi */}
              <div className="bg-blue-50 p-3 rounded-2xl border border-blue-100 text-xs text-blue-900">
                <span className="font-bold block mb-0.5">Kesimpulan & Solusi AI:</span>
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
