import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { login } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await login(email, password);
			// Redirect to the main page or show a success message
		} catch (error) {
			// Show an error message
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col">
			<label htmlFor="email" className="mb-2">
				Email
			</label>
			<input
				type="email"
				id="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="border-2 border-gray-300 p-2 mb-4"
			/>
			<label htmlFor="password" className="mb-2">
				Password
			</label>
			<input
				type="password"
				id="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className="border-2 border-gray-300 p-2 mb-4"
			/>
			<button type="submit" className="bg-blue-500 text-white p-2">
				Login
			</button>
		</form>
	);
};

export default LoginForm;
