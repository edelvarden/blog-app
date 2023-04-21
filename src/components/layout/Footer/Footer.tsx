import { FC, memo } from "react"

const currentYear = new Date().getFullYear()

const Footer: FC = () => {
  return (
    <footer className="flex-0 w-screen">
      <div className="mx-4 flex justify-center">
        <p className="p-4">&copy; {currentYear} Blog. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default memo(Footer)
