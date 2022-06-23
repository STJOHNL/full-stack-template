const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

const dbConnectionString = process.env.DB_STRING

let db,
    dbName = 'sample_mflix',
    collection

MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log(`Connected to Database`)
        db = client.db(dbName)
        collection = db.collection('movies')
    })