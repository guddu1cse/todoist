import { TodoistApi } from "@doist/todoist-api-typescript";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const todoist = new TodoistApi("96573b3e1df5f6d633f74eb5ed001878f64bc7d8");
export const notifySuccess = (msg) => {
    toast.success(msg, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    });
}


export const notifyError = (msg) => {
    toast.error(msg, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    });
}

export const notifyWarning = (msg) => {
    toast.warning(msg, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    });
}



