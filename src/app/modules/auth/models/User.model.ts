import { FormControl } from "@angular/forms";

export enum Roles {
    ADMIN = 'admin',
    BASIC = 'basic'
}

export enum RolesID {
    'admin' = 1,
    'basic' = 2
}
export interface UserRole {
    readonly id: number;
    readonly name: Roles;
}

export class User {
    public name: string;
    public lastName: string;
    public email: string;
    public phone?: number;
    public role?: UserRole;

    constructor(name: string, lastName: string, email: string, phone?: number){
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.role = {
            id: RolesID[Roles.BASIC],
            name: Roles.BASIC
        }
    }
}

export interface RegisterUser {
    name: string;
    lastName: string;
    email: string;
    phone?: number;
    password: string;
    // agregar repassword
}

export interface RegisterForm {
    name: FormControl<string | null>;
    lastName: FormControl<string | null>;
    email: FormControl<string | null>;
    phone?: FormControl<number | null>;
    password: FormControl<string | null>;
    // agregar repassword
}