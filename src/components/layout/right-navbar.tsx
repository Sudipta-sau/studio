
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
import { useState } from 'react';

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
  const [isExpanded, setIsExpanded] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <div
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className="relative"
    >
        <Sidebar 
            side="right" 
            collapsible="icon" 
            className={cn(
                "transition-all duration-300 ease-in-out",
                isExpanded ? "w-[16rem]" : "w-[4rem]"
            )}
        >
            <SidebarHeader className="h-14 items-center justify-center">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <Logo className="h-6 w-6" />
                    <span className={cn(!isExpanded && "hidden")}>RoamFree</span>
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
                                className={cn("justify-start", !isExpanded && "justify-center")}
                            >
                                <Link href={item.href}>
                                    <item.icon className="h-5 w-5" />
                                    <span className={cn(!isExpanded && "hidden")}>{item.label}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <Separator />
            <SidebarFooter>
                 <div className={cn("flex flex-col gap-2 items-center", isExpanded && "w-full")}>
                    <Button variant="destructive" className={cn("w-full", !isExpanded && "w-auto h-10 aspect-square p-0")}>
                        <HeartPulse className="h-5 w-5" />
                        <span className={cn(!isExpanded && "hidden", "ml-2")}>SOS</span>
                    </Button>
                    {currentUser && (
                        <SidebarMenu>
                            <SidebarMenuItem>
                                 <SidebarMenuButton
                                    asChild
                                    isActive={isActive('/profile')}
                                    className={cn("justify-start", !isExpanded && "justify-center")}
                                >
                                    <Link href="/profile">
                                        <Avatar className="h-7 w-7">
                                            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                                            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span className={cn(!isExpanded && "hidden")}>Profile</span>
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
                                    className={cn("justify-start", !isExpanded && "justify-center")}
                                >
                                    <Link href={item.href}>
                                        <item.icon className="h-5 w-5" />
                                        <span className={cn(!isExpanded && "hidden")}>{item.label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    ))}
                     <SidebarMenu className="w-full">
                         <SidebarMenuItem>
                            <SidebarMenuButton variant="ghost" className={cn("w-full justify-start", !isExpanded && "justify-center")}>
                                <LogOut className="h-5 w-5" />
                                <span className={cn(!isExpanded && "hidden")}>Logout</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                     </SidebarMenu>
                 </div>
            </SidebarFooter>
        </Sidebar>
    </div>
  );
}
