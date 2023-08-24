import { useState } from 'react';

import { useAuth } from 'hooks';
import { getMyFilesApi, deleteFileApi } from 'api/files';

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

	const deleteFile = async (fileId) => {
		try {
			setLoading(true);
			await deleteFileApi(auth.token, fileId);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			throw error;
		}
	};
	return {
		loading,
		myFiles,

		getMyFiles,
		deleteFile,
	};
}
