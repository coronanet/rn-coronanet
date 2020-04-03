// rn-coronanet - Coronavirus social distancing app
// Copyright (c) 2020 The rn-coronanet authors. All rights reserved.

import { useState, useCallback } from 'react'

// useFetch creates a network request object that can on demand refresh its state
// via an API fetch.
export const useFetch = (url, method, data) => {
  const [loading, setLoading]   = useState(null); // Whether there's a fetch actively pending
  const [error, setError]       = useState(null); // Failure of the network fetch call itself
  const [status, setStatus]     = useState(null); // HTTP status code returned by the API
  const [ok, setOk]             = useState(null); // Whether the status code is in the 200 range
  const [response, setResponse] = useState(null); // The response text of the API call

  // makeRequest is a callback that can be user to repopulate the cached results
  // of the API call.
  const makeRequest = useCallback (async () => {
    // Clear out any previous results and set loading to true
    setLoading(true);
    setError(null);
    setStatus(null);

    // Run the API call and save the results or any failure
    try {
      const res = await fetch(url, {method: method, body: data});
      const txt = await res.text()
      setResponse(txt);
      setStatus(res.status);
      setOk(res.ok);
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false);
    }
  },[]);

  // Return an object with all the cached results and a refresher
  return { loading, error, status, ok, response, makeRequest }
}
