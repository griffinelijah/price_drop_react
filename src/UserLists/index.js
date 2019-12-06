import React from 'react';
import { Card, Button, Image} from 'semantic-ui-react';

function UserLists(props) {
	const lists = props.lists.map((list) => {
		return(
			<Card key={list.id}>
				<Image src={list.image} wrapped ui={false} />
				<Card.Content>
					<Card.Header>{list.title}</Card.Header>
						<Card.Meta>
							<span className='user'>{list.notif_preference}</span><br/>
						</Card.Meta>
				</Card.Content>
				<Card.Content extra>
					<span>{list.created}</span>
					<Button size='tiny'>Delete List</Button>
					<Button size='tiny'>Edit List</Button>
				</Card.Content>
			</Card>
		)
	})
	return (
		<Card.Group>
			{lists}
		</Card.Group>
	)	
}

export default UserLists