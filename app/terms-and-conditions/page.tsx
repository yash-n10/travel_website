'use client';

import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

function TermsAndConditions() {
    return (
        <>
            <Head>
                <title>Terms and Conditions | GoSamyati Expeditions</title>
                <meta name="description" content="Terms and Conditions for GoSamyati Expeditions bookings and tours" />
            </Head>

            <Header isMobileMenuOpen={false} setIsMobileMenuOpen={() => {}} />

            <div className="w-[90vw] max-w-5xl mx-auto px-4 py-10 text-gray-700">
                {/* Header Banner */}
                <div className="relative h-56 md:h-72 rounded-lg overflow-hidden mb-10">
                    <Image
                        src="/images/terms_conditions.jpg"
                        alt="Terms and Conditions"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <h1 className="text-white text-3xl md:text-4xl font-bold">Terms and Conditions</h1>
                    </div>
                </div>

                {/* CONTENT */}
                <section className="space-y-8 leading-relaxed">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Terms and Condition</h2>
                        <p className="text-sm text-gray-500 mt-1">Last updated: July 20th, 2025</p>
                        <p className="mt-4 text-justify text-balance">
                            The contract placed between the Client and Company (between “you” and “our company”) is important to us.
                            We assure that the contract will not be revealed to any private third parties. GoSamyati Expeditions will
                            stand with their customers in matters of any dispute or claim. However, we are not responsible for problems
                            caused in your personal matters. No employee other than the director has the right to vary or omit any terms.
                            No promises regarding discounts or promotions will be honored unless made in written form.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">Secure your Booking</h2>
                        <p className="text-justify text-balance">
                            To secure a booking, a minimum deposit is required for all tour packages. Sometimes a higher deposit may be
                            requested to cover payment conditions. You should read the booking conditions and general information of the
                            selected tour. Questions can be clarified via phone or email at{" "}
                            <a href="mailto:info@gosamyati.com" className="text-blue-600 underline">
                                info@gosamyati.com
                            </a>.
                        </p>
                        <p>Additional booking amounts may be requested for peak seasons or high-end properties.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">Payment for your Tour</h2>
                        <p className="text-justify text-balance">
                            After the deposit, the balance must be paid within the agreed period. In some cases, full payment may be
                            required before the holiday begins. Non-payment may result in cancellation of your booking.
                        </p>

                        <h3 className="text-xl font-semibold mt-4 mb-2">Account Details</h3>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Account No: 259820202020</li>
                            <li>Account Name: GoSamyati Expeditions PVT LTD</li>
                            <li>Account Type: Current</li>
                            <li>Bank: IndusInd Bank</li>
                            <li>IFSC Code: INDB0000220</li>
                        </ul>
                        <p className="text-justify text-balance">All payments must be made to this account or through official payment gateways. Avoid personal transfers.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">Change in Booking</h2>
                        <p className="text-justify text-balance">
                            Requests for booking changes must be sent by email from the primary booking holder. Minor changes may be
                            accepted, but major changes are not always possible.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">Cancellation of Booking</h2>
                        <p className="text-justify text-balance">
                            Cancellation is allowed depending on circumstances. Customers must inform us via call or email within a
                            stipulated period. Cancellation charges may apply based on policies.
                        </p>

                        <h3 className="text-xl font-semibold mt-4 mb-2">Cancellations & Refund Policies</h3>
                        <p className="text-justify text-balance">
                            Payments contribute to operational costs. Cancellation fees are charged to cover these expenses.
                        </p>

                        <ul className="list-disc pl-6 space-y-2">
                            <li>Cancellations must be informed via email only.</li>
                            <li>Effective from the date and time we receive your mail.</li>
                            <li>No refunds on unused services once the tour begins.</li>
                            <li>Refunds take 10–15 working days.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">Complaints</h2>
                        <p className="text-justify text-balance">
                            Send complaints to{" "}
                            <a href="mailto:info@gosamyati.com" className="text-blue-600 underline">
                                info@gosamyati.com
                            </a>. Our team will respond within 24 hours.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">Our Responsibility</h2>
                        <p className="text-justify text-balance">
                            We ensure careful arrangements. However, we are not responsible for illegal acts, violence, or personal losses
                            during the tour.
                        </p>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}

export default TermsAndConditions;
