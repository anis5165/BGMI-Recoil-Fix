import React from 'react'

const Footer = () => {
    return (
        <footer className="py-8 px-4 border-t border-blue-800/30 bg-slate-900 backdrop-blur-sm">
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-lg font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent'>BGMI Step Zone</h1>
                <p className='text-blue-300 text-sm'>© 2024 BGMI Step Zone. Helping gamers achieve their best performance.</p>
            </div>
        </footer>
    )
}

export default Footer