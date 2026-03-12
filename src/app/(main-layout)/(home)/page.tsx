import { Suspense } from "react";
import HeroSection from "./_components/HeroSection";
import CompanyLogos from "./_components/CompanyLogos";
import CategoriesSection from "./_components/CategoriesSection";
import CtaBanner from "./_components/CtaBanner";
import FeaturedJobsSection from "./_components/FeaturedJobsSection";
import LatestJobsSection from "./_components/LatestJobsSection";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <CompanyLogos />
      <CategoriesSection />
      <CtaBanner />
      <Suspense fallback={<div className="py-16 text-center text-[#515B6F]">Loading jobs...</div>}>
        <FeaturedJobsSection />
      </Suspense>
      <Suspense fallback={<div className="py-16 text-center text-[#515B6F]">Loading jobs...</div>}>
        <LatestJobsSection />
      </Suspense>
    </>
  );
};

export default HomePage;