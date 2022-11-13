import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import userService from '../../services/user-service';
import { User } from './types';

export default function UserInfo() {
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

  const getUserInfo = async (id: number) => {
    const res = await userService.getUserById(id);
    if (res) {
      setUser(res);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  useEffect(() => {
    if (id) {
      getUserInfo(+id);
    }
  }, [id]);

  return (
    <div>
      <IconButton onClick={handleBack}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="subtitle1">Name: {user?.name}</Typography>
      <Typography variant="subtitle1">Email: {user?.email}</Typography>
    </div>
  );
}
