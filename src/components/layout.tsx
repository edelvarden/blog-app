import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import "lazysizes"
import "lazysizes/plugins/parent-fit/ls.parent-fit"
import Head from "next/head"
import { ReactNode } from "react"
import Meta from "./meta"

type LayoutProps = {
  title: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Meta />
      <Head>
        <title>{title}</title>
      </Head>
      <Header routes={[{ name: "Blog.", path: "/" }]} />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
