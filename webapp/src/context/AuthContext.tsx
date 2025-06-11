import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginFormData, RegisterFormData } from '../types/Auth';
import { loadFromStorage, saveToStorage, removeFromStorage } from '../utils/localStorage';

interface AuthContextType {
  state: AuthState;
  login: (data: LoginFormData) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGOUT' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check for stored user on app load
    const storedUser = loadFromStorage<User | null>('user', null);
    if (storedUser) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: storedUser });
    }
  }, []);

  const login = async (data: LoginFormData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check stored users
      const users = loadFromStorage<any[]>('users', []);
      const user = users.find(u => u.email === data.email && u.password === data.password);

      if (!user) {
        throw new Error('Invalid email or password');
      }

      const authUser: User = {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      };

      saveToStorage('user', authUser);
      dispatch({ type: 'LOGIN_SUCCESS', payload: authUser });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Login failed' });
    }
  };

  const register = async (data: RegisterFormData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (data.password !== data.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Check if user already exists
      const users = loadFromStorage<any[]>('users', []);
      const existingUser = users.find(u => u.email === data.email);

      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      const newUser = {
        id: crypto.randomUUID(),
        name: data.name,
        email: data.email,
        password: data.password, // In real app, this would be hashed
        createdAt: new Date(),
      };

      users.push(newUser);
      saveToStorage('users', users);

      const authUser: User = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        createdAt: newUser.createdAt,
      };

      saveToStorage('user', authUser);
      dispatch({ type: 'LOGIN_SUCCESS', payload: authUser });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Registration failed' });
    }
  };

  const logout = () => {
    removeFromStorage('user');
    dispatch({ type: 'LOGOUT' });
  };

  const value: AuthContextType = {
    state,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}