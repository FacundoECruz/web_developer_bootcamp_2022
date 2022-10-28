const express = require('express')
const router = express.Router()

router.get('/teatros', (req, res) => {
    res.send('TODOS LOS TEATROS')
})

router.post('/teatros', (req, res) => {
    res.send('CREAR TEATRO')
})

router.get('/teatros/:id', (req, res) => {
    res.send('MOSTRAR UN TEATRO')
})

router.get('/teatros/:id/edit', (req, res) => {
    res.send('EDITAR UN TEATRO')
})


