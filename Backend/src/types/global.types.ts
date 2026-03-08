export type LogContent =  {
    method: string;
    url: string;
    host: string | undefined;
    ms: number;
}

export enum userRole  {
    BUYER ="buyer", 
    SELLER = "seller"
}

export enum userStatus {
    VERIFIED = "verified",
    NOT_VERIFIED = "not_verified"
}