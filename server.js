const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

const dbConnectionString = process.env.DB_STRING

let db,
    dbName = 'sample_mflix',
    collection,
    PORT

// Connection to database

MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log(`Connected to Database ${dbName}`)
        db = client.db(dbName)
        collection = db.collection('movies')
    })

// Middleware

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// Routes

app.get('/', async (req, res) => {
    try {
        res.sendFile('index.ejs')
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
})

// Listener

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT || process.env.PORT}`)
})