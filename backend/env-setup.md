# Environment Setup Guide

## Step 1: Create .env file

Create a file named `.env` in the `backend` folder with the following content:

```env
# MongoDB Atlas Connection String
# Replace <username>, <password>, and <cluster-url> with your actual values
MONGODB_URI=mongodb+srv://flixconvert_user:your_password_here@flixconvert-cluster.mongodb.net/flixconvert?retryWrites=true&w=majority

# JWT Secret Key (generate a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random

# Server Port
PORT=5000

# Environment
NODE_ENV=development

# Optional: Logging level
LOG_LEVEL=debug

# Gmail SMTP Configuration (for password reset emails)
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-16-char-app-password

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
```

## Step 2: Update the values

### MongoDB URI:
1. Replace `flixconvert_user` with your database username
2. Replace `your_password_here` with your database password
3. Replace `flixconvert-cluster` with your actual cluster name

### JWT Secret:
Generate a strong random string (at least 32 characters):
- Use online generators like: https://generate-secret.vercel.app/32
- Or use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### Gmail SMTP Setup:
1. Go to Gmail.com → Settings → Security
2. Enable 2-Step Verification
3. Go to App Passwords → Generate
4. App name: "FlixConvert"
5. Copy the 16-character password
6. Replace `your-email@gmail.com` with your Gmail address
7. Replace `your-16-char-app-password` with the generated app password

## Step 3: Test Connection

After setting up the .env file, run:
```bash
cd backend
npm install
npm run dev
```

You should see: "MongoDB connected" in the console.

## Step 4: Test Email Functionality

1. Start the backend server
2. Go to your website's forgot password page
3. Enter your email address
4. Check your email for the reset link
5. The email should have a professional design with FlixConvert branding

## MongoDB Atlas Setup Steps:

### 1. Create Account
- Visit: https://www.mongodb.com/atlas
- Sign up for free account

### 2. Create Project
- Create new project: "FlixConvert"

### 3. Create Database
- Click "Build a Database"
- Choose "FREE" tier (M0)
- Select cloud provider (AWS/Google Cloud/Azure)
- Choose region (Asia Pacific - Mumbai recommended)
- Click "Create"

### 4. Database Access
- Go to Security → Database Access
- Click "Add New Database User"
- Username: `flixconvert_user`
- Password: Create strong password
- Privileges: "Read and write to any database"
- Click "Add User"

### 5. Network Access
- Go to Security → Network Access
- Click "Add IP Address"
- Enter: `0.0.0.0/0` (allow all IPs)
- Click "Add IP Address"

### 6. Get Connection String
- Go to Database → "Connect"
- Choose "Connect your application"
- Driver: Node.js
- Copy the connection string
- Replace `<password>` with your actual password

## Security Notes:
- Never commit .env file to git
- Use strong passwords
- In production, restrict IP addresses
- Rotate JWT secrets regularly
- Keep Gmail app password secure 