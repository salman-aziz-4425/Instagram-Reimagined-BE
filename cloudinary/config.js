import cloudinary from 'cloudinary';
import dotenv from 'dotenv'
cloudinary.v2.config({
	cloud_name: 'dp2kxpweg',
	api_key: '146544417777163',
	api_secret: '7rHxb54Dt4-etTXqJGmTgjAfrDE'
  });

  export default cloudinary.v2