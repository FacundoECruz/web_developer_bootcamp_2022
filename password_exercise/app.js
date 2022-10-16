const express = require('express');
const app = express();

 
app.use(express.urlencoded({ extended:true })); 
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.method);
    next(); 
})

app.get('/', (req, res) => {
    res.send('HOME PAGE')
})

app.use((req, res) => {
    res.status(404).send('Something broke!')
  })

app.listen(3000, () => {
    console.log("Listen on 3000")
})
