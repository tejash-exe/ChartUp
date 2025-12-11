# 📊 ChartUp – Beautiful, Fast & Interactive Graph Builder

**Modern glass-UI graph creator with multi-type charts, autosave, Google login, and Image export.**

ChartUp is a lightweight yet powerful tool for creating visually appealing graphs with a sleek glass-inspired interface.
Designed for speed, simplicity, and aesthetics — perfect for quick data visualization, presentations, or notes.

## 🚀 Features
### ✨ Modern & Aesthetic

* Clean glassmorphism UI
* Smooth transitions & delightful animations
* Light / Dark / System theme support

### 📈 Create Graphs Instantly

* Add labels & values with ease
* Supports Bar, Line, and Pie charts
* Auto-highlighting & smart color selection

### 🔄 Sync & Reliability

* Autosave (only when changes occur)
* Auto-polling from server when app is online & visible
* Efficient update handling for inactive tabs
* Works seamlessly across multiple devices

### 📴 Offline Mode (No Login Required)

* Create, edit & view graphs locally without authentication
* Offline graphs are stored in browser storage

### 🔐 Google Authentication

* Secure login using Google OAuth
* Sync graphs across devices
* Logout support

### 🖼 Export

* Export any chart as Image


## 🛠 Tech Stack
### Frontend

* ⚛️ React
* 🎨 Tailwind CSS
* 📊 Chart.js
* 🔐 Google OAuth (react-oauth/google)
* ⚡ Vite

### Backend

* 🟢 Node.js
* 🚂 Express
* 🍃 MongoDB + Mongoose
* 🔐 Google OAuth
* 🔑 JWT Auth (Access + Refresh Tokens)

### Deployment

* 🌐 Frontend → Vercel
* ☁️ Backend → Render



# 📁 Project Structure

```nginx
root
├── Frontend/     → React + Vite + Tailwind + Chart.js
└── Backend/      → Node + Express + MongoDB + Auth
```

# ⚙️ Backend Environment Variables

Create a `.env` file inside `/Backend`:

```makeafile
PORT=

MONGO_URI=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

USER_ACCESS_TOKEN_SECRET=
USER_ACCESS_TOKEN_EXPIRY=

USER_REFRESH_TOKEN_SECRET=
USER_REFRESH_TOKEN_EXPIRY=
```
Required for Google OAuth, MongoDB, and JWT authentication.

# 🧑‍💻 Local Development Setup

### 1️⃣ Install dependencies

```sh
cd Frontend
npm install

cd ../Backend
npm install
```

### 2️⃣ Add environment variables

Fill the `.env` file inside `/Backend`.

### 3️⃣ Run development servers

**Frontend**

```sh
npm run dev
```

**Backend**

```sh
npm run dev
```

### 4️⃣ Update URLs when needed

Places where backend URLs might be used:

```swift
/Frontend/src/context/AppContext.jsx
/Backend/src/app.js
/Frontend/vercel.config.js
```

## 🌐 Production Deployment

**Frontend → Vercel**

* Deploy `/Frontend`
* Add production backend URL in environment or config file

**Backend → Render**

* Deploy `/Backend` as web service
* Add all required **ENV** variables
* Ensure **CORS** allows your Vercel domain

## 🙌 Contributing

Pull requests are welcome!  
If you want improvements, suggestions, or bug fixes — feel free to open an issue.

## 👤 Author

**Aditya Choudhary**

🔗 [LinkedIn](https://www.linkedin.com/in/aditya-choudhary-31137b291/)  
🐙 [GitHub](https://github.com/tejash-exe)

## ⭐ Support the Project

If you like this project:

⭐ Star the repo  
📢 Share it with others

Your support motivates further updates! ❤️
