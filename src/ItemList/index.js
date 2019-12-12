import React from 'react';
import { List, Image, Button } from 'semantic-ui-react'

function ItemList(props){
	// console.log(props.items);
	let items
	if (props.items !== undefined){
		items = props.items.map((item) => {
			if(item.list_id.id === props.listId){
				return(
					<List key={item.id} celled size='massive'>
						<List.Item className='itemList'>
							<a href={item.url}><Image src={item.image}/></a>
							<List.Content>
								<List.Header>{item.name}</List.Header>
								<List.Description>
								<span className='origPrice'>Original Price: {item.original_price}</span><br/>
								<strong className='discPrice'>Discounted Price: {item.disc_price}</strong>
								</List.Description>
							</List.Content>
							<Button size='small'type='submit' onClick={() => props.deleteItem(item.id)}><i class="trash alternate outline icon"></i></Button>
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