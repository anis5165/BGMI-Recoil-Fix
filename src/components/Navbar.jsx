import React from 'react'

const Navbar = () => {
    return (
        <div className=' fixed w-full z-50 px-4 lg:px-36 h-16 flex justify-between items-center border-b border-blue-800/30 backdrop-blur-sm bg-slate-900/50'>
            <h1 className='text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent'>BGMI Step Zone</h1>
            <nav className='flex justify-between items-center space-x-4'>
                <ul className='flex space-x-4 text-white'>
                    <li className='text-sm font-medium hover:text-orange-400 transition-colors'><a href="/">Home</a></li>
                    <li className='text-sm font-medium hover:text-orange-400 transition-colors'><a href="/about">About</a></li>
                    <li className='text-sm font-medium hover:text-orange-400 transition-colors'><a href="/contact">Contact</a></li>
                    <li className='text-sm font-medium hover:text-orange-400 transition-colors'><a href="/sensitivity">Get Sensitivity</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar