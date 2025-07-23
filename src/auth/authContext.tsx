import { createContext, useContext, useState, type ReactNode } from "react";
import axios from "axios";

export type Role = "admin" | "user";

export interface User {
  id?: number;
  email: string;
  password: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  register: (email: string, password: string, role: Role) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (
    email: string,
    password: string
  ): Promise<User | null> => {
    try {
      const res = await axios.get<User[]>(
        `http://localhost:3001/users?email=${email}&password=${password}`
      );
      if (res.data.length > 0) {
        const loggedInUser = res.data[0];
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        return loggedInUser;
      }
      return null;
    } catch (error) {
      console.error("Failed login: ", error);
      return null;
    }
  };

  const register = async (
    email: string,
    password: string,
    role: Role
  ): Promise<boolean> => {
    try {
      const checkEmail = await axios.get<User[]>(
        `http://localhost:3001/users?email=${email}`
      );
      if (checkEmail.data.length > 0) {
        return false;
      }
      const newUser: User = { email, password, role };
      const res = await axios.post("http://localhost:3001/users", newUser);
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      return true;
    } catch (error) {
      console.error("Register error: ", error);
      return false;
    }
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
