"use client";

import { getUsers } from "@/app/_lib/user-service";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Filter = () => {
  const { filter } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let users;
        if (filter === "gender") {
          users = await getUsers("", filter);
        } else {
          users = await getUsers(filter, "");
        }
        setData(users);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {data.length > 0 ? (
        data.map((user) => <div key={user.id}>{user.name}</div>)
      ) : (
        <div>No users found</div>
      )}
    </div>
  );
};

export default Filter;
