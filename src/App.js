import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import './index.css'
import LoginRegisterForm from './LoginRegisterForm'
import ListContainer from './ListContainer'
import { Form, Message, Button, Input, Menu } from 'semantic-ui-react'
import CreateNewList from './CreateNewList'
import priceDropIcon from './price-drop-icon.png'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: true,
      loggedInUserEmail: null,
      loginCode: 200,
      activeItem: 'home',
      createListModalIsOpen: false
    }
  }

  login = async loginInfo => {
    const res = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/login',
    {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(loginInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const parsedLoginRes = await res.json();
    if(parsedLoginRes.status.code === 200){
      this.setState({
        loggedIn: true,
        loggedInUserEmail: parsedLoginRes.data.email,
        loginCode: 200
      });
    } else {
      this.setState({
        loginCode: 401
      })
      console.log('login failed');
    }
  }

  register = async registerInfo => {
    const res = await fetch(
      process.env.REACT_APP_API_URL + '/api/v1/users/register',
      {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(registerInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    const parsedRegisterRes = await res.json();
    // console.log(parsedRegisterRes);
    if(parsedRegisterRes.status.code === 201){
      this.setState({
        loggedIn: true,
        loggedInUserEmail: parsedRegisterRes.data.email
      })
    } else {
      console.log('registration failed');
    }
  }

  logout = async () => {
    //this will let user logout from website
    const res = await fetch(
      process.env.REACT_APP_API_URL + '/api/v1/users/logout', 
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    const parsedLogoutRes = await res.json();
    if(parsedLogoutRes.status.code === 200){
      this.setState({
        loggedIn: false
      })
    } else {
      console.log('logout failed');
    }
  }

  buttonAction = () => {
    if(this.state.activeItem === 'home'){
      console.log('home');
    } else if(this.state.activeItem === 'create a list'){
      this.openCreateListModal()
    } else if(this.state.activeItem === 'logout'){
      this.logout()
    }
  }

  openCreateListModal = () => {
    this.setState({
      createListModalIsOpen: true
    })
  }

  closeCreateListModal = () => {
    this.setState({
      createListModalIsOpen: false
    })
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name }, this.buttonAction)

  render() {
    const { activeItem } = this.state
    return (
       <div className='App'>
        <h1 className='title'>Price_Drop<img className='icon'src={priceDropIcon}/></h1>
        
        {this.state.loginCode === 401
          ?
          <Form error>
            <Message
              error
              header='Login Failed'
              content='Username or Password is incorrect'
            />
          </Form>
          :
          null
        }
        {this.state.loggedIn ? (
          <React.Fragment>
            <div className='navBar'>
             <Menu secondary  stackable size='huge'className='ui menu'>
              <Menu.Item
                size='big'
                name='home'
                active={activeItem === 'home'}
                onClick={this.handleItemClick}
              />
              <Menu.Item class="navItem"
                name='logout'
                active={activeItem === 'logout'}
                onClick={this.handleItemClick} 
              />
              <Menu.Item class="navItem"
                name='create a list'
                active={activeItem === 'create a list'}
                onClick={this.handleItemClick}
              />
            </Menu>
          </div>
            <ListContainer 
              userEmail={this.state.loggedInUserEmail} 
              open={this.state.createListModalIsOpen}
              closeCreateListModal={this.closeCreateListModal}
            />
            
          </React.Fragment>
            ) : (
              <LoginRegisterForm  login={this.login} register={this.register}/>
            )}
      </div>
    )
  }
}

export default App;
