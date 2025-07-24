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
  const [rawText, setRawText] = useState('')
  const [loading, setLoading] = useState(false) // <-- Add loading state

  const parseGeminiResponse = (text) => {
    if (!text || typeof text !== 'string') return null;

    const sectionMap = {
      deviceDetails: /(📱.*?Device Details|Device Details)[\s\S]*?(?=\n[^\n]*?(🎥|📷|🎯|🌀|$))/,
      cameraFreeLook: /(🎥.*?Free Look|Camera Sensitivity \(Free Look\))[\s\S]*?(?=\n[^\n]*?(📷|🎯|🌀|$))/,
      cameraScope: /(📷.*?Scope Movement|Camera Sensitivity \(Scope Movement\))[\s\S]*?(?=\n[^\n]*?(🎯|🌀|$))/,
      ads: /(🎯.*?Touch Recoil|ADS Sensitivity \(Touch Recoil\))[\s\S]*?(?=\n[^\n]*?(🌀|$))/,
      gyroscope: /(🌀.*?Gyroscope|Gyroscope Sensitivity)[\s\S]*/,
    };

    const extractValues = (section) => {
      if (!section) return {};
      const lines = section.split('\n').filter(line => line.includes(':'));
      return Object.fromEntries(
        lines.map(line => {
          const [key, ...rest] = line.replace(/^[-*]\s*/, '').split(':');
          return [key.trim(), rest.join(':').trim()];
        })
      );
    };

    const parsed = {};
    for (const [key, regex] of Object.entries(sectionMap)) {
      const match = text.match(regex);
      parsed[key] = extractValues(match?.[0] || '');
    }

    if (Object.values(parsed).every(obj => Object.keys(obj).length === 0)) {
      return null;
    }

    return parsed;
  };

  const sensiForm = useFormik({
    initialValues: {
      device: '',
      fps: '',
    },
    onSubmit: (values) => {
      setLoading(true) // Start loading
      axios.post('/api/gemini', values)
        .then((result) => {
          const raw = result.data.text
          setRawText(raw)
          const parsed = parseGeminiResponse(raw)
          setParsedResponse(parsed)
          toast.success('Sensitivity settings generated successfully!')
        })
        .catch((err) => {
          toast.error('Failed to fetch sensitivity settings. Please try again later.')
          setParsedResponse(null)
        })
        .finally(() => setLoading(false)) // Stop loading
    },
    validationSchema: Yup.object({
      device: Yup.string().required('Device name is required'),
      fps: Yup.string().required('FPS support is required'),
    }),
  })

  return (
    <div className='min-h-screen bg-gradient-to-br pb-10 from-slate-900 via-blue-900 to-slate-800 text-white flex items-center justify-center overflow-hidden'>
      <div className='flex flex-col items-center w-full max-w-3xl md:mx-auto mx-4 justify-center p-4 bg-[#121D3D]  sm:p-6 md:p-8 rounded-2xl shadow-2xl text-center mt-20 sm:mt-16 md:mt-20 z-10 relative'>
        <div className='mb-8'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-orange-400'>Generate Your BGMI Sensitivity</h1>
          <p className='text-blue-300 text-sm sm:text-base'>Get personalized sensitivity settings optimized for your device and playstyle</p>
        </div>
        <form className="w-full" onSubmit={sensiForm.handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8'>
            <div className="space-y-3">
              <label htmlFor="device" className="text-white text-base sm:text-lg flex items-center gap-2 font-semibold">
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
                className="bg-slate-800/70 px-4 py-3 w-full border border-blue-700/50 rounded-lg text-white placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition text-sm sm:text-base"
                required
              />
              {sensiForm.touched.device && sensiForm.errors.device && (
                <div className="text-red-400 text-xs text-left">{sensiForm.errors.device}</div>
              )}
            </div>
            <div className="space-y-3">
              <label htmlFor="fps" className="text-white text-base sm:text-lg flex items-center gap-2 font-semibold">
                <Gamepad2 className="h-5 w-5 text-orange-500" />
                FPS Support
              </label>
              <select
                id="fps"
                className="bg-slate-800/70 px-4 py-3 w-full border border-blue-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition text-sm sm:text-base"
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
              {sensiForm.touched.fps && sensiForm.errors.fps && (
                <div className="text-red-400 text-xs text-left">{sensiForm.errors.fps}</div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-3 rounded-lg font-bold text-base sm:text-lg shadow-lg transition flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                Generating...
              </>
            ) : (
              'Generate Sensitivity'
            )}
          </button>
        </form>

        {parsedResponse ? (
          <div className="mt-8 w-full bg-slate-900/80 border border-orange-500 rounded-xl p-4 sm:p-6 text-left shadow-lg animate-fade-in space-y-6 overflow-x-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-orange-400">Your Personalized Sensitivity Settings</h2>

            <section>
              <h3 className="text-lg sm:text-xl font-semibold text-blue-400 mb-2">📱 Device Details</h3>
              <ul className="text-blue-200 list-disc list-inside space-y-1">
                {Object.entries(parsedResponse.deviceDetails).map(([key, value]) => (
                  <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-lg sm:text-xl font-semibold text-blue-400 mb-2">🎥 Camera Sensitivity (Free Look)</h3>
              <ul className="text-blue-200 list-disc list-inside space-y-1">
                {Object.entries(parsedResponse.cameraFreeLook).map(([key, value]) => (
                  <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-lg sm:text-xl font-semibold text-blue-400 mb-2">📷 Camera Sensitivity (Scope Movement)</h3>
              <ul className="text-blue-200 list-disc list-inside space-y-1">
                {Object.entries(parsedResponse.cameraScope).map(([key, value]) => (
                  <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-lg sm:text-xl font-semibold text-blue-400 mb-2">🎯 ADS Sensitivity (Touch Recoil)</h3>
              <ul className="text-blue-200 list-disc list-inside space-y-1">
                {Object.entries(parsedResponse.ads).map(([key, value]) => (
                  <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-lg sm:text-xl font-semibold text-blue-400 mb-2">🌀 Gyroscope Sensitivity</h3>
              <ul className="text-blue-200 list-disc list-inside space-y-1">
                {Object.entries(parsedResponse.gyroscope).map(([key, value]) => (
                  <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
              </ul>
            </section>
          </div>
        ) : sensiForm.values.device && sensiForm.values.fps && rawText ? (
          <div className="mt-8 w-full bg-slate-900/80 border border-orange-500 rounded-xl p-4 sm:p-6 text-left shadow-lg animate-fade-in space-y-6 overflow-x-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-orange-400">Raw Gemini Output</h2>
            <pre className="text-blue-200 whitespace-pre-wrap text-xs sm:text-sm">{rawText}</pre>
            <p className="text-red-400">Could not parse Gemini response. Please try again or contact support.</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Sensitivity
