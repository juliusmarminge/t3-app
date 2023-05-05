import "~/styles/globals.css";
import { Inter } from "next/font/google";
import { SessionProvider } from "./auth-provider";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <SessionProvider>
        <body
          className={`min-h-screen bg-background font-sans antialiased ${fontSans.variable}`}
        >
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">{props.children}</div>
          </div>
        </body>
      </SessionProvider>
    </html>
  );
}
