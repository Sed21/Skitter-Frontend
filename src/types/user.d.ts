export type Username = String;
export type Password = String;
export type Token = String;
export type Id = UUID;

export type AvailableRoles = 'Creator' | 'Listener';
export type AllRoles = 'Admin' | AvailableRoles;

export type UserData = {
    id: UUID;
    username: Username,
    role: AllRoles,
    profile_description: String,
    signup_date: Date
}
