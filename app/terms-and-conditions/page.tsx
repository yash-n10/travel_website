'use client';

import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

function PrivacyPolicy() {
    return (
        <>
        
        <Header 
            isMobileMenuOpen={false} 
            setIsMobileMenuOpen={() => {}} // Placeholder, implement as needed
        />
        <div className="w-[90vw] mx-auto px-4 py-8">
            <Head>
                <title>Terms and Conditions</title>
                <meta name="description" content="Privacy policy for Ban Banjara website" />
            </Head>

            <header className="mb-8 relative h-64 rounded-lg overflow-hidden">
                {/* Background Image using next/image with fill layout */}
                <Image
                    src="/images/terms-and-conditions.jpg"
                    alt="Terms and Conditions Background"
                    fill
                    className="object-cover"
                    quality={80}
                    priority />

                {/* Content overlay */}
                <div className="absolute inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center p-6">
                    <div className="text-center max-w-max">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms and Conditions</h1>
                        {/* <p className="text-lg text-gray-700 font-semibold">Privacy policy Tagline</p> */}
                    </div>
                </div>
            </header>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Terms and Condition</h2>
                <p className="text-sm text-gray-500 mb-6">Last updated: July 20th, 2025</p>

                <div className="prose max-w-none">
                <p className="mb-4">
                Booking is confirmed only after receiving a minimum 50% advance payment; balance must be paid before the start of the trip.
                </p>
                <p className="mb-4">
                The itinerary is subject to change due to weather conditions, traffic delays, or unforeseen circumstances. Alternate arrangements will be made where possible.
                </p>
                <p className="mb-4">
                Check-in and check-out times for hotels follow standard policy (usually 12:00 PM check-in and 11:00 AM check-out).
                </p>
                <p className="mb-4">
                Early check-in or late check-out is subject to availability and may incur additional charges.
                </p>
                <p className="mb-4">
                Meals are provided only as mentioned in the itinerary (breakfast and dinner). Lunch is at the guest’s own expense unless specified.
                </p>
                <p className="mb-4">
                Any personal expenses like laundry, telephone bills, drinks, tips, or additional sightseeing not mentioned in the itinerary are not included.
                </p>
                <p className="mb-4">
                Optional activities, such as Kathakali shows or Ayurvedic treatments, are chargeable and can be arranged on request.
                </p>
                <p className="mb-4">
                In case of natural calamities, political unrest, or flight delays, the operator will not be held responsible for changes or cancellations of services.
                </p>
                <p className="mb-4">
                No refund will be provided for unused services or shortened stays due to personal reasons.
                </p>
                <p className="mb-4">
                The customer must carry valid government-issued ID for check-in at hotels and for verification purposes during the trip.
                </p>
                <p className="mb-4">
                Children policy: Child below 5 years is complimentary (without extra bed). Children above 5 years will be charged as per hotel policy.
                </p>
                <p className="mb-4">
                The company reserves the right to modify or withdraw the package at any time before or during the tour due to unavoidable circumstances.
                </p>
                </div>
            </section>
        </div>
        <Footer />
        </>
    );
}

export default PrivacyPolicy;