const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('TODOS LOS TEATROS')
})

router.post('/', (req, res) => {
    res.send('CREAR TEATRO')
})

router.get('/:id', (req, res) => {
    res.send('MOSTRAR UN TEATRO')
})

router.get('/:id/edit', (req, res) => {
    res.send('EDITAR UN TEATRO')
})

module.exports = router;
