import React, { Component} from 'react';
import CreateNewList from '../CreateNewList';
import { Grid, Button, Header, Icon, Image, List } from 'semantic-ui-react';
import ItemList from '../ItemList'
import UserLists from '../UserLists'
import EditListModal from '../EditListModal'
import CreateNewItem from '../CreateNewItem'

class ListContainer extends Component {
	constructor(props){
		super(props)
		this.state = {
			lists: [],
			listId: '',
			items: [],
			//this will control whether the edit list modal is open or closed
			editListModalIsOpen: false,
			createItemModalIsopen: false,
			//this will be used to store state of list that is being updated 
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
		this.getItems();
	}
	//retrieve all lists via fetch all to api
	getLists = async () => {
		try {
			const lists = await fetch(process.env.REACT_APP_API_URL + '/api/v1/lists/myLists', 
			{
				credentials: 'include'
			})
			//parse all found lists
			const parsedLists = await lists.json();
			this.setState({
				lists: parsedLists.data
			})
		} catch (err){
			console.log(err);
		}
	}

	//add list
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
	//delete list route, takes id of list from button click to run delete function
	deleteList = async (idOfList) => {
		const deletedListRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/lists/' + idOfList,
		{
			method: 'DELETE',
			credentials: 'include'
		})

		const deletedListResParsed = await deletedListRes.json()
		//this set states to include all previous lists besides the one that was just deleted by filter to find all list id's that do not match
		this.setState({
			lists: this.state.lists.filter((list) => list.id !== idOfList)
		})
	}
	//edit list route will take if of list from button click and pass to edit list function
	editList = (idOfList) => {
		//find list by that matches listId being passed through on butotn click
		const listToEdit = this.state.lists.find(list => list.id === idOfList)
		this.setState({
			//change state of edit modal to open it
			editListModalIsOpen: true,
			//add the found list to state so data can be updated
			listToEdit: {
				...listToEdit
			}
		})
	}

	handleEditChange = (e) => {
		this.setState({
			listToEdit: {...this.state.listToEdit, [e.target.name]: e.target.value}
		})
	}

	updateList = async (e) => {
		//stop default page refresh when submitting form
		e.preventDefault();
		try {
			const apiUrl = process.env.REACT_APP_API_URL + '/api/v1/lists/' + this.	state.listToEdit.id
			const updatedListRes = await fetch(apiUrl,
			{
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify(this.state.listToEdit),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			//parse response of updated list 
			const updatedListResParsed = await updatedListRes.json()
			//map over all lists in state to find matching id of list that was just updated
			const listArrAfterUpdates = this.state.lists.map((list) => {
				//if the id does match update with the new data from response
				if(list.id === updatedListResParsed.data.id){
					list = updatedListResParsed.data
				}
				return list
			})
			//set state to new arr from above 
			this.setState({lists: listArrAfterUpdates})
			//after updating state close modal
			this.closeEditModal();
		} catch(err) {
			console.log('\nthis is an error after updating list and closing modal');
			console.log(err);
		}
	}
	//this will make a fetch call to retrive items belonging to our lists
	getItems = async () => {
		console.log("this is listId in getItems")
		
		for(let i = 0; i < this.state.lists.length; i++){
			const items = await fetch(process.env.REACT_APP_API_URL + '/api/v1/items/' + i.id, 
				console.log('this is the url we ar ehitting on get items'),
				console.log(process.env.REACT_APP_API_URL + 'api/v1/items/' + i.id),
			{
				method: 'GET',
				credentials: 'include'
			})
			//parsing all found items
			const parsedItems = await items.json()
			
			//set state to include found items
			this.setState({
				items: [...this.state.items, parsedItems.data]
			})

		}
		
	}

	//this will elt us create a new item
	addItem = async (e, itemFromForm) => {
		//prevent default page refresh when submitting form
		e.preventDefault();
		try {
			console.log('\nthis is this.state.listId when making fetch call to add item')
			console.log(this.state.listId);
			//this will hit the create item route the list that hte item is being added to
			const createdItemRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/items/' + this.state.listId,
			{
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(itemFromForm),
				headers:{
					'Content-Type': 'application/json'
				}
			})
			const parsedItemRes = await createdItemRes.json();
			console.log('type of data in fetch call:', typeof parsedItemRes)
			this.setState({items: [...this.state.items, parsedItemRes.data]})
			console.log('after being added to state:', this.state.items)
		} catch(err) {
			console.log(err);
		}
	}
	//close edit modal
	closeEditModal = () => {
		this.setState({
			editListModalIsOpen: false
		})
	}
	//this will open the modal to create an item on a list
	openCreateItemModal = (listId) => {
		this.setState({
			listId: listId,
			createItemModalIsopen: true
		})
	}

	closeCreateItemModal = () => {
		this.setState({
			createItemModalIsopen: false
		})
	}
	//fetch to delete a single item
	deleteItem = async (itemId) => {
		const deleteItemRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/items/' + itemId, 
		{
			method: 'DELETE',
			credentials: 'include'
		})
		const deleteItemResParsed = await deleteItemRes.json()
		this.setState({
			items: this.state.items.filter((item) => item.id !== itemId)
		})
	}
	handleClick = (listId) => {
		// this.getItems(listId);
		this.openCreateItemModal(listId);
	}
	render() {
		console.log("here is tihs.state.items in List Conttainer")
		console.log(this.state.items)
		return (
			<Grid 
				columns={3}
				divided textAlign='center'
				style={{height: '100%'}}
				verticalAlign='top'
				stackable
				>
					<Grid.Row>
						<Grid.Column>
							<UserLists
							lists={this.state.lists}
							deleteList={this.deleteList}
							editList={this.editList}
							handleClick={this.handleClick}
							items={this.state.items}
							deleteItem={this.deleteItem}
							/>
						
						</Grid.Column>
						{
							this.state.createItemModalIsopen === true
							?
						<Grid.Column>
							<CreateNewItem
							listId={this.state.listId}
							openCreateItemModal={this.openCreateItemModal}
							open={this.state.createItemModalIsopen}
							closeCreateItemModal={this.closeCreateItemModal}
							addItem={this.addItem}
							/>
						</Grid.Column>
						:
						null
						}
						<Grid.Column>
							<CreateNewList addList={this.addList} />
						</Grid.Column>
 							<EditListModal
								open={this.state.editListModalIsOpen}
								updateList={this.updateList}
								listToEdit={this.state.listToEdit}
								closeEditModal={this.closeEditModal}
								handleEditChange={this.handleEditChange}
							/>
					</Grid.Row>
			</Grid>
		)
	}
}


export default ListContainer