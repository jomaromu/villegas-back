import express from 'express';
import { SERVER_PORT, hostName } from '../global/environment';
import http from 'http';

// exportar clase
export class Server {

    // propiedades
    public app: express.Application;
    public port: Number;
    public httpServer: http.Server;
    public hostName: string;

    constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.hostName = hostName;
        this.httpServer = new http.Server(this.app);
    }

    start(callback: Function): void {
        this.httpServer.listen(this.port, callback());
    }
}