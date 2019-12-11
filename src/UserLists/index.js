import React from 'react';
import { Card, Button, Image} from 'semantic-ui-react';
import ItemList from '../ItemList'

function UserLists(props) {
	// console.log(props.lists);
	const lists = props.lists.map((list) => {
		return(
			<Card key={list.id}>
				<Image src={list.image} wrapped ui={false} />
				<Card.Content>
					<Card.Header>{list.title}</Card.Header>
						<Card.Meta>
							<span className='user'>{list.notif_preference}</span><br/>
						</Card.Meta>
						<Card.Content extra>
							<span>{list.created}</span>
							<Button size='tiny' onClick={() => props.deleteList(list.id)}>Delete List</Button>
							<Button size='tiny' onClick={() =>props.editList(list.id)}>Edit List</Button>
							<Button size='tiny' onClick={() =>props.openCreateItemModal(list.id)}>Add Item</Button>
						</Card.Content>
						<Card.Content extra >
							<ItemList
								items={props.items}
								getItems={props.getItems}
								deleteItem={props.deleteItem}
								lists={props.list}
								listId={list.id}
							/>
						</Card.Content>
				</Card.Content>
			</Card>
		)
	})
	return (
		<Card.Group>
			{ lists }
		</Card.Group>
	)	
}

export default UserLists