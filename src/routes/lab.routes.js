const { Router} = require('express');
const { getAllPaciente, getPaciente, createPaciente, deletePaciente, updatePaciente }= require('../controllers/lab.controllers')

const pool = require('../db')

const router = Router();

router.get('/lab', getAllPaciente )

router.get('/lab/:id', getPaciente)

router.post('/lab', createPaciente)

router.delete('/lab/:id', deletePaciente)

router.put('/lab/:id', updatePaciente)

module.exports = router;