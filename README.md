# Instructions
## Required npm Packages
​
`You can also use package.json to install packages for client and server`

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
​
`npm install express nodemon cors dotenv mongoose jsonwebtoken multer bcrypt cloudinary`
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
### Note
- Following are the ports being used\
  `5050` for Server\
  `5173` for Client
  
## Folder Structure
The project's folder structure is organized as follows:
`server/`
│ ├── `.env/` # all envirnment variables.
│ ├── `constants/` # Constant values used across the application.
│ ├── `controllers/` # Controllers for managing data and business logic.
| ├── `services/` # Services for managing controllers buissness logic.
│ ├── `middlewares/` # Middleware functions for request processing.
│ ├── `models/` # Data models and database schema definitions.
│ ├── `routes/` # API routes and endpoint handlers.
│ ├── `cloudinary/` # Utility functions for cloudinary.
│ ├── `middlewares/` # Role based validations and token validations.
│ ├── `index.js` # Entry point of the application.

## Api Endpoints
- posts/
- comments
- followers/
- users
