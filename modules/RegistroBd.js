const mongoose = require("mongoose")


const usuario = new mongoose.Schema({
    Nome:String,
    Email:String,
    Telefone:Number,
})

mongoose.model("Registro",usuario)