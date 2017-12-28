const express = require('express')

const app = express()

const pg = require('pg')

const bodyParser = require('body-parser')

const PORT = 3000

const conString = 'postgres://postgres:1234@localhost:5432/doggoes'

const client = new pg.Client(conString)

client.connect()

client.query('SELECT * FROM dogs').then((result)=> {console.log(result.rows[0])})

app.listen(PORT, () => {console.log(`server listening on ${PORT}`)})

app.use(express.static('./public'))

app.use(bodyParser.urlencoded({extended:true}))

app.get('/dogs', (request, response) => {
    client.query('SELECT * FROM dogs').then((result)=> {
        response.send(result.rows)
    })
})

app.post('/dogs', (request, response) => {
    const dog = request.body
    const queryText = `INSERT INTO dogs
    (name, is_good_dog, breed, age)
    VALUES ('${dog.name}', ${dog.is_good_dog}, '${dog.breed}', ${dog.age})`
    client.query(queryText).then(result => {
        response.send(result)
    })
    console.log(queryText)

})
