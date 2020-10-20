import React from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'

const defaultState = {
  firstName: '',
  lastName: ''
}

class AddPerson extends React.Component {
  constructor(props){
    super(props)

    this.state = defaultState
  }

  onChangeFirstName(e){
    this.setState({
      firstName: e.target.value
    }) 
  }

  onChangeLastName(e){
    this.setState({
      lastName: e.target.value
    }) 
  }

  onSubmit(e){
    e.preventDefault();

    const newPerson = {
      firstName: this.state.firstName,
      lastName: this.state.lastName
    }

    axios.post('http://localhost:5000/add_person', newPerson)
      .then(res => console.log(`${res.data[0].firstName} ${res.data[0].lastName} added`))
      .catch(err => console.log(err))

    this.setState(defaultState)
  }

  render () {
    return (
      <Form onSubmit={this.onSubmit.bind(this)}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control  type='text' value={this.state.firstName} onChange={this.onChangeFirstName.bind(this)}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Last name</Form.Label>
          <Form.Control  type='text' value={this.state.lastName} onChange={this.onChangeLastName.bind(this)}/>
        </Form.Group>
        <Button variant='primary' type='submit'>
          Add
        </Button>
      </Form>
    )
  }
}

export default AddPerson