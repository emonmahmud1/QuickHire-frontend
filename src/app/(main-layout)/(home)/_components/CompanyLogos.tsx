const companies = [
  { name: "Vodafone", logo: "◉ vodafone", style: "font-semibold" },
  { name: "Intel", logo: "intel", style: "font-bold" },
  { name: "Tesla", logo: "TESLA", style: "font-bold tracking-[0.3em]" },
  { name: "AMD", logo: "AMD", style: "font-black tracking-wider" },
  { name: "Talkit", logo: "Talkit", style: "font-semibold" },
];

const CompanyLogos = () => {
  return (
    <section className="bg-white border-y border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-[#202430] text-base text-start mb-10">
          Companies we helped grow
        </p>
        <div className="flex flex-wrap justify-between items-center gap-12 md:gap-20">
          {companies.map((c) => (
            <div 
              key={c.name} 
              className="opacity-40 hover:opacity-70 transition-opacity"
            >
              <span className={`text-[#25324B] text-2xl md:text-3xl ${c.style}`}>
                {c.logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyLogos;
