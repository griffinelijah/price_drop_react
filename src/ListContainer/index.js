import React, { Component} from 'react';
import CreateNewList from '../CreateNewList';
import { Grid, Button } from 'semantic-ui-react';
import UserLists from '../UserLists'

class ListContainer extends Component {
	constructor(props){
		super(props)
		this.state = {
			lists: [],
			listId: '',
			listToEdit: {
				title: '',
				notif_preference: '',
				id: '',
				loggedInUserEmail: this.props.userEmail
			}
		}
	}

	componentDidMount(){
		this.getLists();
	}

	getLists = async () => {
		try {
			const lists = await fetch(process.env.REACT_APP_API_URL + '/api/v1/lists/', 
			{
				credentials: 'include'
			})
			const parsedLists = await lists.json();
		} catch (err){
			console.log(err);
		}
	}
	addList = async (e, listFromForm) => {
		e.preventDefault();
		try{
			const createdListRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/lists/', 
			{
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(listFromForm),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const parsedRes = await createdListRes.json()

			this.setState({lists: [...this.state.lists, parsedRes.data]})
		}
		catch(err){
			console.log(err);
		}
	}

	deleteList = async (idOfList) => {
		const deletedListRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/lists/' + idOfList,
		{
			method: 'DELETE',
			credentials: 'include'
		})

		const deletedListResParsed = await deletedListRes.json()
		this.setState({
			lists: this.state.lists.filter((list) => list.id !== idOfList)
		})
	}

	render() {
		return (
			<Grid 
				columns={2}
				divided textAlign='center'
				style={{height: '100%'}}
				verticalAlign='top'
				stackable
				>
					<Grid.Row>
						<Grid.Column>
							<UserLists lists={this.state.lists} deleteList={this.deleteList}/>
						</Grid.Column>
						<Grid.Column>
							<CreateNewList addList={this.addList} />
						</Grid.Column>
					</Grid.Row>
			</Grid>
		)
	}
}


export default ListContainer