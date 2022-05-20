import imageCompression from "browser-image-compression";

async function resizeImage(file) {
  const options = {
    maxSizeMB: 2,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    const resizedImage = await imageCompression(file, options);
    return resizedImage;
  } catch (error) {
    console.log(error);
  }
}

export default resizeImage;
