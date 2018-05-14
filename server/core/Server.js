import express from 'express';
import ws from 'express-ws';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import Logger from '../helper/Logger';

class Server {

    logger = Logger.getInstance();
    express = ws(express());
    controllerMap = {};

    constructor() {
        this.express.app.use(cors());
        this.express.app.use(bodyParser.json());
        this.express.app.disable('x-powered-by');
    }

    addMiddleware(route, middleware) {
        this.express.app.use(route, middleware);
    }

    addController(route, controller) {
        this.controllerMap[route] = new controller(this.express, route);
    }

    addStatic(route, dir, options = {}) {
        this.express.app.use(route, express.static(path.join(__dirname, path.join('../', dir)), options));
    }

    run(port) {
        this.express.app.listen(port);
        this.logger.info('Server started on port ' + port);
    }
}

export default Server;