const express = require('express')
const app = express()
var snowflake = require('snowflake-sdk');
const cors = require('cors')
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
var Pokedex = require('pokedex')


const port = 4001

var connection = snowflake.createConnection({
    account: "wdb59468.us-east-1",
    username: "jafcor06",
    password: "Hola1234!",
    database: "MOVIES",
    warehouse: "my_wh"
  });

connection.connect( 
    function(err, conn) {
        if (err) {
            console.error('Unable to connect: ' + err.message);
            } 
        else {
            console.log('Successfully connected to Snowflake.');
            // Optional: store the connection ID.
            connection_ID = conn.getId();
            }
    }
);

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/get/:name', (req, res) => {
    const name = req.params.name
    pokedex = new Pokedex();
    
    res.send(pokedex.pokemon(name))
})

app.get('/api/list', (req, res) => {
    pokedex = new Pokedex()
    res.send(pokedex.pokemon())
})

app.post('/api/insert', (req, res) => {

    var movieName = req.body.movieName;
    var movieReview = req.body.movieReview;

    connection.execute({
        sqlText: "insert into moviesReview(movieName, movieReview) VALUES (?, ?)",
        binds: [movieName, movieReview],
        complete: function(err, stmt, rows) {
          if (err) {
            console.error('Failed to execute statement due to the following error: ' + err.message);
          } else {
              res.send(`Hola Jafeth has insertado ${rows.length}`);
          }
        }
      });
})

app.listen(port, () => {
    console.log(`App listening in server ${port}` )
})