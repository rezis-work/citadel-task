import React from "react";
import { getUsers } from "../_lib/user-service";

export default async function UserPage() {
  let users = [];
  let error = null;

  try {
    users = await getUsers();
  } catch (err) {
    error = err.message;
  }

  return (
    <div>
      <div className=" flex justify-between items-center px-20">
        <h2>Users</h2>
        <p>Filters</p>
      </div>
      {error ? (
        <p>Error fetching users: {error}</p>
      ) : (
        <ul>
          {users.length > 0 ? (
            users.map((user) => (
              <li key={user.id}>
                {user.firstname} {user.lastname} - {user.gender}
              </li>
            ))
          ) : (
            <p>No User Found</p>
          )}
        </ul>
      )}
    </div>
  );
}
