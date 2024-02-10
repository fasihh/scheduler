const getLocalStorage = () => {
    return {
        token: localStorage.getItem('token'),
        username: localStorage.getItem('username')
    };
}

export default getLocalStorage;