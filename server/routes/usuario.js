
const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore');

app.get('/', function (req, res) {
    res.json('Hello World')
});

//====================================
// OBTENER USUARIOS
// ===================================
app.get('/usuarios', function (req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado:true }, 'nombre email role  estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }

            Usuario.count({ estado:true }, (err, cantidad) => {

                res.json({
                    ok: true,
                    usuarios,
                    cantidad
                })

            })


        })
})


app.get('/usuario', function (req, res) {
    res.json('Get usuario local!!!')
})

//====================================
// INSERTAR UN USUARIO
// ===================================
app.post('/usuario', function (req, res) {

    let body = req.body;


    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    // Método de mongoose que devuelve o un error o el usuario insertado en base de datos;
    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        // usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })



});

//====================================
// MODIFICAR UN USUARIOS
// ===================================
app.put('/usuario/:id', function (req, res) {

    let id = req.params.id;

    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        res.json({
            ok: true,
            usuarioDB
        });


    })



});


//========================================
// INACTIVAR  UN USUARIOS DE LA BASE DE DATOS
// =======================================
app.delete('/usuario/:id', function (req, res) {

    let id = req.params.id;
    let cambiaEstado = {
        estado : false
    };

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        };

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: { message: 'Usuario no encontrado' }
            });
        }

        res.json({
            ok: true,
            usuarioDB
        });

    });

});




//========================================
// ELIMINAR  UN USUARIOS DE LA BASE DE DATOS
// =======================================
/*app.delete('/usuario/:id', function (req, res) {

    let id = req.params.id;
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: { message: 'Usuario no encontrado' }
            });
        }

        res.json({
            ok: true,
            usuarioBorrado
        });


    })

});*/



module.exports = app;