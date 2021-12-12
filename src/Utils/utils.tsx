/** 
*Toggle element from top or bottom
* @param   {DOM element}   element     Target DOM element to toggle
* @param   {string}        position    'top' or 'bottom'
* @param   {string}        offset      Offset in e.g. pixels, rem, em, etc.
*/
export const elementToggle = (element: HTMLElement, position: string, offset: string) => position === 'top' ? element.style.top = offset : element.style.bottom = offset;



/** 
 *Change display attribute of element
 * @param   {DOM element}   element     Target DOM element
 * @param   {string}        value       Display attribute value, e.g. 'none', 'block', etc.
*/
export const elementDisplay = (element: HTMLElement, value: string) => element.style.display = value;



/** 
 *Changes background color of elements depending on window.pageYOffset - Used onscroll
 * @param   {number}    offset     Negative offset on window.screen.height
 * @param   {string}    col1       Color if scrolled > (screen height - offset)
 * @param   {string}    col2       Color if scrolled < (screen height - offset)
 * @param   {DOM Eleme} elements   Element/elements to alter
*/
export const alterBgColor = (offset: number, col1: string, col2: string, ...elements: Array<HTMLElement>): void => elements.forEach(element => window.pageYOffset > window.screen.height - offset ? element.style.background = col1 : element.style.background = col2);