import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import Sidebar from "@/components/shared/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-dvh flex sm:gap-2">
      <Sidebar />
      <DashboardAuthWrapper>
            {children}
        </DashboardAuthWrapper>
    </main>
  );
}
