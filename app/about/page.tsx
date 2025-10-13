import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-6xl mb-6">About Me</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">The story behind the lens</p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24">
            {/* Image */}
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
              <Image src="/gallery/Aby/_O1A2808bw.jpg" alt="Alexandre Dubois" fill className="object-cover" />
            </div>

            {/* Bio */}
            <div className="flex flex-col justify-center">
              {/* <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Biography</p> */}
              <h2 className="font-serif text-3xl md:text-4xl mb-8">Abhishek Das</h2>
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                <p>Hi, I’m Abhishek Das, a photographer from Kerala, India, now based in Paris, France. My camera has been my constant companion on a journey across cultures, landscapes, and human emotions.

                  For me, photography is more than just creating images, it’s about revealing the unseen beauty in every person and every moment. I believe everyone has a story worth celebrating, and my mission is to make people fall in love with themselves through the way I see them natural and confident.

                  Whether it’s a fleeting glance, an intimate smile, or a golden moment of stillness, I strive to capture memories that feel alive, not staged. Each frame I take is a bridge between where you are and how you wish to remember yourself.</p>
                {/* <p>
                  Born and raised in Paris, I discovered my passion for photography at the age of 15 when my grandfather
                  gifted me his vintage Leica camera. What started as a hobby quickly evolved into a lifelong calling.
                </p>
                <p>
                  After studying Fine Arts at École des Beaux-Arts and completing internships with renowned
                  photographers across Europe, I established my own practice in 2014. Since then, I've had the privilege
                  of working with diverse clients, from intimate family portraits to large-scale commercial projects.
                </p>
                <p>
                  My work has been featured in various publications and exhibitions throughout France and
                  internationally. I believe that great photography is about more than technical skill—it's about
                  connection, emotion, and the ability to see beauty in unexpected places.
                </p> */}
              </div>
            </div>
          </div>

          {/* Photography Journey */}
          {/* <div className="mb-24">
            <h2 className="font-serif text-3xl md:text-4xl mb-12 text-center">My Photography Journey</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  year: "2014",
                  title: "Studio Opening",
                  description:
                    "Established my photography studio in the heart of Paris, focusing on portrait and commercial work.",
                },
                {
                  year: "2017",
                  title: "International Recognition",
                  description:
                    "Work featured in major photography exhibitions across Europe and published in leading magazines.",
                },
                {
                  year: "2020",
                  title: "Expanding Horizons",
                  description:
                    "Began teaching photography workshops and mentoring emerging photographers in the community.",
                },
              ].map((milestone) => (
                <div key={milestone.year} className="text-center">
                  <div className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
                    {milestone.year}
                  </div>
                  <h3 className="font-serif text-xl mb-3">{milestone.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                </div>
              ))}
            </div>
          </div> */}

          {/* Artistic Vision */}
          <div className="bg-muted/30 rounded-sm p-12 md:p-16 mb-24">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4 text-center">Philosophy</p>
            <h2 className="font-serif text-3xl md:text-4xl mb-8 text-center">Artistic Vision</h2>
            <div className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                I believe that photography is an art of observation and patience. It's about finding those fleeting
                moments that reveal something true about the human experience. Whether I'm photographing a wedding, a
                landscape, or a street scene, I approach each subject with curiosity and respect.
              </p>
              <p>
                My style blends classical composition with contemporary sensibilities. I'm drawn to natural light,
                authentic emotions, and the subtle details that make each moment unique. I don't just take photographs—I
                create visual stories that resonate long after the shutter clicks.
              </p>
              <p className="text-center italic font-serif text-xl text-foreground pt-4">
                "Photography is the poetry of the frozen moment."
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="font-serif text-3xl md:text-4xl mb-6">Let's Work Together</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              I'm always excited to take on new projects and collaborate with creative individuals and brands.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
