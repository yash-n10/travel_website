"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Youtube, Send, Check } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer" 

export default function ContactPage() {
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) // <-- Add mobile menu state

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
      // Basic validation
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

      // Handle response
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

      // Success case
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
        error.message.replace(/<\/?[^>]+(>|$)/g, "") : // Remove HTML tags if present
        'An unexpected error occurred'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Use Header component */}
      <Header 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <div className="container mx-auto py-8 pb-0">
        {/* Page Header - modified for trip planning */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Plan Your Dream Trip</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tell us about your travel preferences and we'll help you create the perfect itinerary
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-8">
          {/* Contact Information - unchanged */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-red-600 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Phone</h3>
                      <p className="text-gray-600">+91 9940882200</p>
                      <p className="text-gray-600">+91 9876543210</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-red-600 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">holiday@gosam.com</p>
                      <p className="text-gray-600">info@gosamyati.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-red-600 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Address</h3>
                      <p className="text-gray-600">
                        123 Travel Street,
                        <br />
                        Tourism District,
                        <br />
                        Mumbai, Maharashtra 400001
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-red-600 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Business Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 7:00 PM
                        <br />
                        Saturday: 9:00 AM - 5:00 PM
                        <br />
                        Sunday: 10:00 AM - 4:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media - unchanged */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h2>
                <div className="flex space-x-4">
                  <a href="#" className="text-red-600 hover:text-red-700 transition-colors">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-red-600 hover:text-red-700 transition-colors">
                    <Twitter className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-red-600 hover:text-red-700 transition-colors">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-red-600 hover:text-red-700 transition-colors">
                    <Youtube className="w-6 h-6" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form - modified with trip planning fields */}
          <div className="lg:col-span-2">
            <Card>
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

                      <div>
                        <label htmlFor="numberOfTravelers" className="block text-sm font-medium text-gray-700 mb-2">
                          Number of Travelers
                        </label>
                        <select
                          id="numberOfTravelers"
                          name="numberOfTravelers"
                          value={formData.numberOfTravelers}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:opacity-50"
                        >
                          <option value="">Select number of travelers</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3-5">3-5</option>
                          <option value="6-10">6-10</option>
                          <option value="10+">10+</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="hotelCategory" className="block text-sm font-medium text-gray-700 mb-2">
                          Hotel Category
                        </label>
                        <select
                          id="hotelCategory"
                          name="hotelCategory"
                          value={formData.hotelCategory}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:opacity-50"
                        >
                          <option value="">Select your hotel category</option>
                          <option value="budget">Budget</option>
                          <option value="standard">Standard</option>
                          <option value="luxury">Luxury</option>
                          <option value="boutique">Boutique</option>
                          <option value="resort">Resort</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="travelInterests" className="block text-sm font-medium text-gray-700 mb-2">
                          Travel Interests
                        </label>
                        <Textarea
                          id="travelInterests"
                          name="travelInterests"
                          value={formData.travelInterests}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:opacity-50"
                          placeholder="Tell us about your interests (adventure, culture, relaxation, food, etc.)"
                        />
                      </div>

                      <div>
                        <label htmlFor="additionalMessage" className="block text-sm font-medium text-gray-700 mb-2">
                          Additional Message
                        </label>
                        <Textarea
                          id="additionalMessage"
                          name="additionalMessage"
                          value={formData.additionalMessage}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:opacity-50"
                          placeholder="Any special requests or additional information?"
                        />
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

        {/* Map Section - unchanged */}
        <div className="mt-12 px-8">
          <Card>
            <CardContent className="p-0">
              <div className="relative h-64 md:h-96 bg-gray-200 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-red-600 mx-auto mb-2" />
                    <p className="text-gray-600">Interactive map would be displayed here</p>
                    <p className="text-sm text-gray-500">123 Travel Street, Mumbai, Maharashtra</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section - unchanged */}
        <div className="mt-12 px-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">How far in advance should I book my tour?</h3>
                  <p className="text-gray-600">
                    We recommend booking at least 2-4 weeks in advance for domestic tours and 6-8 weeks for
                    international destinations to ensure availability and better rates.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">What is included in the tour packages?</h3>
                  <p className="text-gray-600">
                    Our packages typically include accommodation, transportation, guided tours, and some meals. Specific
                    inclusions vary by package and are detailed in each tour description.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Do you offer customized tour packages?</h3>
                  <p className="text-gray-600">
                    Yes! We specialize in creating personalized itineraries based on your preferences, budget, and
                    travel dates. Contact us to discuss your requirements.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">What is your cancellation policy?</h3>
                  <p className="text-gray-600">
                    Cancellation policies vary by tour and booking date. Generally, cancellations made 30+ days in
                    advance receive full refunds, while later cancellations may incur fees.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    </div>
  )
}