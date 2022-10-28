const express = require('express')
const app = express()
const teatrosRoutes = require('./routes/teatros')
const cinesRoutes = require('./routes/cines')

app.use('/teatros', teatrosRoutes);
app.use('/cines', cinesRoutes);

app.listen(3000, () => {
    console.log("LISTEN ON 3000")
})