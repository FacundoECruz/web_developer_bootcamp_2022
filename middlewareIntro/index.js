const express = require('express');
const app = express() ;
const morgan = require('morgan');

app.use(morgan('tiny'))

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'antone') {
        next();
    }
    res.send('SORRY YOU NEED A PASSWORD!!!')
}

app.get('/', (req, res) => {
    res.send('HOME PAGE!')
})

app.get('/dogs', (req, res) => {
    res.send('EL CHICHO!!')
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send('MY SECRET IS: Zizek > Locke')
})

app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})