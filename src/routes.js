const express = require('express');
const routes = express.Router();
const crypto = require('crypto');
const connection = require('./database/connection');

routes.get('/users',async(req, res)=>{
    const users = await connection('users').select('*');
    res.json(users);
});

routes.post('/users/:id', async(req, res)=>{
    const {id} = req.params;
    const user = await connection('users').where('id',id).select('*');
    res.json(user);
});

routes.post('/users',async(req, res)=>{
    const {nome, email, idade, empresa} = req.body;
    const id = crypto.randomBytes(4).toString('HEX');
    await connection('users').insert({
        id,
        nome,
        email,
        idade,
        empresa
    });
    res.json({id});
});


module.exports = routes;