export type User = {
  "id": string,
  "username": string,
  "profile_description": string | null,
  "signup_date": Date,
  "last_signin": Date
}

export type UserResponse = {
  found: number,
  "users": User[]
}