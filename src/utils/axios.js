
// import axios from "axios";
// import { v4 as uuidv4 } from "uuid";
// import { notifyError, notifySuccess } from "../components/config";

// const token = "96573b3e1df5f6d633f74eb5ed001878f64bc7d8";
// const base = "https://api.todoist.com/rest/v2";
// import { todoist } from "../components/config";

// const headers = {
//     "Content-Type": "application/json",
//     "X-Request-Id": uuidv4(),
//     Authorization: `Bearer ${token}`,
// };

// const handleRequest = async (method, url, data = {}) => {
//     try {
//         const response = await axios({ method, url: `${base}${url}`, data, headers });
//         notifySuccess(`${method.toUpperCase()} request successful`);
//         return response.data;
//     } catch (error) {
//         notifyError(`Error: ${error.response?.data || error.message}`);

//     }
// };

// export const updateTask = (id) => handleRequest("post", `/tasks/${id}/close`);
// export const addProject = (obj, setShowAddProject) => handleRequest("post", "/projects", obj).then(() => setShowAddProject(false));
// export const deleteProject = (id) => handleRequest("delete", `/projects/${id}`);





import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { notifyError, notifySuccess, todoist } from "../components/config";

const token = "96573b3e1df5f6d633f74eb5ed001878f64bc7d8";
const base = `https://api.todoist.com/rest/v2`;

const updateTask = async (id, argsUpdate) => {
    console.log("request", id, argsUpdate);
    try {
        const response = await axios.post(
            base + `/tasks/${id}/close`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Request-Id": uuidv4(),
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        notifySuccess("Task Completed Successfully");
        console.log("Task Updated:", response.data);
    } catch (error) {
        notifyError("Error updating task");
        console.error("Error updating task:", error.response?.data || error);
    }

    // try {
    //     const response = await todoist.updateTask(id, argsUpdate, uuidv4() + "");
    //     console.log("Task Updated:", response);
    // } catch (error) {
    //     console.error("Error updating task:", error);
    // }
};

export const addProject = async (obj, setShowAddProject) => {
    try {
        const response = await axios.post(
            base + `/projects`,
            obj,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Request-Id": uuidv4(),
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("Project Added:", response.data);
        notifySuccess("Project Added Successfully");
        setShowAddProject(false);
    } catch (error) {
        console.error("Error adding project:", error.response?.data || error);
        notifyError(
            `Error adding project: ${error.response?.data || error.message}`
        );
    }
};

export const deleteProject = async (id) => {
    try {
        const response = await axios.delete(
            base + `/projects/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Request-Id": uuidv4(),
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("Project Deleted:", response.data);
        notifySuccess("Project Deleted Successfully");
    } catch (error) {
        console.error("Error deleting project:", error.response?.data || error);
        notifyError(
            `Error deleting project: ${error.response?.data || error.message}`
        );
    }
};

export const getProject = async (id) => {
    try {
        const response = await axios.get(
            base + `/projects/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Request-Id": uuidv4(),
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("Project Fetched:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching project:", error.response?.data || error);
        notifyError(
            `Error fetching project: ${error.response?.data || error.message}`
        );
    }
};


export const addToFavorites = async (id, argsUpdate) => {
    console.log("request", id, argsUpdate);
    try {
        const response = await axios.post(
            base + `/projects/${id}`,
            argsUpdate,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Request-Id": uuidv4(),
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("Project Updated:", response.data);
        notifySuccess("Project Updated Successfully");
    } catch (error) {
        console.error("Error updating project:", error.response?.data || error);
        notifyError(
            `Error updating project: ${error.response?.data || error.message}`
        );
    }
};

export const removeProject = async (id) => {
    try {
        const response = await axios.delete(
            base + `/projects/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Request-Id": uuidv4(),
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("Project Fetched:", response.data);
        notifySuccess("Project Deleted Successfully");
        return response.data;
    } catch (error) {
        console.error("Error fetching project:", error.response?.data || error);
        notifyError(
            `Error fetching project: ${error.response?.data || error.message}`
        );
    }
}


export { updateTask };
