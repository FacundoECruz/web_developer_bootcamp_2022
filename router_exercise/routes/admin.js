const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
    if(req.query.isAdmin) {
        next();
    }
    res.send("NO SOS ADMIN")
})

router.get('/secret', (req, res) => {
    res.send('ESTO ES UN SECRETOOOOO!!!!')
})

router.get('/deleteall', (req, res) => {
    res.send('BORRANDOOOO!!!')
})

module.exports = router;