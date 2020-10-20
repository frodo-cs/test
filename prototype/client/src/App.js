import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Main from './components/Main'
import Movie from './components/Movie'
import AddPerson from './components/AddPerson'
import AddMovie from './components/AddMovie'
import Error from './Error'
import Layout from './components/Layout'
import Navigation from './components/Navigation'
import Person from './components/Person'

class App extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <Navigation />
        <br />
        <Layout>
          <Switch>
            <Route path='/' component={Main} exact/>
            <Route path='/addPerson' component={AddPerson} exact/>
            <Route path='/addMovie' component={AddMovie} exact/>
            <Route path='/movie/:id' component={Movie} exact/>
            <Route path='/person/:id' component={Person} exact/>
            <Route component={Error} />
          </Switch>
        </Layout>
      </BrowserRouter>
    )
  }
}

export default App