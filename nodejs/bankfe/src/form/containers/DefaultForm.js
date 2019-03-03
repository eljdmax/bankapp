import React, { Component } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

class DefaultForm extends Component {
  
  constructor(props){
	  super(props);
	  
	  this.state = {
		  data: {
			  name: '',
			  email: ''
		  },
		  genderOptions : ['Male', 'Female', 'Others'],
		  skillOptions: ['Programming']
	  }
	  
	  this.handleFormSubmit = this.handleFormSubmit.bind(this);
	  this.handleClearForm  = this.handleClearForm.bind(this);
	  this.handleNameChange  = this.handleNameChange.bind(this);
	  this.handleEmailChange  = this.handleEmailChange.bind(this);
	  
  }
  
  handleFormSubmit(e) {
	  e.preventDefault();
	  let userData = this.state.data;
	  console.log(userData);
	  alert(userData.name);
	  
	  fetch('http://127.0.0.1:8000/api/v1/banks/', {
		  method: "GET",
		  //body: JSON.stringify(userData),
		  headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
			  "Access-Control-Allow-Origin" : "*"
		  }
	  }).then( response => {
		  console.log(response);
			response.json().then(data => {
				console.log(data);
			})
	  });
	  
	  
  }
  
  handleClearForm(e) {
	  e.preventDefault();
      this.setState({ 
        data: {
          name: '',
          email: ''
        },
      })
  }
  
  handleNameChange(e) {
	  let value = e.target.value;
	  this.setState(
	         prevState => ({data:
				 {
					...prevState.data, name: value
				 } 
			  })
	       )
  }
  
  handleEmailChange(e) {
	  let value = e.target.value;
	  this.setState(
	         prevState => ({data:
				 {
					...prevState.data, email: value
				 } 
			  })
	       )
  }
  
  render() {
	  return(
		<form className="defaultForm" onSubmit={this.handleFormSubmit}>
			<Input type={'text'} 
			       title={'Full Name'}
                   name={'name'}
				   value={this.state.data.name}
				   handleChange = {this.handleNameChange}
			/>
			<Input type={'text'} 
			       title={'Email'}
                   name={'email'}
				   value={this.state.data.email}
				   handleChange = {this.handleEmailChange}
			/>
			<Button title={'Submit'} />
		</form>
	  );
  }
}

export default DefaultForm;
