import React, { Component } from 'react';
import { Form, Button, Label, Segment, Modal} from 'semantic-ui-react';

class CreateList extends Component {
	constructor(props){
		super(props)
		this.state = {
			user: '',
			title: '',
			notif_preference: ''
		}
	}

	handleChange = (e) => {
		this.setState({[e.currentTarget.name]: e.currentTarget.value})
	}

//jchange modal back to form, have button hide and show form based on value in state
	render() {
		console.log('\nthis is props in CreateList m8');
		console.log(this.props);
		return(
			<div className='listForm'>
				<Modal
					open={this.props.open}
					closeIcon
					onClose={this.props.closeCreateListModal}
					>
					<h1>Create New list</h1>
						<Form size='tiny' onSubmit={(e) => this.props.addList(e, this.state)}>
							<Label>Title: </Label>
							<Form.Input type='text' name='title' value={this.state.title} onChange={this.handleChange}/>
							<Label>Notification Preference: </Label>
							<Form.Input type='text' name='notif_preference' value={this.state.notif_preference} onChange={this.handleChange}/>
							<Button type='submit'>Create List</Button>
						</Form>
				</Modal>
			</div>
		)
	}
}

export default CreateList	