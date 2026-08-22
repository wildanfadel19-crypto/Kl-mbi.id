import React from 'react';
import AppLayout from '@/components/AppLayout';
import MenuPerawatanContent from './components/MenuPerawatanContent';

export default function MenuPerawatanPage() {
  return (
    <AppLayout
      title="Menu Perawatan"
      showBack
      backHref="/"
    >
      <div className="max-w-2xl mx-auto">
        <MenuPerawatanContent />
      </div>
    </AppLayout>
  );
}