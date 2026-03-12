const companies = [
  { name: "Vodafone", letter: "V", color: "#E60000" },
  { name: "intel", letter: "i", color: "#0071C5" },
  { name: "TESLA", letter: "T", color: "#CC0000" },
  { name: "AMD", letter: "A", color: "#ED1C24" },
  { name: "Talkit", letter: "T", color: "#6B7280" },
];

const CompanyLogos = () => {
  return (
    <section className="bg-white border-y border-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-[#515B6F] text-sm text-center mb-7">
          Companies we helped grow.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {companies.map((c) => (
            <div key={c.name} className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold"
                style={{ backgroundColor: c.color }}
              >
                {c.letter}
              </div>
              <span className="text-[#25324B] font-semibold text-base tracking-wide">
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyLogos;
