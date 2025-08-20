# ChatVibe

ChatVibe is a modern real-time chat application built with a React frontend (Vite) and a Node.js/Express backend. It allows users to sign up, log in, chat with others, and manage their profiles. The app features authentication, real-time messaging, and a clean, responsive UI.

## Features

- User authentication (sign up, login, password reset)
- Real-time messaging with socket.io
- Profile management
- Responsive and modern UI
- Cloudinary integration for image uploads
- Email notifications for password reset

## Technologies Used

- **Frontend:** React, Vite, Axios, Zustand (state management)
- **Backend:** Node.js, Express, MongoDB, Socket.io
- **Other:** Cloudinary, Nodemailer

## Project Structure

```
Client/      # React frontend
Server/      # Node.js backend
```

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd ChatVibe
   ```
2. Install dependencies for both client and server:
   ```bash
   cd Client && npm install
   cd ../Server && npm install
   ```
3. Set up environment variables as needed (see `.env.example` if provided).

### Running the App

- **Start the backend:**
  ```bash
  cd Server
  npm start
  ```
- **Start the frontend:**
  ```bash
  cd Client
  npm run dev
  ```

The frontend will typically run on `http://localhost:5173` and the backend on `http://localhost:5000`.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
