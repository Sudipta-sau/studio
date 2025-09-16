'use client';

import { Home, Users, ShieldCheck, User, Search, MessageCircle, Settings, LogOut, HeartPulse, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';
import { Separator } from '../ui/separator';
import { Logo } from '../icons/logo';
import { users } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const mainMenuItems = [
  { href: '/', label: 'Feed', icon: Home },
  { href: '/guides', label: 'Search', icon: Search },
  { href: '/friends', label: 'Friends', icon: Users },
  { href: '/chat', label: 'Chats', icon: MessageCircle },
  { href: '/verification', label: 'Verification', icon: ShieldCheck },
  { href: '/moderation', label: 'Moderation', icon: ShieldAlert },
];

const secondaryMenuItems = [
    { href: '/settings', label: 'Settings', icon: Settings },
]

export function RightNavbar() {
  const pathname = usePathname();
  const currentUser = users.find(u => u.id === 'u5');

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <Sidebar side="right" collapsible="icon" className="group-data-[collapsible=icon]:w-[4rem] transition-all duration-300 ease-in-out">
        <SidebarHeader className="h-14 items-center justify-center">
            <Link href="/" className="flex items-center gap-2 font-semibold">
                <Logo className="h-6 w-6" />
                <span className="group-data-[collapsible=icon]:hidden">RoamFree</span>
            </Link>
        </SidebarHeader>
        <Separator />
        <SidebarContent>
            <SidebarMenu>
                {mainMenuItems.map((item) => (
                    <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton
                            asChild
                            isActive={isActive(item.href)}
                            className="justify-start group-data-[collapsible=icon]:justify-center"
                        >
                            <Link href={item.href}>
                                <item.icon className="h-5 w-5" />
                                <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarContent>
        <Separator />
        <SidebarFooter>
             <div className="flex flex-col gap-2 items-center group-data-[collapsible=icon]:w-full">
                <Button variant="destructive" className="w-full group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:aspect-square group-data-[collapsible=icon]:p-0">
                    <HeartPulse className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden ml-2">SOS</span>
                </Button>
                {currentUser && (
                    <SidebarMenu>
                        <SidebarMenuItem>
                             <SidebarMenuButton
                                asChild
                                isActive={isActive('/profile')}
                                className="justify-start group-data-[collapsible=icon]:justify-center"
                            >
                                <Link href="/profile">
                                    <Avatar className="h-7 w-7">
                                        <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                                        <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="group-data-[collapsible=icon]:hidden">Profile</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                )}
                 {secondaryMenuItems.map((item) => (
                    <SidebarMenu key={item.label} className="w-full">
                         <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                isActive={isActive(item.href)}
                                className="justify-start group-data-[collapsible=icon]:justify-center"
                            >
                                <Link href={item.href}>
                                    <item.icon className="h-5 w-5" />
                                    <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                ))}
                 <SidebarMenu className="w-full">
                     <SidebarMenuItem>
                        <SidebarMenuButton variant="ghost" className="w-full justify-start group-data-[collapsible=icon]:justify-center">
                            <LogOut className="h-5 w-5" />
                            <span className="group-data-[collapsible=icon]:hidden">Logout</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                 </SidebarMenu>
             </div>
        </SidebarFooter>
    </Sidebar>
  );
}
