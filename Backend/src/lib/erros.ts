export class NotFoundError extends Error{
    status: number;
    data:any;
    constructor(message:string, data?:any){
        super(message);
        this.status = 404;
        this.name = "Not Found Error";
        this.data = data;
    }
}
export class BadRequestError extends Error {
	status: number;
	data: any;
	constructor(message: string, data?: any) {
		super(message);
		this.status = 400;
		this.name = "BadRequestError";
		this.data = data;
	}
}
export class AuthenticationError extends Error {
	status: number;

	constructor(message: string) {
		super(message);
		this.status = 401;
		this.name = "AuthenticationError";
	}
}

export class ForbiddenError extends Error {
	status: number;
	constructor(message: string) {
		super(message);
		this.status = 403;
		this.name = "ForbiddenError";
	}
}
