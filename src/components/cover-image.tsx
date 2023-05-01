import cn from "classnames"
import Link from "next/link"
import Image from "next/image"

type CoverImageProps = {
  title: string
  url: string
  slug: string
}
const CoverImage = (props: CoverImageProps) => {
  const { title, url, slug } = props

  const image = (
    <Image
      src={`${url}?auto=format,compress,enhance&w=700`}
      alt={`Cover Image for ${title}`}
      className={"cover-image mx-auto w-full max-w-[800px] rounded-2xl"}
      width={700}
      height={350}
      priority
    />
  )
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
export default CoverImage
