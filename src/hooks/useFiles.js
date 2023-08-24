import { useState } from 'react';

import { useAuth } from 'hooks';
import { getMyFilesApi } from 'api/files';

export function useFiles() {
	const { auth } = useAuth();

	const [loading, setLoading] = useState(false);
	const [myFiles, setMyFiles] = useState([]);

	const getMyFiles = async () => {
		try {
			setLoading(true);
			const response = await getMyFilesApi(auth.token);
			setMyFiles(response);
			setLoading(false);
			return response;
		} catch (error) {
			setLoading(false);
			throw error;
		}
	};

	return {
		loading,
		myFiles,
		getMyFiles,
	};
}
