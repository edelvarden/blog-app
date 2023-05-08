import { PostType } from "@/types"
import "swiper/css"
import { Swiper, SwiperSlide } from "swiper/react"
import HeroPost from "./hero-post"

type SliderProps = {
  posts: PostType[]
}

const Slider = (props: SliderProps) => {
  const { posts } = props

  return (
    <>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        loop
      >
        {posts?.map((post, index) => (
          <SwiperSlide key={index}>
            <HeroPost
              key={post.slug}
              title={post.title}
              coverImage={post.metadata.cover_image}
              date={post.created_at}
              author={post.metadata.author}
              slug={post.slug}
              excerpt={post.metadata.excerpt}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default Slider
