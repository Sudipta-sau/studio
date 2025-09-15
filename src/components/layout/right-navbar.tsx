'use client';

import { Home, Users, ShieldCheck, User, Search, MessageCircle, Settings, LogOut, HeartPulse } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '../ui/separator';
import { Logo } from '../icons/logo';

const mainMenuItems = [
  { href: '/', label: 'Feed', icon: Home },
  { href: '/guides', label: 'Search', icon: Search },
  { href: '/friends', label: 'Friends', icon: Users },
  { href: '/chat', label: 'Chats', icon: MessageCircle },
  { href: '/verification', label: 'Verification', icon: ShieldCheck },
];

const secondaryMenuItems = [
    { href: '/profile', label: 'Profile', icon: User },
    { href: '/settings', label: 'Settings', icon: Settings },
]

export function RightNavbar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <TooltipProvider>
        <nav className="hidden md:flex flex-col items-center gap-4 px-2 sm:py-4 border-l bg-background">
            <Link href="/" className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
                <Logo className="h-4 w-4 transition-all group-hover:scale-110" />
                <span className="sr-only">RoamFree</span>
            </Link>
            <Separator />
            <div className="flex flex-col items-center gap-2">
            {mainMenuItems.map((item) => (
                <Tooltip key={item.label}>
                    <TooltipTrigger asChild>
                        <Link
                            href={item.href}
                            className={cn(
                            'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                            isActive(item.href) && 'bg-accent text-accent-foreground'
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            <span className="sr-only">{item.label}</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
            ))}
            </div>
            <Separator />
            <div className="mt-auto flex flex-col items-center gap-2">
                 <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="destructive" size="icon" className="h-8 w-8">
                            <HeartPulse className="h-5 w-5" />
                            <span className="sr-only">SOS</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">SOS</TooltipContent>
                </Tooltip>
                 {secondaryMenuItems.map((item) => (
                    <Tooltip key={item.label}>
                        <TooltipTrigger asChild>
                            <Link
                                href={item.href}
                                className={cn(
                                'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                                isActive(item.href) && 'bg-accent text-accent-foreground'
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                <span className="sr-only">{item.label}</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">{item.label}</TooltipContent>
                    </Tooltip>
                ))}
                 <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                            <LogOut className="h-5 w-5" />
                            <span className="sr-only">Logout</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">Logout</TooltipContent>
                </Tooltip>
            </div>
        </nav>
    </TooltipProvider>
  );
}
