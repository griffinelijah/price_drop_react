import React from 'react';
import { Form, Button, Label, Header, Modal} from 'semantic-ui-react';

function FaqModal(props) {
	return (
		<Modal open={props.open} closeIcon onClose={props.closeFaqModal}>
			<Header> FAQ </Header>
				<Modal.Content>
					<strong>How do I use Price_drop?</strong><br/>
						<span>To get started simply create a list with your desired title and notification preference, then add some items. Adding items is as simple as pasting the url that points directly to the item you want to save!</span><br/>
					<strong>What sites does price drop currently work with?</strong><br/>
						<span>Price_drop currently has support for Farfetch, Etsy and Target. There are sites we are planning to support in the future and if there are any sites you're interested in using with Price_drop, let us know!</span><br/>
					<strong>How are you getting all of this information from just the link?</strong><br/>
						<span>We are using a technology called WebScraping to obtain all of the up to date and relevant information based on your link. All the information you see on Price_drop for an item is grabbed directly from the source, the host of the website your item is on. This is how we know it is the most up to date and reliable information</span>

				</Modal.Content>
			</Modal>
	)
}


export default FaqModal