
````md
# auth-kit

A lightweight and flexible authentication state manager for React applications.  
Supports both **JavaScript** and **TypeScript** projects.

`auth-kit` helps you manage user state, login, logout, and token persistence without forcing any specific backend.  
You plug in your own API functions.

---

## 🚀 Features

- Simple and reusable `AuthProvider`
- Handles `user`, `token`, and persistent auth state
- Works with any backend
- Built with TypeScript but fully compatible with JavaScript
- Provides `useAuth()` hook
- Lightweight and fast
- Supports both **ESM** and **CommonJS**

---

## 📦 Installation

```bash
npm install auth-kit
````

or

```bash
yarn add auth-kit
```

---

## 🛠 Usage

`auth-kit` requires your own login and logout API functions.

### **Example**

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
| `loginApi`  | `(email, password) => Promise<{ user, token }>` | Yes      | Your login request function |
| `logoutApi` | `() => Promise<void>`                           | No       | Optional logout function    |

---

## 🧩 What auth-kit Stores

* `user` → saved in `localStorage` as `authkit-user`
* `token` → stored in browser cookies as `accessToken`

---

## 🏗 TypeScript Support

Full TypeScript definitions included:

```ts
import { AuthProvider, useAuth, type AuthKitConfig } from "auth-kit";
```

---

## 📤 Contributing

Pull requests are welcome.
Please open an issue first to discuss any changes.

---

## 📄 License

MIT License © 2025
Developed by Meheraj Hosen

```

