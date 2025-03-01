import { TodoistApi } from "@doist/todoist-api-typescript";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const todoist = new TodoistApi("96573b3e1df5f6d633f74eb5ed001878f64bc7d8");
const toastOptions = {
    position: "top-center",
    autoClose: 500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
};

export const notifySuccess = (msg) => toast.success(msg, toastOptions);
export const notifyWarning = (msg) => toast.warning(msg, toastOptions);
export const notifyError = (msg) => toast.error(msg, toastOptions);