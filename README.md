# ⭐ **README.md (Professional + Beginner Friendly)**

````md
# auth-kit  
A lightweight and flexible authentication state manager for React applications.  
Supports both **JavaScript** and **TypeScript** projects.

`auth-kit` helps you manage user state, login, logout, and token persistence without forcing a specific backend implementation. You can plug in your own API functions easily.

---

## 🚀 Features

- 🧩 Simple and reusable `AuthProvider`
- 🔒 Manages `user`, `token`, and persistent auth state
- 🎯 Works with any backend (Express, Nest, Laravel, etc.)
- 💡 Built with TypeScript but fully compatible with JavaScript
- 🧠 Provides `useAuth()` hook for easy access
- 📦 Lightweight and fast (powered by `tsup`)
- ✔ Supports both **ESM** and **CommonJS**

---

## 📦 Installation

```bash
npm install auth-kit
````

Or using Yarn:

```bash
yarn add auth-kit
```

---

## 🛠 Usage

`auth-kit` does NOT force you to use a specific API.
You simply pass your own login & logout functions.

### **Example (Using Axios)**

```tsx
// App.jsx / App.tsx

import { AuthProvider } from "auth-kit";
import api from "./api/axios";

const loginApi = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return {
    user: res.data.data.user,
    token: res.data.data.token,
  };
};

const logoutApi = async () => {
  await api.post("/auth/logout");
};

function App() {
  return (
    <AuthProvider
      config={{
        loginApi,
        logoutApi,
      }}
    >
      <MyApp />
    </AuthProvider>
  );
}

export default App;
```

---

## 🎣 Using `useAuth()`

```tsx
import { useAuth } from "auth-kit";

function Dashboard() {
  const { user, loading, login, logout } = useAuth();

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

| Option      | Type                                            | Required | Description                 |
| ----------- | ----------------------------------------------- | -------- | --------------------------- |
| `loginApi`  | `(email, password) => Promise<{ user, token }>` | Yes      | Your login request handler  |
| `logoutApi` | `() => Promise<void>`                           | No       | Optional logout API handler |

---

## 🧩 What `auth-kit` Stores

* `user` → saved in `localStorage` (`authkit-user`)
* `token` → saved in browser cookies as `accessToken`

This ensures:

* persistent login
* easy token sending through cookies
* predictable user state after refresh

---

## 🧪 Example Directory Structure

```
src/
 ├── App.jsx
 ├── api/
 │    └── axios.js
 └── pages/
      └── Dashboard.jsx
```

---

## 🏗 For TypeScript Users

Full type support is included:

```ts
import { AuthProvider, useAuth, type AuthKitConfig } from "auth-kit";
```

---

## 📤 Contributing

Pull requests are welcome!
If you want to contribute, please open an issue first to discuss what you want to change.

---

## 📄 License

MIT License © 2025
Developed with ❤️ by Meheraj Hosen

---

## ⭐ If you like this package

Please ⭐ the repository on GitHub to support the project!

```
