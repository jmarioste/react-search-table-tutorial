"use client";

import { User } from "@/app/users/route";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useFetch, useDebounce } from "usehooks-ts";

const UsersTable = () => {
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, 600);
  const url = debouncedValue ? "/users?search=" + debouncedValue : "/users";
  const { data } = useFetch<User[]>(url);
  return (
    <div>
      <TextField value={search} onChange={(e) => setSearch(e.target.value)} />
      <Table>
        <TableHead>
          <TableCell>ID</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Username</TableCell>
          <TableCell>First name</TableCell>
          <TableCell>Last name</TableCell>
          <TableCell>Gender</TableCell>
          <TableCell>Phone</TableCell>
        </TableHead>
        <TableBody>
          {data?.map((user) => {
            return (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.phone}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
export default UsersTable;
