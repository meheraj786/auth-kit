import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

export interface AuthKitConfig {
  loginRoute?: string; 
  logoutRoute?: string; 
  logoutApi?: () => Promise<void>; 
}

interface AuthContextType {
  user: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
  config,
}: {
  children: ReactNode;
  config?: AuthKitConfig;
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  const login = async (email: string, password: string) => {
    const route = config?.loginRoute || "/auth/login";

    const res = await fetch(route, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Login failed");

    const data: { user: any; token: string } = await res.json();

    setUser(data.user);
    localStorage.setItem("authkit-user", JSON.stringify(data.user));
    document.cookie = `accessToken=${data.token}; path=/; SameSite=Lax`;

    return data.user;
  };


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

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
