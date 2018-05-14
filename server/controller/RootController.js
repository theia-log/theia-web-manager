import path from 'path';
import UrlPattern from 'url-pattern';
import Controller from '../core/Controller';
import webappConfig from '../config/config.webapp';

class RootController extends Controller {
    
    get(request, response) {
        var status = 404;
        var indexPath = path.join(process.env.ROOT, process.env.WEBAPP_INDEX);
        var pattern = new UrlPattern(request.path);
        for (let i = 0; i < webappConfig.length; i++) {
            if (pattern.match(webappConfig[i].path) !== null) {
                status = webappConfig[i].code;
                break;
            }    
        }
        response.status(status).sendFile(indexPath);
    }
}

export default RootController;