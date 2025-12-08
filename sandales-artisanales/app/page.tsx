import Hero from "@/app/components/home/Hero";
import SectionSandales from "@/app/components/home/SectionSandales";
import AboutArtisan from "@/app/components/home/AboutArtisan";
import Testimonials from "@/app/components/home/Testimonials";
import ContactCTA from "@/app/components/home/ContactCTA";

export default function HomePage() {
  return (
    <div className="pt-16">
      <Hero />
      <SectionSandales />
      <AboutArtisan />
      <Testimonials />
      <ContactCTA />
    </div>
  );
}
