export enum RolesNames {
    ADMIN = 'admin',
    BASIC = 'basic'
}

export const RolesID = Object.freeze({
    [RolesNames.ADMIN] : 1,
    [RolesNames.BASIC] : 2,
})

export interface UserRole {
    readonly id  : number;
    readonly name: RolesNames;
}