"use client";
import React, { useState } from 'react';
import { X, MapPin, Users, Calendar, MessageSquare, Star, Heart, Globe, Award, Link } from 'lucide-react';

import {Header} from '@/components/header';
import {Footer} from '@/components/footer';

import { LinkButton } from '@/components/ui/linkButton';

export default function TravelWebsite() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />

      {/* Hero Section */}

      <header className="bg-red-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-sm mb-4">TRAVEL</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            We Turn Dreams Into<br />
            Unforgettable Journeys
          </h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            For over 8 years, we've been crafting extraordinary travel experiences<br />
            that connect people with the world's most incredible destinations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LinkButton
              href="/contact"
              className="bg-white text-red-600 px-8 py-3 rounded font-semibold hover:bg-gray-100 transition-colors inline-block text-center"
            >
              Plan Your Trip
            </LinkButton>
            <LinkButton
              href="/tours"
              className="border border-white text-white px-8 py-3 rounded font-semibold hover:bg-white hover:text-red-600 transition-colors"
            >
              Explore More
            </LinkButton>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-red-50">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-red-600 mb-2">50K+</div>
            <div className="text-gray-600">Happy Travelers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-600 mb-2">120+</div>
            <div className="text-gray-600">Destinations</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-600 mb-2">8</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-600 mb-2">99%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story Began With A Simple Belief</h2>
            <p className="text-gray-600 mb-6">
              Founded in 2016 by a group of passionate travelers, TravelCo Adventures
              began with a simple but bold vision: to make travel accessible to everyone
              and create memories that last a lifetime.
            </p>
            <p className="text-gray-600 mb-6">
              What started as a small local tour company has grown into a leading global
              travel service. But our core values remain the same: to provide exceptional
              experiences that connect people with the world's most amazing destinations.
            </p>
            <p className="text-gray-600 mb-8">
              Every journey we craft is designed with your gathering in mind, with a deep
              focus on local culture and authentic experiences. We believe that the best
              travel happens when you connect with local communities and embrace new
              perspectives.
            </p>
            <button 
              onClick={openPopup}
              className="bg-red-600 text-white px-8 py-3 rounded font-semibold hover:bg-red-700 transition-colors"
            >
              Start Your Journey
            </button>
          </div>
          <div className="relative">
            <img 
              src="/images/peris.jpeg" 
              alt="Eiffel Tower" 
              className="rounded-lg shadow-lg w-full"
            />
            <div className="absolute bottom-4 left-4 bg-red-600 text-white px-4 py-2 rounded">
              <span className="font-semibold">45 Years</span>
            </div>
          </div>
        </div>
      </section>

      {/* What Drives Us Forward */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">What Drives Us Forward</h2>
          <p className="text-gray-600 mb-12">
            Our values guide every decision we make as a tour organization on making the best
            travel experiences for our customers.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Authentic Experiences</h3>
              <p className="text-gray-600">
                We believe in creating genuine connections with local cultures and communities,
                ensuring every journey offers authentic and meaningful experiences that go beyond
                typical tourist attractions.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Sustainable Travel</h3>
              <p className="text-gray-600">
                We're committed to responsible tourism that respects local environments and
                communities, ensuring our travel practices contribute positively to the
                destinations we visit.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Excellence in Service</h3>
              <p className="text-gray-600">
                From the moment you inquire about a trip to your safe return home, we're
                dedicated to providing exceptional service that exceeds your expectations at
                every step of your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Travel Experts */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Meet Our Travel Experts</h2>
          <p className="text-gray-600 mb-12">
            Our dedicated team of travel specialists brings decades of combined
            experience and regional expertise to make your perfect adventure.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Sarah Johnson</h3>
              <p className="text-red-600 font-medium mb-2">European Specialist</p>
              <p className="text-gray-600 text-sm">
                With over 15 years of experience exploring Europe, Sarah has visited over 40
                countries and speaks 5 languages fluently. She specializes in cultural
                immersion and off-the-beaten-path adventures.
              </p>
              <div className="flex justify-center mt-4">
                <div className="flex text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
              </div>
              <button className="mt-4 bg-red-600 text-white px-6 py-2 rounded text-sm hover:bg-red-700 transition-colors">
                Contact Sarah
              </button>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Michael Chen</h3>
              <p className="text-red-600 font-medium mb-2">Asia-Pacific Expert</p>
              <p className="text-gray-600 text-sm">
                Michael's deep knowledge of Asian cultures and destinations comes from
                living in the region for over a decade. He creates authentic experiences
                that showcase the best of Asia.
              </p>
              <div className="flex justify-center mt-4">
                <div className="flex text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
              </div>
              <button className="mt-4 bg-red-600 text-white px-6 py-2 rounded text-sm hover:bg-red-700 transition-colors">
                Contact Michael
              </button>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Emma Rodriguez</h3>
              <p className="text-red-600 font-medium mb-2">Adventure Coordinator</p>
              <p className="text-gray-600 text-sm">
                Emma specializes in adventure travel and outdoor experiences. From mountain
                trekking to scuba diving, she ensures every adventure is both thrilling and
                safe for our travelers.
              </p>
              <div className="flex justify-center mt-4">
                <div className="flex text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
              </div>
              <button className="mt-4 bg-red-600 text-white px-6 py-2 rounded text-sm hover:bg-red-700 transition-colors">
                Contact Emma
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Start Your Next Adventure */}
      <section className="py-16 px-4 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Next Adventure?</h2>
          <p className="text-lg mb-8">
            Let's create something extraordinary together. Tell us about your dream
            destination and we'll make it happen. The world is waiting for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LinkButton
              href="/contact"
              className="bg-white text-red-600 px-8 py-3 rounded font-semibold hover:bg-gray-100 transition-colors inline-block text-center"
            >
              Contact our team
            </LinkButton>
            <LinkButton
              href="/tours"
              className="border border-white text-white px-8 py-3 rounded font-semibold hover:bg-white hover:text-red-600 transition-colors"
            >
              Explore More Tours
            </LinkButton>
          </div>
        </div>
      </section>

      {/* Footer */}

      <Footer />

    </div>
  );
}