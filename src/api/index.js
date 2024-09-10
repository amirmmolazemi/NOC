import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { mutate } from "swr";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const token = Cookies.get("token");
const headers = { Authorization: `Bearer ${token}` };

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const addUserHandler = async (newUser, page) => {
  try {
    await api.post("/user", newUser, { headers });
    mutate(`/user?size=10&page=${page}`);
    toast.success("User added successfully!");
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const deleteHandler = async (id, page) => {
  try {
    await api.delete(`/user/${id}`, { headers });
    mutate(`/user?size=10&page=${page}`);
    toast.success("User deleted successfully!");
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const editHandler = async (id, data, setShowModal, page) => {
  try {
    await api.put(`/user/${id}`, data, { headers });
    mutate(`/user?size=10&page=${page}`);
    toast.success("User data saved successfully!");
    setShowModal(false);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const addTeamHandler = async (newTeam, page) => {
  try {
    await api.post("/team", newTeam, { headers });
    mutate(`/team?size=10&page=${page}`);
    toast.success("Team added successfully!");
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const editTeamHandler = async (
  teamId,
  editData,
  prevData,
  ShowModal,
  page
) => {
  try {
    let data = {
      name: editData.name,
    };
    if (prevData.headId !== editData.headId) {
      data.headId = editData.headId;
    }
    await api.put(`/team/${teamId}`, data, { headers });
    mutate(`/team?size=10&page=${page}`);
    toast.success("Team data saved successfully!");
    ShowModal(false);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const deleteTeamHandler = async (id, page) => {
  try {
    await api.delete(`/team/${id}`, { headers });
    mutate(`/team?size=10&page=${page}`);
    toast.success("Team deleted successfully!");
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const deleteMemberHandler = async (
  teamId,
  userId,
  setIsLoading,
  page,
  team
) => {
  setIsLoading(true);
  try {
    await api.delete(`/team/${teamId}/member`, { data: { userId }, headers });
    mutate(`/user?size=5&page=${page}&team=${team}`);
    mutate(`/user?size=5&page=off`);
    toast.success("Member deleted successfully!");
  } catch (error) {
    if (error.response) {
      toast.error(`Error: ${error.response.data.message}`);
    } else if (error.request) {
      toast.error("Network error, please try again later.");
    } else {
      toast.error("An unexpected error occurred.");
    }
  } finally {
    setIsLoading(false);
  }
};

export const addMemberHandler = async (
  setIsLoading,
  selectedUser,
  teamId,
  setAllUsers,
  setFilteredUsers,
  setSelectedUser,
  page,
  team
) => {
  setIsLoading(true);
  try {
    const userId = parseInt(selectedUser, 10);
    await api.post(`/team/${teamId}/member`, { userId }, { headers });
    setAllUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    setFilteredUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== userId)
    );
    mutate(`/user?size=5&page=${page}&team=${team}`);
    mutate(`/user?size=5&page=off`);
    setSelectedUser("");
    toast.success("Member added successfully!");
  } catch (error) {
    if (error.response) {
      toast.error(`Error: ${error.response.data.message}`);
    } else if (error.request) {
      toast.error("Network error, please try again later.");
    } else {
      toast.error("An unexpected error occurred.");
    }
  } finally {
    setIsLoading(false);
  }
};

export const loginHandler = async (username, password, navigate) => {
  try {
    const { data } = await api.post("/auth/login", {
      username,
      password,
    });
    if (data.token) {
      Cookies.set("token", data.token, {
        sameSite: "Strict",
        expires: 1,
      });
    }
    navigate("/dashboard");
  } catch (error) {
    toast.error(
      error.response.data.error ||
        error.response.data.message ||
        "internal server error"
    );
  }
};

export const createIncident = async (
  incidentId,
  teamId,
  packId,
  notifications,
  page
) => {
  incidentId(null);
  try {
    await api.post("/incident", { packId, teamId, notifications }, { headers });
    toast.success("incident created successfully");
    mutate(`/pack?size=10&page=${page}`);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const changePackPriority = async (priority, setPriority, id) => {
  setPriority(priority);
  try {
    if (priority) {
      await api.post("/pack/priority", { id, priority }, { headers });
      toast.success("Priority saved successfully", { autoClose: 1500 });
      return;
    }
    return;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const closeIncident = async (incidentId, setId, page) => {
  try {
    await api.post(`incident/resolve/${incidentId}`, {}, { headers });
    setId(null);
    mutate(`pack/incidents?size=6&page=${page}`);
    toast.success("Pack Closed Successfully");
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const assignToMember = async (packId, master, members, setId, page) => {
  try {
    await api.post("incident/assign", { packId, master, members }, { headers });
    setId(null);
    mutate(`pack/incidents?size=6&page=${page}`);
    toast.success("Pack Assigned successfully");
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export default api;
