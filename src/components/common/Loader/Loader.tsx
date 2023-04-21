import { FC } from "react"
import "./Loader.scss"

const Loader: FC = () => {
  return (
    <div className="overlay">
      <div className="loader"></div>
    </div>
  )
}

export default Loader
