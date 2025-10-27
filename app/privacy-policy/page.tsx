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
                <title>Privacy Policy </title>
                <meta name="description" content="Privacy policy for Ban Banjara website" />
            </Head>

            <header className="mb-8 relative h-64 rounded-lg overflow-hidden">
                {/* Background Image using next/image with fill layout */}
                <Image
                    src="/images/privacy_policy_new.jpg"
                    alt="Privacy Policy Background"
                    fill
                    className="object-cover"
                    quality={80}
                    priority />

                {/* Content overlay */}
                <div className="absolute inset-0 backdr bg-black/40 flex items-center justify-center p-6">
                    <div className="text-center max-w-max">
                        <h1 className="text-3xl font-bold text-white mb-2">Privacy policy</h1>
                        {/* <p className="text-lg text-gray-700 font-semibold">Privacy policy Tagline</p> */}
                    </div>
                </div>
            </header>

      <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800 leading-relaxed">
      <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy policy</h2>
        <p className="text-sm text-gray-500 mb-6">Last updated: October 4th,2025</p>
        <p className="mb-6 text-justify text-balance">
            GoSamyati Expeditions Pvt Ltd is committed to maintaining the privacy of personal information that you
            provide to us when using the GoSamyati Expeditions website. This Privacy Policy describes how we treat
            personal information received about you when you visit{" "}
            <a href="/" className="text-blue-600 hover:underline">
            www.gosamyati.com
            </a>
            . We may make content or services from other websites including our co-branded websites available to you
            from links located on our site. These other websites are not subject to this Privacy Policy. We recommend
            that you review the privacy policy at each such website to determine how that site protects your privacy.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Commitment</h2>
        <p className="mb-6 text-justify text-balance">
            While information is the cornerstone of our ability to provide superior service, our most important asset
            is our clients’ trust. Keeping client information secure, and using it only as our clients would want us
            to, is a top priority for all of us at GoSamyati Expeditions Pvt Ltd. Here then, is our promise to our
            individual customers:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-6 ">
            <li>
            We will safeguard, according to strict standards of security and confidentiality, any information our
            customers share with us.
            </li>
            <li>
            We will limit the collection and use of customer information to the minimum required to deliver superior
            service.
            </li>
            <li>
            We will permit only authorized employees, trained in proper handling of customer information, to access
            that information.
            </li>
            <li>
            We will not reveal customer information to any external organization unless previously informed in
            disclosures/agreements, or required by law.
            </li>
            <li>
            We may share customer information with reputable companies when a customer has expressed an interest in
            their services/products (this Privacy Policy does not cover how they use it).
            </li>
            <li>
            Whenever we hire other organizations to provide support services, we will require them to comply with our
            privacy standards.
            </li>
            <li>
            We will attempt to keep customer files complete, up-to-date, and accurate and provide a way for customers
            to access or correct their information (unless prohibited by law).
            </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
        <h3 className="text-xl font-semibold mt-4 mb-2">General</h3>
        <p className="mb-6 text-justify text-balance">
            When you register, and at other times, we may collect personally identifiable information such as name,
            address, telephone number, email, and details about your computer. We do not knowingly collect information
            from children under 13. If under 18, you may not provide personal information without parental/guardian
            consent.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">Website Usage Information</h3>
        <p className="mb-6 text-justify text-balance">
            We automatically collect IP addresses and website usage information when you visit. This helps us evaluate
            visitor and customer use of our site on an aggregate basis.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Information</h2>
        <ul className="list-disc list-inside space-y-2 mb-6 ">
            <li>For the purposes for which you specifically provided the information.</li>
            <li>To send you notifications about products, services, and special offers.</li>
            <li>To enhance or develop new features, products, and services.</li>
            <li>To personalize content and advertising based on preferences.</li>
            <li>
            To combine information collected on our site with information from other services you use with us.
            </li>
            <li>
            To disclose or use information in special cases (e.g., enforce Terms of Use, protect rights, or as
            required by law).
            </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Cookies</h2>
        <p className="mb-6 text-justify text-balance">
            We employ cookie technology to help visitors and customers move faster through our site. Cookies are
            temporary or stored pieces of information sent by a website to your computer.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Security</h2>
        <p className="mb-6 text-justify text-balance">
            Personally identifiable information is stored on limited-access servers, safeguarded to protect its
            security.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Internet-based Transfers</h2>
        <p className="mb-6 text-justify text-balance">
            Given the global nature of the Internet, data transfers may occur internationally. By using our site, you
            agree to this processing of data.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Policy Modifications</h2>
        <p className="mb-6 text-justify text-balance">
            We may update this Privacy Policy from time to time. If changes are made, they will be posted here. We will
            not use previously collected personal information inconsistently with this Privacy Policy without your prior
            consent.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Comments and Questions</h2>
        <p className="mb-6 text-justify text-balance">
            If you have any questions, comments, or concerns about our Privacy Policy, please contact us.
        </p>
        </div>
        </div>
        <Footer />
        </>
    );
}

export default PrivacyPolicy;