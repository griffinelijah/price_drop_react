import React from 'react';
import { Form, Button, Label, Header, Modal} from 'semantic-ui-react';

function EditListModal(props) {
	return (
		console.log('\nthis is props in EditListModal'),
		console.log(props),
		<Modal open={props.open} closeIcon onClose={props.closeEditModal}>
			<Header> Edit List </Header>
				<Modal.Content>
					<Form onSubmit={props.updateList}>
						<Label>Title: </Label>
						<Form.Input
							type='text'
							name='title'
							value={props.listToEdit.title || ''}
							onChange={props.handleEditChange}
						/>
						<Label>Notification Preference: </Label>
						<Form.Input
							type='text'
							name='notif_preference'
							value={props.listToEdit.notif_preference || ''}
							onChange={props.handleEditChange}
						/>
						<Modal.Actions>
							<Button color='green' type='submit'> Submit Changes</Button>
						</Modal.Actions>
					</Form>
				</Modal.Content>
			</Modal>
	)
}


export default EditListModal