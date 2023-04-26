import Layout from "@/components/layout/Layout"
import { FC } from "react"

const About: FC = () => {
  return (
    <Layout title="About">
      <div className="my-8">
        <div className="mx-4 text-center">
          <h1>About</h1>
        </div>
        <div className="mt-[2em]">
          <p>
            About Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, laborum
            possimus? Quam, dolore. Facere esse necessitatibus fugit incidunt natus corrupti ea
            voluptate modi cumque qui dolor quia autem, nihil illo.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default About
