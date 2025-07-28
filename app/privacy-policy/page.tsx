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
                    src="/images/privacy-policy.jpg"
                    alt="Privacy Policy Background"
                    fill
                    className="object-cover"
                    quality={80}
                    priority />

                {/* Content overlay */}
                <div className="absolute inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center p-6">
                    <div className="text-center max-w-max">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy policy</h1>
                        {/* <p className="text-lg text-gray-700 font-semibold">Privacy policy Tagline</p> */}
                    </div>
                </div>
            </header>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy policy</h2>
                <p className="text-sm text-gray-500 mb-6">Last updated: July 20th, 2025</p>

                <div className="prose max-w-none">
                      <div className="p-4 text-justify">
      <p className="mb-4">
        At GoSamyati, your privacy is of utmost importance to us. This Privacy Policy outlines how we collect, use, store, and protect your personal information when you interact with our website www.gosamyati.com or use any of our services.
        <br />
        By using our website, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
      </p>

      <p className="mb-4">
        About GoSamyati<br />
        Whether you’re dreaming of a Himalayan trek, a peaceful escape to the hills, an adventure-filled weekend, or a luxurious experiential stay—GoSamyati curates seamless travel experiences that inspire, uplift, and connect you to destinations across India and beyond.
        <br /><br />
        1. Legal Compliance<br />
        GoSamyati abides by all applicable Indian data protection laws and strives to maintain the highest standards of user privacy and data security. We take proactive steps to prevent unauthorized access, data breaches, or misuse of your personal information. However, no online platform can guarantee absolute data security, and transmission over the internet is done at your own risk.
        <br /><br />
        2. Cookies<br />
        Our website uses cookies to provide a more personalized and efficient experience. Cookies are small text files stored on your device that remember user preferences and browsing behavior.
        <br /><br />
        You can manage or disable cookies at any time through your browser settings. Some cookies are essential for the website to function properly, while others help us analyze performance and tailor ads through trusted partners like Google Ads.
        <br /><br />
        3. Analytics and Tracking<br />
        GoSamyati uses tracking tools to monitor website traffic and user interaction. These analytics are solely for internal use to improve user experience and optimize our services. No personal information is shared with any third-party analytics provider.
        <br /><br />
        4. Promotional Communication<br />
        When you sign up or book with us, you may be added to our mailing list. We may use your contact information to send travel updates, offers, and newsletters. You can unsubscribe anytime using the link in our emails or by contacting us directly.
        <br /><br />
        5. External Links<br />
        Our website may include links to external websites for your convenience. These third-party sites operate independently and have their own privacy policies. GoSamyati is not responsible for the content or practices of these external platforms. Please click such links at your own risk.
        <br /><br />
        6. Advertisements and Sponsored Content<br />
        You may come across sponsored listings, promotional offers, or referral programs on our website. These may redirect you to partner sites. Such partners may use cookies to track your activity. While we only work with trusted affiliates, GoSamyati is not responsible for data collected by external advertisers.
        <br /><br />
        7. Social Media Usage<br />
        We actively engage with users on platforms like Instagram, Facebook, and YouTube. While we promote content and respond to queries, we never ask for sensitive personal information via social media. Users should exercise caution and avoid sharing personal data in public comment sections or messages.
        <br /><br />
        Our website also includes social sharing buttons. Users are advised to use them at their own discretion.
        <br /><br />
        8. Shortened Links<br />
        We may share shortened URLs on social media for easier sharing. However, shortened links can sometimes be misused. Users are encouraged to verify links before clicking, as GoSamyati cannot be held responsible for breaches resulting from third-party platforms.
        <br /><br />
        9. Confidentiality<br />
        All user information is treated as confidential. We do not disclose it to any third party except as required by law or with your express permission. Any sensitive data shared with you by GoSamyati must also be treated as confidential unless authorized in writing for disclosure.
        <br /><br />
        10. Disclaimer<br />
        By using this website, you agree to this Privacy Policy. If you do not agree with any part of this policy, please discontinue use of our platform. Violation of our policies may result in suspension of access or legal action, if applicable.
      </p>

      <p className="mb-4">
        Contact Us<br />
        For any privacy-related questions, requests, or complaints, please reach out to:
        <br /><br />
        📧 support@gosamyati.com<br />
        🌐 www.gosamyati.com
      </p>
    </div>
                </div>
            </section>
        </div>
        <Footer />
        </>
    );
}

export default PrivacyPolicy;