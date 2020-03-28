import { useState, useEffect } from "react";

function loadProfile() {
    const url = 'https://corona-network/profile';
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    async function fetchUrl() {
        const response = await fetch(url, { method: 'GET' });
        setLoading(false);
        if(response.status === 200) {
            const json = await response.json();
            setData(json);
        }
    }
    useEffect(() => {
        fetchUrl();
    }, []);
    return [data, loading, setData];
}
export { loadProfile };