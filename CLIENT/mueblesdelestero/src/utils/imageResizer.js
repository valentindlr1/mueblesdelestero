import Resizer from "react-image-file-resizer";

const resizeImage = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      720, // Width (adjust as needed)
      1024, // Height (adjust as needed)
      "JPEG", // Format (you can change this to PNG or other supported formats)
      55, // Quality (adjust as needed)
      0, // Rotation (0 means no rotation)
      (uri) => {
        resolve(uri);
      },
      "base64" // Output type
    );
  });

export default resizeImage