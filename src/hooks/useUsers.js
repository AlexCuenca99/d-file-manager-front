import { useState } from 'react';
import { jwtCreateApi, getMeApi } from 'api/users';

export function useUser() {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);

	const jwtCreate = async (formValue) => {
		try {
			setLoading(true);
			const response = await jwtCreateApi(formValue);
			setUser(response);
			setLoading(false);
			return response;
		} catch (error) {
			setLoading(false);
			throw error;
		}
	};

	const getMe = async (token) => {
		try {
			setLoading(true);
			const response = await getMeApi(token);
			setLoading(false);
			return response;
		} catch (error) {
			throw error;
		}
	};
	return {
		loading,
		user,
		jwtCreate,
		getMe,
	};
}
