# 🌍 African Traditional Architecture Backend API

**African Traditional Architecture Backend** is a **modern, scalable backend API** built with **TypeScript, Node.js, Express, and MongoDB** — designed to power projects related to _African traditional architecture_ (e.g., digital archives, educational platforms, cultural heritage apps, etc.). This boilerplate accelerates backend development with ready-to-use features such as authentication, file handling, logging, and secure APIs.

> Although this repository currently has a basic template README, this version expands on purpose, features, and usage — making it easier for contributors and users to understand and work with the project.

---

## 🧱 Features

This backend comes with built-in support for:

- 🔐 **JWT Authentication** — secure token-based login and authorization
- 🔒 **Password Hashing** with Bcrypt
- 📁 **File Uploads** using Multer
- ✉️ **Email Sending** via NodeMailer
- 📜 **Zod + Mongoose Schema Validation**
- 🛠️ **Logging** using Winston with daily rotation
- 📊 **API Request Logging** with Morgan
- 🧹 **Code Quality** using ESLint and Prettier
- ⚙️ **Environment Config Support** (.env)

This setup helps developers get started quickly without worrying about repetitive configurations.

---

## 🧠 Technologies Used

The project stack includes:

- 💻 **TypeScript** — typed JavaScript for safer code
- 🚀 **Node.js & Express** — backend server framework
- 🗄️ **MongoDB + Mongoose** — database and schema management
- 🔐 **Bcrypt & JWT** — security and authentication
- 📦 **Multer** — file upload handling
- 📬 **NodeMailer** — email support
- 🧰 **ESLint + Prettier** — code quality & formatting
- 🧾 **Winston + DailyRotateFile** — structured log files
- 📊 **Morgan** — HTTP request logger

---

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/muhammadranju/africantraditionalarchitecture-backend.git
cd africantraditionalarchitecture-backend
```

### 2. Install dependencies

```bash
npm install
# or
bun install
```

### 3. Setup environment variables

Create a `.env` file in the root with values like:

```
NODE_ENV=development
DATABASE_URL=mongodb://127.0.0.1:27017/your_db
PORT=5000

JWT_SECRET=your_jwt_secret
BCRYPT_SALT_ROUNDS=10

EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_pass
```

### 4. Run the development server

```bash
npm run dev
# or
bun dev
```

---

## 🧪 Testing

> 🔧 _Example test command — adapt if you add tests to the project later_

```bash
npm test
# or
bun test
```

Add automated tests to validate endpoints, models, and authentication behavior.

---

## 📁 Folder Structure

Typically the project follows this layout:

```
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── services/
│   └── utils/
├── .env
├── package.json
├── tsconfig.json
├── README.md
```

---

## 🤝 Contributing

This project welcomes contributions! Please:

- ⭐ Star the repo if you find it useful
- 🍴 Fork the repository
- 📝 Make improvements
- 🔀 Submit a pull request

Feel free to open issues for bugs or feature discussions.

---

## 📜 License

Include your preferred open source license (e.g., MIT License).
