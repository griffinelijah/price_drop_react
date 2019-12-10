import React from 'react';
import { List, Image } from 'semantic-ui-react'

function ItemList(props){
	// console.log(props.items);
	let items
	if (props.items !== undefined){
		items = props.items.map((item) => {
			return(
				<List celled>
					<List.Item>
						<Image avatar src={item.image} />
						<List.Content>
							<List.Header>{item.title}</List.Header>
							<List.Description>Original Price: {item.orig_price} || Discounted Price: {item.disc_price}
							</List.Description>
						</List.Content>
					</List.Item>
				</List>
			)
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