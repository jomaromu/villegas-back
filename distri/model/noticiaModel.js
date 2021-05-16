"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
// crear el esquema
const Schema = mongoose_1.default.Schema;
const Noticia = new Schema({
    id: { type: Schema.Types.ObjectId },
    img: { type: String },
    titulo: { type: String },
    descripcion: { type: String },
    fechaCreacion: { type: String }
});
module.exports = mongoose_1.default.model('Noticia', Noticia);
