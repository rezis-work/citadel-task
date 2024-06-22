export const getUsers = async (name, gender) => {
  try {
    let URL = "https://x8ki-letl-twmt.n7.xano.io/api:tSDGfQun/members";
    const queryParams = [];
    if (name) queryParams.push(`firstname=${encodeURIComponent(name)}`);
    if (gender) queryParams.push(`gender=${encodeURIComponent(gender)}`);

    if (queryParams.length > 0) {
      URL += `?${queryParams.join("&")}`;
    }

    const response = await fetch(URL);

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

export const deleteUser = async (userId) => {
  try {
    const deleteURL = `https://x8ki-letl-twmt.n7.xano.io/api:tSDGfQun/members/${userId}`;
    const deleteResponse = await fetch(deleteURL, {
      method: "DELETE",
    });

    if (!deleteResponse.ok) {
      throw new Error(`Failed to delete user: ${deleteResponse.statusText}`);
    }

    // Assuming successful deletion, you may want to handle response
    return deleteResponse.json(); // Optionally return data from delete response
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const postUser = async (userData) => {
  try {
    const postURL = "https://x8ki-letl-twmt.n7.xano.io/api:tSDGfQun/members";
    const response = await fetch(postURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Failed to add user: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export const patchUser = async (userId, userData) => {
  try {
    const patchURL = `https://x8ki-letl-twmt.n7.xano.io/api:tSDGfQun/members/${userId}`;
    const response = await fetch(patchURL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update user: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
