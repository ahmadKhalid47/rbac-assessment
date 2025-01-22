
# Role-based Access Control


## Overview

This project is built using the MERN stack (MongoDB, Express.js, React, Node.js) and implements user role management, post creation, and management functionalities. It is designed to be modular, clean, and optimized for performance, following best practices for scalable development.


## Features

- Super Admin: Can create Admin and User accounts, manage roles, and more.

- Admin: Can manage users and view posts created by users.

- User: Can create posts but cannot manage user roles.


## Features

- Role-based Access Control (RBAC) to manage permissions.

- #### User Registration and Role Management:
- Super Admin creates Admin and User accounts.
- Admins and Users are managed by Super Admin.

- #### Post Management:
- Users can create posts, each stored with associated metadata (title, content, thumbnail, author).
- Admins can view posts created by users.
- API Documentation using Swagger for easy integration and testing.

## Technologies Used
- #### Frontend:
- React (UI framework)
- Redux or Context API for state management
- Responsive design for mobile and desktop
- #### Backend:
- Node.js with Express.js for RESTful APIs
- JWT for authentication
- Mongoose for MongoDB integration
- #### Database:
- MongoDB (Stores users and posts data)
- #### Api Documentation:
To test and explore the API, you can use the Postman documentation:
- Open https://documenter.getpostman.com/view/30078005/2sAYQdi9pg in your browser to access the Postman.

## Setup
- ### Prerequisites
- Node.js (v16 or higher)
- MongoDB instance running locally or remotely (e.g., MongoDB Atlas)

## Installation
- ### Clone the Repository:

```bash
git clone https://github.com/yourusername/mern-stack-project.git
cd mern-stack-project
```

- ### Install Dependencies:

Backend
```bash
cd backend
npm install
```
Frontend
```bash
cd frontend
npm install
```



- ### Environment Variables:
- MONGO_URI – MongoDB connection URI
- JWT_SECRET – Secret for JWT token generation
- PORT – Backend server port (default: 5000)
- ### Start the Application:


Backend
```bash

Backend
```bash
cd backend
npm install
```
Frontend
```bash
cd frontend
npm install
```
```
Frontend
```bash
cd frontend
npm start
```




## Usage
- Authentication: JWT authentication is used to secure routes. Users must log in to access protected endpoints.
- Role-Based Access: The role of the logged-in user determines their access and available actions. The frontend uses RBAC to show/hide elements based on the role.
## Routes
#### User Routes:
- POST /api/auth/register - Register a new user (Super Admin only).
- POST /api/auth/login - Login and obtain JWT token.
#### Post Routes:
- POST /api/posts - Create a post (Users only).
- GET /api/posts - Get all posts (Admins only).
- GET /api/posts/:id - Get a specific post by ID.
 
## Code Structure
- #### /backend: Contains server-side code (Express, MongoDB models, controllers, and routes).
 - /models: Mongoose models for User and Post.
- /controllers: Functions to handle API logic.
- /routes: Express route definitions.
- /middleware: JWT authentication middleware.
- #### /frontend: Contains React code (UI components, Redux, etc.).
- /components: Reusable UI components.
- /redux: Redux store, reducers, actions.
- /pages: React pages (views) for different routes.
## Performance Optimizations
- Pagination: Applied pagination for posts retrieval to optimize large data queries.
- Search Filters: Implemented search filters to quickly find posts by title.
## Code Quality
- Modular and clean code structure.
- Following best practices for folder organization and reusable components.
- Detailed comments added where necessary for better understanding and readability.
