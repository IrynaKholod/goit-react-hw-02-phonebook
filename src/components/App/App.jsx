import { Component } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import {Container, MainTitle, Title} from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: ''
  };
  addContact = ({id, name, number}) => {
    const isNameAdded = name.toUpperCase();
    let isAdded = this.state.contacts.find(el => {
     return (el.name.toUpperCase() === isNameAdded) 
    });

    if (isAdded) {
      alert(`${name} is already in contacts`);
      isAdded = true;
      return;
    }
    const contact = {
      id,
      name,
      number
    }

    this.setState(prevState =>({
    contacts: [contact, ...prevState.contacts]
    }));
  };

  changeFilter = (e) =>{
    this.setState({filter: e.currentTarget.value})
  };

  getName =() => {
    const {filter, contacts} = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter),);

  }

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  
  render() {
   const searchResults = this.getName();

    return (
      <Container>
        < MainTitle>
          Phonebook
        </ MainTitle>

         <ContactForm onSubmit={this.addContact} />

        <Title>
          Contacts
        </Title>

         <Filter value={this.state.filter}
                onChange={this.changeFilter}/>

         <ContactList contacts={searchResults}
         onDeleteContact={this.deleteContact}/> 

      </Container>
    );
  }
}
