const express = require('express');
const app = express();

// app.use((req, res) => {
//     console.log("WE GOT A NEW REQUEST!!");
//     res.send('<h1>This is my webpage!!</h1>')
// })

app.get('/', (req, res) => {
    res.send('This is the home page!')
})

app.get('/cats', (req, res) => {
    res.send('MEOW!!')
})

app.get('/DOGS', (req, res) => {
    res.send('WOOF!!')
})

app.get('*', (req, res) => {
    res.send(`I don't know that path!`)
})

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
})

