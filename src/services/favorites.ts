import { fetchAndParse } from "../api";
import { apiUrl, headers } from "./config";

export function addToFavorites(book_id: string): Promise<any>{
  const url = apiUrl + `/api/favorite/add/${encodeURI(book_id)}`;
  headers.Authorization = localStorage.getItem('token') || '';
  return fetchAndParse<any>(url, {method: "PUT", headers})
}

export function viewFavorites(): Promise<any> {
  const url = apiUrl + `/api/favorite/view`;
  headers.Authorization = localStorage.getItem('token') || '';
  return fetchAndParse<any>(url, {method: "GET", headers})
}

export function removeFromFavorites(book_id: string): Promise<any>{
  const url = apiUrl + `/api/favorite/delete/${encodeURI(book_id)}`;
  headers.Authorization = localStorage.getItem('token') || '';
  return fetchAndParse<any>(url, {method: "DELETE", headers});
}
