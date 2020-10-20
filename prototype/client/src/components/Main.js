import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom';

const MovieItem = props => (
  <Link to={'/movie/' + props.movie['@rid'].replace('#', "")}>{props.movie.title}</Link>
)

class Main extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      results: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/movies')
      .then(res => {
        this.setState({
          results: res.data
        })
      })
      .catch(function (error) {
        console.log(error)
      })     
  }

  movieList(){
    return this.state.results.map(function (current, i) {
      return <div><MovieItem movie={current} key={i} /></div>
    })
  }

  render () {
    return (
      <div>
        {this.movieList()}
      </div>   
    )
  }
}

export default Main