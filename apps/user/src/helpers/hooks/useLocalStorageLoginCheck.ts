// useLocalStorageLoginCheck.ts

import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { authTokenState } from '../../store/atoms/userState';
import { getToken } from '../utils/localstorage';

const useLocalStorageLoginCheck = () => {
  // Return the token from the local storage
  const [authToken, setAuthToken] = useRecoilState(authTokenState);

  useEffect(() => {
    const token = getToken();
    setAuthToken(token || null);
  }, [setAuthToken]);

  return authToken !== null;
};

export default useLocalStorageLoginCheck;
