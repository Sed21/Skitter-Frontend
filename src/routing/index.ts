import { useHistory } from 'react-router-dom';

export const urls = {
  signInPage: () => '/signin',
  signUpPage: () => '/signup',
  welcomePage: () => '/welcome',
  contentPage: () => '/mainpage',
  contentEntityPage: (p: {id: string}) => `/content/${p.id}`,
  startPage: () => '/start',
  adminPage: () => '/admin',
  addContent: () => '/add',
  userManagementPage: () => '/admin/user',
  contentManagementPage: () => '/admin/content',
  accountPage: (p: {id: string}) => `/user/${p.id}`,
  favoritesPage: () => '/user/favorites',
  reviewsPage: () => '/user/reviews',
};

export const startUrl = urls.welcomePage;

export function useRouting() {
  const history = useHistory();

  function routeTo(fn: () => string): void;
  function routeTo<T>(fn: (p: T) => string, params: T): void;
  function routeTo<T>(fn: (p?: T) => string, params?: T) {
    history.push(fn(params));
  }
  return {
    routeTo,
    history,
  };
}

export function route(fn: () => string): string;
export function route<T>(fn: (p: T) => string, params: Array<keyof T>): string;
export function route<T>(fn: (p: T) => string, params: Array<keyof T> = []) {
  const parameter = Object.fromEntries(params.map((p) => [p, ":" + p]));
  return fn(parameter as any);
}

