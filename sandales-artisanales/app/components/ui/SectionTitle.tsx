"use client";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-3xl font-bold">{title}</h2>
      {subtitle && <p className="text-gray-700 mt-2">{subtitle}</p>}
    </div>
  );
}
