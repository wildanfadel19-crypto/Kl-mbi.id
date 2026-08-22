#!/usr/bin/env bash
set -e

echo "=== Memulai Setup & Push ke GitHub ==="

# Inisialisasi Git jika belum
if [ ! -d ".git" ]; then
  git init
  echo "✓ Git repository diinisialisasi"
fi

# Tambahkan file
git add .
echo "✓ Semua perubahan dan logo baru ditambahkan ke staging"

# Buat commit pertama
git commit -m "feat: setup Klámbi.id project with official logo and branding" || echo "Tidak ada perubahan baru untuk di-commit"

# Rename branch ke main
git branch -M main

# Set remote origin
if git remote | grep -q origin; then
  git remote set-url origin https://github.com/wildanfadel19-crypto/Kl-mbi.id.git
else
  git remote add origin https://github.com/wildanfadel19-crypto/Kl-mbi.id.git
fi
echo "✓ Remote origin diatur ke https://github.com/wildanfadel19-crypto/Kl-mbi.id.git"

# Push ke main branch
echo "Mengunggah ke GitHub..."
git push -u origin main

echo "=== Selesai! Berhasil di-push ke GitHub ==="
