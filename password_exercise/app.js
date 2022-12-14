const express = require('express');
const app = express();
const AppError = require('./AppError'); 

app.use(express.urlencoded({ extended:true })); 
app.use(express.json())

const verifyPassword = (req, res, next) => {
    const { password } = req.query
    if(password === 'gato'){
        next();
    }
    throw new AppError('You need a password', 401)
}

// app.use((req, res, next) => {
//     console.log(req.method);
//     next(); 
// })

app.get('/', (req, res) => {
    res.send('HOME PAGE')
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send('MI SECRETO ES QUE...')
})

app.use((req, res) => {
    res.status(404).send('Something broke!')
  })

app.use((err, req, res, next) => {
    const { status = 500, message = 'Error' } = err;
    res.status(status).send(message)
}) 

app.listen(3000, () => {
    console.log("Listen on 3000")
})
