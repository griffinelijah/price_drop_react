import React, { Component } from 'react';
import { Modal, Form, Button, Label, Segment} from 'semantic-ui-react';

class CreateNewItem extends Component {
	constructor(props){
		super(props)
		this.state = {
			url: '',
			item: ''
		}
	}

	handleChange = (e) => {
		this.setState({[e.currentTarget.name]: e.currentTarget.value})
	}

	render() {
		return(
			<div className='listForm'>
			<h1>Create new item</h1>
				<Modal
					open={this.props.open}
					closeIcon
					onClose={this.props.closeCreateItemModal}>
					<Form size='tiny' onSubmit={(e) => this.props.addItem(e, this.state)}>
						<Label>Url: </Label>
						<Form.Input type='text' name='url' value={this.state.url} onChange={this.handleChange}/>
						<Button type='submit'>Add item</Button>
					</Form>
				</Modal>
			</div>
		)
	}
}

export default CreateNewItem