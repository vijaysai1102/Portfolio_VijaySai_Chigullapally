import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Vijay Sai Chigullapally — Portfolio', description: 'Selected software projects and experiments by Vijay Sai Chigullapally.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
