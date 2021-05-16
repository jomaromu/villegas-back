import { Router, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import fs from 'fs';
import moment from 'moment';

// instanciar el servidor
const rutaNoticia = Router();

//  modelos
import NoticiaModel from '../model/noticiaModel';

rutaNoticia.get('/', (req: Request, resp: Response) => {
    const date = moment().format('YYYY-MM-DD');
    resp.json({
        ok: date
    });
});

// nueva noticia
rutaNoticia.post('/nueva-noticia', async (req: Request, resp: Response) => {

    // resp.json({
    //     img: req.files?.img
    // });

    const img: any = req.files?.img;
    const titulo = req.body.titulo;
    const descripcion = req.body.descripcion;

    // promesas
    const procesaImg = new Promise((resolve, reject) => {

        let rutaImg: String = '';
        const ms = new Date().getMilliseconds();
        const random = Math.round(Math.random() * 100);
        const nombreImg = `${ms}-${random}`;

        const rutaData = path.resolve(__dirname, `../images/`);

        if (!fs.existsSync(rutaData)) {
            fs.mkdir(rutaData, { recursive: true }, (err) => {

                if (err) {
                    reject(`Error al crear la ruta de la noticia`);
                } else {
                    img.mv(`${rutaData}/${nombreImg}.png`, (err: any) => {
                        if (err) {
                            reject(`Error al guardar img`);
                        } else {
                            rutaImg = `${rutaData}/${nombreImg}.png`;
                            resolve(rutaImg);
                        }
                    });
                }
            });

        } else {

            img.mv(`${rutaData}/${nombreImg}.png`, (err: any) => {
                if (err) {
                    reject(`Error al guardar img`);
                } else {
                    rutaImg = `${rutaData}/${nombreImg}.png`;
                    resolve(rutaImg);
                }
            });
        }
    });

    const ruta = await procesaImg;
    // const date = moment().format('YYYY-MM-DD');
    const date = moment().format('LL');

    const nuevaNoticia = new NoticiaModel({
        img: ruta,
        titulo: titulo,
        descripcion: descripcion,
        fechaCreacion: date
    });

    // guardar la noticia
    nuevaNoticia.save((err: any, noticiaDB: any) => {
        if (err) {
            return resp.json({
                ok: false,
                mensaje: `No se pudo crear la noticia`,
                err
            });
        } else {
            return resp.json({
                ok: true,
                mensaje: `Noticia creada`,
                noticiaDB
            });
        }
    })
});

// obtener todas las noticias
rutaNoticia.get('/obtener-noticias', (req: Request, resp: Response) => {

    NoticiaModel.find({}, (err: any, noticiasDB: any) => {

        if (err) {
            return resp.json({
                ok: false,
                mensaje: `Error interno`,
                err
            });
        } else {
            return resp.json({
                ok: true,
                mensaje: `Todas las noticias`,
                noticiasDB
            });
        }
    })
});

rutaNoticia.get('/obtener-img', (req: Request, resp: Response) => {

    const idImg = req.query.dataImg;

    const data = path.resolve(__dirname, `../images/${idImg}`);
    return resp.sendFile(data);
});

// eliminar una noticia
rutaNoticia.delete('/borrar-noticia', (req: Request, resp: Response) => {
    const id = req.get('id');

    NoticiaModel.findByIdAndRemove(id , { new: true }, (err, noticiaDB) => {

        if (err) {
            return resp.json({
                ok: false,
                mensaje: `No se pudo borrar la noticia`,
                err
            });

        } else {
            return resp.json({
                ok: true,
                mensaje: `Noticia borrada`,
                noticiaDB
            });
        }
    });
});

export default rutaNoticia;