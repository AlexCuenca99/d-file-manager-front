import React from 'react';
import { map, upperCase } from 'lodash';
import { Button, Table } from 'semantic-ui-react';
import {
	MdDeleteForever,
	MdRemoveRedEye,
	MdDownloadForOffline,
} from 'react-icons/md';

export function FilesTable(props) {
	const { files, handleShowFile, handleDeleteFile } = props;

	return (
		<Table celled striped>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>File name</Table.HeaderCell>
					<Table.HeaderCell>File type</Table.HeaderCell>
					<Table.HeaderCell></Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{map(files.results, (file, index) => (
					<Table.Row key={index}>
						<Table.Cell>{file.file_name}</Table.Cell>
						<Table.Cell>
							{upperCase(file.file_extension)}
						</Table.Cell>
						<Actions
							file={file}
							handleShowFile={handleShowFile}
							handleDeleteFile={handleDeleteFile}
						/>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
}

function Actions(props) {
	const { file, handleShowFile, handleDeleteFile } = props;

	return (
		<Table.Cell collapsing>
			<Button.Group basic size="small">
				<Button
					icon={<MdRemoveRedEye size={17} />}
					onClick={() => handleShowFile(file)}
				/>
				<Button
					icon={<MdDeleteForever size={17} />}
					onClick={() => handleDeleteFile(file)}
				/>
				<Button
					icon={<MdDownloadForOffline size={17} />}
					onClick={() => ''}
				/>
			</Button.Group>
		</Table.Cell>
	);
}
