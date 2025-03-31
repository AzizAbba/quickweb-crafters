
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  username: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin user credentials
const adminUser = {
  id: "admin-id",
  username: "admin",
  password: "admin123",
  email: "admin@quickweb.com",
  role: "admin" as const,
};

// Sample users array to simulate a database
const initialUsers = [adminUser];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState(initialUsers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for authentication
    const storedUser = localStorage.getItem("quickweb_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse stored user", error);
        localStorage.removeItem("quickweb_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("quickweb_user", JSON.stringify(userWithoutPassword));
      return true;
    }

    return false;
  };

  const signup = async (username: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check if user already exists
    if (users.some((u) => u.email === email)) {
      return false;
    }

    const newUser = {
      id: `user-${Date.now()}`,
      username,
      email,
      password,
      role: "user" as const,
    };

    // Add user to "database"
    setUsers((prev) => [...prev, newUser]);

    // Log in the new user
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("quickweb_user", JSON.stringify(userWithoutPassword));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("quickweb_user");
    toast.success("You have been logged out");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
