import { useState } from 'react';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { User, UserListProps, UserRowProps } from './types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UserEditModal from './UserEditModal';

export default function UsersList({
  users,
  deleteUser,
  editUser,
}: UserListProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<User | undefined>();

  const closeEditModal = () => {
    setUserInfo(undefined);
    setOpen(false);
  };

  const openEditModal = (user: User) => {
    setUserInfo(user);
    setOpen(true);
  };

  return (
    <UserTableWrapper>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Edit/Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                handleOpen={openEditModal}
                deleteUser={deleteUser}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UserEditModal
        editUser={editUser}
        user={userInfo}
        handleClose={closeEditModal}
        open={open}
      />
    </UserTableWrapper>
  );
}

const UserRow = ({ user, deleteUser, handleOpen }: UserRowProps) => {
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        {user.id}
      </TableCell>
      <TableCell align="right">
        <Link to={`users/${user.id}`}>{user.name}</Link>
      </TableCell>
      <TableCell align="right">{user.email}</TableCell>
      <TableCell align="right">
        <IconButton color="primary" onClick={() => handleOpen(user)}>
          <EditIcon />
        </IconButton>
        <IconButton color="error" onClick={() => deleteUser(user.id)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export const UserTableWrapper = styled.div`
  margin: 0 auto;
  max-width: 900px;
`;
