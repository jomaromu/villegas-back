import { Server } from './classes/server';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import { SERVER_PORT, hostName } from './global/environment';

// rutas
import rutaNoticia from './routes/noticia';
import rutaCorreo from './routes/correo';

// instancia del servidor 
const server = new Server();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// body parser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// file upload
server.app.use(fileUpload());

// cors
server.app.use(cors({ origin: true, credentials: true }));


// conexion local
// mongoose.connect('mongodb://127.0.0.1:27017/villegasDB', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, (err) => {
//     if (err) throw err;
//     console.log('Base de datos Online');
// });
mongoose.connect('mongodb://127.0.0.1:27017/villegasDB', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, (err) => {
    if (err) throw err;
    console.log('Base de datos Online');
});

// usar las rutas
// server.app.use('/', rutaNoticia);
// server.app.use('/', rutaNoticia);
server.app.use('/noticia', rutaNoticia);
server.app.use('/correo', rutaCorreo);

// correr el servidor
server.start(() => {
    console.log(`Servidor corriendo en el puerto: ${SERVER_PORT}`);
});