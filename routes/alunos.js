const express = require('express')
const { restart } = require('nodemon')
const router = express.Router()
const Aluno = require('../models/aluno')

router.get('/', async (req, res)=>{
    try {
        const alunos = await Aluno.find()
        res.json(alunos)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/:id', getAluno, (req, res)=>{
    res.json(res.aluno)
})



router.post('/', async (req, res)=>{
    const aluno = new Aluno({
        userName: req.body.userName,
        userEmail: req.body.userEmail
       
    })

    try {
        const newAluno = await aluno.save()
        res.status(201).json(newAluno)
    } catch (error) {
        res.status(400).json({message: error.message})

    }
})


router.patch('/:id', getAluno, async (req, res)=>{
    if(req.body.userName != null){
        res.aluno.userName = req.body.userName
    }
    if(req.body.userEmail != null){
        res.aluno.userEmail = req.body.userEmail
    }
    try {
        const updateAluno = await res.aluno.save()
        res.json(updateAluno)
    } catch (error) {
        res.status(400).json({message: error.message})
    }

})


router.delete('/:id', getAluno, async (req, res)=>{
   try {
       await res.aluno.remove()
       res.json({message: 'Aluno was deleted'})
   } catch (error) {
       res.status(500).json({message: error.message})
   }
})

async function getAluno(req, res, next){
   try {
       aluno = await Aluno.findById(req.params.id)
       if(aluno == null){
            return res.status(404).json({message: 'aluno not found!'})
       }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

    res.aluno = aluno
    next()
}

module.exports = router