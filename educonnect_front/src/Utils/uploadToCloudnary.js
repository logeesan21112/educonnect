export const uploadToCloudnary = async (pics) => {
    if (pics) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "twitter");
      data.append("cloud_name", "dzf915fjh");
  
      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/dzf915fjh/image/upload", {
          method: "POST",
          body: data, // Fixed typo: `data` instead of `date`
        });
  
        const fileData = await res.json();
  
        if (fileData.url) {
          return fileData.url.toString(); // Safely convert URL to string
        } else {
          throw new Error("No URL returned from Cloudinary");
        }
  
      } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
      }
    } else {
      console.error("No file provided for upload");
    }
  };
  