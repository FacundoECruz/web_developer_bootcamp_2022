const express = require('express');
const app = express();

 
app.use(express.urlencoded({ extended:true })); 
app.use(express.json())

const verifyPassword = (req, res, next) => {
    const { password } = req.query
    if(password === 'gato'){
        next();
    }
    throw new Error('You need a password')
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
    console.log('************************')
    console.log('*********ERROR**********')
    console.log('************************')
    res.status(500).send("Oh boooy, we've got an errorrrr!!!")
}) 

app.listen(3000, () => {
    console.log("Listen on 3000")
})
