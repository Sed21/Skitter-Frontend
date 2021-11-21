import { Content, ContentResponse } from "../types/content";
import { fetchAndParse } from "../api";
import { apiUrl ,headers } from "./config";

export function getAllAudioBooks(): Promise<ContentResponse>{
  const url = apiUrl + '/api/content/view';
  headers.Authorization = localStorage.getItem('token') || '';
  return fetchAndParse<ContentResponse>(url,{method: "GET", headers});
}

export function getAudioBooksByFilter(id?: string, title?: string, author?: string){
  const url = apiUrl + `/api/content/view?creator_id=${encodeURI(id || '')}&book_title=${encodeURI(title || '')}&book_author=${encodeURI(author || '')}`;
  headers.Authorization = localStorage.getItem('token') || '';
  return fetchAndParse<ContentResponse>(url, {method: "GET", headers});
}

export function getAudioBooksByContentId(id: string): Promise<ContentResponse>{
  const url = apiUrl + `/api/content/view?content_id=${encodeURI(id)}`;
  headers.Authorization = localStorage.getItem('token') || '';
  return fetchAndParse<ContentResponse>(url, {method: "GET", headers});
}

export function getAudioBooksByCreatorId(id: string): Promise<ContentResponse>{
  const url = apiUrl + `/api/content/view?creator_id=${encodeURI(id)}`;
  headers.Authorization = localStorage.getItem('token') || '';
  return fetchAndParse<ContentResponse>(url, {method: "GET", headers});
}

export function getAudioBooksByTitle(title: string): Promise<ContentResponse>{
  const url = apiUrl + `/api/content/view?book_title=${encodeURI(title)}`;
  headers.Authorization = localStorage.getItem('token') || '';
  return fetchAndParse<ContentResponse>(url, {method: "GET", headers});
}

export function getAudioBooksByAuthor(author: string): Promise<ContentResponse>{
  const url = apiUrl + `/api/content/view?book_author=${encodeURI(author)}`;
  headers.Authorization = localStorage.getItem('token') || '';
  return fetchAndParse<ContentResponse>(url, {method: "GET", headers});
}

export function getAudioBookData(content_id: string): Promise<any> {
  const url = apiUrl + `/api/content/audio/${encodeURI(content_id)}`;
  headers.Authorization = localStorage.getItem('token') || '';
  return fetchAndParse<ContentResponse>(url, {method: "GET", headers});
}

export function uploadContent(formData: FormData): Promise<any> {
  const url = apiUrl + '/api/content/upload';
  headers.Authorization = localStorage.getItem('token') || '';
  // headers['Content-Type'] = 'multipart/form-data';
  console.log('fff',formData)
  const response = fetchAndParse<ContentResponse>(url, {method: "PUT", headers, body: formData});
  headers['Content-Type'] = 'application/json';
  return response
}