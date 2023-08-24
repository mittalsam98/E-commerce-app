import { ZOD_VALIDATION } from 'shared-types/index';
import { ApiError } from './types';
import { toast } from 'react-toastify';
import { getToken } from './localstorage';

export const setApiErrors = <T1>(setError: any, apiErrors: ApiError) => {
  if (apiErrors?.error_code !== ZOD_VALIDATION) {
    toast.error(apiErrors.message);
    return;
  }
  // This is the error object return from the ZOD validation
  if (apiErrors.error) {
    delete apiErrors.error['_errors'];
    Object.keys(apiErrors).forEach((fieldName) => {
      const fieldError = apiErrors.error?.[fieldName];
      if (fieldError) {
        setError(fieldName, {
          type: 'manual',
          message: fieldError._errors[0] // Use the first error message from the array
        });
      }
    });
  }
};

export const isLoggedIn = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (getToken()) {
    return getToken();
  } else {
    return false;
  }
};
