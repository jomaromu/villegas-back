import mongoose from 'mongoose';

// crear el esquema
const Schema = mongoose.Schema;

const Noticia = new Schema({
    id: { type: Schema.Types.ObjectId },
    img: { type: String },
    titulo: { type: String },
    descripcion: { type: String },
    fechaCreacion: { type: String }
});

export = mongoose.model('Noticia', Noticia);