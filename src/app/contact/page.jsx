'use client'
import React from 'react'

const Contact = () => (
  <div className="min-h-screen bg-gradient-to-br pb-16 from-slate-900 via-blue-900 to-slate-800 text-white flex items-center justify-center px-4">
    <div className="max-w-xl w-full bg-[#121D3D] rounded-2xl shadow-2xl p-10 text-center mt-20">
      <h1 className="text-4xl font-bold text-orange-400 mb-4">Contact Us</h1>
      <p className="text-blue-200 text-lg mb-8">
        Have questions, suggestions, or feedback? We'd love to hear from you!
      </p>
      <form className="space-y-6">
        <div>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full bg-slate-800/70 px-4 py-3 rounded-lg border border-blue-700/50 text-white placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Your Email"
            className="w-full bg-slate-800/70 px-4 py-3 rounded-lg border border-blue-700/50 text-white placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            required
          />
        </div>
        <div>
          <textarea
            rows={4}
            placeholder="Your Message"
            className="w-full bg-slate-800/70 px-4 py-3 rounded-lg border border-blue-700/50 text-white placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition resize-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-3 rounded-lg font-bold text-lg shadow-lg transition"
        >
          Send Message
        </button>
      </form>
      <div className="mt-8 text-blue-100">
        Or email us directly at <span className="text-orange-400">bgmisetupzone@gmail.com</span>
      </div>
    </div>
  </div>
)

export default Contact