import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function Brand({ link = "/" }: { link?: string }) {
  return (
    <Link href={link} className="brand" aria-label="CyberShield AI home">
      <span className="brand-mark"><ShieldCheck size={20} strokeWidth={2.1}/></span>
      <span className="brand-text">CYBER<span>SHIELD</span><small>AI / 2.0</small></span>
    </Link>
  );
}
