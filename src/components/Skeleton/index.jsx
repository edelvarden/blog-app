import { useMemo } from "react"
import "./styles.scss"

const Skeleton = ({ height }) => {
  const style = useMemo(() => {
    let heightValue

    typeof +height === "number"
      ? (heightValue = `${height}px`)
      : (heightValue = height)

    return { height: heightValue }
  }, [height])

  return <div className="skeleton" style={style}></div>
}

export default Skeleton
