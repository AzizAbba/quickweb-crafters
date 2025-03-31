
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import type { User, UserWithPassword } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin user credentials
const adminUser: UserWithPassword = {
  id: "admin-id",
  username: "admin",
  password: "admin123",
  email: "admin@quickweb.com",
  role: "admin",
  active: true,
};

// Sample users array to simulate a database - now properly typed to accept both user roles
const initialUsers: UserWithPassword[] = [adminUser];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<UserWithPassword[]>(initialUsers);
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
    
    // Load saved users
    const storedUsers = localStorage.getItem("quickweb_users");
    if (storedUsers) {
      try {
        setUsers(JSON.parse(storedUsers));
      } catch (error) {
        console.error("Failed to parse stored users", error);
      }
    } else {
      localStorage.setItem("quickweb_users", JSON.stringify(initialUsers));
    }
    
    setLoading(false);
  }, []);

  // Save users to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("quickweb_users", JSON.stringify(users));
  }, [users]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      // Check if user is active
      if (foundUser.active === false) {
        toast.error("Account has been deactivated. Please contact support.");
        return false;
      }
      
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("quickweb_user", JSON.stringify(userWithoutPassword));
      
      toast.success(`Welcome back, ${foundUser.username}!`);
      return true;
    }

    toast.error("Invalid email or password");
    return false;
  };

  const signup = async (username: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check if user already exists
    if (users.some((u) => u.email === email)) {
      toast.error("An account with this email already exists");
      return false;
    }

    const newUser: UserWithPassword = {
      id: `user-${Date.now()}`,
      username,
      email,
      password,
      role: "user",
      active: true,
    };

    // Add user to "database"
    setUsers((prev) => [...prev, newUser]);

    // Log in the new user
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("quickweb_user", JSON.stringify(userWithoutPassword));
    
    toast.success("Account created successfully!");
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
