import { useEffect, useState } from 'react'


export const useFetch = (url, method, data) => {

  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const makeRequest = async () => {

    setLoading(true)
    setError(null)  
    
    try {
      const _response = await fetch(url, {
        method: method, // GET POST PUT
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      });
      const json = await _response.json();
      setResponse(json);
      
    } catch (error) {
      setError(error)
    } finally{
      setLoading(false);
    }

  }

  return { response, loading, error, makeRequest }
}