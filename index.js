const express  = require("express")
const exhb = require("express-handlebars")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const app = express()


// CONFIGS
    // MONGOOSE
        const bd = require("./modules/LinkBd")
        mongoose.connect(bd.link).then(()=>{
            console.log("Conectado ao Mongo DB com sucesso!")
        }).catch((err)=>{
            console.log("Erro ao tentar conectar-se ao Mongo DB,\nErro: "+err)
        })
    // HANDLEBARS
        app.engine("handlebars",exhb.engine({defaultLayout:"main"}))
        app.set("view engine",'handlebars')
    // BODY-PARSER
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({extended:false}))

    // ROTAS IMPORTADAS
        const admin = require("./routes/admin")

        app.use("/admin",admin.router)


// ROTAS

app.get("/",(req,res)=>{
    res.render("home")
})


// SERRVIDOR

app.listen(9090 || process.env.PORT,()=>{console.log("Servidor iniciado com sucesso!")})

