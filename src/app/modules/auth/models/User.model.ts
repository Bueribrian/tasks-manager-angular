import { FormControl } from "@angular/forms";
import { RolesID, RolesNames, UserRole } from "./Role.model";

interface UserProps {
    id       : number;
    username : string;
    firstName: string; 
    lastName : string; 
    email    : string;
    phone?   : number;
}

export class User {
    public id        : number;
    public username  : string;
    public firstName : string;
    public lastName  : string;
    public email     : string;
    public phone?    : number;
    public blocked?  : boolean;
    public confirmed?: boolean;
    public role?     : UserRole;
    public updateAt? : string;
    public createdAt?: string;

    constructor({id, username, firstName, lastName, email, phone}: UserProps) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.role = {
            id: RolesID[RolesNames.BASIC],
            name: RolesNames.BASIC
        }
    }
}

export class UserLogged {
    public readonly jwt: string;
    public user : User;

    constructor(jwt: string, user: User){
        this.jwt = jwt;
        this.user = new User(user);
    }
}

export interface RegisterUser {
    username : string;
    firstName: string;
    lastName : string;
    email    : string;
    phone?   : number;
    password : string;
    // agregar repassword
}

export interface RegisterForm {
    username : FormControl<string | null>;
    firstName: FormControl<string | null>;
    lastName : FormControl<string | null>;
    email    : FormControl<string | null>;
    phone?   : FormControl<number | null>;
    password : FormControl<string | null>;
    // agregar repassword
}