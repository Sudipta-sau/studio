import { MainSidebar } from '@/components/layout/main-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <MainSidebar />
      {children}
    </SidebarProvider>
  );
}
