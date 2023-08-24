import React from 'react';
import { map, upperCase } from 'lodash';
import { Button, Table } from 'semantic-ui-react';
import {
	MdDeleteForever,
	MdRemoveRedEye,
	MdDownloadForOffline,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export function FilesTable(props) {
	const { files, handleShowFile } = props;

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
						<Actions file={file} handleShowFile={handleShowFile} />
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
}

function Actions(props) {
	const { file, handleShowFile } = props;
	const navigate = useNavigate();

	return (
		<Table.Cell collapsing>
			<Button.Group basic size="small">
				<Button
					icon={<MdRemoveRedEye size={17} />}
					onClick={() => handleShowFile(file)}
				/>
				<Button icon={<MdDeleteForever size={17} />} />
				<Button
					icon={<MdDownloadForOffline size={17} />}
					onClick={() => navigate(`${file.file}`)}
				/>
			</Button.Group>
		</Table.Cell>
	);
}
