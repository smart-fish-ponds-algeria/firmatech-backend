# 🔔 Notification API Service

A backend service built with **TypeScript** to manage notifications (in-app and email) for both users and admins. The project includes RESTful endpoints, environment management, code formatting, and Docker support.

---

## 📁 Project Structure

```
.
├── .husky/               # Git hooks for pre-commit checks
├── .vscode/              # VS Code workspace settings
├── public/               # Public assets (if any)
├── src/                  # Source code (controllers, routes, services, etc.)
├── .env.example          # Example environment variables
├── Dockerfile            # Docker configuration
├── eslint.config.mjs     # ESLint configuration
├── nodemon.json          # Nodemon settings for dev
├── package.json          # Project metadata and scripts
├── tsconfig.json         # TypeScript configuration
└── ...
```

---

## 🚀 Features

- 📬 Send email and in-app alerts  
- 👤 Admin and User endpoints  
- ⚙️ TypeScript support  
- ✅ ESLint and Prettier integrated  
- 🐳 Docker-ready  
- 🔄 Git hooks with Husky  

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create your `.env` file based on the example:

```bash
cp .env.example .env
```

Edit `.env` with your configuration.

### 4. Start the Development Server

```bash
npm run dev
```

---

## 📬 Notification System

- **Create Alert**: API endpoint to send an in-app notification.  
- **Send Email**: API endpoint to send emails using SMTP credentials.  

APIs are defined inside the `src/` directory.

---

## 🧪 Available Scripts

```bash
npm run dev         # Start development server
npm run build       # Build project (TypeScript to JS)
```

---

## 🐳 Docker Usage

Build and run the app inside a Docker container:

```bash
docker build -t notification-api .
docker run -p 3000:3000 notification-api
```

---

## 🧹 Code Quality

- ✅ ESLint: `.eslint.config.mjs`
- 🎨 Prettier: `.prettierrc`
- 🧼 Git Hooks via Husky: `.husky/`

Run manually:

```bash
npm run lint
npm run format
```

---

## 📄 License

MIT © 2025 Your Name
