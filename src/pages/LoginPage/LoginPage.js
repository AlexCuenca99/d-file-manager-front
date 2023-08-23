import React from 'react';

import { LoginForm } from 'components';

import './LoginPage.scss';

export function LoginPage() {
	return (
		<div className="login">
			<div className="login__content">
				<h1>Login Form</h1>
				<LoginForm />
			</div>
		</div>
	);
}
