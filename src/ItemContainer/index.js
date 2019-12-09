import React, { Component } from 'react';
import { Button, Header, Icon, Image } from 'semantic-ui-react'
import ItemList from '../ItemList'
import CreateNewItem from '../CreateNewItem'


class ItemContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			items: []
		}
	}

	componentDidMount(){
		this.getItems();
	}

	//this will make a fetch call to retrive items belonging to our lists
	getItems = async () => {
		const items = await fetch(process.env.REACT_APP_API_URL + '/api/v1/items/', 
		{
			credentials: 'include'
		})
		//parsing all found items
		const parsedItems = await items.json()
		//set state to include found items
		this.setState({
			items: [...this.state.comments, parsedItems.data]
		})
	}

	//this will elt us create a new item
	addItem = async (e, itemFromForm) => {
		//prevent default page refresh when submitting form
		e.preventDefault();
		try {
			//this will hit the create item route the list that hte item is being added to
			const createdItemRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/items/' + this.props.listId, 
			{
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(itemFromForm),
				headers:{
					'Content-Type': 'application/json'
				}
			})
			const parsedItemRes = createdItemRes.json();
			this.setState({items: [...this.state.items, parsedItemRes.data]})
		} catch(err) {
			console.log(err);
		}
	}
	render(){
		return(
			<React.Fragment>
				<ItemList
					items={this.state.items}
				/>
				<CreateNewItem
					addItem={this.addItem}
				/>
			</React.Fragment>
		)
	}
}

export default ItemContainer













