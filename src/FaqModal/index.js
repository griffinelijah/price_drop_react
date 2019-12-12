import React from 'react';
import { Form, Button, Label, Header, Modal} from 'semantic-ui-react';

function FaqModal(props) {
	return (
		<Modal open={props.open} closeIcon onClose={props.closeFaqModal}>
			<Header> FAQ </Header>
				<Modal.Content>
				</Modal.Content>
			</Modal>
	)
}


export default FaqModal