'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import KlambiLogo from '@/components/ui/KlambiLogo';
import Icon from '@/components/ui/AppIcon';

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validasi hardcode sementara
    if (username.trim() === 'admin' && password === 'admin') {
      localStorage.setItem('klambi_auth', 'true');
      toast.success('Login berhasil! Selamat datang kembali.');
      router.push('/');
    } else {
      setErrorMessage('Username atau password salah');
    }
  };

  const handleFeatureNotAvailable = (featureName: string) => {
    toast.info(`Fitur ${featureName} belum tersedia`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md space-y-6">
        {/* Top Header: Icon only logo + Title */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <KlambiLogo variant="icon-only" size="lg" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-normal text-gray-900 tracking-tight">
            Welcome to <span className="font-extrabold text-[#1A2B5C]">Klámbi.id</span>
          </h1>
        </div>

        {/* Big Navy Blue Rounded Card */}
        <div className="bg-[#1A2B5C] rounded-3xl p-6 sm:p-8 shadow-xl text-white space-y-6">
          {/* Sub-text */}
          <p className="text-center text-sm font-medium text-gray-100 leading-relaxed">
            Masuk akun{' '}
            <span className="text-[#FACC15] font-bold">Klámbi.id</span> buat rawat,
            jual & lanjutkan cerita pakaianmu
          </p>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Field Username/Email */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Icon name="EnvelopeIcon" size={18} />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username atau email"
                className="w-full bg-white text-gray-800 placeholder-gray-400 text-sm font-medium rounded-full pl-11 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-[#FACC15] transition-all"
                required
              />
            </div>

            {/* Field Password */}
            <div className="space-y-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Icon name="LockClosedIcon" size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-white text-gray-800 placeholder-gray-400 text-sm font-medium rounded-full pl-11 pr-11 py-3.5 outline-none focus:ring-2 focus:ring-[#FACC15] transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={18} />
                </button>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <p className="text-xs text-red-300 font-semibold px-4 pt-1 flex items-center gap-1">
                  <span>⚠️</span> {errorMessage}
                </p>
              )}
            </div>

            {/* Forgot Password link */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => handleFeatureNotAvailable('Lupa Password')}
                className="text-xs font-semibold text-[#FACC15] hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-white text-[#166534] hover:bg-gray-100 active:scale-[0.98] transition-all font-extrabold text-sm rounded-full py-3.5 shadow-md"
            >
              LOGIN
            </button>
          </form>

          {/* Divider OR */}
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-[1px] bg-white/20" />
            <span className="text-xs font-semibold text-white/60">OR</span>
            <div className="flex-1 h-[1px] bg-white/20" />
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            {/* Google Button */}
            <button
              type="button"
              onClick={() => handleFeatureNotAvailable('Google Login')}
              className="flex items-center justify-center gap-2 bg-white text-gray-800 hover:bg-gray-100 active:scale-[0.98] transition-all text-xs font-bold rounded-full py-3 px-4 shadow-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>

            {/* Facebook Button */}
            <button
              type="button"
              onClick={() => handleFeatureNotAvailable('Facebook Login')}
              className="flex items-center justify-center gap-2 bg-white text-gray-800 hover:bg-gray-100 active:scale-[0.98] transition-all text-xs font-bold rounded-full py-3 px-4 shadow-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>

          {/* Bottom Link */}
          <p className="text-center text-xs font-medium text-white/90 pt-2">
            Belum punya akun?{' '}
            <button
              type="button"
              onClick={() => handleFeatureNotAvailable('Pendaftaran Akun')}
              className="text-[#FACC15] font-bold hover:underline"
            >
              Daftar dulu
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
