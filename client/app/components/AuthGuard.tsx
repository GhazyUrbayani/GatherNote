'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for client-side hydration
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const publicPaths = ['/login', '/crowdfunding'];
        const isPublicPath = publicPaths.some(p => pathname.startsWith(p));

        console.log('AuthGuard check:', { pathname, hasToken: !!token, isPublicPath });

        // Jika di halaman public dan sudah login, redirect ke home
        if (pathname === '/login' && token) {
          router.replace('/');
          return;
        }

        // Jika di halaman private dan belum login, redirect ke login
        if (!isPublicPath && !token) {
          router.replace('/login');
          return;
        }

        setIsReady(true);
      } catch (error) {
        console.error('AuthGuard error:', error);
        setIsReady(true);
      }
    };

    // Small delay to ensure localStorage is available
    const timer = setTimeout(checkAuth, 50);
    return () => clearTimeout(timer);
  }, [pathname, router]);

  // Show loading spinner while checking auth
  if (!isReady) {
    return (
      <div className="min-h-screen bg-[#0a1628] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}
