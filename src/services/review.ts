import { fetchAndParse } from "../api";
import { apiUrl, headers } from "./config";

export function addReview(content_id: string, value: number): Promise<any>{
  const url = apiUrl + `/api/review/add/${encodeURI(content_id)}`;
  headers.Authorization = localStorage.getItem('token') || '';
  return fetchAndParse<any>(url, {method: "PUT", body: JSON.stringify({value: value}), headers})
}

export function removeReview(content_id: string): Promise<any>{
  const url = apiUrl + `/api/review/delete/${encodeURI(content_id)}`;
  headers.Authorization = localStorage.getItem('token') || '';
  return fetchAndParse<any>(url, {method: "DELETE",  headers});
}

