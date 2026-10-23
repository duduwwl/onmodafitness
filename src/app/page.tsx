import { Hero } from "@/components/home/Hero";
import { Benefits } from "@/components/home/Benefits";
import { Categories } from "@/components/home/Categories";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { EditorialBanner } from "@/components/home/EditorialBanner";
import { NewArrivals } from "@/components/home/NewArrivals";
import { LookBuilder } from "@/components/home/LookBuilder";
import { About } from "@/components/home/About";
import { InstagramGallery } from "@/components/home/InstagramGallery";
import { Newsletter } from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <Categories />
      <FeaturedCollection />
      <FeaturedProducts />
      <EditorialBanner />
      <NewArrivals />
      <LookBuilder />
      <About />
      <InstagramGallery />
      <Newsletter />
    </>
  );
}
