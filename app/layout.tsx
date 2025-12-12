import { Logo } from "./_components/Logo";
import { Navigation } from "./_components/Navigation";
import "./_styles/global.css";

export const metadata = {
  title: "The Wild Oasis",
  description: "A sanctuary for nature lovers and adventurers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className="bg-primary-950 text-primary-50 min-h-screen">
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
