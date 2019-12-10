import React, { Component } from 'react';
import { List, Image, Button } from 'semantic-ui-react'
//pasas the list id into this
//make it a class
//make fetch call fo the lists here by the list id

class ItemList extends Component {
	constructor(props){
		super(props)
			// this.state = {
			// 	items: this.props.items
			// }
	}
	componentDidMount(){

	}
	


	render() {
		this.props.getItems(this.props.listId);

		const items = this.props.items.map((item) => {
			// console.log('this is item inside of item map in ItemList');
			// console.log(typeof item)
			// console.log(item)
			return(
				<List key={item.id} celled>
				  <List.Item >
			      <Image avatar src={item.image} />
				      <List.Content>
					        <List.Header>{item.name}</List.Header>
										<span>Original Price: {item.original_price}</span><br/>
										<strong>Discounted Price: {item.disc_price}</strong>
				      </List.Content>
				      <Button size='mini' type='submit' onClick={() => this.props.deleteItem(item.id)}>Delete</Button>
				    </List.Item>
			   	</List>
				)
		})



		return (
			{items}
		)
	}
}



export default ItemList