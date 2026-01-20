import Image from 'next/image'
import React from 'react'
import Navbar from './Navbar';


interface LayoutProps{
    children: React.ReactNode; //untuk menangkap html
    // children: string; //untuk menangkap berupa string
}

export default function Layout({children}: LayoutProps) {
  return (
    
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
    <main className="flex min-h-screen w-full flex-col items-center py-8 px-16 bg-white sm:items-start">
    <Navbar/>
      {/* <Image
       // className="dark:invert" // warna text
        src="/next.svg"
        alt="Next.js logo"
        width={100}
        height={20}
        priority
      /> */}
      {children}

      
    </main>
  </div>
  )
}
