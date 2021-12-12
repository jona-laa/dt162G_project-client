/** 
*Toggle element from top or bottom
* @param   {DOM element}   element     Target DOM element to toggle
* @param   {string}        position    'top' or 'bottom'
* @param   {string}        offset      Offset in e.g. pixels, rem, em, etc.
*/
export const elementToggle = (element, position, offset) => position === 'top' ? element.style.top = offset : element.style.bottom = offset;



/** 
 *Change display attribute of element
 * @param   {DOM element}   element     Target DOM element
 * @param   {string}        value       Display attribute value, e.g. 'none', 'block', etc.
*/
export const elementDisplay = (element, value) => element.style.display = value;



/** 
 *Changes background color of elements depending on window.pageYOffset - Used onscroll
 * @param   {number}    offset     Negative offset on window.screen.height
 * @param   {string}    col1       Color if scrolled > (screen height - offset)
 * @param   {string}    col2       Color if scrolled < (screen height - offset)
 * @param   {DOM Eleme} elements   Element/elements to alter
*/
export const alterBgColor = (offset, col1, col2, ...elements) => elements.forEach(element => window.pageYOffset > window.screen.height - offset ? element.style.background = col1 : element.style.background = col2);