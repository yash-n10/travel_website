"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface VacancyItem {
  id?: string | number
  title?: string
  position?: string
  department?: string
  location?: string
  description?: string
}

export default function HiringPage() {
  const [jobs, setJobs] = useState<VacancyItem[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    position: "",
    message: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitMsg, setSubmitMsg] = useState<string | null>(null)

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch("/api/hiring")
        const text = await res.text()
        console.log("text", text)
        // Try to parse JSON; if there's a non-JSON prefix like "ext ", parse from the first '{'
        let parsed: any = null
        try {
          parsed = JSON.parse(text)
        } catch {
          const braceIdx = text.indexOf('{')
          if (braceIdx !== -1) {
            const maybe = text.slice(braceIdx)
            try { parsed = JSON.parse(maybe) } catch {}
          }
        }
        const data: any = parsed ?? text

        let items: any[] = []
        if (Array.isArray(data)) items = data
        else if (data?.data && Array.isArray(data.data)) items = data.data
        else if (data?.vacancies && Array.isArray(data.vacancies)) items = data.vacancies

        // Map external shape { job_title, job_description, ... } to our UI fields
        if (items.length && items[0] && (items[0].job_title || items[0].job_description)) {
          items = items.map((j: any) => ({
            id: j.id,
            title: j.job_title ?? j.title ?? j.position,
            position: j.position,
            department: j.department,
            location: j.location,
            description: j.job_description ?? j.description,
          }))
        }

        setJobs(items as VacancyItem[])
      } catch (e: any) {
        setError(e?.message || "Failed to load jobs")
        setJobs([])
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectJob = (id: string) => {
    setForm(prev => ({ ...prev, position: id }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitMsg(null)
    try {
      const res = await fetch("/api/hiring", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const text = await res.text()
      setSubmitMsg(res.ok ? "Application submitted successfully." : (text || "Failed to submit."))
      if (res.ok) {
        setForm({ name: "", email: "", contact: "", position: "", message: "" })
      }
    } catch (e: any) {
      setSubmitMsg(e?.message || "An error occurred.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white w-screen">
      <Header isMobileMenuOpen={false} setIsMobileMenuOpen={() => {}} />

      <main className="container mx-auto px-6 py-10 max-w-6xl">
        <h1 className="text-3xl font-bold mb-6">Current Openings</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {loading && (
              <Card><CardContent className="p-6">Loading jobs...</CardContent></Card>
            )}
            {error && (
              <Card><CardContent className="p-6 text-red-600">{error}</CardContent></Card>
            )}
            {!loading && !error && jobs.length === 0 && (
              <Card><CardContent className="p-6">No jobs found.</CardContent></Card>
            )}

            {jobs.map((job, idx) => (
              <Card key={String(job.id ?? idx)}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-normal"> <span className="font-semibold">Job Id- </span>{String(job.id ?? idx)} </h2>
                      <h2 className="text-xl font-normal"> <span className="font-semibold">Job Title- </span>{job.title || job.position || 'Position'}</h2>
                    </div>
                    <Button onClick={() => handleSelectJob(String(job.id ?? job.title ?? idx))}>Apply</Button>
                  </div>
                  {job.description && (
                    <p className="text-gray-700 mt-4 whitespace-pre-wrap">{job.description}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Apply Now</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <Input name="name" value={form.name} onChange={handleChange} required disabled={submitting} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input type="email" name="email" value={form.email} onChange={handleChange} required disabled={submitting} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Contact</label>
                    <Input name="contact" value={form.contact} onChange={handleChange} required disabled={submitting} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Select Position</label>
                    <select
                      name="position"
                      value={form.position}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                      disabled={submitting}
                    >
                      <option value="" disabled>Select a job</option>
                      {jobs.map((job, idx) => (
                        <option key={String(job.id ?? idx)} value={String(job.id ?? job.title ?? idx)}>
                          Job Id-{String(job.id ?? idx)} - {job.title || job.position || 'Position'}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Message</label>
                    <Textarea name="message" value={form.message} onChange={handleChange} rows={4} disabled={submitting} />
                  </div>

                  {submitMsg && (
                    <div className={`text-sm ${submitMsg.toLowerCase().includes('success') ? 'text-green-600' : 'text-gray-700'}`}>{submitMsg}</div>
                  )}

                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
