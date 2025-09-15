'use client';

import { Home, Users, ShieldCheck, User, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const menuItems = [
  { href: '/', label: 'Feed', icon: Home },
  { href: '/guides', label: 'Search', icon: Search },
  { href: '/friends', label: 'Friends', icon: Users },
  { href: '/verification', label: 'Verification', icon: ShieldCheck },
  { href: '/profile', label: 'Profile', icon: User },
];

export function BottomNavbar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t bg-background/80 backdrop-blur-sm md:hidden">
      <div className="flex h-16 items-center justify-around">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              'flex flex-col items-center gap-1 p-2 text-muted-foreground transition-colors hover:text-primary',
              isActive(item.href) && 'text-primary'
            )}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs font-medium sr-only">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
