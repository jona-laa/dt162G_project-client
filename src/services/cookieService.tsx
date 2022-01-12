/**
 * Set cookie 
 * @param   name    Cookie name 
 * @param   value   Cookie value
 * @param   days    Cookie expiration time
 */
export const setCookie = (name: string, value: string, days: number): void => {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

/**
 * Get cookue by bane
 * @param   name  Cookie name 
 * @returns Cookie || Null
 */
export const getCookie = (name: string): string | null => {
  let nameEQ = name + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

/**
 * Deletes cookie by name
 * @param   name  Cookie name 
 */
export const deleteCookie = (name: string): void => {
  document.cookie = name + '=; Max-Age=-99999999;';
}