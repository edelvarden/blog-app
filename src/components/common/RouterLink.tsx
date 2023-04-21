import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import { HTMLAttributes, ReactNode } from "react"

type RouterLinkProps = {
  children: ReactNode
  href: string
  prefetch?: boolean
  replace?: boolean
  shallow?: boolean
  activeClassName?: string
} & HTMLAttributes<HTMLAnchorElement>

export default function RouterLink({
  children,
  href,
  prefetch = false,
  replace = false,
  shallow = false,
  className,
  ...props
}: RouterLinkProps) {
  const router = useRouter()

  const active = router.pathname === href

  const linkClassName = clsx(
    "flex rounded-lg px-5 py-3 font-medium bg-violet-500 bg-opacity-5 transition-all ",
    !active && "hover:bg-opacity-10",
    active && "text-white bg-opacity-90",
    className
  )

  return (
    <Link
      href={href}
      prefetch={prefetch}
      replace={replace}
      shallow={shallow}
      className={linkClassName}
      {...props}
    >
      {children}
    </Link>
  )
}
