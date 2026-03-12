import Link from "next/link";
import { Compass } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaDribbble, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#202430] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-[#4640DE] rounded p-1.5">
                <Compass size={18} className="text-white" />
              </div>
              <span className="font-bold text-white text-xl">QuickHire</span>
            </Link>
            <p className="text-[#D6DDEB] text-sm leading-relaxed">
              Great platform for the job seeker that searching for new career
              heights and passionate about startups. Find your dream job easier.
            </p>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-white mb-5">About</h3>
            <ul className="flex flex-col gap-3">
              {["Companies", "Pricing", "Terms", "Advice", "Privacy Policy"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-[#D6DDEB] text-sm hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-5">Resources</h3>
            <ul className="flex flex-col gap-3">
              {["Help Docs", "Guide", "Updates", "Contact Us"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-[#D6DDEB] text-sm hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-white mb-2">
              Get job notifications
            </h3>
            <p className="text-[#D6DDEB] text-sm mb-4 leading-relaxed">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 px-3 py-2 text-sm bg-white text-[#25324B] rounded outline-none placeholder:text-gray-400"
              />
              <button className="bg-[#4640DE] hover:bg-[#3730c0] text-white text-sm font-semibold px-4 py-2 rounded transition-colors whitespace-nowrap cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#3d4152] mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#D6DDEB] text-sm">
            2021 © QuickHire. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[FaFacebookF, FaInstagram, FaDribbble, FaLinkedinIn, FaTwitter].map(
              (Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-[#D6DDEB] hover:text-white transition-colors"
                >
                  <Icon size={16} />
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
