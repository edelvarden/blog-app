import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import { clsx } from "clsx"
import { Poppins } from "next/font/google"
import Head from "next/head"
import { FC, ReactNode } from "react"
import ToTopButton from "@/components/common/ToTopButton"

const poppins = Poppins({
  weight: ["400", "500", "700"],
  style: "normal",
  subsets: ["latin"],
  display: "swap",
})

const layoutClassName = clsx(
  `flex flex-col justify-start items-start ${poppins.className}`,
  "min-h-screen"
)

interface ILayout {
  title: string
  children: ReactNode
}

const Layout: FC<ILayout> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={layoutClassName}>
        <Header
          routes={[
            { path: "/", name: "Blog" },
            { path: "/about", name: "About" },
          ]}
        />
        <main className="w-screen flex-1">
          {children}
          <ToTopButton />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
