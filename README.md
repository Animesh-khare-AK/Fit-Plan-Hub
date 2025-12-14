# FitPlanHub – Trainers & Users Platform

A unique backend and frontend project focused on trainers, fitness plans, and paid subscriptions. This platform allows certified trainers to create fitness plans and users to purchase & follow these plans.

## Features

### Backend

1.  **User & Trainer Authentication**
    - Signup & login for both trainers and regular users.
    - Password hashing & token authentication (JWT).
2.  **Trainer Dashboard – Create Fitness Plans**
    - Trainers can create fitness plans with Title, Description, Price, and Duration.
    - Edit or delete their own plans.
3.  **User Subscriptions**
    - Users can view all available fitness plans.
    - Purchase/subscribe to a plan (simulated payment).
    - Access control: Only subscribed users can view full plan details.
4.  **Access Control**
    - Non-subscribers see preview fields (Title, Trainer name, Price).
    - Subscribers get full access.
5.  **Follow Trainers**
    - Users can follow/unfollow trainers.
    - View list of followed trainers.
6.  **Personalized Feed**
    - Show plans from followed trainers.
    - Show purchased plans.

### Frontend

- **Landing Page**: Show all plans with previews.
- **Login / Signup**: Authentication screens.
- **Trainer Dashboard**: CRUD operations on plans.
- **Plan Details Page**: Preview or full view based on subscription.
- **User Feed**: Personalized list of plans.
- **Trainer Profile**: Follow/unfollow functionality.

## Tech Stack

- **Frontend**: React, Vite, CSS (Custom Styling)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running (or a MongoDB Atlas connection string)

### Installation

1.  **Clone the repository**

    ```bash
    git clone <repository-url>
    cd "Fit Plan Hub"
    ```

2.  **Backend Setup**

    - Navigate to the server directory:
      ```bash
      cd server
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - Create a `.env` file in the `server` directory with the following variables:
      ```env
      PORT=7000
      MONGODB_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret_key
      REFRESH_SECRET=your_refresh_token_secret
      NODE_MAILER_USER=your_email_for_otp
      NODE_MAILER_PASS=your_email_app_password
      ```
    - Start the server:
      ```bash
      npm run dev
      ```
    - The server will run on `http://localhost:7000`.

3.  **Frontend Setup**
    - Open a new terminal and navigate to the client directory:
      ```bash
      cd client
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - Start the development server:
      ```bash
      npm run dev
      ```
    - The application will be available at `http://localhost:5173` (or the port shown in the terminal).

## Project Structure

```
Fit Plan Hub/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Application pages
│   │   ├── context/        # Context API (Auth, Toast)
│   │   └── ...
│   └── ...
└── server/                 # Backend (Node.js + Express)
    ├── controllers/        # Route controllers
    ├── models/             # Mongoose models
    ├── routes/             # API routes
    └── ...
```
