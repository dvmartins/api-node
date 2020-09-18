require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')


mongoose.connect(process.env.DATABASE_STRING, { useNewUrlParser: true, useUnifiedTopology:true})
const db = mongoose.connection
db.on('error', (err)=> console.log(err))
db.once('open', ()=> console.log('Database Connected'))

app.use(express.json())

const alunosRouter = require('./routes/alunos')
app.use('/alunos', alunosRouter)


app.listen(3001, ()=> console.log('Servidor running!'))