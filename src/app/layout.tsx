/**
 * Root layout — minimal wrapper required by Next.js.
 * The actual content layout lives in src/app/[locale]/layout.tsx.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
