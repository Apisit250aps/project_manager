import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

export function NavLink({
  href,
  children
}: {
  href: string
  children: ReactNode
}) {
  const router = usePathname()
  const isActive = router === href
  return (
    <Link href={href} className={isActive ? "active" : ""}>
      {children}
    </Link>
  )
}
