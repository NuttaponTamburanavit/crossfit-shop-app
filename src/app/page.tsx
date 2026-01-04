import HeroSection from "@/components/organisms/heroSection";
import FeaturedCategories from "@/components/organisms/featuredCategories";
import ProductGrid from "@/components/organisms/productGrid";
import BrandStory from "@/components/organisms/brandStory";
import TrustIndicators from "@/components/organisms/trustIndicators";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <ProductGrid />
      <BrandStory />
      <TrustIndicators />
    </>
  );
}
