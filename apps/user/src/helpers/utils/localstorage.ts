import { THEME, TOKEN } from './constant';

export const setTheme = (theme: string): void => {
  localStorage.setItem(THEME, theme);
};
export const getTheme = (): string => {
  const theme = localStorage.getItem(THEME);
  return theme !== null ? theme : '';
};
export const getToken = (): string => {
  const token = localStorage.getItem(TOKEN);
  return token !== null ? token : '';
};
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN, token);
};
