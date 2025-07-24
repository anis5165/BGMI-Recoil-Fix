'use client'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import * as Yup from 'yup'

const Feedback = () => {

    const feedbackform = useFormik({
    initialValues: {
      name: '',
      location: '',
      feedback: ''
    },
    onSubmit: async (values, { resetForm, setSubmitting }) => {
        try {
            await axios.post('/api/feedback', values)
            toast.success('Feedback submitted successfully!')
            setSubmitting(false)
            resetForm()
        } catch (error) {
            console.error('Error submitting feedback:', error)
            setSubmitting(false)
            toast.error('Failed to submit feedback. Please try again later.')
        }
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      location: Yup.string().required('Location is required'),
      feedback: Yup.string().required('Feedback is required').min(10, 'Feedback must be at least 10 characters')
    })
})

  return (
    <div className="w-full max-w-md mx-auto bg-[#121D3D] rounded-2xl shadow-xl p-6 mt-10 mb-10">
      <h2 className="text-2xl font-bold text-orange-400 mb-4 text-center">We Value Your Feedback</h2>
      <form onSubmit={feedbackform.handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="bg-slate-800/70 px-4 py-3 rounded-lg border border-blue-700/50 text-white placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            value={feedbackform.values.name}
            onChange={feedbackform.handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Your Location"
          className="bg-slate-800/70 px-4 py-3 rounded-lg border border-blue-700/50 text-white placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            value={feedbackform.values.location}
            onChange={feedbackform.handleChange}
          required
        />
        <textarea
          name="feedback"
          rows={3}
          placeholder="Your Feedback"
          className="bg-slate-800/70 px-4 py-3 rounded-lg border border-blue-700/50 text-white placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition resize-none"
            value={feedbackform.values.feedback}
            onChange={feedbackform.handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-2 rounded-lg font-bold text-lg shadow-lg transition"
            disabled={feedbackform.isSubmitting}
        >
            {feedbackform.isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  )
}

export default Feedback