import React from 'react'
import { Form, Button, Modal } from 'react-bootstrap'
import axios from 'axios'
import PersonItem from './PersonItem'

const defaultState = {
  show: false,
  clicked: '',
  actors: [],
  directors: []
}

class AddMovie extends React.Component {
    constructor(props){
      super(props)

      this.showModal = this.showModal.bind(this)

      this.state = {
        show: false,
        clicked: '',
        actors: [],
        directors: [],
        people: []
      }
    }

    onChangeTitle(e){
      this.setState({
        title: e.target.value
      }) 
    }
  
    onChangeYear(e){
      this.setState({
        year: Number(e.target.value)
      }) 
    }

    onChangeRole(e, person){
      var arr = this.state.actors

      for(var i = 0; i < arr.length; i++){ 
        if ( arr[i].rid === person.rid) { 
          arr[i].role = person.role
        }
      }
      
      this.setState({
        actors: arr
      })

    }

    onAdd(e, person){
      var actors = this.state.clicked === 'actors'
      var arr = actors ? this.state.actors : this.state.directors

      var p = {
        rid: person.rid,
        role: person.role
      }

      if(person.checked){
        arr.push(p)
      } else {
        for(var i = 0; i < arr.length; i++){ 
          if ( arr[i].rid === person.rid) { 
            arr.splice(i, 1); 
          }
        }
      }

      if(actors){      
        this.setState({
          actors: arr
        })
      } else {
        this.setState({
          directors: arr
        })      
      }
    }

    onChangeDirectors(e){
      var arr = this.state.directors

      if(e.target.checked){
        arr.push(e.target.value)
      } else {
        for(var i = 0; i < arr.length; i++){ 
          if ( arr[i] === e.target.value) { 
            arr.splice(i, 1); 
          }
        }
      }

      this.setState({
        directors: arr
      })   
    }

    handleModalShowHide() {
      this.setState({ 
        show: !this.state.show
      })
    }

    showModal(e) {
      this.setState({ 
        show: !this.state.show,
        clicked: e.target.value
      })
    }

    componentDidMount() {
      axios.get('http://localhost:5000/people')
        .then(res => {
          this.setState({
            people: res.data
          })
        })
        .catch(function (error) {
          console.log(error)
        }) 
    }

    onSubmit(e){

      var id = ''

      const newMovie = {
        title: this.state.title,
        year: this.state.year
      }
  
      axios.post('http://localhost:5000/add_movie', newMovie)
        .then(res => {
          id = res.data[0]['@rid']

          this.state.actors.map(current => {
            axios.post('http://localhost:5000/add_actor', {
              actor: current.rid,
              role: current.role,
              movie: id
            })
          })

          this.state.directors.map(current => {
            axios.post('http://localhost:5000/add_director', {
              person: current.rid,
              movie: id
            })
          })

          console.log(`${res.data[0].title} added`)
        })
        .catch(err => console.log(err))
      
        //this.props.history.push('/')
    }

    personList(){
      var comp = this    
      return this.state.people.map(function (current, i) {
        return <PersonItem person={current} clicked={comp.state.clicked } add={comp.onAdd.bind(comp)} role={comp.onChangeRole.bind(comp)} key={i} />
      })
    }
    

    render () {
      return (
        <Form onSubmit={this.onSubmit.bind(this)}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control  type='text' value={this.state.title} onChange={this.onChangeTitle.bind(this)}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Year</Form.Label>
            <Form.Control  type='text' value={this.state.year} onChange={this.onChangeYear.bind(this)}/>
          </Form.Group>
          <Form.Group>
            <Button variant='secondary' 
              value='directors'
              onClick={this.showModal}>
              Directors
            </Button>  
          </Form.Group> 
          <Form.Group>
            <Button variant='secondary'
              value='actors' 
              onClick={this.showModal}>
              Actors
            </Button>  
          </Form.Group>  
          <Button variant='primary' type='submit'>
            Add
          </Button>
          <Modal 
          show={this.state.show} 
          onHide={() => this.handleModalShowHide()}
          >
            <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
            </Modal.Header>
            <Modal.Body>
              {this.personList()}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={() => this.handleModalShowHide()}>
                Done
            </Button>
            </Modal.Footer>
          </Modal>
        </Form>
      )
    }
}

export default AddMovie