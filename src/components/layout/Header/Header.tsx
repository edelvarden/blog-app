import RouterLink from "@/components/common/RouterLink"
import { FC, memo } from "react"
import ScrollTracker from "./ScrollTracker"

interface IRoutes {
  path: string
  name: string
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

const Header: FC<ILinks> = ({ routes }) => {
  const links = getLinks({ routes })

  return (
    <>
      <header className="flex-0 sticky left-0 top-0 z-50 w-screen border-b border-black border-opacity-10 bg-white">
        <div className="relative">
          <nav className="flex items-center justify-center gap-1  px-4 py-1">{links}</nav>
          <ScrollTracker />
        </div>
      </header>
    </>
  )
}

export default memo(Header)
