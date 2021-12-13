const express = require('express');
const Web3 = require('web3')
const connection = require('./connection/app.js')

const PORT = 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extends: false}))

app.get('/', (req, res) => {
    res.json({result: true})
})

app.listen(PORT, () => {

    connection.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
    connection.start()

    console.log(`App listening on address http://localhost:${PORT}`)
})