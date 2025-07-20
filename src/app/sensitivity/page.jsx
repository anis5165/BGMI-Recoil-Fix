'use client'
import { useFormik } from 'formik'
import { Gamepad2, Smartphone } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import axios from 'axios'

const Sensitivity = () => {


  const sensiForm = useFormik({
    initialValues: {
      device: '',
      fps: '',
    },
    onSubmit: (values) => {
      axios.post('/api/gemini', values)
      .then((result) => {
        const response = result.data.text
        console.log('Response from Gemini API:', response)
        toast.success('Sensitivity settings generated successfully!')
  
      }).catch((err) => {
        console.error('Error fetching sensitivity settings:', err)
        toast.error('Failed to fetch sensitivity settings. Please try again later.')
      });
      console.log('Form submitted with values:', values)
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
                onChange={sensiForm.handleChange}
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
                onChange={sensiForm.handleChange}
                value={sensiForm.values.fps}
                defaultValue=""
              >
                <option value="" disabled>Select FPS</option>
                <option value="30">30 FPS</option>
                <option value="40">40 FPS</option>
                <option value="60">60 FPS</option>
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
      </div>
    </div>
  )
}

export default Sensitivity