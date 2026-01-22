import Link from "next/link"
import { cn } from "@/lib/utils"

interface DemoCardProps {
  title: string
  description: string
  type: "agent" | "service"
  href: string
}

export function DemoCard({ title, description, type, href }: DemoCardProps) {
  return (
    <Link href={href} className="block">
      <div className="rounded-lg border border-[#4a4640] bg-[#3a3733] p-6 transition-colors hover:border-[#5a5650] hover:bg-[#434038]">
        <DemoBadge type={type} />
        <h3 className="mt-3 text-lg font-semibold text-[#d4a574]">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#9a958d]">{description}</p>
      </div>
    </Link>
  )
}

function DemoBadge({ type }: { type: "agent" | "service" }) {
  return (
    <span
      className={cn(
        "inline-block rounded px-2 py-0.5 text-xs font-medium",
        type === "agent" 
          ? "bg-[#3d5a3d] text-[#8fbc8f]" 
          : "bg-[#2d4a5a] text-[#87ceeb]"
      )}
    >
      {type === "agent" ? "Agent" : "Service"}
    </span>
  )
}
