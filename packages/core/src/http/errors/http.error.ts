export class HttpError<ResponseData> extends Error {
    constructor(
        readonly data: ResponseData
    ){
        super();
    }
}