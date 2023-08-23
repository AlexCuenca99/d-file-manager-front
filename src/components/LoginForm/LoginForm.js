import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Button, Form } from 'semantic-ui-react';

import { useUser, useAuth } from 'hooks';
import './LoginForm.scss';

export function LoginForm() {
	const { login } = useAuth();
	const { jwtCreate } = useUser();

	const formik = useFormik({
		validateOnBlur: true,
		validateOnMount: true,
		validateOnChange: false,

		initialValues: initialValues(),
		validationSchema: Yup.object(validationSchema()),
		onSubmit: async (formValue) => {
			try {
				const response = await jwtCreate(formValue);
				const { access } = response;
				login(access);
			} catch (error) {
				toast.error(error.cause.detail);
			}
		},
	});

	return (
		<Form className="login-form" onSubmit={formik.handleSubmit}>
			<Form.Input
				label="Email"
				placeholder="Email"
				name="email"
				type="email"
				value={formik.values.email}
				error={formik.touched.email && formik.errors.email}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				disabled={formik.isSubmitting}
			/>
			<Form.Input
				label="Password"
				placeholder="Password"
				name="password"
				type="password"
				value={formik.values.password}
				error={formik.touched.password && formik.errors.password}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				disabled={formik.isSubmitting}
			/>
			<Button primary type="submit" loading={formik.isSubmitting}>
				Submit
			</Button>
		</Form>
	);
}

function initialValues() {
	return {
		email: '',
		password: '',
	};
}

function validationSchema() {
	return {
		email: Yup.string().email(true).required(true),
		password: Yup.string().required(true),
	};
}
