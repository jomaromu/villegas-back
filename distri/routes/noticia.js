"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const moment_1 = __importDefault(require("moment"));
// instanciar el servidor
const rutaNoticia = express_1.Router();
//  modelos
const noticiaModel_1 = __importDefault(require("../model/noticiaModel"));
rutaNoticia.get('/', (req, resp) => {
    const date = moment_1.default().format('YYYY-MM-DD');
    resp.json({
        ok: date
    });
});
// nueva noticia
rutaNoticia.post('/nueva-noticia', (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    // resp.json({
    //     img: req.files?.img
    // });
    var _a;
    const img = (_a = req.files) === null || _a === void 0 ? void 0 : _a.img;
    const titulo = req.body.titulo;
    const descripcion = req.body.descripcion;
    // promesas
    const procesaImg = new Promise((resolve, reject) => {
        let rutaImg = '';
        const ms = new Date().getMilliseconds();
        const random = Math.round(Math.random() * 100);
        const nombreImg = `${ms}-${random}`;
        const rutaData = path_1.default.resolve(__dirname, `../images/`);
        if (!fs_1.default.existsSync(rutaData)) {
            fs_1.default.mkdir(rutaData, { recursive: true }, (err) => {
                if (err) {
                    reject(`Error al crear la ruta de la noticia`);
                }
                else {
                    img.mv(`${rutaData}/${nombreImg}.png`, (err) => {
                        if (err) {
                            reject(`Error al guardar img`);
                        }
                        else {
                            rutaImg = `${rutaData}/${nombreImg}.png`;
                            resolve(rutaImg);
                        }
                    });
                }
            });
        }
        else {
            img.mv(`${rutaData}/${nombreImg}.png`, (err) => {
                if (err) {
                    reject(`Error al guardar img`);
                }
                else {
                    rutaImg = `${rutaData}/${nombreImg}.png`;
                    resolve(rutaImg);
                }
            });
        }
    });
    const ruta = yield procesaImg;
    // const date = moment().format('YYYY-MM-DD');
    const date = moment_1.default().format('LL');
    const nuevaNoticia = new noticiaModel_1.default({
        img: ruta,
        titulo: titulo,
        descripcion: descripcion,
        fechaCreacion: date
    });
    // guardar la noticia
    nuevaNoticia.save((err, noticiaDB) => {
        if (err) {
            return resp.json({
                ok: false,
                mensaje: `No se pudo crear la noticia`,
                err
            });
        }
        else {
            return resp.json({
                ok: true,
                mensaje: `Noticia creada`,
                noticiaDB
            });
        }
    });
}));
// obtener todas las noticias
rutaNoticia.get('/obtener-noticias', (req, resp) => {
    noticiaModel_1.default.find({}, (err, noticiasDB) => {
        if (err) {
            return resp.json({
                ok: false,
                mensaje: `Error interno`,
                err
            });
        }
        else {
            return resp.json({
                ok: true,
                mensaje: `Todas las noticias`,
                noticiasDB
            });
        }
    });
});
rutaNoticia.get('/obtener-img', (req, resp) => {
    const idImg = req.query.dataImg;
    const data = path_1.default.resolve(__dirname, `../images/${idImg}`);
    return resp.sendFile(data);
});
// eliminar una noticia
rutaNoticia.delete('/borrar-noticia', (req, resp) => {
    const id = req.get('id');
    noticiaModel_1.default.findByIdAndRemove(id, { new: true }, (err, noticiaDB) => {
        if (err) {
            return resp.json({
                ok: false,
                mensaje: `No se pudo borrar la noticia`,
                err
            });
        }
        else {
            return resp.json({
                ok: true,
                mensaje: `Noticia borrada`,
                noticiaDB
            });
        }
    });
});
exports.default = rutaNoticia;
