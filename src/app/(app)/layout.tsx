import { RightNavbar } from '@/components/layout/right-navbar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <main className="flex-1 overflow-y-auto">{children}</main>
        <RightNavbar />
      </div>
    </SidebarProvider>
  );
}
