import { merge, omit } from 'lodash';

import { BASE_API } from 'utils/constants';

export async function getMyFilesApi(token) {
	try {
		const url = `${BASE_API}/api/v1/my-files/`;
		const params = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const response = await fetch(url, params);

		if (!response.ok) {
			const result = await response.json();
			// Merge entites in results object
			// Remove errors from original object
			const errorValues = omit(merge(result, result.errors), ['errors']);
			throw new Error('Error in request', { cause: errorValues });
		}
		const result = await response.json();

		return result;
	} catch (error) {
		throw error;
	}
}

export async function deleteFileApi(token, fileId) {
	try {
		const url = `${BASE_API}/api/v1/files/${fileId}/`;
		const params = {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const response = await fetch(url, params);

		if (!response.ok) {
			const result = await response.json();
			// Merge entites in results object
			// Remove errors from original object
			const errorValues = omit(merge(result, result.errors), ['errors']);
			throw new Error('Error in request', { cause: errorValues });
		}
		const result = await response.json();

		return result;
	} catch (error) {
		throw error;
	}
}
