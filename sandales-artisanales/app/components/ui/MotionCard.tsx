"use client";

import { motion } from "framer-motion";
import Card from "@/app/components/ui/Card";

interface MotionCardProps {
  title: string;
  description: string;
  image: string;
}

export default function MotionCard({
  title,
  description,
  image,
}: MotionCardProps) {
  return (
    <motion.div
      className="hover:shadow-lg transition"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Card title={title} description={description} image={image} />
    </motion.div>
  );
}
