import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './misc/reportWebVitals';

import App from './components/App';

import './css/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

reportWebVitals();
