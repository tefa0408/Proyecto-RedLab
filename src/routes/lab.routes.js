const { Router} = require('express');
const pool = require('../db')

const router = Router();

router.get('/lab', async (req,res)=>{
    res.send ('retornando lista de pacientes');

})

router.get('/lab/10', (req,res)=>{
    res.send ('retornando un paciente');
})

router.post('/lab', (req,res)=>{
    res.send ('creando un paciente');
})

router.delete('/lab', (req,res)=>{
    res.send ('eliminando pacientes');
})

router.put('/lab', (req,res)=>{
    res.send ('actualizando pacientes');
})

module.exports = router;