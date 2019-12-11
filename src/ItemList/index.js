import React from 'react';
import { List, Image, Button } from 'semantic-ui-react'

function ItemList(props){
	// console.log(props.items);
	let items
	if (props.items !== undefined){
		items = props.items.map((item) => {
			if(item.list_id.id === props.listId){
				return(
					<List animated key={item.id} celled size='massive'>
						<List.Item>
							<Image avatar src={item.image} />
							<List.Content>
								<List.Header>{item.name}</List.Header>
								<List.Description>
								<span>Original Price: {item.original_price}</span><br/>
								<strong>Discounted Price: {item.disc_price}</strong>
								</List.Description>
							</List.Content>
							<Button size='mini'type='submit' onClick={() => props.deleteItem(item.id)}>Delete</Button>
						</List.Item>
					</List>
				)
			} else {
				return null
			}
		})
	} else {
		items = null
	}
	return (
		<div>
			{ items }
		</div>
	)
}

export default ItemList