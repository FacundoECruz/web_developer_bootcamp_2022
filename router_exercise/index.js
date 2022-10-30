const express = require('express')
const app = express()
const teatrosRoutes = require('./routes/teatros')
const cinesRoutes = require('./routes/cines')
const adminRoutes = require('./routes/admin')

app.use('/teatros', teatrosRoutes);
app.use('/cines', cinesRoutes);
app.use('/', adminRoutes);

app.listen(3000, () => {
    console.log("LISTEN ON 3000")
})