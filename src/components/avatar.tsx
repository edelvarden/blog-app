import Image from "next/image"

type AvatarProps = {
  name: string
  picture: string
}

const Avatar = (props: AvatarProps) => {
  const { name, picture } = props

  return (
    <div className="flex items-center">
      <div className="relative mr-4 h-12 w-12">
        {picture && (
          <Image
            src={`${picture}?auto=format,compress,enhance&w=100&h=100`}
            className="rounded-full"
            alt={name}
            width={100}
            height={100}
          />
        )}
      </div>
      <div className="text-xl font-bold">{name}</div>
    </div>
  )
}

export default Avatar
