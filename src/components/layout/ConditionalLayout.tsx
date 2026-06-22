"use client";

import { usePathname } from "next/navigation";

export default function ConditionalLayout({
  children,
  navbar,
  footer,
}: {
  children: React.ReactNode;
  navbar: React.ReactNode;
  footer: React.ReactNode;
}) {
  const pathname = usePathname();
  
  const dashboardRoutes = [
    '/vault',
    '/dashboard',
    '/records',
    '/goals',
    '/library',
    '/profile',
    '/admin'
  ];

  const isHidden = 
    dashboardRoutes.some(route => pathname?.startsWith(route)) || 
    pathname === '/login' || 
    pathname === '/subscribe';

  return (
    <>
      {!isHidden && navbar}
      <main className="flex-grow">
        {children}
      </main>
      {!isHidden && footer}
    </>
  );
}
