
# JWT Authentication System with React & MongoDB

This project demonstrates a complete authentication system using JWT tokens, React, and MongoDB. It includes user registration, login, profile management, and client listing features.

## Features

- User registration and login with JWT authentication
- Profile page with editable user details
- Client list display
- Responsive design
- Context API for state management

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express (not included in this repo)
- **Database**: MongoDB (connection required)
- **Authentication**: JWT tokens

## Getting Started

### Frontend Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

### Backend Requirements

This frontend expects a backend server running on `http://localhost:5000` with the following API endpoints:

- `POST /api/auth/register` - For user registration
- `POST /api/auth/login` - For user login
- `GET /api/auth/verify` - For token verification
- `PATCH /api/users/profile` - For updating user profile
- `GET /api/clients` - For fetching client list

## Backend Implementation Notes

The backend should implement the following functionality:

1. User registration with password hashing
2. JWT token generation and validation
3. User profile management
4. Client data storage and retrieval
5. Appropriate middleware for route protection

## Environment Setup

Create a MongoDB database and ensure your backend connects to it properly. The frontend expects the backend to handle all data persistence operations.

## Deployment

For production deployment:

1. Build the React application:
   ```
   npm run build
   ```
2. Deploy the generated files to your hosting service
3. Ensure your backend is properly deployed and accessible

## Note

This is the frontend portion of the application only. You will need to implement or connect to a backend service that provides the required API endpoints.
