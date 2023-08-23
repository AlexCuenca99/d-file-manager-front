import React, { useEffect, useState } from 'react';
import { map } from 'lodash';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Dropdown, Image, Menu as MenuSemantic } from 'semantic-ui-react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BiBadge, BiHappyBeaming, BiSolidDashboard } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import { LoginPage } from 'pages';
import { useAuth } from 'hooks';

import './AuthLayout.scss';

const sidebarOptions = [
	{
		key: 'dashboard',
		text: 'Dashboard',
		icon: <BiSolidDashboard />,
		path: '',
	},
	{
		key: 'menuitem1',
		text: 'Menu item 1',
		icon: <BiBadge />,
		path: '/path-1',
	},
	{
		key: 'menuitem2',
		text: 'Menu item 2',
		icon: <BiBadge />,
		path: '/path-2',
	},
];

export function AuthLayout(props) {
	const { children } = props;

	const { auth, logout } = useAuth();

	const [trigger, setTrigger] = useState(null);
	const [options, setOptions] = useState([]);
	const [collapsed, setCollapsed] = useState(false);
	const [toggled, setToggled] = useState(false);
	const [broken, setBroken] = useState(false);

	const handleCollapse = () => {
		setCollapsed((prev) => !prev);
	};

	const handleToggle = () => {
		setToggled((prev) => !prev);
	};

	useEffect(() => {
		const trigger = (
			<span>
				<Image avatar src={auth.me.photo} alt={auth.me.first_name} />
				Hello, {auth.me.first_name}
			</span>
		);

		const options = [
			{
				key: 'user',
				text: (
					<span>
						Signed in as{' '}
						<strong>{`${auth.me.first_name} ${auth.me.last_name}`}</strong>
					</span>
				),
				disabled: true,
			},
			{ key: 'profile', text: 'Your Profile' },
			{ key: 'settings', text: 'Settings' },
			{
				key: 'sign-out',
				text: 'Sign Out',
				onClick: () => {
					logout();
				},
			},
		];

		setOptions(options);
		setTrigger(trigger);
	}, []);

	if (!auth) return <LoginPage />;

	return (
		<div className="auth-layout">
			<Sidebar
				className="auth-layout__sidebar"
				collapsed={collapsed}
				toggled={toggled}
				breakPoint="md"
				transitionDuration={500}
				onBackdropClick={handleToggle}
				onBreakPoint={setBroken}
				backgroundColor="rgb(255, 255, 255, 0.9)"
			>
				<Menu>
					<MenuItem
						icon={<BiHappyBeaming />}
						onClick={handleCollapse}
						style={{ fontWeight: 'bold', fontSize: '1.5rem' }}
					>
						Initial template
					</MenuItem>
					{map(sidebarOptions, (option, _) => (
						<MenuItem
							component={<Link />}
							to={option.path}
							key={option.key}
							icon={option.icon}
						>
							{option.text}
						</MenuItem>
					))}
				</Menu>
			</Sidebar>
			<div className="auth-layout__content-container">
				<MenuSemantic attached="top">
					{broken && (
						<MenuSemantic.Item>
							<GiHamburgerMenu onClick={handleToggle} />
						</MenuSemantic.Item>
					)}

					<MenuSemantic.Menu position="right">
						<MenuSemantic.Item>
							<Dropdown trigger={trigger} options={options} />
						</MenuSemantic.Item>
					</MenuSemantic.Menu>
				</MenuSemantic>

				<div className="auth-layout__content-container__main">
					{children}
				</div>
			</div>
		</div>
	);
}
