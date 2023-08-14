# Instructions
## Required npm Packages
​
`You can use package.json to install packages for client and server`

### - Server
- express
- nodemon
- cors
- dotenv
- mongoose
- jsonwebtoken
- multer
- bcrypt
- cloudinary
- nodemailer\
​
`npm install express nodemon cors dotenv mongoose jsonwebtoken multer bcrypt cloudinary nodemailer`
​
## Code Execution
### - Server
​
`npm start`
​
### - Client
​
`cd client && npm run dev`
​
## Dockerization
### - Pre Prequisite
- Make sure docker and docker desktop is installed.
- Create docker files for client and server
​
### - Build
`- docker build -t imageName .

### - Port-Forwarding
- docker run -p HostPort:ContainerPort imageName
​
### - Run
`docker start containerId
​
### - Note
- Following are the ports being used\
  `8000` for Server\
  `5173` for Client
  
## Folder Structure
The project's folder structure as follows:
`server/`
│ ├── `.env/` # Envirnment variables.
│ ├── `constants/` # Constant routes names.
│ ├── `controllers/` # Controllers for managing data and business logic.
| ├── `services/` # Services for managing controllers buissness logic.
│ ├── `middlewares/` # Middleware functions for validations.
│ ├── `models/` # Data models and database schema definitions.
│ ├── `routes/` # API routes.
│ ├── `utils/` # Utility functions to use across application.
│ ├── `cloudinary/` # Utility functions for cloudinary.
│ ├── `middlewares/` # Role based validations and token validations.
│ ├── `index.js` # Entry point of the application.

## Api Endpoints
- posts/
- comments
- followers/
- users/
