import { Logo } from "./_components/Logo";
import { Navigation } from "./_components/Navigation";
import "./_styles/global.css";

export const metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
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
