import { useEffect, useState } from 'react';
import userService from '../../services/user-service';
import UserAdd from './UserAdd';
import UsersList from './UsersList';
import { User } from './types';

export default function UsersSection() {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    const users = await userService.getUsers();
    if (users) {
      const sortedUsers = [...users].sort((a, b) => a.id! - b.id!);
      setUsers(sortedUsers);
    }
  };

  const deleteUser = async (id?: number) => {
    if (id) {
      await userService.deleteUser(id);
      const newUsers = users.filter((user) => user.id !== id);
      setUsers(newUsers);
    }
  };

  const editUser = async (id: number, name: string, email: string) => {
    await userService.updateUser(id, { name, email });
    const newUsers = [...users];
    const user = newUsers.find((item) => item.id === id);
    if (user) {
      const index = newUsers.indexOf(user);
      newUsers[index].name = name;
      newUsers[index].email = email;
      setUsers(newUsers);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <UserAdd users={users} setUsers={setUsers} />
      <UsersList users={users} deleteUser={deleteUser} editUser={editUser} />
    </div>
  );
}
