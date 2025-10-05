import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import { Toaster } from "react-hot-toast";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>

      <Navbar />
      
        <Toaster
            position="top-center" 
            reverseOrder={false}
        />
      <main className="min-h-dvh">{children}</main>
      <Footer />
    </>
  );
}
