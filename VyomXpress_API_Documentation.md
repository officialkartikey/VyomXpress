# VyomExpress — Authentication API

**Base URL:**  
https://vyomxpress-vqej.onrender.com/api/v1/auth

This folder contains the authentication endpoints for the VyomExpress API, covering user registration and login.

---

# Endpoints

## 🔐 1. Signup

**Method:** `POST`  
**Endpoint:** `/signup`  
**Full URL:**  
`https://vyomxpress-vqej.onrender.com/api/v1/auth/signup`

### Headers

| Key | Value |
|------|--------|
| Content-Type | application/json |

### Request Body

```json
{
  "username": "kkk",
  "email": "kartike@gmail.com",
  "password": "Password@123"
}
```

### Parameters

| Parameter | Type | Required | Description |
|------------|--------|----------|-------------|
| username | string | ✅ Yes | Desired username for the new account |
| email | string | ✅ Yes | User's email address |
| password | string | ✅ Yes | Account password (must meet complexity requirements) |

---

## 🔑 2. Login

**Method:** `POST`  
**Endpoint:** `/login`  
**Full URL:**  
`https://vyomxpress-vqej.onrender.com/api/v1/auth/login`

### Headers

| Key | Value |
|------|--------|
| Content-Type | application/json |

### Request Body

```json
{
  "email": "kartike@gmail.com",
  "password": "Password@123"
}
```

### Parameters

| Parameter | Type | Required | Description |
|------------|--------|----------|-------------|
| email | string | ✅ Yes | Registered email address of the user |
| password | string | ✅ Yes | User's account password |

---

# Notes

- All requests must include `Content-Type: application/json` in the headers.
- The login endpoint returns a JWT access token upon successful authentication.
- Use the JWT token as a Bearer Token for protected routes.
- Passwords should follow strong password conventions (uppercase, lowercase, number, special character).

---

# Collection Information

**Collection:** API documentation  
**Folder:** vyomexpress  
**Workspace:** Kartikey Mishra's Workspace

---

# Live Deployment

https://vyomxpress-vqej.onrender.com
