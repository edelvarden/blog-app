import { PostType } from "@/types"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/react-splide/css/core"
import React from "react"
import HeroPost from "./hero-post"

type SliderProps = {
  posts: PostType[]
}

const Slider: React.FC<SliderProps> = ({ posts }) => {
  return (
    <Splide
      tag="section"
      options={{
        type: "loop",
        gap: "1rem",
        perPage: 1,
        pagination: true,
        autoplay: true,
        interval: 5000,
        lazyLoad: "sequential",
        pauseOnFocus: true,
      }}
    >
      {posts.map((post, index) => (
        <SplideSlide key={index}>
          <HeroPost
            key={post.slug}
            title={post.title}
            coverImage={post.metadata.cover_image}
            date={post.created_at}
            author={post.metadata.author}
            slug={post.slug}
            excerpt={post.metadata.excerpt}
          />
        </SplideSlide>
      ))}
    </Splide>
  )
}

export default Slider
