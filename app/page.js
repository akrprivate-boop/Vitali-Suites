import Hero from "@/components/Hero";
import RoomShowcase from "@/components/RoomShowcase";
import Amenities from "@/components/Amenities";
import OffersSection from "@/components/OffersSection";
import Gallery from "@/components/Gallery";
import EventsSection from "@/components/EventsSection";
import Testimonials from "@/components/Testimonials";
import MapSection from "@/components/MapSection";
import FAQ from "@/components/FAQ";

// Home page = stacked sections. Reorder/remove any line to restructure.
export default function HomePage() {
  return (
    <>
      <Hero />
      <RoomShowcase />
      <Amenities />
      <OffersSection />
      <Gallery />
      <EventsSection showForm={false} />
      <Testimonials />
      <FAQ />
      <MapSection />
    </>
  );
}
