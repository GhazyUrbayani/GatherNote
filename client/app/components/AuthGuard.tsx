'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
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

      setIsAuthenticated(!!token || publicPaths.includes(pathname));
      setIsLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a1628] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}
