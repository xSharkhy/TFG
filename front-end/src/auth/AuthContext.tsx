import React, { createContext, useContext, useState } from 'react';
import apiClient from './apiClient';

interface User {
	id: number;
	email: string;
	// Add other user properties as needed
}

interface AuthContextValues {
	user: User | null;
	login: (email: string, password: string) => Promise<void>;
	signup: (email: string, password: string) => Promise<void>;
}

interface AuthProviderProps {
	children: React.ReactNode;
}

const noopAsync: () => Promise<void> = async () => {
	// Intentionally empty
};

const defaultAuthValues: AuthContextValues = {
	user: null,
	login: noopAsync,
	signup: noopAsync,
};

const AuthContext = createContext<AuthContextValues>(defaultAuthValues);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);

	const login = async (email: string, password: string) => {
		const response = await apiClient.post('/auth/login', { email, password });
		setUser(response.data);
	};

	const signup = async (email: string, password: string) => {
		const response = await apiClient.post('/auth/signup', { email, password });
		setUser(response.data);
	};

	// Other context functions and values

	return (
		<AuthContext.Provider value={{ user, login, signup }}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
