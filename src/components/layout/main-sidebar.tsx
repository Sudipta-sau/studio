'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons/logo';
import {
  Home,
  MessageCircle,
  Users,
  ShieldCheck,
  ShieldAlert,
  User,
  LogOut,
  HeartPulse,
  Users2,
  Settings
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

const menuItems = [
  { href: '/', label: 'Feed', icon: Home },
  { href: '/chat', label: 'Chats', icon: MessageCircle },
  { href: '/friends', label: 'Friends', icon: Users2 },
  { href: '/guides', label: 'Guides', icon: Users },
  { href: '/verification', label: 'Verification', icon: ShieldCheck },
  { href: '/moderation', label: 'Moderation', icon: ShieldAlert },
];

export function MainSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon">
      <div className="flex flex-col h-full">
        <SidebarHeader>
          <Link href="/" className="flex items-center gap-2.5" aria-label="Home">
            <Logo className="w-8 h-8 neon-icon" />
            <span className="font-headline text-xl font-bold text-foreground">RoamFree</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={isActive(item.href)}
                    tooltip={item.label}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <Separator className="my-2" />
          <SidebarMenu>
            <SidebarMenuItem>
               <Link href="/profile">
                  <SidebarMenuButton
                    isActive={isActive('/profile')}
                    tooltip="Profile"
                  >
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
               <Link href="/settings">
                  <SidebarMenuButton
                    isActive={isActive('/settings')}
                    tooltip="Settings"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton tooltip="Logout">
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <Button variant="destructive" className="m-2 mt-4 flex items-center gap-2 justify-center">
              <HeartPulse className="h-5 w-5" />
              <span className="font-bold">SOS</span>
          </Button>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
