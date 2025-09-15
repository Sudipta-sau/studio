import { RightNavbar } from '@/components/layout/right-navbar';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <main className="flex-1 overflow-y-auto">{children}</main>
      <RightNavbar />
    </div>
  );
}
