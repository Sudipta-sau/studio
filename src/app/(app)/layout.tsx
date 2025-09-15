import { BottomNavbar } from '@/components/layout/bottom-navbar';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <BottomNavbar />
    </>
  );
}
