'use client';

import { usePathname } from 'next/navigation';

// Remounting on pathname change (via key) retriggers the CSS animation below
// automatically - no transition-state JS needed.
export default function PageTransition({ children }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  );
}
