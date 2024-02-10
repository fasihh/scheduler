const setLocalStorage = ({ username, token }) => {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
}

export default setLocalStorage;