import cloudinary from '../config.js'
const uploadFilesToCloudinary = async (files) => {
    const cloudinaryUrls = [];
    try {
      for (const file of files) {
        const uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.write(file.buffer);
          stream.end();
        })
        cloudinaryUrls.push(uploadResult.secure_url);
      }
  
      return cloudinaryUrls;
    } catch (error) {
      throw error;
    }
  };

export default uploadFilesToCloudinary 