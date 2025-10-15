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
                    src="/images/terms_conditions.jpg"
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

            <p className="mb-6">
                The contract placed between the Client and Company (between “you” and “our company”) is important to us.
                We assure that the contract will not be revealed to any private third parties. GoSamyati Expeditions will
                stand with their customers in matters of any dispute or claim. However, we are not responsible for problems
                caused in your personal matters. No employee other than the director has the right to vary or omit any terms.
                No promises regarding discounts or promotions will be honored unless made in written form.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Secure your Booking</h2>
            <p className="mb-6">
                To secure a booking, a minimum deposit is required for all tour packages. Sometimes a higher deposit may
                be requested to cover payment conditions. You should read the booking conditions and general information
                of the selected tour. Questions can be clarified via phone or email at{" "}
                <a href="mailto:info@gosamyati.com" className="text-blue-600 hover:underline">info@gosamyati.com</a>.
            </p>
            <p className="mb-6">
                Additional booking amounts may be requested for peak seasons or high-end properties.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Payment for your Tour</h2>
            <p className="mb-6">
                After the deposit, the balance must be paid within the agreed period. In some cases, full payment may be
                required before the holiday begins. Non-payment may result in cancellation of your booking.
            </p>

            <h3 className="text-xl font-semibold mt-4 mb-2">Account Details</h3>
            <ul className="list-disc list-inside mb-6">
                <li>Account No: 259820202020</li>
                <li>Account Name: GoSamyati Expeditions PVT LTD</li>
                <li>Account Type: Current</li>
                <li>Bank: IndusInd Bank</li>
                <li>IFSC Code: INDB0000220</li>
            </ul>
            <p className="mb-6">
                All payments must be made to this account or through official payment gateways. Do not use any personal
                account of employees.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Change in Booking</h2>
            <p className="mb-6">
                Requests for booking changes must be sent via email by the primary member who made the booking. Changes
                will be allowed only in emergency conditions and minor changes may be accommodated. We try to help,
                but changes outside our control cannot be made.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Cancellation of Booking</h2>
            <p className="mb-6">
                Cancellation is allowed depending on circumstances. Customers must inform us via call or email within a
                stipulated period. Cancellation charges may apply as per our policies.
            </p>

            <h3 className="text-xl font-semibold mt-4 mb-2">Cancellations & Refund Policies</h3>
            <p className="mb-6">
                Payments contribute to costs including equipment, staff, administration, etc. Cancellation charges are
                necessary to cover these costs.
            </p>

            <h3 className="text-xl font-semibold mt-4 mb-2">Cancellations Policy</h3>
            <ul className="list-disc list-inside mb-6 space-y-2">
                <li>Cancellations must be informed in advance via email.</li>
                <li>Cancellations are effective on the date and time we receive the cancellation notice.</li>
                <li>Tailor-made tours may have alternative terms communicated at booking.</li>
                <li>All cancellations must be in writing by the person who submitted the booking.</li>
                <li>No refund is provided for unused portions once the tour has started.</li>
                <li>In exceptional cases (e.g., death of a family member), a refund may be provided after deductions and submission of relevant documents.</li>
                <li>The company may adjust package costs depending on market conditions.</li>
                <li>Complimentary services cannot be claimed as cash or alternatives.</li>
                <li>Refunds are processed within 10-15 working days.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Complaints</h2>
            <p className="mb-6">
                Complaints can be sent via email at{" "}
                <a href="mailto:info@gosamyati.com" className="text-blue-600 hover:underline">info@gosamyati.com</a>.
                Our customer service team will respond within 24 hours to resolve issues.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Responsibility for your Tour</h2>
            <p className="mb-6">
                We ensure careful arrangement of holiday services. GoSamyati Expeditions is responsible for its employees,
                agents, and suppliers. We are not responsible for criminal or violent acts during travel. Customers are
                advised to avoid illegal activities.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Brochure/Website/Advertising</h2>
            <p className="mb-6">
                Information on our website, brochures, itineraries, and advertising is believed to be accurate but may
                contain occasional errors. Customers should review terms and conditions at booking and email us at{" "}
                <a href="mailto:info@gosamyati.com" className="text-blue-600 hover:underline">info@gosamyati.com</a> for clarifications.
            </p>
            
        </section>
        </div>
        <Footer />
        </>
    );
}

export default PrivacyPolicy;