import Hero from "@/components/sections/Hero";
import DiscoverMarquee from "@/components/sections/DiscoverMarquee";
import About from "@/components/sections/About";
import Featured from "@/components/sections/Featured";
import CeoMessage from "@/components/sections/CeoMessage";
import WorldRecipeMap from "@/components/sections/WorldRecipeMap";
import Testimonials from "@/components/sections/Testimonials";
// Hidden for now — uncomment this and <LatestNews /> below to restore.
// import LatestNews from "@/components/sections/LatestNews";
import Partners from "@/components/sections/Partners";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <DiscoverMarquee />
      <About />
      <CeoMessage />
      <Featured />
      <WorldRecipeMap />
      <Testimonials />
      {/* <LatestNews /> */}
      <Partners />
      <FinalCTA />
    </>
  );
}
