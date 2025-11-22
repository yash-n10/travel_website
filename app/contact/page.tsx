"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Check, Linkedin, Instagram, Send, ChevronDown, ChevronUp } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FaWhatsapp,FaGoogle } from "react-icons/fa";

export default function ContactPage() {
  const [settings, setSettings] = useState<any>(null)
  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch('/api/site-settings', { cache: 'no-store' })
        const text = await res.text()
        let out: any = text
        try { out = JSON.parse(text) } catch {}
        setSettings(out?.data ?? out ?? null)
      } catch (e) {
      }
    }
    run()
  }, [])
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferredDestination: "",
    departureDate: "",
    returnDate: "",
    numberOfTravelers: "",
    hotelCategory: "",
    travelInterests: "",
    additionalMessage: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "How do I make a booking or reservation?",
      answer: "You can call us to curate your itinerary and book your holiday.",
    },
    {
      question: "Is my booking confirmed immediately?",
      answer: "Yes, after the initial payment, we will share a confirmation email with you.",
    },
    {
      question: "Can I make changes to my booking after it's confirmed?",
      answer: "We will try our best to help with any modifications to your booking.",
    },
    {
      question: "How do I verify my booking?",
      answer: "You can verify your booking directly with the hotels using the confirmation number provided by us.",
    },
    {
      question: "What forms of payment do you accept?",
      answer: "We accept all major payment modes through secure payment gateways.",
    },
    {
      question: "Are there any hidden fees?",
      answer: "No, there are no hidden charges.",
    },
    {
      question: "Do you offer payment plans or installment options?",
      answer: "Yes, we offer EMI options and flexible payment plans.",
    },
    {
      question: "Can I change my travel dates?",
      answer: "Yes, you can change your travel dates with a minimum fee, subject to hotel and transportation availability on the new dates.",
    },
    {
      question: "When will I receive my final travel documents and itinerary?",
      answer: "You will receive your travel vouchers and final itinerary within 3 days of making the initial payment.",
    },
    {
      question: "Who do I contact in case of an emergency during my trip?",
      answer: "We have an on-ground support team available 24x7 to assist you during your trip.",
    },
    {
      question: "Can you accommodate dietary restrictions (e.g., vegetarian, gluten-free, allergies)?",
      answer: "Yes, we can accommodate dietary restrictions such as vegetarian, gluten-free, and allergies. Please share your requirements with us in advance.",
    },
    {
      question: "Do you offer trips suitable for people with mobility issues or disabilities?",
      answer: "Yes, we offer trips that are suitable for people with mobility issues or disabilities.",
    },
    {
      question: "Can I request a specific room type (e.g., non-smoking, king bed, ocean view)?",
      answer: "Yes, you can request a specific room category such as non-smoking, king bed, or ocean view, and we will do our best to arrange it.",
    },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (submitError) setSubmitError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      if (!formData.firstName || !formData.email) {
        throw new Error('First Name and Email are required fields')
      }

      if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        throw new Error('Please enter a valid email address')
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const contentType = response.headers.get('content-type')
      let result
      
      if (contentType?.includes('application/json')) {
        result = await response.json()
      } else {
        const text = await response.text()
        throw new Error(text || 'Unexpected response from server')
      }

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit contact form')
      }

      setSubmitSuccess(true)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        preferredDestination: "",
        departureDate: "",
        returnDate: "",
        numberOfTravelers: "",
        hotelCategory: "",
        travelInterests: "",
        additionalMessage: "",
      })
    } catch (error) {
      console.error("Error submitting contact form:", error)
      setSubmitError(
        error instanceof Error ? 
        error.message.replace(/<\/?[^>]+(>|$)/g, "") : 
        'An unexpected error occurred'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white w-screen">
      <Header 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Full width wrapper */}
      <div className="w-full py-8 pb-0">
        {/* Page Header */}
        <div className="text-center mb-12 px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Plan Your Dream Trip</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tell us about your travel preferences and we'll help you create the perfect itinerary
          </p>
        </div>

        {/* Grid section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 lg:px-12 items-stretch">
          {/* Contact Information */}
          <div className="lg:col-span-1 flex flex-col">
            <Card className="flex-1">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-red-600 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Phone</h3>
                      {settings && (
                        Object.entries(settings)
                          .filter(([key, value]) => /^phone\d*$/i.test(key) && value)
                          .sort((a, b) => {
                            const na = parseInt(a[0].replace(/^[^0-9]*/, "")) || 0
                            const nb = parseInt(b[0].replace(/^[^0-9]*/, "")) || 0
                            return na - nb
                          })
                          .map(([key, value]) => (
                            <p key={key} className="text-gray-600">{String(value)}</p>
                          ))
                      )}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-red-600 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      {settings?.email && (
                        <p className="text-gray-600">{settings.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-red-600 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Address</h3>
                      {settings?.address && (
                        <p className="text-gray-600 " dangerouslySetInnerHTML={{ __html: settings.address }} />
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h2>
                <div className="flex space-x-4">
                  {settings?.instagram && (
                    <a href={settings.instagram} target="_blank" rel="noopener noreferrer">
                      <Instagram className="w-5 h-5 xl:w-10 xl:h-10 text-red-600 hover:text-red-800 cursor-pointer" />
                    </a>
                  )}
                  {settings?.google && (
                    <a href={settings.google} target="_blank" rel="noopener noreferrer">
                      <FaGoogle className="w-5 h-6 xl:w-10 xl:h-10 text-red-600 hover:text-red-800 cursor-pointer" />
                    </a>
                  )}
                  {settings?.whatsapp && (
                    <a href={settings.whatsapp} target="_blank" rel="noopener noreferrer">
                      <FaWhatsapp className="w-5 h-5 xl:w-10 xl:h-10 text-red-600 hover:text-red-800 cursor-pointer" />
                    </a>
                  )}
                  {settings?.linkedin && (
                    <a href={settings.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-5 h-5 xl:w-10 xl:h-10 text-red-600 hover:text-red-800 cursor-pointer" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 flex flex-col">
            <Card className="flex-1">
              <CardContent className="p-6">
                {submitSuccess ? (
                  <div className="text-center py-8">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                      <Check className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Request Submitted Successfully!</h3>
                    <p className="text-sm text-gray-600 mb-6">
                      Thank you for your trip request. We'll get back to you soon with a perfect itinerary.
                    </p>
                    <Button
                      onClick={() => setSubmitSuccess(false)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Plan Another Trip
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Tell Us About Your Travel Plans</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            disabled={isSubmitting}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:opacity-50"
                            placeholder="Enter your first name"
                          />
                        </div>

                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            disabled={isSubmitting}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:opacity-50"
                            placeholder="Enter your last name"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:opacity-50"
                          placeholder="Enter your email address"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:opacity-50"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>

                      <div>
                        <label htmlFor="preferredDestination" className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Destination
                        </label>
                        <input
                          type="text"
                          id="preferredDestination"
                          name="preferredDestination"
                          value={formData.preferredDestination}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:opacity-50"
                          placeholder="Where would you like to go?"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 mb-2">
                            Departure Date
                          </label>
                          <input
                            type="date"
                            id="departureDate"
                            name="departureDate"
                            value={formData.departureDate}
                            onChange={handleInputChange}
                            disabled={isSubmitting}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:opacity-50"
                          />
                        </div>

                        <div>
                          <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-2">
                            Return Date
                          </label>
                          <input
                            type="date"
                            id="returnDate"
                            name="returnDate"
                            value={formData.returnDate}
                            onChange={handleInputChange}
                            disabled={isSubmitting}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:opacity-50"
                          />
                        </div>
                      </div>

                      {submitError && (
                        <div className="text-red-500 text-sm">
                          {submitError}
                        </div>
                      )}

                      <Button 
                        type="submit" 
                        className="w-full bg-red-600 hover:bg-red-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </span>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Submit Request
                          </>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12 px-4 lg:px-12">
          <Card>
            <CardContent className="p-0">
              <div className="relative h-64 md:h-96 bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.421121374609!2d72.82696131475552!3d19.171346252014584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7c21308c3f3%3A0xdde4b20de0f17ac5!2s123%20Travel%20Street%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1691234567890!5m2!1sen!2sin"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <div className="mt-12 px-4 lg:px-12">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index
                  return (
                    <div key={faq.question} className="border border-gray-200 rounded-lg">
                      <button
                        type="button"
                        className="w-full flex items-center justify-between p-4 text-left"
                        onClick={() => setOpenFaqIndex((prev) => (prev === index ? null : index))}
                        aria-expanded={isOpen}
                      >
                        <span className="font-semibold text-gray-900">{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-red-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-red-600" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-gray-600 text-sm border-t border-gray-100">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    </div>
  )
}
