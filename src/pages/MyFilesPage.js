import React, { useEffect, useState } from 'react';

import { useFiles } from 'hooks';
import { Button, Grid, Header, Image, List, Modal } from 'semantic-ui-react';

import { FilesTable } from 'components';
import {
	documentsExtension,
	imagesExtension,
	videosExtension,
} from 'utils/feeders';
import { includes } from 'lodash';

export function MyFilesPage() {
	const { getMyFiles, loading, myFiles } = useFiles();

	const [open, setOpen] = useState(false);
	const [file, setFile] = useState(null);

	useEffect(() => {
		getMyFiles();
	}, []);

	const handleShowFile = (file) => {
		setOpen(true);
		setFile(file);
	};

	return (
		<>
			<Grid>
				<Grid.Column width="4">
					<List>
						<List.Item>
							<List.Icon name="folder" />
							<List.Content>
								<List.Header>src</List.Header>
								<List.Description>
									Source files for project
								</List.Description>
							</List.Content>
						</List.Item>
					</List>
				</Grid.Column>
				<Grid.Column stretched width={12}>
					<FilesTable
						files={myFiles}
						handleShowFile={handleShowFile}
					/>
				</Grid.Column>
			</Grid>
			<Modal
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				open={open}
				closeOnDimmerClick
			>
				<Modal.Header>{file?.file_name}</Modal.Header>
				<Modal.Content image>
					<Modal.Description>
						{includes(imagesExtension, file?.file_extension) ? (
							<Image src={file?.file} />
						) : includes(videosExtension, file?.file_extension) ? (
							<video
								src={file.file}
								controls
								width={860}
								height={500}
							/>
						) : includes(
								documentsExtension,
								file?.file_extension
						  ) ? (
							<iframe
								src={file?.file}
								width={860}
								height={500}
								title={file?.file_name}
							></iframe>
						) : (
							<pre>{file?.file}</pre>
						)}
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<Button
						content="Close"
						labelPosition="right"
						icon="checkmark"
						onClick={() => setOpen(false)}
						positive
					/>
				</Modal.Actions>
			</Modal>
		</>
	);
}
