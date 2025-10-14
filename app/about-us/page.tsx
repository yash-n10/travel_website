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
          {/* <div className="text-sm mb-4">TRAVEL</div> */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Redefining Tourism  

          </h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
           We envision a transparent and ethical approach to tourism, where experimental travel transforms the way people explore, engage, and experience the world.
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
            {/* <div className="text-3xl font-bold text-red-600 mb-2">50K+</div> */}
            <div className="text-white border border-red-800 bg-red-600 p-2 rounded">Diverse Experience</div>
          </div>
          <div>
            {/* <div className="text-3xl font-bold text-red-600 mb-2">120+</div> */}
            <div className="text-white border border-red-800 bg-red-600 p-2 rounded">Trusted by thousands</div>
          </div>
          <div>
            {/* <div className="text-3xl font-bold text-red-600 mb-2">8</div> */}
            <div className="text-white border border-red-800 bg-red-600 p-2 rounded">Traveler First</div>
          </div>
          <div>
            {/* <div className="text-3xl font-bold text-red-600 mb-2">99%</div> */}
            <div className="text-white border border-red-800 bg-red-600 p-2 rounded">Exceeding Expectations</div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story Began With A Simple Belief</h2>
            Our Story Began with a Simple Belief  
            At GoSamyati Expeditions, we believe travel should be transformative, not just about 
            sightseeing. Born from a passion for authentic exploration, we specialize in 
            experiential and expedition tourism, guiding travelers beyond the ordinary into the 
            heart of every destination.  <br/><br/>
            Our mission is to create meaningful journeys, fostering connections and leaving lasting 
            impacts on both travelers and local communities.<br/><br/>  
            With a focus on ethical practices, transparency, and sustainability, we craft immersive 
            adventures that go beyond checklists. Whether it’s a solo trip, family getaway, or 
            cultural immersion, GoSamyati designs experiences that turn memories into lifelong 
            stories of growth and discovery. <br/><br/>
            At GoSamyati Expeditions, we believe travel should be transformative, not just about 
            immersion, GoSamyati Expeditions designs experiences that turn memories into 
            lifelong stories of growth and discovery.<br/><br/>
            <button 
              onClick={openPopup}
              className="bg-red-600 text-white px-8 py-3 rounded font-semibold hover:bg-red-700 transition-colors"
            >
              Explore With Us
            </button>
          </div>
          <div className="relative">
            <img 
              src="/images/peris.jpeg" 
              alt="Eiffel Tower" 
              className="rounded-lg shadow-lg w-full"
            />
            <div className="absolute bottom-4 left-4 bg-red-600 text-white px-4 py-2 rounded">
              {/* <span className="font-semibold">45 Years</span> */}
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
              <h3 className="text-xl font-semibold mb-4">Ethical practices</h3>
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
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4">
                <img src="/images/avatar1.jpg" alt="Ritika" width={128} height={128} className="rounded-full mx-auto mb-4"/>
              </div>
              <h3 className="text-xl font-semibold mb-2">Ritika</h3>
              <p className="text-red-600 font-medium mb-2">Travel Specialist</p>
              <p className="text-gray-600 text-sm">
                With over 10 years of experience exploring Indian Destinations,
                 Ritika has visited most of the states and speaks 3 languages fluently.
                  She specializes in cultural immersion and off-the-beaten-path adventures.
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
              <LinkButton
              href="/contact" className="mt-4 bg-red-600 text-white px-6 py-2 rounded text-sm hover:bg-red-700 transition-colors">Contact Sarah</LinkButton>

            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4">
                <img src="/images/avatar2.jpg" alt="Isheeta" width={128} height={128} className="rounded-full mx-auto mb-4"/>
              </div>
              <h3 className="text-xl font-semibold mb-2">Isheeta</h3>
              <p className="text-red-600 font-medium mb-2">Destination Specialist</p>
              <p className="text-gray-600 text-sm">
              Isheeta's deep knowledge of Asian cultures and destinations comes from living in the region for over a decade.
              She creates authentic experiences that showcase the best of Asia/India.
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
              <LinkButton
              href="/contact" className="mt-4 bg-red-600 text-white px-6 py-2 rounded text-sm hover:bg-red-700 transition-colors">Contact Michael</LinkButton>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4">
                <img src="/images/avatar4.jpg" alt="Amruta" width={128} height={128} className="rounded-full mx-auto mb-4"/>
              </div>
              <h3 className="text-xl font-semibold mb-2">Amruta</h3>
              <p className="text-red-600 font-medium mb-2">Travel Consultant</p>
              <p className="text-gray-600 text-sm">
              Amruta specializes in adventure travel and outdoor experiences.
              From mountain trekking to scuba diving, she ensures every adventure is both thrilling and safe for our travelers.
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
              <LinkButton
              href="/contact" className="mt-4 bg-red-600 text-white px-6 py-2 rounded text-sm hover:bg-red-700 transition-colors">Contact Emma</LinkButton>
                
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