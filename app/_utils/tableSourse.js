export function getColumns({ first, second, third, fourth, fifth }) {
  const columns = [
    {
      title: first,
      dataIndex: first.toLowerCase(),
      key: first.toLowerCase(),
    },
    {
      title: second,
      dataIndex: second.toLowerCase(),
      key: second.toLowerCase(),
    },
    {
      title: third,
      dataIndex: third.toLowerCase(),
      key: third.toLowerCase(),
    },
    {
      title: fourth,
      dataIndex: fourth.toLowerCase(),
      key: fourth.toLowerCase(),
    },
    {
      title: fifth,
      dataIndex: fifth.toLowerCase(),
      key: fifth.toLowerCase(),
    },
  ];

  return columns;
}

export function getDataSource(
  items,
  { first, second, third, fourth },
  action,
  type
) {
  const dataSource = items.map((item) => {
    if (type === "users") {
      return {
        key: item.id,
        firstname: item[first.toLowerCase()],
        lastname: item[second.toLowerCase()],
        gender: item[third.toLowerCase()],
        birthday: item[fourth.toLowerCase()],
        action: action,
      };
    }

    if (type === "tasks") {
      return {
        key: item.id,
        fullname: `${item._assigned_member?.firstname || ""} ${
          item._assigned_member?.lastname || ""
        }`,
        title: item.title,
        description: item.description,
        status: item.status,
        action: action,
      };
    }
  });

  return dataSource;
}
