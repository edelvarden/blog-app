import RouterLink from "@/components/common/RouterLink"
import { INavLinks } from "@/types"
import { FC } from "react"

const getLinks = ({ routes }: INavLinks) =>
  routes.map(({ path, name }, key) => (
    <RouterLink key={key} href={path}>
      {name}
    </RouterLink>
  ))

const Nav: FC<INavLinks> = ({ routes }) => {
  const links = getLinks({ routes })

  return <nav className="flex items-center justify-center gap-1  px-4 py-1">{links}</nav>
}

export default Nav
