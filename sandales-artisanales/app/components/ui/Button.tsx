"use client";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  onClick,
  href,
  variant = "primary",
}: ButtonProps) {
  const base = "px-6 py-3 rounded font-medium transition";
  const styles =
    variant === "primary"
      ? "bg-black text-white hover:bg-gray-800"
      : "bg-gray-200 text-black hover:bg-gray-300";

  if (href) {
    return (
      <a href={href} className={`${base} ${styles}`}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}
