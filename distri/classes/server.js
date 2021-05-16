"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const environment_1 = require("../global/environment");
const http_1 = __importDefault(require("http"));
// exportar clase
class Server {
    constructor() {
        this.app = express_1.default();
        this.port = environment_1.SERVER_PORT;
        this.hostName = environment_1.hostName;
        this.httpServer = new http_1.default.Server(this.app);
    }
    start(callback) {
        this.httpServer.listen(this.port, callback());
    }
}
exports.Server = Server;
