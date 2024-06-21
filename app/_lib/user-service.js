export const getUsers = async (name = "", lastname = "", gender = "") => {
  try {
    let URL = "https://x8ki-letl-twmt.n7.xano.io/api:tSDGfQun/members";
    const queryParams = [];
    if (name) queryParams.push(`firstname=${encodeURIComponent(name)}`);
    if (lastname) queryParams.push(`lastname=${encodeURIComponent(lastname)}`);
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
