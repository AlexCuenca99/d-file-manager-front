import { AuthLayout } from 'layouts';
import { LoginPage, Homepage, MyFilesPage } from 'pages';

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
	{
		path: '/my-files',
		layout: AuthLayout,
		component: MyFilesPage,
	},
];

export default routesUser;
