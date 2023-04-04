const express = require('express')
const routes = express.Router()
const instructors = require('./app/constrollers/instructors')//sempre colocar o require para puxar o arquivo
const members = require('./app/constrollers/members')//sempre colocar o require para puxar o arquivo

routes.get('/',function(req,res){
    return res.redirect('/instructors')
})
routes.get('/instructors', instructors.index)
routes.get('/instructors/create',instructors.create)
routes.get('/instructors/:id', instructors.show)
routes.get('/instructors/:id/edit', instructors.edit)
routes.post('/instructors', instructors.post)
//HTTP VERBS
//GET = Receber RESOURCE 
//POST = Criar ou Salvar um novo RESOURCE com dados enviados
//PUT = atualizar Resource
//DELETE= deletar Resource
routes.put("/instructors",instructors.put)
routes.delete("/instructors",instructors.delete)



routes.get('/members', members.index)
routes.get('/members/create', members.create)
routes.get('/members/:id', members.show)
routes.get('/members/:id/edit', members.edit)
routes.post('/members', members.post)
//HTTP VERBS
//GET = Receber RESOURCE 
//POST = Criar ou Salvar um novo RESOURCE com dados enviados
//PUT = atualizar Resource
//DELETE= deletar Resource
routes.put("/members",members.put)
routes.delete("/members",members.delete)


module.exports = routes