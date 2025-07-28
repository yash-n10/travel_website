"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Clock, ArrowRight, PenSquare, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

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
  featured: string; // API returns string "0" or "1"
  authorImage: string;
}

interface ApiResponse {
  data: ApiBlogPost[];
}

// Fallback static blogs
const fallbackBlogs: BlogPost[] = [
  {
    id: 1,
    title: "The Ultimate Guide to Backpacking in Southeast Asia",
    slug: "ultimate-guide-backpacking-southeast-asia",
    excerpt: "Discover the best routes, budget tips, and hidden gems for your Southeast Asian adventure.",
    content: `<p>Southeast Asia is a backpacker's paradise, offering incredible diversity, affordable prices, and unforgettable experiences. This comprehensive guide will help you plan the perfect adventure.</p>`,
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
    content: `<p>While Europe's major cities are famous for their iconic landmarks, there's so much more to discover when you venture off the beaten path.</p>`,
    image: "/api/placeholder/600/400",
    author: "Marco Rodriguez",
    date: "December 12, 2023",
    readTime: "6 min read",
    category: "City Guides",
    featured: false,
    authorImage: "/api/placeholder/40/40"
  }
];

export default function BlogsPage() {
  const [isWriting, setIsWriting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [newBlog, setNewBlog] = useState({
    title: "",
    excerpt: "",
    image: "",
    author: "",
    readTime: "",
    category: "",
    featured: false,
    content: ""
  })

  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  // Fetch blogs from local API proxy
  const fetchBlogs = async () => {
    try {
      setIsLoading(true)
      // Use the local API proxy instead of direct external API call
      const response = await fetch('/api/blog')
      
      if (!response.ok) {
        throw new Error(`Failed to fetch blogs: ${response.status}`)
      }
      
      const apiResponse: ApiResponse = await response.json()
      
      // Check if we have data
      if (apiResponse.data && Array.isArray(apiResponse.data)) {
        const transformedBlogs = transformApiData(apiResponse.data)
        setBlogs(transformedBlogs)
        console.log('Blogs loaded from API:', transformedBlogs.length)
      } else {
        throw new Error('Invalid API response format')
      }
      
    } catch (error) {
      console.error('Error fetching blogs:', error)
      // Use fallback static data if API fails
      setBlogs(fallbackBlogs)
      toast.error("Failed to load latest blogs. Showing sample content.")
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs()
  }, [])

  const featuredBlogs = blogs.filter((blog) => blog.featured)
  const regularBlogs = blogs.filter((blog) => !blog.featured)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newBlog.title || !newBlog.excerpt || !newBlog.author || !newBlog.readTime || !newBlog.category) {
      toast.error("Please fill all required fields")
      return
    }

    const slug = newBlog.title.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')

    const blogToAdd: BlogPost = {
      ...newBlog,
      id: Date.now(),
      slug,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      content: newBlog.content || `<p>${newBlog.excerpt}</p>`,
      authorImage: newBlog.image || "/images/default-author.jpg"
    }

    setBlogs([blogToAdd, ...blogs])
    toast.success("Blog published successfully!")
    setIsWriting(false)
    setNewBlog({
      title: "",
      excerpt: "",
      image: "",
      author: "",
      readTime: "",
      category: "",
      featured: false,
      content: ""
    })
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          isMobileMenuOpen={isMobileMenuOpen} 
          setIsMobileMenuOpen={setIsMobileMenuOpen} 
        />
        <div className="container mx-auto px-0 py-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-red-600" />
              <p className="text-gray-600">Loading travel stories...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />

      <div className="container mx-auto px-0 py-8">
        <div className="flex justify-between items-center px-10 mb-8">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Travel Stories & Insights</h1>
            <p className="text-lg text-gray-600">
              Get inspired by our travel stories, destination guides, and expert tips.
            </p>
          </div>
          <div className="flex gap-4">
            <Button 
              onClick={() => fetchBlogs()}
              variant="outline"
              className="gap-2 hidden md:flex"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Refresh"
              )}
            </Button>
            <Button 
              onClick={() => setIsWriting(true)}
              className="gap-2 bg-red-600 hover:bg-red-700 text-white hidden md:flex"
            >
              <PenSquare className="w-4 h-4" />
              Write Blog
            </Button>
          </div>
        </div>

        {/* Blog Writing Form */}
        {isWriting && (
          <Card className="mb-12 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create New Blog Post</h2>
              <Button 
                variant="outline" 
                onClick={() => setIsWriting(false)}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                Cancel
              </Button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title*</label>
                  <input
                    type="text"
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category*</label>
                  <input
                    type="text"
                    value={newBlog.category}
                    onChange={(e) => setNewBlog({...newBlog, category: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Excerpt*</label>
                <textarea
                  value={newBlog.excerpt}
                  onChange={(e) => setNewBlog({...newBlog, excerpt: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md min-h-[100px]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <textarea
                  value={newBlog.content}
                  onChange={(e) => setNewBlog({...newBlog, content: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md min-h-[200px]"
                  placeholder="Detailed content (supports HTML)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Author*</label>
                  <input
                    type="text"
                    value={newBlog.author}
                    onChange={(e) => setNewBlog({...newBlog, author: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Read Time*</label>
                  <input
                    type="text"
                    value={newBlog.readTime}
                    onChange={(e) => setNewBlog({...newBlog, readTime: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="e.g., 5 min read"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <input
                    type="text"
                    value={newBlog.image}
                    onChange={(e) => setNewBlog({...newBlog, image: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={newBlog.featured}
                  onChange={(e) => setNewBlog({...newBlog, featured: e.target.checked})}
                  className="mr-2"
                />
                <label htmlFor="featured">Featured Post</label>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
                  Publish Blog
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setIsWriting(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Empty State */}
        {blogs.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No blog posts available at the moment.</p>
            <Button 
              onClick={() => setIsWriting(true)}
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
            >
              <PenSquare className="w-4 h-4" />
              Write First Blog
            </Button>
          </div>
        )}

        {/* Featured Blogs */}
        {featuredBlogs.length > 0 && (
          <section className="mb-12 px-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Stories</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredBlogs.map((blog) => (
                <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-64">
                    <Image 
                      src={blog.image || "/placeholder.svg"} 
                      alt={blog.title} 
                      fill 
                      className="object-cover" 
                      priority={blog.featured}
                    />
                    {blog.featured && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-red-600 text-white">Featured</Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <Badge variant="outline">{blog.category}</Badge>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{blog.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">{blog.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {blog.authorImage && (
                          <Image
                            src={blog.authorImage}
                            alt={blog.author}
                            width={24}
                            height={24}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                        )}
                        <span className="text-sm text-gray-600">{blog.author}</span>
                      </div>
                      <Button asChild variant="outline" className="group bg-transparent">
                        <Link href={`/blogs/${blog.slug}`} className="flex items-center">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Regular Blogs */}
        {regularBlogs.length > 0 && (
          <section className="px-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularBlogs.map((blog) => (
                <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48">
                    <Image 
                      src={blog.image || "/placeholder.svg"} 
                      alt={blog.title} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <Badge variant="outline">{blog.category}</Badge>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{blog.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">{blog.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {blog.authorImage && (
                          <Image
                            src={blog.authorImage}
                            alt={blog.author}
                            width={24}
                            height={24}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                        )}
                        <span className="text-sm text-gray-600">{blog.author}</span>
                      </div>
                      <Button asChild variant="outline" className="group bg-transparent">
                        <Link href={`/blogs/${blog.slug}`} className="flex items-center">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        <Footer/>

        {/* Newsletter Signup */}
        <section className="bg-red-600 p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest travel tips, stories, and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-2 rounded-md text-gray-900" 
              required
            />
            <Button className="bg-white text-red-600 hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </section>

      </div>
    </div>
  )
}