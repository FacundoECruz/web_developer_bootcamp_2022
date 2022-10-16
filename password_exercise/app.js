const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('HOME PAGE')
})

app.use((req, res) => {
    res.status(404).send('Something broke!')
  })

app.listen(3000, () => {
    console.log("Listen on 3000")
})
