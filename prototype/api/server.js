const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port = 5000;
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json() ); 
app.use(bodyParser.urlencoded({extended: true}));
app.listen(port, () => console.log(`Listening on port ${port}`));

// orient

var OrientDB = require('orientjs')

var server = OrientDB({
  host:'localhost',
  port:2424,
  username: 'root',
  password: '1234',
  useToken: true
});

var db = server.use('maximiliano')

app.get('/movies', (req, res) => {
  db.query('select * from film').then(data => {
    res.send(data)
  })
})

app.get('/people', (req, res) => {
  db.query('select * from person').then(data => {
    res.send(data)
  })
})

app.get('/movie/:id', (req, res) => {
  db.query('select * from film where @rid = :id', {params: {id: req.params.id}}).then(data => {
    res.send(data)
  })
})

app.get('/person/:id', (req, res) => {
  db.query('select * from person where @rid = :id', {params: {id: req.params.id}}).then(data => {
    res.send(data)
  })
})

app.get('/directors/:id', (req, res) => {
  db.query("select expand(in('direct')) from film where @rid = :id", {params: {id: req.params.id}}).then(data => {
    res.send(data)
  })
})

app.get('/actors/:id', (req, res) => {
  db.query("select expand(in('act')) from film where @rid = :id", {params: {id: req.params.id}}).then(data => {
    res.send(data)
  })
})

app.get('/roles/:id', (req, res) => {
  db.query("select expand(inE('act').include('role')) from film where @rid = :id", {params: {id: req.params.id}}).then(data => {
    res.send(data)
  })
})


app.get('/acted/:id', (req, res) => {
  db.query("select expand(out('act')) from person where @rid = :id", {params: {id: req.params.id}}).then(data => {
    res.send(data)
  })
})

app.get('/directed/:id', (req, res) => {
  db.query("select expand(out('direct')) from person where @rid = :id", {params: {id: req.params.id}}).then(data => {
    res.send(data)
  })
})

app.post('/add_person', (req, res) => {
  let person = req.body
  db.query("insert into person (firstName, lastName) values (:firstName, :lastName)", 
    {params: {
      firstName: person.firstName,
      lastName: person.lastName
    }}).then(data => {
    res.send(data)
  })
})

app.post('/add_movie', (req, res) => {
  let movie = req.body
  db.query("insert into film (title, year) values (:title, :year)", 
    {params: {
      title: movie.title,
      year: movie.year
    }}).then(data => {
    res.send(data)
  })
})

app.post('/add_actor', (req, res) => {
  let edge = req.body
  db.query(`create edge act from ${edge.actor} to ${edge.movie} set role = "${edge.role}"`)
  .then(data => {
    res.send(data)
  })
})

app.post('/add_director', (req, res) => {
  let edge = req.body
  db.query(`create edge direct from ${edge.person} to ${edge.movie}`)
  .then(data => {
    res.send(data)
  })
})


app.get('/test', (req, res) => {
  res.send('caca')
})
