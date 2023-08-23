import React, { useEffect } from 'react';

export function Error404Page() {
	useEffect(() => {
		document.title = 'Page not found';
	}, []);

	return (
		<div>
			<h1>Error404</h1>
		</div>
	);
}
