import React from 'react'
import { Form, Button, Modal } from 'react-bootstrap'
import axios from 'axios'

class PersonItem extends React.Component {
    constructor(props){
      super(props)

      this.state = {
        role: '',
        checked: false,
        rid: ''
      }
    }

    componentDidMount() {
        this.setState({
            rid: this.props.person["@rid"].replace('#', "")
        })
    }

    onChangeRole(e){
        this.setState({
        role: e.target.value
        }) 

        var person = {
            rid: this.state.rid,
            role: e.target.value,
            checked: this.state.checked
        }

        this.props.role(e, person) 
    }
  
    onChange(e){
        this.setState({
        checked: !this.state.checked
        })     

        var person = {
            rid: this.state.rid,
            role: this.state.role,
            checked: !this.state.checked
        }

        this.props.add(e, person) 
    }

    render () {
        var person = this.props.person
        return (
            <Form.Group>
            <Form.Check 
                type='checkbox'
                label={`${person.firstName} ${person.lastName}`}
                onChange={this.onChange.bind(this)}
                value={this.state.rid}
                checked={this.state.checked}
            />
            {this.state.checked && this.props.clicked === 'actors' && <Form.Control 
                value={this.state.role} 
                type='text' 
                placeholder='Role' 
                onChange={this.onChangeRole.bind(this)}
            />}
            </Form.Group>
        )
    }
}

export default PersonItem 