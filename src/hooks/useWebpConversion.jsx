const useWebpConversion = async file => {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  context.drawImage(bitmap, 0, 0);

  return await new Promise(resolve => {
    canvas.toBlob(
      blob => {
        const [name] = file.name.split(".");
        const convertedFile = new File([blob], `${name}.webp`, {
          type: "image/webp",
        });
        resolve(convertedFile);
      },
      "image/webp",
      1
    );
  });
};

export default useWebpConversion;
