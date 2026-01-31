import { ReactNode } from 'react'
import Toolbar from './Toolbar'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <Toolbar />
      {children}
      <Footer />
    </div>
  )
}
