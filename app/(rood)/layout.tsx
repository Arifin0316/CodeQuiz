import Navbar from '@/components/layout/navbar'
import { SessionProvider } from 'next-auth/react'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div>
        <SessionProvider>
         <Navbar />
        <main>
          {children}
        </main>
        </SessionProvider>
        
      </div>
        

  )
}