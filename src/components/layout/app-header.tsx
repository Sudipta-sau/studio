'use client';

import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '../ui/button';
import { HeartPulse, MessageCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import React from 'react';
import Link from 'next/link';

type AppHeaderProps = {
  title: string;
  children?: React.ReactNode;
};

export function AppHeader({ title, children }: AppHeaderProps) {
  const isMobile = useIsMobile();
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-2xl font-headline font-bold">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        {children}
        <Button variant="ghost" size="icon" asChild>
          <Link href="/chat">
            <MessageCircle className="h-5 w-5" />
            <span className="sr-only">Chats</span>
          </Link>
        </Button>
        {isMobile && (
          <Button variant="destructive" size="icon">
            <HeartPulse className="h-5 w-5" />
            <span className="sr-only">SOS</span>
          </Button>
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
    <SidebarInset>
      <div ref={ref} className="flex h-screen flex-col" {...props} />
    </SidebarInset>
  );
});
AppContainer.displayName = 'AppContainer';

export { AppContainer };
