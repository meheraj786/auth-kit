import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

export interface AuthKitConfig {
  loginApi: (email: string, password: string) => Promise<{
    user: any;
    token: string;
  }>;
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
  config: AuthKitConfig;
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("authkit-user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("AuthKit parse error:", error);
      localStorage.removeItem("authkit-user");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await config.loginApi(email, password);

    setUser(res.user);
    localStorage.setItem("authkit-user", JSON.stringify(res.user));

    document.cookie = `accessToken=${res.token}; path=/; SameSite=Lax`;

    return res.user;
  };

  const logout = async () => {
    if (config.logoutApi) {
      try {
        await config.logoutApi();
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
