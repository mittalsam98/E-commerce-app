import React, { useEffect, useState } from 'react';
import { IUser } from 'shared-types/index';
import { toast } from 'react-toastify';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { TbEditCircle } from 'react-icons/tb';
import { userState } from '../../store/atoms/userState';
import EditUserModal from '../ui/edit-user-modal/EditUserModal';
import { getAllUsers } from '../../helpers/api-calls/admin';
import { editUser } from '../../store/atoms/adminState';

export default function AllUser() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const setEditUser = useSetRecoilState(editUser);
  const userSt = useRecoilValue(userState);

  const getAllUserApiCall = () => {
    getAllUsers()
      .then((res) => {
        setUsers(res.user);
      })
      .catch((err) => {
        toast.error(JSON.stringify(err));
      });
  };

  useEffect(() => {
    getAllUserApiCall();
  }, []);

  const handleEditModalOpen = (
    id: string,
    firstName: string,
    lastName: string,
    isAdmin: boolean,
    email: string
  ) => {
    setIsModalOpen(true);
    setEditUser({
      id: id,
      firstName: firstName,
      lastName: lastName,
      isAdmin: isAdmin,
      email: email
    });
  };

  const handleCloseModalOpen = () => {
    setIsModalOpen(false);
    getAllUserApiCall();
  };
  return (
    <div className='mx-auto px-4 py-8 '>
      <div className='overflow-y-hidden rounded-lg border'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='bg-primary text-left text-xs uppercase text-white'>
                <th className='px-5 py-3'>Full name</th>
                <th className='px-5 py-3'>Email</th>
                <th className='px-5 py-3'>Role</th>
                <th className='px-5 py-3'>Created at</th>
                <th className='px-5 py-3'>Edit User</th>
              </tr>
            </thead>
            <tbody className='textLight textDark bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 '>
              {users.map((user, index) => {
                return (
                  <tr className=''>
                    <td className='px-5 py-5 text-sm'>
                      {user.firstName + ' ' + user.lastName}{' '}
                      {userSt.user._id == user._id ? '(You)' : ''}
                    </td>
                    <td className='px-5 py-5 text-sm'>{user.email}</td>
                    <td className='px-5 py-5 text-sm'>
                      <span
                        className={`rounded-full ${
                          user.isAdmin ? 'bg-green-200' : 'bg-red-200'
                        } px-3 py-1 text-xs font-semibold text-green-900`}
                      >
                        {user.isAdmin ? 'Admin' : 'User'}
                      </span>
                    </td>
                    <td className='px-5 py-5 text-sm'>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className='px-5 py-5 text-center text-sm hover:cursor-pointer'>
                      <TbEditCircle
                        className='text-2xl'
                        onClick={() => {
                          if (userSt.user._id !== user._id) {
                            handleEditModalOpen(
                              user._id,
                              user.firstName,
                              user.lastName,
                              user.isAdmin,
                              user.email
                            );
                          } else {
                            toast.info(`You can't edit your details`);
                          }
                        }}
                        aria-disabled={userSt.user._id === user._id}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && <EditUserModal isOpen={isModalOpen} onClose={handleCloseModalOpen} />}
    </div>
  );
}
