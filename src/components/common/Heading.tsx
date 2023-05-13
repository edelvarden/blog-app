import { ReactNode } from "react"

interface HeadingProps {
  level: number
  className?: string
  children?: ReactNode
}

const Heading = ({ level, className, children }: HeadingProps) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements

  return <HeadingTag className={className}>{children}</HeadingTag>
}

export default Heading
