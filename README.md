# react-express-auth-kit

A lightweight, flexible authentication state manager for React applications.
Works seamlessly with **Express.js** or any REST backend.

Built with **TypeScript**, but fully compatible with **JavaScript** projects.

`react-express-auth-kit` focuses on **frontend authentication state management** — handling user state, login, logout, and persistence — without locking you into any specific backend architecture.

---

## 🚀 Features

- Simple and reusable `AuthProvider`
- Manages authentication state (`user`, `loading`)
- Built-in `login` & `logout` helpers
- Works with **any backend (Express, Nest, etc.)**
- Persistent auth state using `localStorage`
- Token handling via cookies
- Fully typed with TypeScript
- JavaScript friendly
- Lightweight and dependency-free
- Supports **ESM** and **CommonJS**

---

## 📦 Installation

```bash
npm install react-express-auth-kit
```

or

```bash
yarn add react-express-auth-kit
```

---

## 🛠 Basic Usage

Wrap your application with `AuthProvider`.

```tsx
import { AuthProvider } from "react-express-auth-kit";
import App from "./App";

export default function Root() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
```

---

## ⚙️ Configuring Routes (Optional)

By default, `react-express-auth-kit` uses:

- **Login** → `/auth/login`
- **Logout** → `/auth/logout`

You can customize them if needed:

```tsx
<AuthProvider
  config={{
    loginRoute: "http://localhost:5000/auth/login",
    logoutRoute: "http://localhost:5000/auth/logout",
  }}
>
  <App />
</AuthProvider>
```

### More config patterns

Custom logout function (useful when you need to send credentials, additional headers, or call multiple endpoints):

```tsx
<AuthProvider
  config={{
    logoutApi: async () => {
      await fetch("https://api.example.com/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
    },
  }}
>
  <App />
</AuthProvider>
```

Environment-driven config (recommended for different environments):

```tsx
const authConfig = {
  loginRoute: process.env.REACT_APP_AUTH_LOGIN,
  logoutRoute: process.env.REACT_APP_AUTH_LOGOUT,
};

<AuthProvider config={authConfig}>
  <App />
</AuthProvider>;
```

Cookies and credentials notes

- If your backend sets session cookies or uses cookie-based auth, make sure to pass `credentials: "include"` on fetch and configure CORS to allow credentials on cross-origin requests.
- Ensure `Access-Control-Allow-Credentials: true` is set on the server and the cookie has proper `SameSite` and `Secure` attributes.

---

## 🔐 Logging In

Use the `login` function from `useAuth()`.

```tsx
import { useAuth } from "react-express-auth-kit";

function LoginForm() {
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const user = await login("test@example.com", "password123");
      console.log("Logged in user:", user);
    } catch (err) {
      console.error("Login failed");
    }
  };

  return <button onClick={handleLogin}>Login</button>;
}
```

### Expected Backend Response

Your backend **must return** the following structure:

```json
{
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "JWT_TOKEN_HERE"
}
```

📌 On successful login:

- `user` → stored in `localStorage` (`authkit-user`)
- `token` → stored in cookies (`accessToken`)

---

## 🎣 Accessing Auth State

```tsx
import { useAuth } from "react-express-auth-kit";

function Dashboard() {
  const { user, loading, logout } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please login</p>;

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

---

## 🚪 Logging Out

```ts
logout();
```

What happens on logout:

- Clears `user` state
- Removes `authkit-user` from `localStorage`
- Removes `accessToken` cookie
- Optionally calls backend logout API

---

## 🔧 Custom Logout API (Optional)

```tsx
<AuthProvider
  config={{
    logoutApi: async () => {
      await fetch("/api/logout", { method: "POST" });
    },
  }}
>
  <App />
</AuthProvider>
```

---

## 🧩 What react-express-auth-kit Stores

| Data | Location       | Key Name       |
| ---- | -------------- | -------------- |
| User | localStorage   | `authkit-user` |
| JWT  | Browser Cookie | `accessToken`  |

---

## 🏗 TypeScript Support

Full TypeScript support included:

```ts
import {
  AuthProvider,
  useAuth,
  type AuthKitConfig,
} from "react-express-auth-kit";
```

---

## 🧠 What This Package Does NOT Do

- ❌ Token refresh
- ❌ Role/permission handling
- ❌ Backend authentication logic
- ❌ OAuth / Social login

> These are intentionally left to keep the package lightweight.

---

## 📤 Contributing

Pull requests are welcome.
Please open an issue first to discuss major changes.

---

## 📄 License

MIT License © 2025
Developed by **Meheraj Hosen**
