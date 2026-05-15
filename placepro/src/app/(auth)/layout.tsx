import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)] text-[var(--text)]">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-4">
        {children}
      </main>

      <Footer />
    </div>
  );
}