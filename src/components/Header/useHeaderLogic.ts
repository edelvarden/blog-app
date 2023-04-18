import { useState } from "react"
import { useLocation } from "react-router-dom"

export const useHeaderLogic = () => {
  const { pathname } = useLocation()
  const [isCreate, setIsCreate] = useState<boolean>(false)

  const handleClose = (): void => setIsCreate(false)
  const handleShow = (): void => setIsCreate(true)

  interface IPostData {
    title: string
    excerpt: string
    content: string
    image: string
  }

  const handleCreate = (data: IPostData) => {
    setIsCreate(false)
    // log -----------------
    console.log(data.title)
    console.log(data.content)
    // ---------------------
  }

  return {
    pathname,
    isCreate,
    handleClose,
    handleShow,
    handleCreate,
  }
}
