import React, { Component } from 'react';
import { Form, Button, Label, Segment} from 'semantic-ui-react';

class CreateNewItem extends Component {
	constructor(){
		super()
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
				<Form size='tiny' onSubmit={(e) => this.props.addList(e, this.state)}>
					<Label>Url: </Label>
					<Form.Input type='text' name='title' value={this.state.url} onChange={this.handleChange}/>
					<Button type='submit'>Add item</Button>
				</Form>
			</div>
		)
	}
}

export default CreateNewItem