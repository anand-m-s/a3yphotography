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
                    href="https://www.behance.net/aby7269?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnHNTn7YXr9Q9dTV4Mjy7_ojwMtTLBno4FLIoXUTZDabBuzG1Liu8yXV6X4pE_aem_S6g1OYZJzSgvXRigssSiFQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-secondary hover:bg-accent hover:text-accent-foreground rounded-full transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M9.86 11.083c.595-.285 1.017-.86 1.017-1.74 0-1.704-1.266-2.343-2.88-2.343H3v9.678h5.222c1.692 0 3.029-.987 3.029-2.818 0-1.238-.61-2.063-1.391-2.377zm-4.072-2.88h2.322c.747 0 1.266.36 1.266 1.08 0 .72-.519 1.095-1.266 1.095H5.788V8.203zm2.447 6.322H5.788v-2.46h2.447c.86 0 1.421.495 1.421 1.23 0 .733-.56 1.23-1.421 1.23zM19.337 7c-2.322 0-3.938 1.53-3.938 4.11 0 2.637 1.616 4.143 4.003 4.143 1.876 0 3.11-.99 3.484-2.686l.015-.074h-1.83l-.015.044c-.18.802-.778 1.274-1.639 1.274-1.095 0-1.844-.81-1.875-2.04h5.373l.015-.074c.015-.134.03-.33.03-.57C22.96 8.53 21.51 7 19.337 7zm-1.78 3.37c.12-.93.78-1.544 1.72-1.544.963 0 1.624.614 1.704 1.544h-3.424zM17.75 6.25h3.2V7.5h-3.2V6.25z" />
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
