import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";
import { addClient } from '@/services/clientService';

// Define user type
export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  profession?: string;
}

// Define context type
interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

// Mock user database (for demo purposes)
const mockUsers: User[] = [
  {
    _id: '1',
    name: 'Test User',
    email: 'test@example.com',
    phone: '1234567890',
    address: '123 Test St',
    profession: 'Developer'
  }
];

// Generate a simple JWT-like token (for demo purposes)
const generateToken = (userId: string): string => {
  return `mock-jwt-token-${userId}-${Date.now()}`;
};

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  updateProfile: async () => {},
});

// Define provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Export the Auth Provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast: uiToast } = useToast();
  
  // Check if user is authenticated on mount
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      
      try {
        // For demo purposes, we'll simulate token verification
        // In a real app, this would be a fetch request to your backend
        setTimeout(() => {
          const tokenParts = token.split('-');
          const userId = tokenParts[2];
          
          const foundUser = mockUsers.find(u => u._id === userId);
          if (foundUser) {
            setUser(foundUser);
          } else {
            // Try to find a user from localStorage if available
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
              setUser(JSON.parse(storedUser));
            } else {
              localStorage.removeItem('token');
              setToken(null);
            }
          }
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error verifying token:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setIsLoading(false);
      }
    };
    
    verifyToken();
  }, [token]);
  
  // Add user to clients list
  const addUserToClients = async (user: User) => {
    try {
      await addClient({
        name: user.name,
        email: user.email,
        phone: user.phone,
        company: user.profession,
      });
    } catch (error) {
      console.error('Error adding user to clients:', error);
    }
  };
  
  // Login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simulating an API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user by email (in a real app, this would be a backend request)
      const foundUser = mockUsers.find(u => u.email === email);
      const storedUsers = localStorage.getItem('users');
      const parsedUsers = storedUsers ? JSON.parse(storedUsers) : [];
      const registeredUser = parsedUsers.find((u: User) => u.email === email);
      
      if (foundUser || registeredUser) {
        const userToUse = foundUser || registeredUser;
        const newToken = generateToken(userToUse._id);
        
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userToUse));
        
        setToken(newToken);
        setUser(userToUse);
        
        // Add the logged-in user to clients list
        await addUserToClients(userToUse);
        
        uiToast({
          title: "Login successful",
          description: "Welcome back!",
        });
        
        toast.success("Login successful! Welcome back!");
        navigate('/profile');
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      if (error instanceof Error) {
        uiToast({
          variant: "destructive",
          title: "Login failed",
          description: error.message,
        });
        toast.error(`Login failed: ${error.message}`);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Signup function
  const signup = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simulating an API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const storedUsers = localStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      if (users.some((u: User) => u.email === email)) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user
      const newUser: User = {
        _id: `user-${Date.now()}`,
        name,
        email,
      };
      
      // Save user to "database" (localStorage in this case)
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Generate token
      const newToken = generateToken(newUser._id);
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      setToken(newToken);
      setUser(newUser);
      
      // Add the new user to clients list
      await addUserToClients(newUser);
      
      uiToast({
        title: "Registration successful",
        description: "Your account has been created!",
      });
      
      toast.success("Registration successful! Your account has been created!");
      navigate('/profile');
    } catch (error) {
      if (error instanceof Error) {
        uiToast({
          variant: "destructive",
          title: "Registration failed",
          description: error.message,
        });
        toast.error(`Registration failed: ${error.message}`);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update profile function
  const updateProfile = async (userData: Partial<User>) => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      // Simulating an API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user in localStorage
      const updatedUser = { ...user, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Also update in "users" collection if exists
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        const updatedUsers = users.map((u: User) => 
          u._id === user._id ? { ...u, ...userData } : u
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));
      }
      
      setUser(updatedUser);
      
      // Update user information in clients list
      await addUserToClients(updatedUser);
      
      uiToast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
      
      toast.success("Your profile has been updated successfully!");
    } catch (error) {
      if (error instanceof Error) {
        uiToast({
          variant: "destructive",
          title: "Update failed",
          description: error.message,
        });
        toast.error(`Profile update failed: ${error.message}`);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    
    uiToast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    
    toast.info("You have been logged out successfully.");
    navigate('/login');
  };
  
  const value = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    updateProfile
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
