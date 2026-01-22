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
    <svg
      width="100"
      height="14"
      viewBox="0 0 100 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[#c74634]"
    >
      <path
        d="M6.97 13.94C3.12 13.94 0 10.82 0 6.97C0 3.12 3.12 0 6.97 0C10.82 0 13.94 3.12 13.94 6.97C13.94 10.82 10.82 13.94 6.97 13.94ZM6.97 2.53C4.52 2.53 2.53 4.52 2.53 6.97C2.53 9.42 4.52 11.41 6.97 11.41C9.42 11.41 11.41 9.42 11.41 6.97C11.41 4.52 9.42 2.53 6.97 2.53Z"
        fill="currentColor"
      />
      <path
        d="M27.42 0.35H30.09L35.36 13.59H32.56L31.42 10.56H26.09L24.95 13.59H22.15L27.42 0.35ZM30.56 8.23L28.76 3.36L26.96 8.23H30.56Z"
        fill="currentColor"
      />
      <path
        d="M40.92 0.35H47.02C50.42 0.35 52.62 2.35 52.62 5.49C52.62 7.82 51.35 9.62 49.29 10.36L53.02 13.59H49.69L46.42 10.69H43.62V13.59H40.92V0.35ZM46.75 8.23C48.69 8.23 49.89 7.16 49.89 5.49C49.89 3.82 48.69 2.76 46.75 2.76H43.62V8.23H46.75Z"
        fill="currentColor"
      />
      <path
        d="M63.55 0.35H66.22L71.49 13.59H68.69L67.55 10.56H62.22L61.08 13.59H58.28L63.55 0.35ZM66.69 8.23L64.89 3.36L63.09 8.23H66.69Z"
        fill="currentColor"
      />
      <path
        d="M76.88 6.97C76.88 3.12 80.00 0 83.85 0C86.55 0 88.85 1.46 90.05 3.59L87.78 4.86C87.05 3.46 85.55 2.53 83.85 2.53C81.40 2.53 79.41 4.52 79.41 6.97C79.41 9.42 81.40 11.41 83.85 11.41C85.55 11.41 87.05 10.48 87.78 9.08L90.05 10.35C88.85 12.48 86.55 13.94 83.85 13.94C80.00 13.94 76.88 10.82 76.88 6.97Z"
        fill="currentColor"
      />
      <path
        d="M95.35 0.35H98.05V11.18H104V13.59H95.35V0.35Z"
        fill="currentColor"
      />
    </svg>
  )
}
