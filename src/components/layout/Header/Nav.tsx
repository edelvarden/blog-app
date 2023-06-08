import RouterLink from "@/components/common/RouterLink"
import { INavLinks } from "@/types"
import { FC } from "react"

const Nav: FC<INavLinks> = ({ routes }) => {
  const renderLinks = () =>
    routes.map(({ path, name }, key) => (
      <RouterLink key={key} href={path}>
        {name}
      </RouterLink>
    ))

  return <nav className="flex items-center justify-center gap-1 px-4 py-1">{renderLinks()}</nav>
}

export default Nav
