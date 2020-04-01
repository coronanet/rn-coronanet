import { useState, useCallback } from 'react'


export const useFetch = (url, method, data) => {

  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [ok, setOk] = useState(null);
  
  const makeRequest = useCallback (async () => {

    setLoading(true);
    setError(null);
    setStatus(null);
    try {

      const _response = await fetch(url, {
        method: method, // GET POST PUT
        body: data,
      });
      const res = await _response.text()
      setResponse(res);
      setStatus(_response.status);
      setOk(_response.ok);
            
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false);
    }

  },[]);

  return { response, status, loading, error, ok, makeRequest }
}