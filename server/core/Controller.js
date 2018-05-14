import Logger from '../helper/Logger';

class Controller {

    logger = Logger.getInstance();
    express = null;

    constructor(express, route) {
        this.express = express;
        this.logger.info('[' + route + '] endpoint invoked!');
        express.app.get(route, (req, res) => this.get(req, res));
        express.app.post(route, (req, res) => this.post(req, res));
        express.app.put(route, (req, res) => this.put(req, res));
        express.app.delete(route, (req, res) => this.delete(req, res));
        if (typeof this.websocket === 'function') {
            this.logger.debug('[' + route + '] websocket invoked!');
            express.app.ws(route, (ws, router) => {
                this.websocket(ws, router);
            });
        }
        this.helper = {
            getClients: (param) => this._getClients(express.app.getWss(route).clients, route, param),
        }
        if (typeof this.init === 'function') {
            this.init.call(this);
        }
    }
  
    get(request, response) {
        response.status(405).send();
    }
  
    post(request, response) {
        response.status(405).send();
    }
  
    put(request, response) {
        response.status(405).send();
    }
  
    delete(request, response) {
        response.status(405).send();
    }

    _getClients(allClients, path, param = null) {
        var out = [];
        let clients = Array.from(allClients);
        for (let i = 0; i < clients.length; i++) {
            var clientPath = clients[i].upgradeReq.route.path;
            clientPath = clientPath.substring(0, clientPath.length - 11);
            if (clientPath === path) {
                out.push(clients[i]);
            }
        }
        if (param === null) {
            return out;
        } else {
            return this._getGroups(out, param);
        }
        
    }

    _getGroups(clients, param) {
        var out = {
            list: [],
            map: {}
        };
        for(let i = 0; i < clients.length; i++) {
            if (typeof clients[i].upgradeReq.params[param] === 'undefined') {
                return clients;
            }
            if (typeof out.map[clients[i].upgradeReq.params[param]] === 'undefined') {
                out.map[clients[i].upgradeReq.params[param]] = [];
                out.list.push(clients[i].upgradeReq.params[param]);
            }
            out.map[clients[i].upgradeReq.params[param]].push(clients[i]);
        }
        return out;
    }
}
  
export default Controller;