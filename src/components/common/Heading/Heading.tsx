import { FC, ReactNode } from "react"
import { clsx } from "clsx"

interface IHeadingProps {
  level?: number
  children?: ReactNode
  className?: string
}

const Heading: FC<IHeadingProps> = ({ level, children, className = "" }) => {
  const Heading = `h${level}` as keyof JSX.IntrinsicElements

  const getVariantClasses = () => {
    switch (level) {
      case 1:
        return "text-5xl" // 48px
      case 2:
        return "text-4xl" // 36px
      case 3:
        return "text-3xl" // 30px
      case 4:
        return "text-2xl" // 24px
      case 5:
        return "text-xl" // 20px
      case 6:
        return "text-base" // 16px
      default:
        return "text-base" // 16px
    }
  }

  const headingClassName = clsx("mb-4 break-words font-bold", getVariantClasses(), className)

  return <Heading className={headingClassName}>{children}</Heading>
}

export default Heading
