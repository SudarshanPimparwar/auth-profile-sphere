
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
- **Database**: MongoDB 
- **Authentication**: JWT tokens

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
