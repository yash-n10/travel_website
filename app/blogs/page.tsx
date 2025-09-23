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
      content: newBlog.content || `<p dangerouslySetInnerHTML=${{ __html: newBlog.excerpt }}></p>`,
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
        <div className="w-full mx-auto px-0 py-8">
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
    <div className="min-h-screen bg-gray-50 w-screen">
      <Header 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />

      <div className="w-full mx-auto px-0 py-8">
        {/* <div className="flex justify-between items-center px-10 mb-8"> */}
        <section className="mb-12 px-4 sm:px-6 lg:px-20">

          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Travel Stories & Insights</h1>
            <p className="text-lg text-gray-600">
              Get inspired by our travel stories, destination guides, and expert tips.
            </p>
          </div>
        </section>
        {/* </div> */}

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
         <section className="mb-12 px-4 sm:px-6 lg:px-20">
  <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Stories</h2>
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {featuredBlogs.map((blog) => (
//       <Card
//         key={blog.id}
//         className="w-full overflow-hidden hover:shadow-lg transition-shadow duration-300"
//       >
//         <div className="relative h-64">
//           <Image
//             src={blog.image || "/placeholder.svg"}
//             alt={blog.title}
//             fill
//             className="object-cover"
//             priority={blog.featured}
//           />
//           {blog.featured && (
//             <div className="absolute top-4 left-4">
//               <Badge className="bg-red-600 text-white">Featured</Badge>
//             </div>
//           )}
//         </div>
//         <CardContent className="p-6">
//           <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
//             <Badge variant="outline">{blog.category}</Badge>
//             <div className="flex items-center">
//               <Calendar className="w-4 h-4 mr-1" />
//               <span>{blog.date}</span>
//             </div>
//             <div className="flex items-center">
//               <Clock className="w-4 h-4 mr-1" />
//               <span>{blog.readTime}</span>
//             </div>
//           </div>

//           <h3 className="text-xl font-bold text-gray-900 mb-3">{blog.title}</h3>
//           <p className="text-gray-600 mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: blog.excerpt }}></p>
// {/* {blog.excerpt} */}
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               {blog.authorImage && (
//                 <Image
//                   src={blog.authorImage}
//                   alt={blog.author}
//                   width={24}
//                   height={24}
//                   className="w-6 h-6 rounded-full mr-2"
//                 />
//               )}
//               <span className="text-sm text-gray-600">{blog.author}</span>
//             </div>
//             <Button asChild variant="outline" className="group bg-transparent">
//               <Link href={`/blogs/${blog.slug}`} className="flex items-center">
//                 Read More
//                 <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//               </Link>
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
<Card
  key={blog.id}
  className="w-full overflow-hidden hover:shadow-lg transition-shadow duration-300"
>
  {/* Increased height for image */}
  <div className="relative h-80"> 
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

  {/* Reduced padding for less text space */}
  <CardContent className="p-4">  
    <div className="flex items-center gap-4 text-xs text-gray-600 mb-2">  
      <Badge variant="outline">{blog.category}</Badge>
      <div className="flex items-center">
        <Calendar className="w-3 h-3 mr-1" />
        {/* <span>{blog.date}</span> */}
        <span>  {new Date(blog.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}</span> 
      </div>
      <div className="flex items-center">
        <Clock className="w-3 h-3 mr-1" />
        <span>{blog.readTime}</span>
      </div>
    </div>

    {/* Reduced text size & margin */}
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{blog.title}</h3>
    <p
      className="text-gray-600 mb-3 line-clamp-2 text-sm leading-snug"
      dangerouslySetInnerHTML={{ __html: blog.excerpt }}
    ></p>

    <div className="flex items-center justify-between">
      <div className="flex items-center">
        {blog.authorImage && (
          <Image
            src={blog.authorImage}
            alt={blog.author}
            width={20}
            height={20}
            className="w-5 h-5 rounded-full mr-2"
          />
        )}
        <span className="text-xs text-gray-600">{blog.author}</span>
      </div>
      <Button asChild variant="outline" className="group bg-transparent text-xs px-3 py-1">
        <Link href={`/blogs/${blog.slug}`} className="flex items-center">
          Read More
          <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
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
       <section className="px-4 sm:px-6 lg:px-20">
  <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {regularBlogs.map((blog) => (
      <Card
        key={blog.id}
        className="w-full overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
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
              {/* <span>{blog.date}</span> */}
              <span>  {new Date(blog.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}</span> 
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{blog.readTime}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3">{blog.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: blog.excerpt }}></p>
            {/* {blog.excerpt} */}

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
              <Link
                href={`/blogs/${blog.slug}`}
                className="flex items-center"
              >
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


      </div>
    </div>
  )
}