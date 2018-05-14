import { DECORATOR } from 'decorator-wrapper';
import ResponseDto from '../dto/ResponseDto';

class ServiceResponse {
    methodCalled(method, methodName, args, argNames, scope) {
        let response = args[1];
        let service = method.apply(scope, args);
        if (typeof service['then'] === 'function') {
            service.then((responseDto) => {
                response.status(200).json(responseDto);
            }).catch((responseDto) => {
                response.status(200).json(responseDto);
            });
        } else {
            let responseDto = new ResponseDto();
            responseDto.status = 500;
            responseDto.code = 'bad_service_response_implementation';
            response.status(200).json(responseDto);
        }
        
    }
}

export default DECORATOR(ServiceResponse);