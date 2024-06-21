import React from "react";
import { getTasks } from "../_lib/task-service";

export default async function TaskPage() {
  let tasks = [];
  let error = null;

  try {
    tasks = await getTasks();
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
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <li key={task.id}>
                {task.title} {task.description} - {task.status}
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
