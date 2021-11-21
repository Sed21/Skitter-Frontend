import { fetchAndParse } from "../api";
import { apiUrl, headers } from "./config";
import {UserResponse} from "../types/admin";

export function adminDeleteContent(content_id: string): Promise<any>{
  const url = apiUrl + `/api/admin/content/delete/${encodeURI(content_id)}`;
  headers.Authorization = localStorage.getItem('token') || '';
  return fetchAndParse<any>(url, {method: "DELETE",  headers})
}

export function adminDeleteUser(user_id: string): Promise<any>{
  const url = apiUrl + `/api/admin/user/delete/${encodeURI(user_id)}`;
  headers.Authorization = localStorage.getItem('token') || '';
  return fetchAndParse<any>(url, {method: "DELETE",  headers});
}

export function adminViewUsers(): Promise<UserResponse>{
  const url = apiUrl + `/api/admin/view`;
  headers.Authorization = localStorage.getItem('token') || '';
  return fetchAndParse<UserResponse>(url, {method: "GET", headers});
}
