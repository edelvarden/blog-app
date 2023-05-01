import { FC, memo } from "react"
import Container from "@/components/container"
import { CMS_NAME, CMS_URL, EXAMPLE_PATH } from "@/lib/constants"

const currentYear = new Date().getFullYear()

const Footer: FC = () => {
  return (
    <footer className="border-accent-2 bg-accent-1 border-t">
      <Container>
        <div className="flex flex-col items-center py-28 lg:flex-row">
          <h3 className="mb-10 text-center text-4xl font-bold leading-tight tracking-tighter lg:mb-0 lg:w-1/2 lg:pr-4 lg:text-left lg:text-5xl">
            Statically Generated with Next.js.
          </h3>
          <div className="flex flex-col items-center justify-center lg:w-1/2 lg:flex-row lg:pl-4">
            <a
              href="https://nextjs.org/docs/basic-features/pages"
              className="mx-3 mb-6 border border-black bg-black px-12 py-3 font-bold text-white transition-colors duration-200 hover:bg-white hover:text-black lg:mb-0 lg:px-8"
            >
              Read Documentation
            </a>

            <a
              href="https://nextjs.org/"
              className="hover:text-success underline transition-colors duration-200"
            >
              Next.js
            </a>

            <a
              href={CMS_URL}
              className="hover:text-success underline transition-colors duration-200"
            >
              {CMS_NAME}
            </a>

            <a
              href={`https://github.com/vercel/next.js/tree/canary/examples/${EXAMPLE_PATH}`}
              className="mx-3 font-bold hover:underline"
            >
              View on GitHub
            </a>
          </div>
        </div>
        <div className="flex justify-center">
          <p className="py-4">&copy; {currentYear} Blog. All Rights Reserved.</p>
        </div>
      </Container>
    </footer>
  )
}

export default memo(Footer)
