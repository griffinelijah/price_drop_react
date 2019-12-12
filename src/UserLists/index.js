import React from 'react';
import { Card, Button, Image, Icon} from 'semantic-ui-react';
import ItemList from '../ItemList'

function UserLists(props) {
	// console.log(props.lists);
	const lists = props.lists.map((list) => {
		return(
			<Card key={list.id} centered items={list}>
				<Image src={list.image} wrapped ui={false} />
				<Card.Content>
					<Card.Header>{list.title}</Card.Header>
						<Card.Meta>
							<span className='user'>{list.notif_preference}</span><br/>
						</Card.Meta>
						<Card.Content extra>
							<span>{list.created}</span>
							<Button className='cardButtons' color='red'size='small' onClick={() => props.deleteList(list.id)}><i class="trash icon"></i></Button>
							<Button className='cardButtons' color='blue'size='small' onClick={() =>props.editList(list.id)}><i class="pencil alternate icon"></i></Button>
							<Button className='cardButtons' color='green'size='small' onClick={() =>props.openCreateItemModal(list.id)}><i class="plus icon"></i></Button>
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