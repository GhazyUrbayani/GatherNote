'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const publicPaths = ['/login'];

    // Jika di halaman public dan sudah login, redirect ke home
    if (publicPaths.includes(pathname) && token) {
      router.push('/');
      return;
    }

    // Jika di halaman private dan belum login, redirect ke login
    if (!publicPaths.includes(pathname) && !token) {
      router.push('/login');
      return;
    }
  }, [pathname, router]);

  return <>{children}</>;
}
