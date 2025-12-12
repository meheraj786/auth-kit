import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

// Config interface
export interface AuthKitConfig {
  loginRoute?: string; // internal login route, default "/auth/login"
  logoutRoute?: string; // internal logout route, default "/auth/logout"
  logoutApi?: () => Promise<void>; // optional custom logout
}

// Context type
interface AuthContextType {
  user: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | null>(null);

// AuthProvider component
export const AuthProvider = ({
  children,
  config,
}: {
  children: ReactNode;
  config?: AuthKitConfig;
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("authkit-user");
      if (storedUser) setUser(JSON.parse(storedUser));
    } catch (err) {
      console.error("AuthKit parse error:", err);
      localStorage.removeItem("authkit-user");
    } finally {
      setLoading(false);
    }
  }, []);

  // Login function (internal fetch)
  const login = async (email: string, password: string) => {
    const route = config?.loginRoute || "/auth/login";

    const res = await fetch(route, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Login failed");

    const data: { user: any; token: string } = await res.json();

    // Save user & token
    setUser(data.user);
    localStorage.setItem("authkit-user", JSON.stringify(data.user));
    document.cookie = `accessToken=${data.token}; path=/; SameSite=Lax`;

    return data.user;
  };

  // Logout function
  const logout = async () => {
    if (config?.logoutApi) {
      try {
        await config.logoutApi();
      } catch {}
    } else if (config?.logoutRoute) {
      try {
        await fetch(config.logoutRoute, { method: "POST" });
      } catch {}
    }

    setUser(null);
    localStorage.removeItem("authkit-user");
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth hook
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
