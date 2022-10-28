const express = require('express')
const app = express()
const teatrosRoutes = require('./routes/teatros')

app.use('/', teatrosRoutes);

app.listen(3000, () => {
    console.log("LISTEN ON 3000")
})