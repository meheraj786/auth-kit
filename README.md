# react-express-auth-kit

A lightweight and flexible authentication state manager for React applications.  
Supports both **JavaScript** and **TypeScript** projects.

`react-express-auth-kit` helps you manage user state, login, logout, and token persistence without forcing any specific backend.  
Login is handled internally by default routes, but you can customize routes if needed.

---

## 🚀 Features

- Simple and reusable `AuthProvider`
- Handles `user`, `token`, and persistent auth state
- Works with any backend
- Built with TypeScript but fully compatible with JavaScript
- Provides `useAuth()` hook
- Internal login/logout with default routes (`/auth/login` and `/auth/logout`)
- Optional `logoutApi` for custom logout
- Lightweight and fast
- Supports both **ESM** and **CommonJS**

---

## 📦 Installation

```bash
npm install react-express-auth-kit
````

or

```bash
yarn add react-express-auth-kit
```

---

## 🛠 Usage

`react-express-auth-kit` handles login internally via default routes. You can optionally configure routes or a custom logout function.

### Example with default internal login/logout

```tsx
import { AuthProvider, useAuth } from "react-express-auth-kit";
import MyApp from "./MyApp";

function App() {
  return (
    <AuthProvider>
      <MyApp />
    </AuthProvider>
  );
}

export default App;
```

---

## 🎯 Logging in

Use the `login` function from `useAuth()` hook to log in a user with email and password:

```tsx
import { useAuth } from "react-express-auth-kit";

function LoginForm() {
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const user = await login("test@example.com", "password123");
      console.log("Logged in user:", user);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
```

* The `login` function internally calls the route specified by `loginRoute` (default `/auth/login`).
* On success, `user` is stored in `localStorage` (`authkit-user`) and token in cookies (`accessToken`).

---

## 🎣 Using `useAuth()` for user state & logout

```tsx
import { useAuth } from "react-express-auth-kit";

function Dashboard() {
  const { user, loading, logout } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome {user?.name}</h2>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}
```

---

## ⚙️ Config Options

| Option        | Type                  | Required | Description                                             |
| ------------- | --------------------- | -------- | ------------------------------------------------------- |
| `loginRoute`  | `string`              | No       | Optional internal login route (default `/auth/login`)   |
| `logoutRoute` | `string`              | No       | Optional internal logout route (default `/auth/logout`) |
| `logoutApi`   | `() => Promise<void>` | No       | Optional custom logout function                         |

---

## 🧩 What react-express-auth-kit Stores

* `user` → saved in `localStorage` as `authkit-user`
* `token` → stored in browser cookies as `accessToken`

---

## 🏗 TypeScript Support

Full TypeScript definitions included:

```ts
import { AuthProvider, useAuth, type AuthKitConfig } from "react-express-auth-kit";
```

---

## 📤 Contributing

Pull requests are welcome.
Please open an issue first to discuss any changes.

---

## 📄 License

MIT License © 2025
Developed by Meheraj Hosen

