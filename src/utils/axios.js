import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { notifyError, notifySuccess } from "../components/config";

const token = "96573b3e1df5f6d633f74eb5ed001878f64bc7d8";
const base = `https://api.todoist.com/rest/v2`;
const headers = {
    "Content-Type": "application/json",
    "X-Request-Id": uuidv4(),
    Authorization: `Bearer ${token}`,
};

const request = async (method, url, data = {}, headers) => {
    return await axios({ method, url: `${base}${url}`, data, headers });
}

export const updateTask = async (id, argsUpdate) => {
    try {
        await axios.post(
            base + `/tasks/${id}/close`,
            {},
            headers,
        );
        onSuccess("Task Completed Successfully");
    } catch (error) {
        onError("Error updating task");
    }
};

export const addProject = async (obj, setShowAddProject) => {
    try {
        await axios.post(
            base + `/projects`,
            obj,
            headers
        );
        onSuccess("Project Added Successfully");
        setShowAddProject(false);
    } catch (error) {
        onError(
            `Error adding project: ${error.response?.data || error.message}`
        );
    }
};

export const deleteProject = async (id) => {
    try {
        await axios.delete(
            base + `/projects/${id}`,
            headers,
        );
        onSuccess("Project Deleted Successfully");
    } catch (error) {
        onError(
            `Error deleting project: ${error.response?.data || error.message}`
        );
    }
};

export const getProject = async (id) => {
    try {
        const response = await axios.get(
            base + `/projects/${id}`,
            headers,
        );
        return response.data;
    } catch (error) {
        onError(
            `Error fetching project: ${error.response?.data || error.message}`
        );
    }
};


export const addToFavorites = async (id, argsUpdate) => {
    try {
        await axios.post(
            base + `/projects/${id}`,
            argsUpdate,
            headers,
        );
        onSuccess("Project Updated Successfully");
    } catch (error) {
        onError(
            `Error updating project: ${error.response?.data || error.message}`
        );
    }
};

export const removeProject = async (id) => {
    try {
        const response = await axios.delete(
            base + `/projects/${id}`,
            headers,
        );
        onSuccess("Project Deleted Successfully");
        return response.data;
    } catch (error) {
        onError(
            `Error fetching project: ${error.response?.data || error.message}`
        );
    }
}

export const updateTaskRequest = async (id, argsUpdate) => {

    try {
        const response = await axios.post(
            base + `/tasks/${id}`,
            argsUpdate,
            headers,
        );
        onSuccess("Task Updated Successfully");
        return response.data;
    } catch (error) {
        onError(
            `Error while updating task: ${error.response?.data || error.message}`
        );
    }
}

const onSuccess = (msg) => {
    notifySuccess(msg);
}

const onError = (msg) => {
    notifyError(msg);
    console.error(msg);
    throw new Error(msg);
}