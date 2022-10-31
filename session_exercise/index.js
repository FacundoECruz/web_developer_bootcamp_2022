const express = require('express')
const app = express()
const session = require('express-session')

const sessionOptions = { secret: 'secretword', resave: false, saveUninitialized: false } 

app.use(session(sessionOptions))

app.get('/viewcount', (req, res) => {
    if (req.session.count) {
        req.session.count += 1;
    } else {
        req.session.count = 1;
    }
    res.send(`You have seen this page ${req.session.count} times`)
})

app.listen(3000, () => {
    console.log('LISTEN ON 3000')
})