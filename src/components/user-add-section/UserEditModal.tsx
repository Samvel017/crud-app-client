import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Box, TextField } from '@mui/material';
import { UserForm } from './UserAdd';
import { useEffect, useState } from 'react';
import { UserEditModalProps } from './types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UserEditModal({
  open,
  user,
  handleClose,
  editUser,
}: UserEditModalProps) {
  const [name, setName] = useState<string | undefined>('');
  const [email, setEmail] = useState<string | undefined>('');

  const onClose = () => {
    setName('');
    setEmail('');
    handleClose();
  };

  const onSubmit = async () => {
    if (user && user.id && name && email) {
      await editUser(user.id, name, email);
      handleClose();
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <UserForm
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <Typography variant="h4" mb={2}>
            Edit User
          </Typography>
          {user && (
            <>
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
            </>
          )}
          <Button variant="contained" type="submit">
            Save
          </Button>
        </UserForm>
      </Box>
    </Modal>
  );
}
