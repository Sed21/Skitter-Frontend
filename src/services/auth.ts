import { fetchAndParse } from "../api";
import { SignUpInfo, SignInInfo } from "../types/auth";
import { apiUrl, headers } from "./config";

export function signUp(body: SignUpInfo): Promise<any> {
    const url = apiUrl + '/api/auth/signup';
    return fetchAndParse<any>(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: headers
    });
}

export function signIn(body: SignInInfo): Promise<any> {
    const url = apiUrl + '/api/auth/signin';
    return fetchAndParse<any>(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: headers
    });
}

export function signOut(): Promise<any> {
    const url = apiUrl + '/api/auth/signout';
    return fetchAndParse<any>(url, {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify({token: localStorage.getItem('token')})
    });
}

export function validateToken(): Promise<any> {
    const url = apiUrl + '/api/auth/check';
    headers.Authorization = localStorage.getItem('token') || '';
    return fetchAndParse<any>(url, {
        method: 'POST',
        headers: headers
    });
}