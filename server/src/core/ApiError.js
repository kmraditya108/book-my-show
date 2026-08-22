export class ApiError extends Error{
    constructor(message){
        super(message);
    }
}

export class BadRequestError extends ApiError{
    constructor(message="Bad Request"){
        super(message);
        this.status = 400;
    }
}

export class NotFoundError extends ApiError{
    constructor(message="Not found"){
        super(message);
        this.status=404;
    }
}

export class InternalServerError extends ApiError{
    constructor(message="Internal Error"){
        super(message);
        this.status=500;
    }
}

export class AuthenticationError extends ApiError{
    constructor(message="Authentication Error"){
        super(message);
        this.status=500;
    }
}