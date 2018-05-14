import Controller from '../core/Controller';
import ServiceResponse from '../decorator/ServiceResponse';
import UserService from '../service/UserService';

class AuthController extends Controller {

    userService = null;

    @ServiceResponse
    get(request, response) {
        let { auth, password } = request.query;
        return this.userService.login(auth, password);
    }

    @ServiceResponse
    post(request, response) {
        let { username, mail, password } = request.body;
        return this.userService.signup(username, mail, password);
    }
}

export default AuthController;