import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  highlightedText: string;
  linkText?: string;
  linkHref?: string;
  showLink?: boolean;
}

const SectionHeader = ({
  title,
  highlightedText,
  linkText = "Show all jobs →",
  linkHref = "/jobs",
  showLink = true,
}: SectionHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-10">
      <h2 className="text-3xl font-bold text-[#25324B]">
        {title} <span className="text-[#26A4FF]">{highlightedText}</span>
      </h2>
      {showLink && (
        <Link
          href={linkHref}
          className="text-[#4640DE] font-semibold text-sm hover:underline"
        >
          {linkText}
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
