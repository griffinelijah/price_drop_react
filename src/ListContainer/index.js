import React, { Component} from 'react';
import CreateNewList from '../CreateNewList';
import { Grid, Button, Header, Icon, Image } from 'semantic-ui-react';
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
			console.log('got lists:', parsedLists.data)
			// parsedLists.data.forEach(list => console.log('list:', list))

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

	//this will make a fetch call to retrive items belonging to our lists
	getItems = async () => {
		// console.log("this is listId in getItems")
		
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
			console.log(parsedItems.data, '< items')
			
			//set state to include found items
			this.setState({
				items: parsedItems.data
			})

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
			const apiUrl = process.env.REACT_APP_API_URL + '/api/v1/listsx	/' + this.state.listToEdit.id
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
			// console.log('\nthis is an error after updating list and closing modal');
			console.log(err);
		}
	}
	// //this will make a fetch call to retrive items belonging to our lists
	// getItems = async () => {
	// 	const items = await fetch(process.env.REACT_APP_API_URL + '/api/v1/items/', 
	// 	{
	// 		credentials: 'include'
	// 	})
	// 	//parsing all found items
	// 	const parsedItems = await items.json()
	// 	//set state to include found items
	// 	this.setState({
	// 		items: [...this.state.comments, parsedItems.data]
	// 	})
	// }
	//this will elt us create a new item
	addItem = async (e, itemFromForm) => {
		//prevent default page refresh when submitting form
		e.preventDefault();
		try {
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
			console.log('\nthis is parsedItemRes in addItem');
			console.log(parsedItemRes);
			this.setState({items: [...this.state.items, parsedItemRes.data]})
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
	deleteItem = async (itemId) => {
		const deletedItemRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/items/' + itemId, 
		{
			method: 'DELETE',
			credentials: 'include'
		})
		const deletedItemResParsed = await deletedItemRes.json();
		this.setState({
			items: this.state.items.filter((item) => item.id !== itemId)
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
							<UserLists
							lists={this.state.lists}
							deleteList={this.deleteList}
							editList={this.editList}
							items={this.state.items}
							getItems={this.getItems}
							deleteItem={this.deleteItem}
							openCreateItemModal={this.openCreateItemModal}
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
							<CreateNewList 
							addList={this.addList}
				     	open={this.props.open}
	            closeCreateListModal={this.props.closeCreateListModal}
						 />
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