import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  onDark?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZES = {
  sm: { h: 28, w: 44 },
  md: { h: 36, w: 56 },
  lg: { h: 48, w: 75 },
} as const;

export function Logo({ onDark = false, size = "md", className }: LogoProps) {
  const { h, w } = SIZES[size];
  return (
    <Link
      href="/"
      aria-label="Nexara Global Solutions home"
      className={`group inline-flex items-center transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 ${className ?? ""}`}
    >
      <Image
        src="/images/logo.png"
        alt="Nexara Global Solutions"
        width={w}
        height={h}
        priority
        className="h-auto w-auto"
        style={{ height: h, width: "auto" }}
      />
    </Link>
  );
}