import { Dispatch, SetStateAction } from 'react';

export enum Messages {
  ERROR = 'Something went wrong!',
  SUCCESS = 'User successfully added!',
}

export enum MessagesSeverity {
  ERROR = 'error',
  SUCCESS = 'success',
}

export interface User {
  id?: number;
  name: string;
  email: string;
}

export interface UserListProps {
  users: User[];
  deleteUser: (id?: number) => Promise<void>;
  editUser: (id: number, name: string, email: string) => Promise<void>;
}

export interface UserAddProps {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
}

export interface UserEditModalProps {
  open: boolean;
  user?: User;
  handleClose: () => void;
  editUser: (id: number, name: string, email: string) => Promise<void>;
}

export interface UserRowProps {
  user: User;
  handleOpen: (user: User) => void;
  deleteUser: (id?: number) => Promise<void>;
}
