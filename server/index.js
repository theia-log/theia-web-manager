import env from './env';
import Server from './core/Server';

import AuthController from './controller/AuthController';
import RootController from './controller/RootController';


env();

let server = new Server();

server.addStatic('/static', process.env.WEBAPP_STATIC);

server.addController('/api/auth', AuthController);
server.addController('/*', RootController);

server.run(process.env.PORT);