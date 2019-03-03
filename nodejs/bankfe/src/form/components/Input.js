import React, { Component } from 'react';

class Input extends Component {
  
  render() {
	  return(
		<div className="form-group">
		<label htmlFor={this.props.name} className="form-label">{this.props.title}</label>
		<input
		  className="form-input"
		  id={this.props.name}
		  name={this.props.name}
		  type={this.props.type}
		  value={this.props.value}
		  onChange={this.props.handleChange}
		  placeholder={this.props.placeholder} 
		/>
	  </div>
	  );
  }
}

export default Input;
