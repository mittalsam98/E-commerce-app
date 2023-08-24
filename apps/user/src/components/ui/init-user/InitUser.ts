import axios from 'axios';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../../store/atoms/userState';
import { getUserDetails } from '../../../helpers/api-calls/user';
import { toast } from 'react-toastify';

const InitUser = () => {
  const setUserState = useSetRecoilState(userState);

  const initUser = async () => {
    getUserDetails()
      .then((res) => {
        setUserState({ user: res.user, isAdmin: res.user.isAdmin });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    initUser();
  }, []);

  return null;
};
export default InitUser;
