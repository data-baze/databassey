import { motion } from "framer-motion";

type CertificateCardProps = {
  title: string;
  date: string;
  href: string;
};
export function CertificateCard({ title, date, href }: CertificateCardProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      whileHover={{ scale: 1.02 }}
      className="flex flex-col gap-2  p-4 border-b border-brand-primary/15 text-sm rounded-lg hover:bg-linear-to-b from-brand-primary/5 to-brand-primary-10/2 transition"
    >
      <p className="text-sm">{title}</p>
      <p className="text-xs text-brand-primary/60 mt-1">{date}</p>
    </motion.a>
  );
}
