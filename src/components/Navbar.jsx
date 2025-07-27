'use client'
import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    // Prevent background scroll when menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [menuOpen])

    return (
        <>
            <div className='fixed w-full z-50 px-4 lg:px-36 h-16 flex justify-between items-center border-b border-blue-800/30 backdrop-blur-sm bg-slate-900/50'>
                <h1 className='text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent'>BGMISensiFix</h1>
                {/* Desktop Nav */}
                <nav className='hidden md:flex justify-between items-center space-x-4'>
                    <ul className='flex space-x-4 text-white'>
                        <li className='text-sm font-medium hover:text-orange-400 transition-colors'><Link href="/">Home</Link></li>
                        <li className='text-sm font-medium hover:text-orange-400 transition-colors'><Link href="/about">About</Link></li>
                        <li className='text-sm font-medium hover:text-orange-400 transition-colors'><Link href="/contact">Contact</Link></li>
                        <li className='text-sm font-medium hover:text-orange-400 transition-colors'><Link href="/sensitivity">Get Sensitivity</Link></li>
                    </ul>
                </nav>
                {/* Mobile Hamburger */}
                <button
                    className='md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 transition'
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                >
                    {menuOpen ? <X className='w-7 h-7 text-orange-400' /> : <Menu className='w-7 h-7 text-orange-400' />}
                </button>
            </div>
            {/* Mobile Menu Overlay */}
            {menuOpen && (
                <div className='fixed inset-0 bg-slate-900/95 z-[100] flex flex-col items-center justify-center md:hidden transition-all duration-300'>
                    <button
                        className='absolute top-6 right-6 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500'
                        onClick={() => setMenuOpen(false)}
                        aria-label='Close menu'
                    >
                        <X className='w-8 h-8 text-orange-400' />
                    </button>
                    <ul className='flex flex-col space-y-8 text-white text-2xl font-semibold'>
                        <li><Link href="/" onClick={() => setMenuOpen(false)} className='hover:text-orange-400 transition-colors'>Home</Link></li>
                        <li><Link href="/about" onClick={() => setMenuOpen(false)} className='hover:text-orange-400 transition-colors'>About</Link></li>
                        <li><Link href="/contact" onClick={() => setMenuOpen(false)} className='hover:text-orange-400 transition-colors'>Contact</Link></li>
                        <li><Link href="/sensitivity" onClick={() => setMenuOpen(false)} className='hover:text-orange-400 transition-colors'>Get Sensitivity</Link></li>
                    </ul>
                </div>
            )}
        </>
    )
}

export default Navbar