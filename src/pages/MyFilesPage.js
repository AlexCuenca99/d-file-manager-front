import React, { useEffect, useState } from 'react';

import { useFiles } from 'hooks';
import {
	Button,
	Confirm,
	Grid,
	Header,
	Icon,
	Image,
	Input,
	List,
	Modal,
	Segment,
} from 'semantic-ui-react';

import { FilesTable } from 'components';
import {
	documentsExtension,
	imagesExtension,
	videosExtension,
} from 'utils/feeders';
import { includes } from 'lodash';
import { toast } from 'react-toastify';

export function MyFilesPage() {
	const { getMyFiles, deleteFile, loading, myFiles } = useFiles();

	const [open, setOpen] = useState(false);
	const [file, setFile] = useState(null);
	const [openConfirm, setOpenConfirm] = useState(false);
	const [confirmHeader, setConfirmHeader] = useState('');
	const [confirmContent, setConfirmContent] = useState('');
	const [refetch, setRefetch] = useState(false);

	useEffect(() => {
		getMyFiles();
	}, [refetch]);

	const handleRefetch = () => {
		setRefetch((prev) => !prev);
	};
	const handleShowFile = (file) => {
		setOpen(true);
		setFile(file);
	};

	const handleDeleteFile = (file) => {
		setConfirmHeader('Delete file');
		setConfirmContent(
			`Are you sure you want to delete ${file.file_name} file? `
		);
		setOpenConfirm(true);
		setFile(file);
	};

	const handleConfirmOperation = async () => {
		try {
			await deleteFile(file.id);
			setOpenConfirm(false);
			handleRefetch();
			toast.success('File deleted successfully');
		} catch (error) {
			setOpenConfirm(false);
			toast.error(error.cause ? error.cause.detail : error.message);
		}
	};
	return (
		<>
			<Grid columns={2}>
				<Grid.Row>
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
						<Segment>
							<Header>Upload your files</Header>
							<Input type="file" />
						</Segment>

						<FilesTable
							files={myFiles}
							handleShowFile={handleShowFile}
							handleDeleteFile={handleDeleteFile}
						/>
					</Grid.Column>
				</Grid.Row>
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
							<Image src={file?.file} size="medium" />
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
			<Confirm
				open={openConfirm}
				onCancel={() => setOpenConfirm(false)}
				onConfirm={handleConfirmOperation}
				header={confirmHeader}
				content={confirmContent}
				cancelButton={<Button content="Cancel" disabled={loading} />}
				confirmButton={<Button content="OK" loading={loading} />}
			/>
		</>
	);
}
