import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">


        <div className="flex flex-col overflow-hidden md:hidden">
          <ContainerScroll
            titleComponent={
              <>
                <h1 className="text-4xl font-semibold text-black dark:text-white">
                  About Me <br />
                  <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                    The Story behind the lens
                  </span>
                </h1>
              </>
            }
          >
            <img
              src={"/gallery/Aby/_O1A2808bw.jpg"}
              alt="hero"
              height={720}
              width={1400}
              className="mx-auto rounded-2xl object-cover h-full object-left-top"
              draggable={false}
            />
          </ContainerScroll>
        </div>


        {/* Header */}
        <div className="text-center mb-16 hidden md:block">
          <h1 className="font-serif text-4xl md:text-6xl mb-6">About Me</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">The story behind the lens</p>
        </div>

        {/* Main Content */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24 max-w-6xl mx-auto">
          {/* Image */}
          <div className="relative aspect-[3/4] rounded-sm overflow-hidden hidden md:block">
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
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto">

          {/* <div className="bg-muted/20 rounded-sm p-10 md:p-14 mb-24">
            <div className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed text-muted-foreground text-center">
              <p>
                A camera looks simple when we hold it in our hands. But it’s actually built from the earth—metal, glass, and tiny electronic parts shaped to capture something we can feel but never touch.
              </p>
              <p>
                The lens starts as sand, refined until it bends light the way our eyes do. The body comes from metal and minerals, and even the sensor is made from elements dug from the ground. A machine made from raw materials, built just to save a moment that will disappear in seconds.
              </p>
              <p>
                With one click, a passing expression becomes something we can keep. Not just a photo, but a piece of time that would have moved on without us noticing.
              </p>
              <p className="italic font-serif text-xl text-foreground pt-2">
                From earth to light, it turns moments into memory.
              </p>
            </div>
          </div> */}




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
