import Header from "@/components/layout/header";
import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
import PersonalProjectSection from "@/components/sections/personal-project-section";
import BrandingProjectsSection from "@/components/sections/branding-projects-section";
import GallerySection from "@/components/sections/gallery-section";
import ContactSection from "@/components/sections/contact-section";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <PersonalProjectSection />
        <BrandingProjectsSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
