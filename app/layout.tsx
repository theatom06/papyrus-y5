import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
export const metadata: Metadata = { title: 'Papyrus — The student paper archive', description: 'Search, view, and share authentic ICSE and ISC past papers, prelims, and revision notes.', generator: 'v0.app' }
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#fdfbf7', width: 'device-width', initialScale: 1 }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html> }
