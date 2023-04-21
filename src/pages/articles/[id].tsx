import Layout from "@/components/layout/Layout"
import Heading from "@/components/common/Heading"
import NotFound from "@/pages/404"
import { NextPage } from "next"
import { useRouter } from "next/router"

const About: NextPage = () => {
  const router = useRouter()
  const { id, title } = router.query

  if (!title) {
    return <NotFound />
  }

  return (
    <Layout title={`${title}`}>
      <Heading level={1}>{title}</Heading>
    </Layout>
  )
}

export default About
