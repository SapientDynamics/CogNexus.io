'use client';

import * as React from 'react';

// Define the authentication context interface
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  checkAuth: () => Promise<boolean>;
}

// Create the authentication context
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the authentication context
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Authentication provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState<any | null>(null);

  // Function to check authentication status
  const checkAuth = async () => {
    try {
      // Dynamic import to avoid SSR issues
      const { getCurrentUser } = await import('aws-amplify/auth');
      const currentUser = await getCurrentUser();
      
      console.log('✅ User authenticated in context:', currentUser);
      setUser(currentUser);
      setIsAuthenticated(true);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.log('❌ User not authenticated in context:', error);
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      return false;
    }
  };

  // Check authentication on component mount
  React.useEffect(() => {
    checkAuth();
  }, []);

  // Provide the authentication context value
  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    user,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
