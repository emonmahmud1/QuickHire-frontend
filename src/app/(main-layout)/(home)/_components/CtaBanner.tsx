import Link from "next/link";
import Image from "next/image";
import dashboardImg from "@/assets/dashboard/dashboard.png";

const CtaBanner = () => {
  return (
    <section className="py-10 bg-[#F8F8FD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#4640DE] rounded-xl overflow-hidden flex flex-col md:flex-row items-center">
          {/* Left text */}
          <div className="flex-1 px-10 py-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug">
              Start posting
              <br />
              jobs today
            </h2>
            <p className="text-blue-200 mt-3 text-sm">
              Start posting jobs for only $19.
            </p>
            <Link
              href="/admin"
              className="inline-block mt-6 border border-white text-white font-semibold text-sm px-6 py-2.5 rounded hover:bg-white hover:text-[#4640DE] transition-colors"
            >
              Sign Up For Free
            </Link>
          </div>

          {/* Right — dashboard screenshot */}
          <div className="flex-1 flex justify-end items-end px-0 pb-0 overflow-hidden">
            <Image
              src={dashboardImg}
              alt="Dashboard preview"
              width={480}
              height={300}
              className="object-contain rounded-tl-xl opacity-90"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
