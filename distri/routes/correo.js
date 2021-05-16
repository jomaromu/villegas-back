"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const nodemailer_1 = require("nodemailer");
// instanciar el servidor
const rutaCorreo = express_1.Router();
rutaCorreo.get('/', (req, resp) => {
    resp.json({
        ok: 'ok'
    });
});
rutaCorreo.post('/', (req, resp) => {
    const transport = nodemailer_1.createTransport({
        service: 'gmail',
        auth: {
            user: 'jroserodevpa@gmail.com',
            pass: '12345678Mm&',
        }
    });
    const mailOptions = {
        from: `correo <jroserodevpa@gmail.com>`,
        to: 'jomaromu2@gmail.com',
        subject: `Consulta desde Fabio Villegas`,
        text: 'algo',
        html: `<h3>Prueba</h3>`
    };
    transport.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            resp.json({
                ok: false,
                mensaje: 'Correo no enviado'
            });
        }
        else {
            console.log(info);
            resp.json({
                ok: true,
                mensaje: 'Correo enviado'
            });
        }
    });
});
exports.default = rutaCorreo;
