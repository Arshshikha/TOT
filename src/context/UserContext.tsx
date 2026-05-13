import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStoredToken, removeToken, setUnauthorizedHandler } from '../api/client';
import type { AuthUser } from '../api/types';

const USER_STORAGE_KEY = 'auth_user';

interface UserContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuthUser: (user: AuthUser) => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function restore() {
      try {
        const [token, stored] = await Promise.all([
          getStoredToken(),
          AsyncStorage.getItem(USER_STORAGE_KEY),
        ]);
        if (token && stored) {
          setUser(JSON.parse(stored));
        }
      } catch {
        // silently ignore storage errors on startup
      } finally {
        setIsLoading(false);
      }
    }
    restore();
  }, []);

  const logout = useCallback(async () => {
    await Promise.all([removeToken(), AsyncStorage.removeItem(USER_STORAGE_KEY)]);
    setUser(null);
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(logout);
  }, [logout]);

  const setAuthUser = useCallback(async (authUser: AuthUser) => {
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(authUser));
    setUser(authUser);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        setAuthUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
