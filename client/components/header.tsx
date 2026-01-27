import Link from "next/link"

export function Header() {
  return (
    <div className="flex items-center gap-3">
      <Link href="/" className="flex items-center gap-3">
        <OracleLogo />
        <span className="text-foreground font-medium">AIA Toolkit</span>
      </Link>
    </div>
  )
}

function OracleLogo() {
  return (
    <span className="text-[#c74634] font-bold text-lg">Oracle</span>
  )
}
