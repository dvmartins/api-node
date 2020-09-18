const mongoose = require('mongoose')

const alunoSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userDate: {
        type: Date,
        required: true,
        default: Date.now
        
    }
})

module.exports = mongoose.model('Aluno', alunoSchema)