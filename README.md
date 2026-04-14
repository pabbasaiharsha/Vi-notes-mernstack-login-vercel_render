## 🌐 Live Application

- Frontend deployed on Vercel:
  - https://vi-notes-mernstack-login-vercel-ren.vercel.app
# BACKEND

## MONGODB.js

### dotenv
- All sensitive information is saved in `.env` file.
- `dotenv` helps us retrieve those values using `process.env`.
- This prevents exposing secrets like database password or JWT secret in code.

---

### CORS
- CORS is a browser security feature that controls which frontends are allowed to access backend APIs.
- In this project, only our frontend URLs are allowed to access the backend.

---

### express.json()
- HTTP only sends text (string) or binary.
- `express.json()` converts incoming JSON data into a JavaScript object so the backend can use it.

---

## MONGO (Mongoose)

- `mongoose.connect()` → connects to MongoDB Atlas cluster  
- `mongoose.Schema()` → defines the structure of the database  
- `mongoose.model()` → creates a model based on schema  
- `findOne()` → finds a document based on condition  
- `create()` → creates a new document in database  

---

## Google Authentication - Login

- First, we create a Google OAuth client using the client ID stored in `.env`.
- We take the token from the request body sent by the frontend.
- We verify this token using Google’s authentication service.
- After verification, we extract user details such as:
  - email
  - name
  - profile picture

- Then we check in the database:
  - If user already exists → login is successful
  - If user does not exist → create a new user with `isGoogleUser = true`

- Finally, we generate a JWT token and send it to the frontend.

---

## JWT TOKEN

- JWT (JSON Web Token) is used to keep the user logged in for a certain time (1 hour).
- Without JWT, the server cannot remember the user between requests.

- JWT works using:
  - payload (userId)
  - secret key
  - expiry time

- The generated token is sent to the frontend and stored there for future authentication.

---

## Manual Login

- User enters email and password.
- Backend checks if the email exists in MongoDB.
- Password is verified using bcrypt.

- Important:
  - bcrypt does NOT decrypt passwords.
  - It compares hashed values securely.

- If password matches → login success + JWT token  
- If not → error message  

---

## Register (Required for Manual Login)

- User sends email and password from frontend.
- Backend checks if user already exists:
  - If yes → return error message
  - If no → create a new user

- Password is hashed using bcrypt before storing.
- This ensures security of user credentials.

---

# FRONTEND

## login.tsx

- Displays login UI.
- Takes input:
  - email
  - password
- Includes:
  - Manual login button
  - Google login button

---

### Manual Login Flow

- Validates email using regex.
- Sends a POST request to backend `/login`.
- Request includes:
  - headers (Content-Type: application/json)
  - body (email and password converted to JSON string)

- Receives response from backend.
- If login is successful:
  - Stores JWT token in localStorage.

---

### Google Login Flow

- User clicks Google login button.
- Google returns a credential token.
- This token is sent to backend `/auth/google`.

- Backend verifies the token and returns JWT.
- Token is stored in localStorage.

---

## register.tsx

- Displays register UI.
- Takes:
  - email
  - password
  - confirm password

- Validates:
  - email format
  - password matches confirm password

- Sends POST request to backend `/register`.
- Displays success or error message.

---

## App.tsx

- Contains Navbar (common across all pages)
  - Links to Login and Register

- Uses React Router for navigation between pages.

- Uses Lazy Loading:
  - Components are loaded only when needed.

- Uses Suspense:
  - Displays loading text until component loads.

- Uses ErrorBoundary:
  - Prevents entire app from crashing
  - Only the component with error stops working

---

# DEPLOYMENT

## Database - MongoDB Atlas

- Created a cluster.
- Created a database user.
- Allowed network access (0.0.0.0/0).
- Generated connection string used in backend.

---

## Backend - Render

- Uploaded backend code to GitHub.
- Imported repository into Render.
- Added environment variables:
  - MONGO_URI
  - JWT_SECRET
  - client_id

- Render generates a backend URL used by frontend.

---

## Frontend - Vercel

- Uploaded frontend code to GitHub.
- Imported repository into Vercel.
- Added environment variable:
  - VITE_API_URL (backend URL)

- Vercel generates the live frontend URL.

---

# GOOGLE AUTHENTICATION (SETUP)

- Go to Google Cloud Console.
- Create an OAuth Client ID.
- Add authorized origins:
  - http://localhost:5173
  - Vercel frontend URL

- Copy the Client ID and store it in `.env`.

---

# IMPORTANT NOTES

- Never push `.env` file to GitHub.
- Always hash passwords before storing.
- JWT should have an expiry time.
- Use HTTPS in production.
- Validate user inputs on frontend.

---

# CONCLUSION

This project implements a complete MERN stack authentication system with:

- Manual login and registration
- Google OAuth login
- Secure password storage using bcrypt
- Session management using JWT
- Deployment using MongoDB Atlas, Render, and Vercel# Vi-notes-mernstack-login-vercel_render
