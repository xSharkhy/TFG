import { createRoot } from 'react-dom/client';
import App from './App';
import React from 'react';
import './index.css';

const element = document.getElementById('root') as HTMLElement;
const root = createRoot(element);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>);
