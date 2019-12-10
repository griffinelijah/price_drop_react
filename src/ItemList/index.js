import React from 'react';
import { List, Image, Button } from 'semantic-ui-react'

function ItemList(props){
	console.log('\nthis is props.items in itemList');
	console.log(props.items);
		const items = props.items.map((item) => {
			console.log('this is item inside of item map in ItemList');
			console.log(typeof item)
			console.log(item)
			return(
				<List celled>
				  <List.Item>
			      <Image avatar src={item.image} />
				      <List.Content>
					        <List.Header>{item.name}</List.Header>
										<span>Original Price: {item.original_price}</span><br/>
										<strong>Discounted Price: {item.disc_price}</strong>
				      </List.Content>
				      <Button size='mini' type='submit' onClick={() => props.deleteItem(item.id)}>Delete</Button>
			    </List.Item>
		   	</List>
			)
		})
	return (
		<div>
			{ items }
		</div>
	)
} 


export default ItemList