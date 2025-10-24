import { Poppins } from "next/font/google";
import "./globals.css";
import { VariantProvider } from "@/utils/hooks";
import { constructMetadata } from "@/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress hydration warnings for browser extensions
              if (typeof window !== 'undefined') {
                const originalError = console.error;
                console.error = (...args) => {
                  if (
                    typeof args[0] === 'string' &&
                    args[0].includes('Hydration failed')
                  ) {
                    return;
                  }
                  originalError.apply(console, args);
                };
              }
            `,
          }}
        />
      </head>
      <body className={poppins.className} suppressHydrationWarning>
        <VariantProvider>{children}</VariantProvider>
      </body>
    </html>
  );
}
