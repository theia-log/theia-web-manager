class ResponseDto {
    status = 200;
    code = '';
    data = null;

    set(status = 200, code = '', data = null) {
        this.status = status;
        this.code = code;
        this.data = data;
        return this;
    }
}

export default ResponseDto;