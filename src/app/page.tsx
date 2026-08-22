import React from 'react';
import AppLayout from '@/components/AppLayout';
import ScanUploadZone from '@/app/components/ScanUploadZone';
import Icon from '@/components/ui/AppIcon';

export default function ScanBajuPage() {
  return (
    <AppLayout
      headerRight={
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-primary text-xs font-600 border border-border hover:bg-secondary/80 transition-colors"
            aria-label="Riwayat scan"
          >
            <Icon name="ClockIcon" size={14} />
            <span className="hidden sm:inline">Riwayat</span>
          </button>
          <button
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-muted hover:bg-secondary transition-colors"
            aria-label="Bantuan scan"
          >
            <Icon name="QuestionMarkCircleIcon" size={20} className="text-muted-foreground" />
          </button>
        </div>
      }
    >
      <div className="max-w-2xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg gradient-green flex items-center justify-center">
              <Icon name="CameraIcon" size={15} variant="solid" className="text-white" />
            </div>
            <h1 className="text-xl font-800 text-foreground">Scan Baju</h1>
          </div>
          <p className="text-sm text-muted-foreground ml-9">
            Upload atau foto bajumu, AI akan menganalisis kondisinya
          </p>
        </div>

        {/* Main Scan Component */}
        <ScanUploadZone />
      </div>
    </AppLayout>
  );
}