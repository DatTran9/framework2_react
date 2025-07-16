import { createContext, useContext, useState, type ReactNode } from "react";

export type Role = "admin" | "user";

export interface User {
  email: string;
  password: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string, role: Role) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const initiaUsers: User[] = [
  { email: "admin@gmail.com", password: "admin123", role: "admin" },
  { email: "user@gmail.com", password: "user123", role: "user" },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>(initiaUsers);
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, password: string): boolean => {
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      setUser(found);
      localStorage.setItem("user", JSON.stringify(found));
      return true;
    }
    return false;
  };

  const register = (email: string, password: string, role: Role): boolean => {
    const exists = users.some((u) => u.email === email);
    if (exists) {
      return false;
    }
    const newUser = { email, password, role };
    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
