class UserService {

    signup(username = null, mail = null, password = null) {
        // TODO: implement this
    }

    login(auth = null, password = null) {
        // TODO: implement this
    }

    canAccess(token, userRoleList = null) {
        // TODO: implement this
    }
}

let instance = null;
UserService.getInstance = () => {
    if (instance === null) {
        instance = new UserService();
    }
    return instance;
};

export default UserService;