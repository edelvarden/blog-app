import { FC } from "react"
import "./styles.scss"

const Loader: FC = () => {
  return (
    <>
      <div className="overlay">
        <div className="loader"></div>
      </div>
    </>
  )
}

export default Loader
