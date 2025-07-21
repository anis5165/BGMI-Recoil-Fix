'use client'
import { useFormik } from 'formik'
import { Gamepad2, Smartphone } from 'lucide-react'
import React, { useState } from 'react'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import axios from 'axios'
import Link from 'next/link'

const Sensitivity = () => {
  const [parsedResponse, setParsedResponse] = useState(null)

  const parseGeminiResponse = (text) => {
    const sections = text.split(/\n\s*---\s*\n/);
  
    const extractValues = (section) => {
      const lines = section.split('\n').filter(line => line.includes(':'));
      return Object.fromEntries(
        lines.map(line => {
          const [key, ...rest] = line.replace(/^[-*]\s*/, '').split(':');
          return [key.trim(), rest.join(':').trim()];
        })
      );
    };
  
    return {
      deviceDetails: extractValues(sections.find(s => s.includes('📱')) || ''),
      cameraFreeLook: extractValues(sections.find(s => s.includes('🎥')) || ''),
      cameraScope: extractValues(sections.find(s => s.includes('📷')) || ''),
      ads: extractValues(sections.find(s => s.includes('🎯')) || ''),
      gyroscope: extractValues(sections.find(s => s.includes('🌀')) || '')
    };
  };
  

  const sensiForm = useFormik({
    initialValues: {
      device: '',
      fps: '',
    },
    onSubmit: (values) => {
      axios.post('/api/gemini', values)
        .then((result) => {
          const rawText = result.data.text
          console.log('Gemini Response:', rawText)
          const parsed = parseGeminiResponse(rawText)
          setParsedResponse(parsed)
          toast.success('Sensitivity settings generated successfully!')
        })
        .catch((err) => {
          console.error('Error fetching sensitivity settings:', err)
          toast.error('Failed to fetch sensitivity settings. Please try again later.')
          setParsedResponse(null)
        })
    },
    validationSchema: Yup.object({
      device: Yup.string().required('Device name is required'),
      fps: Yup.string().required('FPS support is required'),
    }),
  })

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white flex items-center justify-center overflow-hidden'>
      <div className='flex flex-col items-center max-w-3xl mx-auto justify-center bg-[#121D3D] p-8 rounded-2xl shadow-2xl text-center mt-20 z-10 relative'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold mb-2 text-orange-400'>Generate Your BGMI Sensitivity</h1>
          <p className='text-blue-300 text-base'>Get personalized sensitivity settings optimized for your device and playstyle</p>
        </div>
        <form className="w-full" onSubmit={sensiForm.handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
            <div className="space-y-3">
              <label htmlFor="device" className="text-white text-lg flex items-center gap-2 font-semibold">
                <Smartphone className="h-5 w-5 text-orange-500" />
                Device Name
              </label>
              <input
                id="device"
                placeholder="e.g., iPhone 14 Pro, Samsung Galaxy S23"
                onChange={(e) => {
                  sensiForm.handleChange(e)
                  setParsedResponse(null)
                }}
                value={sensiForm.values.device}
                className="bg-slate-800/70 px-4 py-3 w-full border border-blue-700/50 rounded-lg text-white placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                required
              />
            </div>
            <div className="space-y-3">
              <label htmlFor="fps" className="text-white text-lg flex items-center gap-2 font-semibold">
                <Gamepad2 className="h-5 w-5 text-orange-500" />
                FPS Support
              </label>
              <select
                id="fps"
                className="bg-slate-800/70 px-4 py-3 w-full border border-blue-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                required
                onChange={(e) => {
                  sensiForm.handleChange(e)
                  setParsedResponse(null)
                }}
                value={sensiForm.values.fps}
              >
                <option value="" disabled>Select FPS</option>
                <option value="medium">Medium (25-30)FPS</option>
                <option value="high">High (30–40)FPS</option>
                <option value="ultra">Ultra (40–45)FPS</option>
                <option value="extreme">Extreme (55–60)FPS</option>
                <option value="90">90 FPS</option>
                <option value="120">120 FPS</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-3 rounded-lg font-bold text-lg shadow-lg transition"
          >
            Generate Sensitivity
          </button>
        </form>

        {parsedResponse && (
          <div className="mt-8 w-full bg-slate-900/80 border border-orange-500 rounded-xl p-6 text-left shadow-lg animate-fade-in space-y-6">
            <h2 className="text-2xl font-bold text-orange-400">Your Personalized Sensitivity Settings</h2>

            <section>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">📱 Device Details</h3>
              <ul className="text-blue-200 list-disc list-inside space-y-1">
                {Object.entries(parsedResponse.deviceDetails).map(([key, value]) => (
                  <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">🎥 Camera Sensitivity (Free Look)</h3>
              <ul className="text-blue-200 list-disc list-inside space-y-1">
                {Object.entries(parsedResponse.cameraFreeLook).map(([key, value]) => (
                  <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">📷 Camera Sensitivity (Scope Movement)</h3>
              <ul className="text-blue-200 list-disc list-inside space-y-1">
                {Object.entries(parsedResponse.cameraScope).map(([key, value]) => (
                  <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">🎯 ADS Sensitivity (Touch Recoil)</h3>
              <ul className="text-blue-200 list-disc list-inside space-y-1">
                {Object.entries(parsedResponse.ads).map(([key, value]) => (
                  <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">🌀 Gyroscope Sensitivity</h3>
              <ul className="text-blue-200 list-disc list-inside space-y-1">
                {Object.entries(parsedResponse.gyroscope).map(([key, value]) => (
                  <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sensitivity
