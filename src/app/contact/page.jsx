'use client'
import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import toast from 'react-hot-toast'
import * as Yup from 'yup'


const contactFormSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  message: Yup.string().required('Message is required').min(10, 'Message must be at least 10 characters')
})

const Contact = () => {

  const contactForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: ''
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post('/api/contact', values)
        toast.success('Message sent successfully!')
        resetForm()

      } catch (error) {
        console.error('Error sending message:', error)
        toast.error('Failed to send message. Please try again later.')
      }
    },
    validationSchema: contactFormSchema
  })


  return(
  <div className="min-h-screen bg-gradient-to-br pb-16 from-slate-900 via-blue-900 to-slate-800 text-white flex items-center justify-center px-4">
    <div className="max-w-xl w-full bg-[#121D3D] rounded-2xl shadow-2xl p-10 text-center mt-20">
      <h1 className="text-4xl font-bold text-orange-400 mb-4">Contact Us</h1>
      <p className="text-blue-200 text-lg mb-8">
        Have questions, suggestions, or feedback? We'd love to hear from you!
      </p>
      <form className="space-y-6" onSubmit={contactForm.handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Your Name"
            id='name'
            onChange={contactForm.handleChange}
            value={contactForm.values.name}
            className="w-full bg-slate-800/70 px-4 py-3 rounded-lg border border-blue-700/50 text-white placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            required
          />
          {contactForm.errors.name && contactForm.touched.name && (
            <div className="text-red-500 text-sm mt-1">
              {contactForm.errors.name}
            </div>
          )}
        </div>
        <div>
          <input
            type="email"
            placeholder="Your Email"
            id='email'
            onChange={contactForm.handleChange}
            value={contactForm.values.email}
            className="w-full bg-slate-800/70 px-4 py-3 rounded-lg border border-blue-700/50 text-white placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            required
          />
          {contactForm.errors.email && contactForm.touched.email && (
            <div className="text-red-500 text-sm mt-1">
              {contactForm.errors.email}
            </div>
          )}
        </div>
        <div>
          <textarea
            rows={4}
            placeholder="Your Message"
            id='message'
            onChange={contactForm.handleChange}
            value={contactForm.values.message}
            className="w-full bg-slate-800/70 px-4 py-3 rounded-lg border border-blue-700/50 text-white placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition resize-none"
            required
          />
          {contactForm.errors.message && contactForm.touched.message && (
            <div className="text-red-500 text-sm mt-1">
              {contactForm.errors.message}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-3 rounded-lg font-bold text-lg shadow-lg transition"
        >
          Send Message
        </button>
      </form>
      <div className="mt-8 text-blue-100">
        Or email us directly at <span className="text-orange-400"><a href="mailto:mevikas51@gmail.com">mevikas51@gmail.com</a></span>
      </div>
    </div>
  </div>
)}

export default Contact