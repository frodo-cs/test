import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import {Link} from 'react-router-dom';

const MovieItem = props => (
  <Link to={'/movie/' + props.person["@rid"].replace('#', "")}>
    {`${props.person.title} (${props.person.year})`}
  </Link>
)

class Person extends React.Component {
    constructor(props){
      super(props)

      this.state = {
        firstName:'',
        lastName: '',
        acted: [],
        directed: []
      }
    }

    componentDidMount() {
      axios.get('http://localhost:5000/person/' + this.props.match.params.id)
        .then(res => {
          console.log(res.data)
          this.setState({
            firstName: res.data[0].firstName,
            lastName: res.data[0].lastName,
          })
        })
        .catch(function (error) {
          console.log(error)
        })  
        
        axios.get('http://localhost:5000/directed/' + this.props.match.params.id)
        .then(res => {
          this.setState({
            directed: res.data
          })
        })
        .catch(function (error) {
          console.log(error)
        })   

        axios.get('http://localhost:5000/acted/' + this.props.match.params.id)
        .then(res => {
          this.setState({
            acted: res.data
          })
        })
        .catch(function (error) {
          console.log(error)
        })  
    }

    directedList(){
      return this.state.directed.map(function (current, i) {
        return <div><MovieItem person={current} key={i} /></div>
      })
    }

    actedList(){
      return this.state.acted.map(function (current, i) {
        return <div><MovieItem person={current} key={i} /></div>
      })
    }

    render () {
      return (
        <Container>
          <Row><Col><h2>{`${this.state.firstName} ${this.state.lastName}`}</h2></Col></Row>
          <Row><Col><h4>Filmography</h4></Col></Row>
          <Row>       
            <Col>
              <h5>Director</h5>
              {this.directedList()}
            </Col>
            <Col>
              <h5>Actor</h5>
              {this.actedList()}
            </Col>
          </Row>
        </Container>
      )
    }
}

export default Person