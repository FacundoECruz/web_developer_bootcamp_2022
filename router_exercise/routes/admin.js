const express = require('express')
const router = express.Router()

router.get('/secret', (req, res) => {
    res.send('ESTO ES UN SECRETOOOOO!!!!')
})

router.post('/deleteall', (req, res) => {
    res.send('BORRANDOOOO!!!')
})

module.exports = router;