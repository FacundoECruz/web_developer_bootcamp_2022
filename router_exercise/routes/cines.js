const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('TODOS LOS CINES')
})

router.post('/', (req, res) => {
    res.send('CREAR CINE')
})

router.get('/:id', (req, res) => {
    res.send('MOSTRAR UN CINE')
})

router.get('/:id/edit', (req, res) => {
    res.send('EDITAR UN CINE')
})

module.exports = router;