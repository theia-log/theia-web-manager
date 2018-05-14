import { DECORATOR } from 'decorator-wrapper';

class Promised {
    
    methodCalled(method, methodName, args, argNames, scope) {
        try {
            let value = method.apply(scope, args);
            if (typeof value['then'] === 'function') {
                return value;
            } else {
                return new Promise((resolve, reject) => {
                    resolve(e);
                });
            }
        } catch(e) {
            return new Promise((resolve, reject) => {
                reject(e);
            });   
        }
    }
}

export default DECORATOR(Promised);