export type User = {
  "id": string,
  "username": string,
  "role": string,
  "profile_description": string | null,
  "signup_date": Date,
  "last_signin": Date
}

export type UserResponse = {
  found: number,
  users: User[]
}

export type ParsedUsers = {
  [id: String]: any
}