"use client"

import type React from "react"

import { useState } from "react"
import { Instagram, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-6xl mb-6">Get in Touch</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'd love to hear about your project and how we can work together
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="font-serif text-2xl md:text-3xl mb-8">Let's Connect</h2>
              <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                Whether you're planning a special event, need professional portraits, or have a creative project in
                mind, I'm here to help bring your vision to life. Feel free to reach out through the form or contact me
                directly.
              </p>

              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded-full">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Email</p>
                    <a
                      href="mailto:alexandre@duboisphoto.com"
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      aby.7269@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded-full">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Phone</p>
                    <a href="tel:+33123456789" className="text-muted-foreground hover:text-accent transition-colors">
                      +33 1 23 45 67 89
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded-full">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Studio</p>
                    <p className="text-muted-foreground">
                      15 Rue de la Paix
                      <br />
                      75002 Paris, France
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-xl mb-4">Follow My Work</h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/aby7269/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-secondary hover:bg-accent hover:text-accent-foreground rounded-full transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.facebook.com/aby7269"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-secondary hover:bg-accent hover:text-accent-foreground rounded-full transition-colors"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-secondary hover:bg-accent hover:text-accent-foreground rounded-full transition-colors"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border border-border rounded-sm p-8">
              <h2 className="font-serif text-2xl mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="mt-2"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
