import Image from "next/image"

type AvatarProps = {
  name: string
  picture: string
}

const Avatar = (props: AvatarProps) => {
  const { name, picture } = props

  return (
    <div className="flex items-center">
      <div className="relative h-12 w-12">
        {picture && (
          <Image
            src={`${picture}?auto=format,compress,enhance&w=100&h=100`}
            className="outline-3 rounded-full outline -outline-offset-1 outline-violet-500"
            alt={name}
            width={100}
            height={100}
          />
        )}
      </div>
      <div className="ml-2 text-xl font-normal text-slate-500">{name}</div>
    </div>
  )
}

export default Avatar
