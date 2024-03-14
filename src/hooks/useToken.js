// useToken.js
import { useEffect, useState } from 'react';

function useToken() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('auth'))?.token;
    setToken(token);
  }, []);

  return token;
}

export default useToken;
