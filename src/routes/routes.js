import routerUser from './routes.user';
import { Error404Page } from 'pages';
import { BasicLayout } from 'layouts';

const routes = [
	...routerUser,
	{ path: '*', layout: BasicLayout, component: Error404Page },
];

export default routes;
