import { useState } from 'react';
import { Button, Snackbar, TextField, Typography } from '@mui/material';
import styled from 'styled-components';
import { Alert } from '../snackbar/Snackbar';
import { Messages, MessagesSeverity, UserAddProps } from './types';
import userService from '../../services/user-service';

export default function UserAdd({ users, setUsers }: UserAddProps) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [severity, setSeverity] = useState<MessagesSeverity>();
  const [message, setMessage] = useState<string>();

  const handleAlert = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const onSubmit = async () => {
    try {
      const user = await userService.createUser({ name, email });
      setUsers([...users, user.data]);
      setSeverity(MessagesSeverity.SUCCESS);
      setMessage(Messages.SUCCESS);
      handleAlert();
      setName('');
      setEmail('');
    } catch (error) {
      console.log(error);
      setMessage(Messages.ERROR);
      setSeverity(MessagesSeverity.ERROR);
      handleAlert();
    }
  };

  return (
    <UserForm
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Typography variant="h4" mb={2}>
        Add User
      </Typography>
      <TextField
        className="user-input"
        id="outlined-basic"
        required
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        className="user-input"
        id="outlined-basic"
        required
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button variant="contained" type="submit">
        Add User
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </UserForm>
  );
}

export const UserForm = styled.form`
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  .user-input {
    width: 100%;
    margin-bottom: 15px;
  }
`;
