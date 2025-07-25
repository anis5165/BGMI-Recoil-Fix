'use client'
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'
import { Settings, Smartphone, Zap } from 'lucide-react'
import axios from 'axios'


const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [feedback, setFeedback] = useState([])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])


  const fetchfeedback = async () => {
    const response = await axios.get('/api/feedback')
    // console.log(response.data)
    setFeedback(response.data)
  }

  useEffect(() => {
    fetchfeedback()
  }, [])

  return (
    <div className='min-h-screen bg-gradient-to-br z-[-10] from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden'>
      {/* BGMI Character Image */}
      <div
        className="fixed top-1/2 left-1/2 z-0 pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate(-50%, -50%) translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
      >
        <div className="relative">
          <img
            src="/image.png"
            alt="BGMI Character"
            className="w-32 sm:w-40 h-auto drop-shadow-2xl opacity-90 hover:opacity-100 transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl scale-150 animate-pulse"></div>
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-orange-500/30 rounded-full blur-sm"></div>
        </div>
      </div>

      {/* hero section */}
      <main className='z-20 relative'>
        <section className='mt-32 sm:mt-40 z-10 px-4'>
          <div className='flex flex-col items-center justify-center text-center space-y-6'>
            <h1 className='mb-6 w-52 rounded-full bg-orange-500/20 text-orange-300 border-orange-500/30 text-base sm:text-lg'>🎯 Pro Gaming Sensitivity</h1>
            <h1 className='text-3xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-orange-300 bg-clip-text text-transparent'>
              Master Your BGMI <br /> <span className='text-orange-500'>Sensitivity</span>
            </h1>
            <p className="text-lg md:text-2xl text-blue-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Get personalized sensitivity settings based on your device and FPS support. Dominate the battleground with
              pro-level precision and control.
            </p>
            <Link href='/sensitivity'>
              <button className='bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 rounded-lg hover:to-red-700 text-white px-6 py-3 text-base sm:text-lg font-semibold shadow-2xl'>
                Get Sensitivity
              </button>
            </Link>
          </div>
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
            <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce"></div>
          </div>
        </section>

        {/* feature section */}
        <section className='py-16 sm:py-20 mt-16 sm:mt-28 px-4 sm:px-8 md:px-16 lg:px-36 bg-slate-800/50 backdrop-blur-sm'>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-white">Why Choose Our Sensitivity Service?</h2>
            <p className="text-lg sm:text-xl text-blue-200 max-w-2xl mx-auto">
              Scientifically optimized settings for every device and playstyle.<br />
              <span className="text-orange-400 font-semibold">Powered by AI for truly personalized BGMI sensitivity.</span>
            </p>
          </div>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-[#11192C] backdrop-blur-lg p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Smartphone className="w-10 h-10 sm:w-12 sm:h-12 text-orange-500 mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Device Optimization</h3>
                <p className="text-blue-200">Tailored sensitivity for your specific device model and screen size</p>
              </div>
              <div className="bg-[#11192C] backdrop-blur-lg p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-orange-500 mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">FPS Support</h3>
                <p className="text-blue-200">Optimized for your device's FPS capability - 30, 40, 60, 90, or 120 FPS</p>
              </div>
              <div className="bg-[#11192C] backdrop-blur-lg p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Settings className="w-10 h-10 sm:w-12 sm:h-12 text-orange-500 mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Complete Setup</h3>
                <p className="text-blue-200">Camera, ADS, Gyroscope, and Fire button sensitivity included</p>
              </div>
            </div>
          </div>
        </section>

        {/* testimonials section */}
        <section className="py-16 sm:py-20 px-4 sm:px-8 md:px-16 lg:px-36 ">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-orange-400">What Players Say</h2>
            <p className="text-lg sm:text-xl text-blue-200 max-w-2xl mx-auto">
              Real feedback from BGMI pros and enthusiasts
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {feedback.map((item, index) => (
              <div key={index} className="bg-slate-800 p-6 rounded-lg shadow-lg">
                <p className="text-blue-100 mb-4">"{item.feedback}"</p>
                <span className="text-orange-300 font-semibold">{item.name}, {item.location}</span>
              </div>
            ))}
          </div>

        </section>

        {/* FAQ section */}
        <section className="py-16 sm:py-20 px-4 sm:px-8 md:px-16 lg:px-36 bg-slate-800/70">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-orange-400">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-orange-300 mb-2">How do I get my device’s sensitivity settings?</h3>
              <p className="text-blue-200">Just click "Get Sensitivity" and follow the steps. You’ll get settings tailored for your device and FPS.</p>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-orange-300 mb-2">Is this service free?</h3>
              <p className="text-blue-200">Yes, it’s completely free for all BGMI players!</p>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-orange-300 mb-2">Can I use these settings for other games?</h3>
              <p className="text-blue-200">These settings are optimized for BGMI, but you can try them in similar games for good results.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home