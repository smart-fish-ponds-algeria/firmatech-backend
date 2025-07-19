
# 🔔 RESTful API Service

A backend service built with **TypeScript**. It includes full CRUD for users, admins, and all relevant entities. It also manages notifications (in-app and email) for both user types. The project includes RESTful endpoints, environment management, and code formatting.

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

* Send email and in-app alerts
* Endpoints for Admin, User, WaterTank, Feed, Measurement, and more
* A scheduler that fetches all measurements of a water tank each night and sends the data to an AI agent to generate reports
* And much more

<img width="1039" height="1154" alt="Hack" src="https://github.com/user-attachments/assets/f9007f1d-4859-4cbf-96b3-9818d6b0b485" />

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

* **Create Alert**: API endpoint to send an in-app notification
* **Send Email**: API endpoint to send emails using SMTP credentials

APIs are defined inside the `src/` directory.

---

## 🧪 Available Scripts

```bash
npm run dev         # Start development server
npm run build       # Build project (TypeScript to JS)
```

---

## 🧹 Code Quality

* ✅ ESLint: `.eslint.config.mjs`
* 🎨 Prettier: `.prettierrc`
* 🧼 Git Hooks via Husky: `.husky/`

Run manually:

```bash
npm run lint
npm run format
```

---

## 📝 Extras

* Swagger is available at `/api-docs`, though it’s worth noting that it wasn’t fully completed.

---
