const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const Usuario = require('../models/usuario');



app.post('/login', (req, res) => {


    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        };

        if (!usuarioDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrecto'
                }
            });
        }

        if (!usuarioDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrecto'
                }
            });
        }

        //Comprobar la contraseña
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {

            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Contraseña incorrecta'
                }
            });

        }

        //Payload
        let token = jwt.sign({
            usuarioDB: usuarioDB
        }, process.env.SEED, { expiresIn:process.env.CADUCIDAD_TOKEN });


        res.json({
            ok: true,
            usuarioDB,
            token
        })

    })



})



module.exports = app;

