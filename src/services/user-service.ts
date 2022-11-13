/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosHandler, Methods, ServicesPaths } from '.';
import { User } from '../components/user-add-section/types';
import { joinPath } from '../utils';

export interface UserServices {
  createUser: (x: User) => Promise<any>;
  getUsers: () => Promise<User[]>;
  getUserById: (id: number) => Promise<User>;
  deleteUser: (id: number) => Promise<any>;
  updateUser: (id: number, body: any) => Promise<any>;
}

const getUsers = async () => {
  const response = await axiosHandler(Methods.GET, ServicesPaths.USERS);
  const users = response.data ?? [];
  return users;
};

const getUserById = async (id: number) => {
  const response = await axiosHandler(
    Methods.GET,
    joinPath(ServicesPaths.USERS, id),
  );
  const user = response.data;
  return user;
};

const createUser = async (body: User) =>
  await axiosHandler(Methods.POST, ServicesPaths.USERS, body);

const deleteUser = async (id: number) =>
  await axiosHandler(Methods.DELETE, joinPath(ServicesPaths.USERS, id));

const updateUser = async (id: number, body: any) => {
  const response = await axiosHandler(
    Methods.PUT,
    joinPath(ServicesPaths.USERS, id),
    body,
  );
  const user = response.data;
  return user;
};

const userService: UserServices = {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};

export default userService;
