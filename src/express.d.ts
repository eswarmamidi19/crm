import * as express from "express-serve-static-core";

declare global {
    namespace Express {
        interface Request {
            loggedInSudoUserId: string | " ",
            user_id: string | " ",
        }
    }
}


// DTO'S :  Data Transfer Objects 
export interface CreateSudoUserDto {
    name: string;
    email: string;
    password: string;
    phone_number: string;
    role: 1 | 2 | 3 | 4;
    capabilities: string[];
}

export interface UpdateSudoUserDto {
    name: string;
    email: string;
    phone_number: string;
    role: 1 | 2 | 3 | 4;
    password: string;
    capabilities: string[];
}


export interface LoginSudoUserDto {
    email: string;
    password: string;
}

export interface forgetPasswordDto {
    email: string;
}

export interface ResetPasswordDto {
    token: string;
    password: string;
    verify_password: string;
}

export interface CreateRegionDto {
    name: string;
    description: string;
    polygon: { lat: number; lng: number }[];
}
export type UpdateRegionDto = Partial<CreateRegionDto>


//Param Types
export interface SudoUserParam {
    id: string
};
