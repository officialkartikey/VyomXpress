# VyomXpress Backend Assignment

Production-grade backend application built using Node.js, Express.js, MySQL, Sequelize ORM, JWT Authentication, and Discord Bot Integration.

## 🚀 Live Demo

**API URL:**
[https://vyomxpress-vqej.onrender.com]

---

## 📌 Features

### Authentication

* User Signup
* User Login
* JWT Authentication
* Password Hashing using bcrypt
* Duplicate Username Validation
* Duplicate Email Validation

### Discord Bot Integration

Implemented Discord Slash Commands:

* `/ppcreateuser`
* `/ppcreateservice`
* `/ppgetuser`

### Security

* Helmet
* Rate Limiting
* Password Hashing
* Environment Variables
* JWT Authentication

### Validation

* Joi Request Validation
* Centralized Error Handling

### Logging

* Winston Logger
* Error Logs
* Combined Logs

---

## 🛠 Tech Stack

* Node.js
* Express.js
* MySQL
* Sequelize ORM
* JWT
* bcrypt
* Discord.js
* Joi
* Winston
* Helmet
* Swagger
* Render
* Railway MySQL

---

## 📂 Project Structure

```text
src
├── config
│   ├── db.js
│   ├── discord.js
│   ├── env.js
│   └── swagger.js
│
├── controllers
│   └── auth.controller.js
│
├── discord
│   ├── bot.js
│   ├── deployCommands.js
│   ├── interactionCreate.js
│   └── commands
│       ├── ppcreateuser.js
│       ├── ppcreateservice.js
│       └── ppgetuser.js
│
├── middleware
│   ├── validate.middleware.js
│   ├── error.middleware.js
│   └── rateLimiter.js
│
├── models
│   ├── User.js
│   ├── Service.js
│   └── index.js
│
├── routes
│   ├── auth.routes.js
│   └── index.js
│
├── services
│   └── auth.service.js
│
├── utils
│   ├── ApiError.js
│   ├── logger.js
│   └── generateToken.js
│
├── validations
│   └── auth.validation.js
│
├── app.js
└── server.js
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=vyomxpress
DB_USER=root
DB_PASSWORD=your_password

JWT_SECRET=your_jwt_secret

DISCORD_TOKEN=your_discord_token
CLIENT_ID=your_client_id
GUILD_ID=your_guild_id
```

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/VyomXpress-backend.git
```

Move to project directory:

```bash
cd VyomXpress-backend
```

Install dependencies:

```bash
npm install
```

Create environment file:

```bash
cp .env.example .env
```

Start development server:

```bash
npm run dev
```

Start production server:

```bash
npm start
```

---

## 🗄 Database Setup

Create MySQL Database:

```sql
CREATE DATABASE vyomxpress;
```

Run application:

```bash
npm start
```

Sequelize will automatically synchronize models and create tables.

---

## 🔐 API Endpoints

### Signup

```http
POST /api/v1/auth/signup
```

Request Body:

```json
{
  "username": "kartikey",
  "email": "kartikey@gmail.com",
  "password": "Password@123"
}
```

---

### Login

```http
POST /api/v1/auth/login
```

Request Body:

```json
{
  "email": "kartikey@gmail.com",
  "password": "Password@123"
}
```

---

## 🤖 Discord Commands

### Create User

```text
/ppcreateuser
```

Creates a new user in the database.

### Create Service

```text
/ppcreateservice
```

Creates a new service record.

### Get User

```text
/ppgetuser
```

Fetches user information from the database.

---

## 📊 Logging

Application uses Winston Logger.

Generated files:

```text
logs/
├── combined.log
└── error.log
```

---

## 📖 Swagger Documentation

Available at:

```text
/api-docs
```

Provides interactive API testing and documentation.

---

## 🚀 Deployment

Backend deployed on Render.

Database hosted on Railway MySQL.

---

## 👨‍💻 Author

Kartikey Mishra

GitHub:
https://github.com/officialkartikey
