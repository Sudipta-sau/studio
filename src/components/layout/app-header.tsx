'use client';

import { Button } from '../ui/button';
import { HeartPulse, MessageCircle, MoreVertical } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type AppHeaderProps = {
  title: string;
  children?: React.ReactNode;
  isProfilePage?: boolean;
};

export function AppHeader({ title, children, isProfilePage = false }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-headline font-bold">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        {children}
        {isProfilePage && (
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}

const AppContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className="flex h-full flex-col" {...props} />
  );
});
AppContainer.displayName = 'AppContainer';

export { AppContainer };
