import React, { use } from "react";
import { Modal, Input, Button, Dropdown, Menu } from "antd";
import { useState, useEffect } from "react";
import { todoist } from "./config";
import { notifyError, notifySuccess } from "./config";
import { priorityList } from "../constant/constant";
import {
  CalendarOutlined,
  FlagOutlined,
  BellOutlined,
  MoreOutlined,
} from "@ant-design/icons";

const TaskEditModal = ({
  visible,
  onCancel,
  id = "6XP35F7V9Gwqh9M6",
  setEditModel,
}) => {
  const [selectedProject, setSelectedProject] = useState({
    id: 0,
    name: "loading",
    color: "red",
  });
  const [priority, setPriority] = useState({ priority: 1, color: "#d1453b" });
  const [name, setName] = useState("loading");
  const [description, setDescription] = useState("loading");
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [projects, setProjects] = useState([]);
  const [pid, setPid] = useState(0);

  useEffect(() => {
    setName("loading");
    const getProjects = async () => {
      try {
        const ps = await todoist.getProjects();
        setProjects(ps.results);
      } catch (error) {
        notifyError(`Error fetching projects: ${error.message}`);
      }
    };
    getProjects();

    todoist
      .getTasks()
      .then((res) => {
        const task = res.results.find((t) => t.id === id);
        setName(task.content);
        setDescription(task.description);
        setPriority({ priority: task.priority, color: task.priorityColor });
        setPid(task.projectId);
      })
      .catch((error) => {
        notifyError(`Error fetching tasks: ${error.message}`);
      });
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      setSelectedProject(projects.find((p) => p.id === pid));
    }
  }, [pid]);

  const onAdd = async () => {
    setBtnDisabled(true);
    const args = {
      id: id,
      content: name,
      description: description,
      priority: priority.priority,
      projectId: pid,
    };

    try {
      await todoist.deleteTask(id);
      await todoist.addTask(args);
      onSuccess();
    } catch (error) {
      notifyError(
        `Error updating task: ${error.response?.data || error.message}`
      );
    }
  };

  const onSuccess = () => {
    setEditModel(false);
    notifySuccess("Task Updated Successfully");
    setName("");
    setDescription("");
    setPriority({ priority: 1, color: "#d1453b" });
    setBtnDisabled(false);
  };

  const priorityMenu = (
    <Menu>
      {priorityList.map(({ priority, color }) => (
        <Menu.Item key={priority}>
          <button
            onClick={() => setPriority({ priority: priority, color: color })}
          >
            <div className="flex items-center">
              <span style={{ color: color }}>
                <FlagOutlined />
              </span>{" "}
              <div className="ml-2">Priority {priority}</div>
            </div>
          </button>
        </Menu.Item>
      ))}
    </Menu>
  );

  const menu = (
    <Menu>
      <Menu.Item key="2">
        <button>
          <div className="flex items-center">
            <span style={{ color: "gray" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                style={{ color: "gray" }}
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M15.994 6.082a.5.5 0 1 0-.987-.164L14.493 9h-3.986l.486-2.918a.5.5 0 1 0-.986-.164L9.493 9H7a.5.5 0 1 0 0 1h2.326l-.666 4H6a.5.5 0 0 0 0 1h2.493l-.486 2.918a.5.5 0 1 0 .986.164L9.507 15h3.986l-.486 2.918a.5.5 0 1 0 .987.164L14.507 15H17a.5.5 0 1 0 0-1h-2.326l.667-4H18a.5.5 0 1 0 0-1h-2.493l.487-2.918ZM14.327 10H10.34l-.667 4h3.987l.667-4Z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>{" "}
            <div>Inbox</div>
          </div>
        </button>
      </Menu.Item>
      {projects.length > 0 &&
        projects.map((project) => (
          <Menu.Item key={project.id}>
            <button onClick={() => setPid(project.id)}>
              <div className="flex items-center">
                <span style={{ color: project.color }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    style={{ color: project.color }}
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M15.994 6.082a.5.5 0 1 0-.987-.164L14.493 9h-3.986l.486-2.918a.5.5 0 1 0-.986-.164L9.493 9H7a.5.5 0 1 0 0 1h2.326l-.666 4H6a.5.5 0 0 0 0 1h2.493l-.486 2.918a.5.5 0 1 0 .986.164L9.507 15h3.986l-.486 2.918a.5.5 0 1 0 .987.164L14.507 15H17a.5.5 0 1 0 0-1h-2.326l.667-4H18a.5.5 0 1 0 0-1h-2.493l.487-2.918ZM14.327 10H10.34l-.667 4h3.987l.667-4Z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>{" "}
                <div>{project.name}</div>
              </div>
            </button>
          </Menu.Item>
        ))}
    </Menu>
  );

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      className="rounded-lg shadow-lg p-4"
    >
      <div className="mt-8 mx-5">
        <div className="flex flex-col gap-3">
          {selectedProject && (
            <div className="flex items-center gap-1">
              <span style={{ color: selectedProject?.color ?? "gray" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  className=""
                  style={{ color: selectedProject?.color ?? "gray" }}
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M15.994 6.082a.5.5 0 1 0-.987-.164L14.493 9h-3.986l.486-2.918a.5.5 0 1 0-.986-.164L9.493 9H7a.5.5 0 1 0 0 1h2.326l-.666 4H6a.5.5 0 0 0 0 1h2.493l-.486 2.918a.5.5 0 1 0 .986.164L9.507 15h3.986l-.486 2.918a.5.5 0 1 0 .987.164L14.507 15H17a.5.5 0 1 0 0-1h-2.326l.667-4H18a.5.5 0 1 0 0-1h-2.493l.487-2.918ZM14.327 10H10.34l-.667 4h3.987l.667-4Z"
                    clipRule="evenodd"
                  ></path>
                </svg>{" "}
              </span>
              <div>{selectedProject.name}</div>
            </div>
          )}
          <Input
            placeholder="Task name"
            className="text-lg font-medium"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input.TextArea
            placeholder="Description"
            className="text-sm"
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex gap-2">
            <Button
              icon={<CalendarOutlined />}
              className="flex items-center gap-1"
            >
              Date
            </Button>
            <Dropdown overlay={priorityMenu} trigger={["click"]}>
              <Button className="flex items-center gap-1">
                {priority == 0 ? (
                  "Priority"
                ) : (
                  <div className="flex items-center">
                    <span style={{ color: priority.color }}>
                      <FlagOutlined />
                    </span>{" "}
                    <div className="ml-2">Priority {priority.priority}</div>
                  </div>
                )}
              </Button>
            </Dropdown>

            <Button icon={<BellOutlined />} className="flex items-center gap-1">
              Reminders
            </Button>
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button icon={<MoreOutlined />} className="flex items-center" />
            </Dropdown>
          </div>

          <div className="flex justify-between items-center mt-3">
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button className="flex items-center gap-1">
                {selectedProject ? (
                  <div className="flex items-center gap-1">
                    <span style={{ color: selectedProject.color }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        className=""
                        style={{ color: selectedProject?.color ?? "gray" }}
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M15.994 6.082a.5.5 0 1 0-.987-.164L14.493 9h-3.986l.486-2.918a.5.5 0 1 0-.986-.164L9.493 9H7a.5.5 0 1 0 0 1h2.326l-.666 4H6a.5.5 0 0 0 0 1h2.493l-.486 2.918a.5.5 0 1 0 .986.164L9.507 15h3.986l-.486 2.918a.5.5 0 1 0 .987.164L14.507 15H17a.5.5 0 1 0 0-1h-2.326l.667-4H18a.5.5 0 1 0 0-1h-2.493l.487-2.918ZM14.327 10H10.34l-.667 4h3.987l.667-4Z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    <div>{selectedProject.name}</div>
                  </div>
                ) : (
                  " Add to project"
                )}
              </Button>
            </Dropdown>
            <div className="flex gap-2">
              <button
                className={`${
                  selectedProject !== null ? "bg-[#c3392c]" : "bg-[#eda59e]"
                } border-none text-white px-4 py-2 rounded-sm`}
                onClick={() => onAdd()}
                disabled={selectedProject === null || btnDisabled}
                style={{
                  cursor:
                    selectedProject !== null && !btnDisabled
                      ? "pointer"
                      : "not-allowed",
                }}
              >
                {btnDisabled ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TaskEditModal;
