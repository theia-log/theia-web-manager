import Api from '../helper/Api';
import History from '../helper/History';
import NotificationManager from '../helper/NotificationManager';
import UserRoleEnum from '../enum/UserRoleEnum';

class AuthService {

    authenticated = false;
    user = null;

    api = Api.getInstance();
    history = History.getInstance();
    notificationManager = NotificationManager.getInstance();

    constructor() {
        this.api.onUnautorized.add(this.onUnautorized, this);
        let data = null;
        try {
            data = JSON.parse(atob(localStorage.getItem(btoa('user:auth'))));
        } catch (error) {}
        if (data !== null) {
            this.authenticated = true;
            this.user = data;
            this.api.addToken(data.token);
        }
    }

    login(auth, password) {
        return this.api.fetch('GET', `/api/auth?auth=${auth}&password=${password}`).then((response) => {
            this.authenticate(response.data);
            return response;
        });
    }

    logout() {
        localStorage.removeItem(btoa('user:auth'));
        this.authenticated = false;
        this.user = null;
        this.api.removeToken();
        this.history.forward('/');
    }

    authenticate(data) {
        localStorage.setItem(btoa('user:auth'), btoa(JSON.stringify(data)));
        this.authenticated = true;
        this.user = data;
        this.api.addToken(data.token);
        this.history.forward('/');
        this.notificationManager.success('Successfully logged in!');
    }

    onUnautorized() {
        this.logout();
        this.notificationManager.warning('Session expired!');
    }

    isAuthenticated(userRoleList = null) {
        // if (userRoleList === null) {
        //     return this.authenticated;
        // } else if (this.authenticated) {
        //     let roleMask = UserRoleEnum.get(this.user.role);
        //     if (typeof roleMask === 'undefined') return false;
        //     for (let ROLE of userRoleList) {
        //         if (roleMask.has(ROLE)) {
        //             return true;
        //         }
        //     }
        // }
        // return false;
        return true;
    }
}

var instance = null;
AuthService.getInstance = function() {
    if (instance === null) {
        instance = new AuthService();
    }
    return instance;
}

export default AuthService;