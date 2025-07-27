# FlixConvert

A modern file conversion platform built with React (Frontend) and Node.js/Express (Backend).

## 🚀 Features

- **File Conversion**: Convert images, videos, and audio files between different formats
- **User Authentication**: Secure login and registration system
- **Modern UI**: Beautiful and responsive interface built with React and Tailwind CSS
- **RESTful API**: Well-structured backend API with Express.js
- **File Upload**: Secure file upload with size limits and validation

## 📁 Project Structure

```
flixconvert/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── forms/        # Form components
│   │   │   ├── layout/       # Layout components (Navbar, etc.)
│   │   │   └── ui/          # UI components
│   │   ├── pages/           # Page components
│   │   │   ├── auth/        # Authentication pages
│   │   │   ├── company/     # Company-related pages
│   │   │   └── tools/       # Tools pages
│   │   ├── contexts/        # React contexts
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API service functions
│   │   ├── styles/          # CSS styles
│   │   ├── types/           # TypeScript type definitions
│   │   └── utils/           # Utility functions
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies
├── backend/                 # Node.js/Express backend
│   ├── routes/              # API route handlers
│   │   ├── auth.js          # Authentication routes
│   │   ├── tools.js         # File conversion routes
│   │   └── company.js       # Company information routes
│   ├── models/              # Database models
│   │   └── User.js          # User model
│   ├── middleware/          # Express middleware
│   │   └── auth.js          # Authentication middleware
│   ├── config/              # Configuration files
│   │   └── database.js      # Database configuration
│   ├── uploads/             # File upload directory
│   ├── server.js            # Main server file
│   └── package.json         # Backend dependencies
└── README.md               # Project documentation
```

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **React Router** - Navigation

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Multer** - File uploads
- **bcryptjs** - Password hashing

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flixconvert
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   ```bash
   # In backend directory, create .env file
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Start the development servers**

   **Backend (Terminal 1):**
   ```bash
   cd backend
   npm run dev
   ```

   **Frontend (Terminal 2):**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Tools Endpoints
- `POST /api/tools/upload` - File upload
- `POST /api/tools/convert` - File conversion
- `GET /api/tools/available` - Get available tools

### Company Endpoints
- `GET /api/company/info` - Get company information
- `GET /api/company/team` - Get team members
- `GET /api/company/services` - Get services

## 🔧 Development

### Code Structure
- **Components**: Reusable UI components in `frontend/src/components/`
- **Pages**: Page components in `frontend/src/pages/`
- **Services**: API calls in `frontend/src/services/`
- **Routes**: API endpoints in `backend/routes/`
- **Models**: Database models in `backend/models/`

### File Naming Conventions
- React components: PascalCase (e.g., `UserProfile.tsx`)
- Files and folders: kebab-case (e.g., `user-profile.tsx`)
- API routes: kebab-case (e.g., `user-profile.js`)

## 🚀 Deployment

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy the dist/ folder to your hosting service
```

### Backend Deployment
```bash
cd backend
npm start
# Deploy to your server or cloud platform
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email info@flixconvert.com or create an issue in the repository. 