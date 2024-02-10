import { useState, useEffect } from 'react';
import getLocalStorage from './getLocalStorage';

const useFetch = (url) => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [failedLoading, setFailedLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    useEffect(() => {
        // used in case user fetches and aborts it too often
        // this cancels the ongoing request
        const abortController = new AbortController();

        setIsLoading(false);
        setFailedLoading(false);
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getLocalStorage().token}` 
            }, 
            signal: abortController.signal 
        })
        .then(res => {
            // throw error incase any error
            if (!res.ok) throw new Error('something went wrong');
            return res.json(); // get json data from response
        })
        .then(data => setData(data))
        .catch(err => {
            if (err.name === 'AbortError') return;
            setErrorMessage(err.message);
            setFailedLoading(true);
            setIsLoading(false);
        });

        // abort request
        return () => abortController.abort();
    }, [url]);

    return { data, isLoading, failedLoading, errorMessage };
}
 
export default useFetch;