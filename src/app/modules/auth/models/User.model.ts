interface UserRole {
    readonly id: number;
    readonly name: 'admin' | 'basic';
}

export default class User {
    public name: string;
    public lastName: string;
    public email: string;
    public phone?: number;
    public role: UserRole;

    constructor(name: string, lastName: string, email: string, phone?: number){
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.role = {
            id: 2,
            name: 'basic'
        }
    }
}

export interface LoginUser {
    email: string;
    password: string;
}

export interface RegisterUser extends User {
    password: string;
}