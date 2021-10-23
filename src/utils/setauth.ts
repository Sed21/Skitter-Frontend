import {SignInResponse, SignUpResponse} from "../types";

export function setAuthData(values: SignInResponse | SignUpResponse): void {
  localStorage.setItem('id', values.id);
  localStorage.setItem('role', values.role);
  localStorage.setItem('token', values.token);
  localStorage.setItem('username', values.username);
  localStorage.setItem('token_expr_date', String(values.token_expr_date));
  localStorage.setItem('isAuthed', 'true');
}