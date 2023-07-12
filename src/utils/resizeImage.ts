const resizeImage = async (file: File, size: number) => {
  size ??= 256;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const bitmap = await createImageBitmap(file);
  const { width, height } = bitmap;
  canvas.width = size;
  canvas.height = size;

  const ratio = Math.max(size / width, size / height, 1);

  const x = (size - width * ratio) / 2;
  const y = (size - height * ratio) / 2;

  ctx!.drawImage(
    bitmap,
    0,
    0,
    width,
    height,
    x,
    y,
    width * ratio,
    height * ratio
  );

  ctx!.filter = "grayscale(100%)";

  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob(
      (blob) => {
        resolve(blob);
      },
      "image/webp",
      1
    );
  });
};
export default resizeImage;
