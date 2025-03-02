import React, { use } from "react";
import { Modal, Input, Button, Dropdown, Menu } from "antd";
import { useState, useEffect } from "react";
import { todoist } from "./config";
import { v4 as uuidv4 } from "uuid";
import { notifyError, notifySuccess } from "./config";
import { priorityList } from "../constant/constant";

import {
  CalendarOutlined,
  FlagOutlined,
  BellOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Hashtag } from "../assets/Icons";

const TaskModal = ({ visible, onCancel, projects, projectId }) => {
  const [salectedProject, setSelectedProject] = useState(null);
  const [priority, setPriority] = useState({ priority: 1, color: "#d1453b" });
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    setSelectedProject(projects.find((project) => project.id === projectId));
  }, [projects]);

  const onAdd = async () => {
    setBtnDisabled(true);
    const id = uuidv4();
    const args = {
      creatorId: "2671355",
      createdAt: new Date().toISOString(),
      assigneeId: null,
      assignerId: null,
      commentCount: 0,
      isCompleted: false,
      content: name,
      description: description,
      due: {
        date: new Date().toISOString(),
        isRecurring: false,
        datetime: new Date().toISOString(),
        string: "tomorrow at 12",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      deadline: {
        date: new Date().toISOString().split("T")[0],
      },
      duration: null,
      id: uuidv4(),
      labels: [],
      order: 3,
      priority: priority.priority,
      projectId: salectedProject.id || 0,
      sectionId: null,
      parentId: null,
      url: "https://todoist.com/showTask?id=" + id,
    };

    try {
      const response = await todoist.addTask(args);
      onSuccess();
      onCancel();
    } catch (error) {
      notifyError("Something went wrong");
      setBtnDisabled(false);
    }
  };

  const onSuccess = () => {
    notifySuccess("Task Added Successfully");
    setName("");
    setDescription("");
    setPriority({ priority: 1, color: "#d1453b" });
    setSelectedProject(null);
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
        <button onClick={() => setSelectedProject("inbox")}>
          <div className="flex items-center">
            <span style={{ color: "gray" }}>
              <Hashtag project={{ color: "gray" }} />
            </span>{" "}
            <div>{"put it in inbox"}</div>
          </div>
        </button>
      </Menu.Item>
      {projects.map((project) => (
        <Menu.Item key={project.id}>
          <button onClick={() => setSelectedProject(project)}>
            <div className="flex items-center">
              <span style={{ color: project.color }}>
                {/* Hashtag icon */}
                <Hashtag project={project} />
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
          {salectedProject && (
            <div className="flex items-center gap-1">
              <span style={{ color: salectedProject?.color ?? "gray" }}>
                {/* Hashtag icon */}
                <Hashtag project={salectedProject} />{" "}
              </span>
              <div>{salectedProject.name}</div>
            </div>
          )}
          <Input
            placeholder="Task name"
            className="text-lg font-medium"
            onChange={(e) => setName(e.target.value)}
          />
          <Input.TextArea
            placeholder="Description"
            className="text-sm"
            rows={2}
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
                {salectedProject ? (
                  <div className="flex items-center gap-1">
                    <span style={{ color: salectedProject.color }}>
                      {/* Hashtag icon */}
                      <Hashtag project={salectedProject} />
                    </span>
                    <div>{salectedProject.name}</div>
                  </div>
                ) : (
                  " Add to project"
                )}
              </Button>
            </Dropdown>
            <div className="flex gap-2">
              <button
                className={`${
                  salectedProject !== null ? "bg-[#c3392c]" : "bg-[#eda59e]"
                } border-none text-white px-4 py-2 rounded-sm`}
                onClick={() => onAdd()}
                disabled={salectedProject === null || btnDisabled}
                style={{
                  cursor:
                    salectedProject !== null && !btnDisabled
                      ? "pointer"
                      : "not-allowed",
                }}
              >
                Add task
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TaskModal;
