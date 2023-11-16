const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
// BANCO DE DADOS 
require("../modules/RegistroBd")
const mongoose = require("mongoose")
const modelRegistro = mongoose.model("Registro")


router.get("/",(req,res)=>{

    res.render("admin/home")

});
router.get("/cadastro",(req,res)=>{
    
    res.render("admin/cad")
    
});
router.post("/cadastro/novo",(req,res)=>{
    
    modelRegistro.findOne({Email:req.body.email}).lean().then((aqv)=>{

        if(aqv){
            console.log("Você já é registrado")
            res.redirect("/admin/cadastro")
        }else{
            new modelRegistro({
                Nome:req.body.nome,
                Email:req.body.email,
                Telefone:req.body.telefone,
            }).save().then(()=>{
                console.log("Registrado com sucesso!")
                res.redirect("/admin/usuarios")
            }).catch((err)=>{
                console.log("Erro ao tentar registra-ló,erro: "+err)
                res.redirect("/admin/cadastro")
        
            })

        }
        

    })

});
router.get("/usuarios",(req,res)=>{
    modelRegistro.find().lean().then((aqv)=>{

        res.render("admin/users",{aqv:aqv})

    })
});
router.get("/usuario/edit/:id",(req,res)=>{

    modelRegistro.findOne({_id:req.params.id}).lean().then((aqv)=>{

        res.render("admin/edit",{aqv:aqv})

    })

});
router.post("/usuario/edit/save",(req,res)=>{

   modelRegistro.findOne({Email:req.body.email}).then((aqv)=>{
        aqv.Nome = req.body.nome,
        aqv.Email = req.body.email,
        aqv.Telefone = req.body.telefone,
        aqv.save().then(()=>{
            console.log("Usuário editado com sucesso!")
            res.redirect("/admin/usuarios")
        }).catch((err)=>{
            console.log("Erro ao tentar editar usuário,err: "+err)
            res.redirect("/admin/usuarios")
        })
   })

});
router.get("/usuario/deletar/:id",(req,res)=>{

    modelRegistro.deleteOne({_id:req.params.id}).then(()=>{

        console.log("Usuário deletado com sucesso!")
        res.redirect("/admin/usuarios")
    })
});
module.exports = {router}