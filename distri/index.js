"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./classes/server");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const environment_1 = require("./global/environment");
// rutas
const noticia_1 = __importDefault(require("./routes/noticia"));
const correo_1 = __importDefault(require("./routes/correo"));
// instancia del servidor 
const server = new server_1.Server();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// file upload
server.app.use(express_fileupload_1.default());
// cors
server.app.use(cors_1.default({ origin: true, credentials: true }));
// conexion local
// mongoose.connect('mongodb://127.0.0.1:27017/villegasDB', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, (err) => {
//     if (err) throw err;
//     console.log('Base de datos Online');
// });
mongoose_1.default.connect('mongodb://127.0.0.1:27017/villegasDB', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, (err) => {
    if (err)
        throw err;
    console.log('Base de datos Online');
});
// usar las rutas
// server.app.use('/', rutaNoticia);
// server.app.use('/', rutaNoticia);
server.app.use('/noticia', noticia_1.default);
server.app.use('/correo', correo_1.default);
// correr el servidor
server.start(() => {
    console.log(`Servidor corriendo en el puerto: ${environment_1.SERVER_PORT}`);
});
