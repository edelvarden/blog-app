import { INavLinks } from "@/types"
import { FC, memo } from "react"
import Nav from "./Nav"
import ScrollTracker from "./ScrollTracker"
import { useRouter } from "next/router"

const Header: FC<INavLinks> = ({ routes }) => {

  const router = useRouter()
  const isArticlesPage = router.pathname.includes("/articles")

  return (
    <header className="flex-0 sticky left-0 top-0 z-50 w-screen border-b border-black border-opacity-10 bg-white">
      <div className="relative">
        <Nav routes={routes} />
        {isArticlesPage && <ScrollTracker />}
      </div>
    </header>
  )
}

export default memo(Header)
