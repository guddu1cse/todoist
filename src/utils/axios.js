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



export { updateTask };
