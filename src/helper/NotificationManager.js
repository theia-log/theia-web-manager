import { toast } from 'react-toastify';

class NotificationManager {
    
    autoClose = 3000;

    classic(message) {
        toast(message, {
            type: toast.TYPE.DEFAULT,
            autoClose: this.autoClose,
            hideProgressBar: true,
            closeButton: false,
            position: toast.POSITION.BOTTOM_RIGHT

        });
    }

    info(message) {
        toast(message, {
            type: toast.TYPE.INFO,
            autoClose: this.autoClose,
            hideProgressBar: true,
            closeButton: false,
            position: toast.POSITION.BOTTOM_LEFT
        });
    }

    success(message) {
        toast(message, {
            type: toast.TYPE.SUCCESS,
            autoClose: this.autoClose,
            hideProgressBar: true,
            closeButton: false,
            position: toast.POSITION.BOTTOM_LEFT
        });
    }

    warning(message) {
        toast(message, {
            type: toast.TYPE.WARNING,
            autoClose: this.autoClose,
            hideProgressBar: true,
            closeButton: false,
            position: toast.POSITION.BOTTOM_LEFT
        });
    }
    
    error(message) {
        toast(message, {
            type: toast.TYPE.ERROR,
            autoClose: this.autoClose,
            hideProgressBar: true,
            closeButton: false,
            position: toast.POSITION.BOTTOM_LEFT
        });
    }
}

var instance = null;
NotificationManager.getInstance = function() {
    if (instance === null) {
        instance = new NotificationManager();
    }
    return instance;
};

export default NotificationManager;