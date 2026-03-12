import {
  Palette,
  TrendingUp,
  Megaphone,
  DollarSign,
  Monitor,
  Wrench,
  Briefcase,
  Users,
} from "lucide-react";
import SectionHeader from "@/components/shared/main/SectionHeader";

const categories = [
  { name: "Design", count: 235, icon: Palette, highlighted: false },
  { name: "Sales", count: 756, icon: TrendingUp, highlighted: false },
  { name: "Marketing", count: 140, icon: Megaphone, highlighted: true },
  { name: "Finance", count: 325, icon: DollarSign, highlighted: false },
  { name: "Technology", count: 436, icon: Monitor, highlighted: false },
  { name: "Engineering", count: 542, icon: Wrench, highlighted: false },
  { name: "Business", count: 211, icon: Briefcase, highlighted: false },
  { name: "Human Resource", count: 346, icon: Users, highlighted: false },
];

const CategoriesSection = () => {
  return (
    <section className="py-16 bg-[#F8F8FD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Explore by" highlightedText="category" />

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                href={`/jobs?category=${cat.name}`}
                className={`group flex flex-col gap-3 p-6 rounded-lg border transition-all hover:shadow-md ${
                  cat.highlighted
                    ? "bg-[#4640DE] border-[#4640DE] text-white"
                    : "bg-white border-gray-100 text-[#25324B] hover:border-[#4640DE]"
                }`}
              >
                <Icon
                  size={28}
                  className={cat.highlighted ? "text-white" : "text-[#4640DE]"}
                />
                <div>
                  <p className={`font-semibold text-base ${cat.highlighted ? "text-white" : "text-[#25324B]"}`}>
                    {cat.name}
                  </p>
                  <p className={`text-sm mt-1 flex items-center gap-1 ${cat.highlighted ? "text-blue-100" : "text-[#515B6F]"}`}>
                    {cat.count} jobs available →
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
