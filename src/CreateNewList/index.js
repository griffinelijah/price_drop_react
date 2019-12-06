import React, { Component } from 'react';
import { Form, Button, Label, Segment} from 'semantic-ui-react';

class CreateList extends Component {
	constructor(){
		super()
		this.state = {
			user: '',
			title: '',
			notif_preference: ''
		}
	}

	handleChange = (e) => {
		this.setState({[e.currentTarget.name]: e.currentTarget.value})
	}

	render() {
		return(
			<div className='listForm'>
			<h1>Create new list</h1>
				<Form size='tiny' onSubmit={(e) => this.props.addList(e, this.state)}>
					<Label>Title: </Label>
					<Form.Input type='text' name='title' value={this.state.title} onChange={this.handleChange}/>
					<Label>Notification Preference: </Label>
					<Form.Input type='text' name='notif_preference' value={this.state.notif_preference} onChange={this.handleChange}/>
					<Button type='submit'>Create List</Button>
				</Form>
			</div>
		)
	}
}

export default CreateList	