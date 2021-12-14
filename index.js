const express = require('express');
const Web3 = require('web3')
const connection = require('./connection/app.js')
const tokenAuth = require('./middleware/tokenAuth.js')

const PORT = 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extends: false}))
// app.use(token_auth())

app.post('/login', async (req, res) => {
    const {login, password} = req.body
    var address
    await connection.getAddressByLogin(login, (err, result) => {
        if (!err) {
            console.log(result)
            address = result
        } else {
            console.log(err)
        }
    })
    const token = Math.random().toString().substring(2)
    // console.log(token)
    console.log(address)
    res.cookie.token = token
    console.log(res.cookie)
    await connection.login(login, password, (err, result) => {
        if (err) {
            console.log(err)
        }
    })
    connection.setToken(address, token, (err, result) => {
        if (!err) {
            res.json({
                result: true,
                token
            })
        } else {
            console.log(err)
        }
    })
    
})

app.post('/setToken', (req, res) => {
    const {address} = req.body
    const token = Math.random().toString().substring(2)
    console.log(token)
    connection.setToken(address, token, (err, result) => {
        if (!err) {
            res.json({result: true})
        } else {
            console.log(err)
        }
    })
})

app.get('/getToken', (req, res) => {
    const {address} = req.body
    connection.getToken(address, (err, result) => {
        if (!err) {
            res.json({result})
        } else {
            console.log(err)
        }
    })
})

app.post('/logout', (req, res) => {
    const {address} = req.body
    res.clearCookie()
    connection.logout(address, (err, result) => {
        if (!err) {
            res.json({result: true})
        } else {
            console.log(err)
        }
    })
})

app.get('/getAccounts', (req, res) => {
    connection.getAccounts(accounts => {
        res.json({accounts})
    })
})

app.get('/getRole', tokenAuth, (req, res) => {
    const {address} = req.body
    // console.log(req)
    connection.getRole(address, (err, result) => {
        if (!err) {
            res.json({result})
        } else {
            console.log(err)
        }
    })
})

app.post('/register', (req, res) => {
    const {login, name, password, account} = req.body
    connection.register(login, name, password, account, (err, result) => {
        if (!err) {
            res.json({result: true})
        } else {
            console.log(err)
        }
    })
})


app.listen(PORT, () => {

    connection.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))
    connection.start()

    console.log(`App listening on address http://localhost:${PORT}`)
})