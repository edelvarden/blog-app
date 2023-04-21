import RouterLink from "@/components/common/RouterLink"
import { FC, memo } from "react"

interface IRoutes {
  path: string
  name: string
}

interface IHeaderProps {
  routes: IRoutes[]
}

interface ILinks {
  routes: IRoutes[]
}

const getLinks = ({ routes }: ILinks) =>
  routes.map(({ path, name }, key) => (
    <RouterLink key={key} href={path}>
      {name}
    </RouterLink>
  ))

const Header: FC<IHeaderProps> = ({ routes }) => {
  const links = getLinks({ routes })

  return (
    <>
      <header className="flex-0 sticky left-0 top-0 w-screen bg-white">
        <nav className="flex items-center justify-center gap-1  px-4 py-1">{links}</nav>
      </header>
    </>
  )
}

export default memo(Header)
