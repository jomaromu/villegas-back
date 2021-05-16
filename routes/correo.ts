import { Router, Request, Response } from 'express';
import { createTransport } from 'nodemailer';

// instanciar el servidor
const rutaCorreo = Router();

rutaCorreo.get('/', (req: Request, resp: Response) => {
    resp.json({
        ok: 'ok'
    });
});


rutaCorreo.post('/', (req: Request, resp: Response) => {

    const transport = createTransport({
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
    }

    transport.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            resp.json({
                ok: false,
                mensaje: 'Correo no enviado'
            });
        } else {
            console.log(info);
            resp.json({
                ok: true,
                mensaje: 'Correo enviado'
            });
        }
    });
});

export default rutaCorreo;

