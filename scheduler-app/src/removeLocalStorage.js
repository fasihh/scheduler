const removeLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
}
 
export default removeLocalStorage;