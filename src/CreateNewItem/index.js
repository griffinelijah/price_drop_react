import React, { Component } from 'react';
import { Modal, Form, Button, Label, Segment, Loader} from 'semantic-ui-react';

class CreateNewItem extends Component {
	constructor(props){
		// console.log(props)
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
				<Modal
					open={this.props.open}
					closeIcon
					onClose={this.props.closeCreateItemModal}>
					<div className='createItemDiv'>
						<h1>Add an item</h1>
							{
								this.props.isLoading === true
								?
								  <div class="ui active dimmer">
								    <div class="ui large text loader">Getting Your Items!</div>
								  </div>
								:
								null
							}
						<Form size='tiny' onSubmit={(e) => this.props.addItem(e, this.state)}>
							<Label>Url: </Label>
							<Form.Input type='text' name='url' value={this.state.url} onChange={this.handleChange}/>
							<Button color='green'type='submit'>Add item</Button>
						</Form>
					</div>
				</Modal>
			</div>
		)
	}
}

export default CreateNewItem