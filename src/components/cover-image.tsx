import { clsx } from "clsx"
import Image from "next/image"
import Link from "next/link"
import React from "react"

type CoverImageProps = {
  title: string
  url: string
  slug?: string
  className?: string
}

const CoverImage: React.FC<CoverImageProps> = ({ title, url, slug, className }) => {
  const imageClassNames = clsx("cover-image mx-auto w-full max-w-[800px] rounded-2xl", className)

  const image = (
    <Image
      src={`${url}?auto=format,compress,enhance&w=700`}
      alt={`Cover Image for ${title}`}
      className={imageClassNames}
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
