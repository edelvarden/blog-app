import Image from "next/image"
import React from "react"

type AvatarProps = {
  name: string
  picture: string
}

const Avatar: React.FC<AvatarProps> = ({ name, picture }) => {
  return (
    <div className="flex items-center">
      {picture && (
        <div className="relative h-12 w-12">
          <Image
            src={`${picture}?auto=format,compress,enhance&w=100&h=100`}
            className="rounded-full"
            alt={name}
            width={100}
            height={100}
          />
        </div>
      )}
      <div className="ml-2 text-xl font-normal text-slate-500">{name}</div>
    </div>
  )
}

export default Avatar
