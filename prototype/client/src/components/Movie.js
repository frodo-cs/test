import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import {Link} from 'react-router-dom';

const PersonItem = props => (
  <Link to={'/person/' + props.person["@rid"].replace('#', "")}>
    {`${props.person.firstName} ${props.person.lastName}`}
  </Link>
)

class Movie extends React.Component {
    constructor(props){
      super(props)

      this.state = {
        title:'',
        year: '',
        directors: [],
        actors: [],
        roles: [],
        test: ''
      }
    }

    componentDidMount() {
      axios.get('http://localhost:5000/movie/' + this.props.match.params.id)
        .then(res => {
          this.setState({
            title: res.data[0].title,
            year: res.data[0].year,
          })
        })
        .catch(function (error) {
          console.log(error)
        })     

      axios.get('http://localhost:5000/directors/' + this.props.match.params.id)
        .then(res => {
          this.setState({
            directors: res.data
          })
        })
        .catch(function (error) {
          console.log(error)
        })   

      axios.get('http://localhost:5000/actors/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          actors: res.data
        })
      })
      .catch(function (error) {
        console.log(error)
      })

      axios.get('http://localhost:5000/roles/' + this.props.match.params.id).then(res => {
        this.setState({
          roles: res.data
        })
      }).catch (function (error){
        console.log(error)
      })

    }

    directorList(){
      return this.state.directors.map(function (current, i) {
        return <div>  
          <Link to={'/person/' + current["@rid"].replace('#', "")}>
            {`${current.firstName} ${current.lastName}`}
          </Link>
      </div>
      })
    }

    actorList(){
      var ej2 = this.roleList()
      var ej = this.state.actors.map(function (current, i) {
        return <div>
          <Link to={'/person/' + current["@rid"].replace('#', "")}>
            {`${current.firstName} ${current.lastName} (${ej2[i]})`}
          </Link>
        </div>
      })
      return ej
    }

    roleList(){
      return this.state.roles.map(function (current, i) {
       return current.role
      })
    }

    render () {
      return (
        <Container>
          <Row><Col><h2>{this.state.title}</h2></Col></Row>
          <Row><Col><h6>{this.state.year}</h6></Col></Row>
          <Row>
            <Col>
              <h5>Director(s)</h5>
              {this.directorList()}
            </Col>
            <Col>
              <h5>Actor(s)</h5>
              {this.actorList()}
            </Col>
          </Row>
        </Container>
      )
    }
}

export default Movie