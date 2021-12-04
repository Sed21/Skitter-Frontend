import { fetchAndParse } from "../api";
import { apiUrl, headers } from "./config";

export function viewCurrentUser(): Promise<any>{
  const url = apiUrl + `/api/user/view/${encodeURI(localStorage.getItem('id') || '')}`;
  headers.Authorization = localStorage.getItem('token') || '';
  return fetchAndParse<any>(url, {method: "GET",  headers})
}

export function changeProfileDescription(description: string): Promise<any>{
  const url = apiUrl + `/api/user/change`;
  headers.Authorization = localStorage.getItem('token') || '';
  return fetchAndParse<any>(url, {method: "PUT", body: JSON.stringify({"profile_description": description}), headers});
}

export function deleteUserProfile(): Promise<any>{
  const url = apiUrl + `/api/user/delete`;
  headers.Authorization = localStorage.getItem('token') || '';
  return fetchAndParse<any>(url, {method: "DELETE", headers});
}
