import { AuthLayout } from 'layouts';
import { LoginPage, Homepage } from 'pages';

const routesUser = [
	{
		path: '/',
		layout: AuthLayout,
		component: Homepage,
	},
	{
		path: '/login',
		layout: AuthLayout,
		component: LoginPage,
	},
];

export default routesUser;
