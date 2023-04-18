export const useWebpConversion = async (file: File): Promise<File> => {
  const bitmap = await createImageBitmap(file)
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")

  canvas.width = bitmap.width
  canvas.height = bitmap.height
  context?.drawImage(bitmap, 0, 0)

  return await new Promise<File>((resolve) => {
    canvas.toBlob(
      (blob) => {
        const [name] = file.name.split(".")
        const convertedFile = new File([blob as Blob], `${name}.webp`, {
          type: "image/webp",
        })
        resolve(convertedFile)
      },
      "image/webp",
      1
    )
  })
}
