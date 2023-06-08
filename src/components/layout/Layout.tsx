import ToTopButton from "@/components/common/ToTopButton"
import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import Meta from "@/seo/meta"
import clsx from "clsx"
import { Poppins } from "next/font/google"
import Head from "next/head"
import { FC, ReactNode } from "react"

import "lazysizes"
import "lazysizes/plugins/parent-fit/ls.parent-fit"

const poppins = Poppins({
  weight: ["400", "500", "700"],
  style: "normal",
  subsets: ["latin"],
  display: "swap",
  variable: "--poppins-font",
})

const layoutClassName = clsx(
  "flex flex-col justify-start items-start",
  "min-h-screen",
  "font-sans",
  poppins.className
)

interface ILayoutProps {
  title: string
  children: ReactNode
}

const Layout: FC<ILayoutProps> = ({ title, children }) => {
  return (
    <>
      <Meta />
      <Head>
        <title>{title}</title>
      </Head>
      <div className={layoutClassName}>
        <Header routes={[{ path: "/", name: "Blog." }]} />
        <main className="w-screen flex-1">{children}</main>
        <Footer />
      </div>
      <ToTopButton />
    </>
  )
}

export default Layout
