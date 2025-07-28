"use client"

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { Calendar, Clock, User, ArrowLeft, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

// BlogPost interface
interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  featured: boolean;
  authorImage: string;
}

// API Response interface
interface ApiBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  featured: string;
  authorImage: string;
}

interface ApiResponse {
  data: ApiBlogPost[];
}

// Fallback static blogs
const staticBlogs: BlogPost[] = [
  {
    id: 1,
    title: "The Ultimate Guide to Backpacking in Southeast Asia",
    slug: "ultimate-guide-backpacking-southeast-asia",
    excerpt: "Discover the best routes, budget tips, and hidden gems for your Southeast Asian adventure.",
    content: `
      <h2>Introduction</h2>
      <p>Southeast Asia is a backpacker's paradise, offering incredible diversity, affordable prices, and unforgettable experiences. This comprehensive guide will help you plan the perfect adventure.</p>
      
      <h2>Best Countries to Visit</h2>
      <p>Thailand, Vietnam, Cambodia, Laos, and Indonesia are the most popular destinations for backpackers. Each offers unique experiences:</p>
      <ul>
        <li><strong>Thailand:</strong> Perfect for beginners with excellent infrastructure</li>
        <li><strong>Vietnam:</strong> Rich history and incredible food scene</li>
        <li><strong>Cambodia:</strong> Ancient temples and warm hospitality</li>
        <li><strong>Indonesia:</strong> Beautiful islands and diverse cultures</li>
      </ul>
      
      <h2>Budget Planning</h2>
      <p>You can travel comfortably on $30-50 per day, including accommodation, food, and activities. Here's a breakdown:</p>
      <ul>
        <li>Accommodation: $5-15 per night (hostels/guesthouses)</li>
        <li>Food: $5-10 per day (street food and local restaurants)</li>
        <li>Transportation: $10-20 per day</li>
        <li>Activities: $5-15 per day</li>
      </ul>
      
      <h2>Essential Tips</h2>
      <p>Always carry a copy of your passport, get travel insurance, and respect local customs. The journey of a lifetime awaits!</p>
    `,
    image: "/api/placeholder/600/400",
    author: "Sarah Johnson",
    date: "December 15, 2023",
    readTime: "8 min read",
    category: "Backpacking",
    featured: true,
    authorImage: "/api/placeholder/40/40"
  },
  {
    id: 2,
    title: "Hidden Gems of European Cities",
    slug: "hidden-gems-european-cities",
    excerpt: "Explore lesser-known attractions in Europe's most famous cities.",
    content: `
      <h2>Beyond the Tourist Trail</h2>
      <p>While Europe's major cities are famous for their iconic landmarks, there's so much more to discover when you venture off the beaten path.</p>
      
      <h2>Paris: More Than Just the Eiffel Tower</h2>
      <p>Visit the covered passages of the 2nd arrondissement, explore the street art in Belleville, or discover the hidden vineyard in Montmartre.</p>
      
      <h2>Rome: Ancient Secrets</h2>
      <p>The Basilica of San Clemente offers a journey through three levels of history, while the Aventine Keyhole provides a unique view of St. Peter's Basilica.</p>
      
      <h2>Barcelona: Local Favorites</h2>
      <p>Skip the crowds at Park Güell and head to Park del Laberint d'Horta, or explore the bohemian neighborhood of Gràcia.</p>
    `,
    image: "/api/placeholder/600/400",
    author: "Marco Rodriguez",
    date: "December 12, 2023",
    readTime: "6 min read",
    category: "City Guides",
    featured: false,
    authorImage: "/api/placeholder/40/40"
  }
];

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFoundError, setNotFoundError] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Transform API data to match BlogPost interface
  const transformApiData = (apiBlogs: ApiBlogPost[]): BlogPost[] => {
    return apiBlogs.map(blog => ({
      id: parseInt(blog.id),
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image,
      author: blog.author,
      date: blog.date,
      readTime: blog.readTime,
      category: blog.category,
      featured: blog.featured === "1",
      authorImage: blog.authorImage
    }))
  }

  // Fetch blog data from API proxy
  const fetchBlogData = async () => {
    try {
      setIsLoading(true);
      
      // First try to find in static data
      const staticBlog = staticBlogs.find(b => b.slug === params.slug);
      
      try {
        // Fetch from local API proxy instead of external API
        const response = await fetch('/api/blog');
        
        if (response.ok) {
          const apiResponse: ApiResponse = await response.json();
          
          if (apiResponse.data && Array.isArray(apiResponse.data)) {
            const transformedBlogs = transformApiData(apiResponse.data);
            const apiBlog = transformedBlogs.find(b => b.slug === params.slug);
            
            if (apiBlog) {
              setBlog(apiBlog);
            } else if (staticBlog) {
              setBlog(staticBlog);
            } else {
              setNotFoundError(true);
            }
          } else {
            // API response format is invalid, use static data
            if (staticBlog) {
              setBlog(staticBlog);
            } else {
              setNotFoundError(true);
            }
          }
        } else {
          // API failed, use static data
          if (staticBlog) {
            setBlog(staticBlog);
          } else {
            setNotFoundError(true);
          }
        }
      } catch (apiError) {
        console.error('API fetch failed:', apiError);
        // Fallback to static data
        if (staticBlog) {
          setBlog(staticBlog);
        } else {
          setNotFoundError(true);
        }
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      setNotFoundError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (params.slug) {
      fetchBlogData();
    }
  }, [params.slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          isMobileMenuOpen={isMobileMenuOpen} 
          setIsMobileMenuOpen={setIsMobileMenuOpen} 
        />
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-red-600" />
              <p className="text-gray-600">Loading article...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (notFoundError || !blog) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />
      
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <Button variant="outline" asChild>
            <Link href="/blog" className="flex items-center hover:bg-gray-100">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>

        <article className="prose prose-gray dark:prose-invert max-w-none">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              {blog.category}
            </Badge>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{blog.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{blog.readTime}</span>
            </div>
            {blog.featured && (
              <Badge className="bg-red-600 text-white">Featured</Badge>
            )}
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 text-gray-900">
            {blog.title}
          </h1>

          <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
            {blog.authorImage ? (
              <Image
                src={blog.authorImage}
                alt={blog.author}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
            <div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium text-gray-900">By {blog.author}</span>
              </div>
              <div className="text-xs text-gray-500">Published on {blog.date}</div>
            </div>
          </div>

          <div className="relative h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={blog.image || "/placeholder.svg"}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Blog Excerpt */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
            <p className="text-lg text-gray-700 italic leading-relaxed">
              {blog.excerpt}
            </p>
          </div>

          {/* Blog Content */}
          <div className="border-t pt-8">
            <div
              className="prose prose-gray dark:prose-invert max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-red-600 prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Enjoyed this article?
            </h3>
            <p className="text-gray-600 mb-4">
              Share it with your friends or explore more travel stories on our blog.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
                <Link href="/blogs">
                  Explore More Articles
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/" className="hover:bg-gray-100">
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </article>

        <div className="mt-12 pt-8 border-t">
          <Button variant="outline" asChild>
            <Link href="/blogs" className="flex items-center hover:bg-gray-100">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}