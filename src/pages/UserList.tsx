import UserService from "../service/UserService";
import { UserResponse } from "../types/User";
import { useState, useEffect } from "react";

export default function UserList() {
  const [users, setUsers] = useState<UserResponse[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await UserService.getAllUsers();
        setUsers(response);
      } catch (error) {}
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>UserList</h1>
      {JSON.stringify(users)}
    </div>
  );
}
