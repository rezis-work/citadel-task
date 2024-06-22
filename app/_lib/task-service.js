export const getTasks = async () => {
  try {
    const response = await fetch(
      "https://x8ki-letl-twmt.n7.xano.io/api:tSDGfQun/tasks"
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const deleteTask = async (taskId) => {
  try {
    const deleteURL = `https://x8ki-letl-twmt.n7.xano.io/api:tSDGfQun/tasks/${taskId}`;
    const deleteResponse = await fetch(deleteURL, {
      method: "DELETE",
    });

    if (!deleteResponse.ok) {
      throw new Error(`Failed to delete task: ${deleteResponse.statusText}`);
    }

    // Assuming successful deletion, you may want to handle response
    return deleteResponse.json(); // Optionally return data from delete response
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
