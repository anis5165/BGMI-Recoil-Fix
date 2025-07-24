'use client'
import React from 'react'

const About = () => (
  <div className="min-h-screen bg-gradient-to-br pb-16 pt-5 from-slate-900 via-blue-900 to-slate-800 text-white flex items-center justify-center px-4">
    <div className="max-w-4xl w-full bg-[#121D3D] rounded-2xl shadow-2xl p-10 text-center mt-20">
      <h1 className="text-4xl font-bold  bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">About BGMI Setup Zone</h1>
      <p className="text-blue-200 text-lg mb-6">
        BGMI Setup Zone is your go-to platform for mastering Battlegrounds Mobile India sensitivity settings. 
        We help players of all levels optimize their gameplay by providing scientifically tailored sensitivity recommendations for every device and FPS support.
      </p>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-orange-300 mb-2">Our Mission</h2>
        <p className="text-blue-100">
          To empower BGMI players with the best possible control and precision, making pro-level performance accessible to everyone.
        </p>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-orange-300 mb-2">Why Choose Us?</h2>
        <ul className="list-disc list-inside text-blue-100 text-left mx-auto max-w-md">
          <li>Device-specific sensitivity recommendations</li>
          <li>Support for all major FPS modes</li>
          <li>Camera, ADS, Gyroscope, and Fire button settings</li>
          <li>Completely free for all BGMI players</li>
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-orange-300 mb-2">Contact</h2>
        <p className="text-blue-100">
          Have questions or feedback? Reach out at <span className="text-orange-400"><a href="mailto:mevikas51@gmail.com">mevikas51@gmail.com</a></span>
        </p>
      </div>
    </div>
  </div>
)

export default About