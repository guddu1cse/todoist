import React, { useState } from "react";
import { Modal, Input, Select, Switch, Button, Radio } from "antd";
import { v4 as uuidv4 } from "uuid";
import { addProject } from "../utils/axios";
const { Option } = Select;
const colors = [
  { name: "Red", color: "red" },
  { name: "Purple", color: "purple" },
  { name: "Sky Blue", color: "skyblue" },
  { name: "Teal", color: "teal" },
  { name: "Orange", color: "orange" },
  { name: "Lime", color: "lime" },
  { name: "Green", color: "green" },
  { name: "Cyan", color: "cyan" },
  { name: "Magenta", color: "magenta" },
  { name: "Yellow", color: "yellow" },
  { name: "Pink", color: "pink" },
  { name: "Blue", color: "blue" },
];

const AddProjectModal = ({ setShowAddProject }) => {
  const [projectName, setProjectName] = useState("");
  const [color, setColor] = useState("purple");
  const [workspace, setWorkspace] = useState("My Projects");
  const [isFavorite, setIsFavorite] = useState(false);
  const [view, setView] = useState("list");
  const [btnDisabled, setBtnDisabled] = useState(false);

  const onCancel = () => {
    setShowAddProject(false);
  };

  const onAdd = async () => {
    setBtnDisabled(true);
    const pid = uuidv4();
    const obj = {
      id: pid,
      name: projectName,
      comment_count: 3,
      color: color,
      is_shared: false,
      order: 2,
      is_favorite: isFavorite,
      is_inbox_project: false,
      is_team_inbox: false,
      view_style: view,
      url: "https://todoist.com/showProject?id=" + pid,
      parent_id: null,
    };
    await addProject(obj, setShowAddProject);
    setBtnDisabled(false);
  };

  return (
    <Modal
      title={<span className="text-lg font-semibold">Add Project</span>}
      open={true}
      onCancel={onCancel}
      footer={null}
    >
      <div className="flex flex-col gap-4">
        <div>
          <label className="block font-medium">Name</label>
          <Input
            placeholder="Enter project name"
            maxLength={120}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">Color</label>
          <Select value={color} onChange={setColor} className="w-full">
            {colors.map(({ name, color }) => (
              <Option value={color} key={color}>
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: color }}
                  ></div>
                  <span className="ml-2">{name}</span>
                </div>
              </Option>
            ))}
          </Select>
        </div>

        <div>
          <label className="block font-medium">Workspace</label>
          <Input value={workspace} disabled />
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={isFavorite}
            onChange={() => setIsFavorite(!isFavorite)}
          />
          <span className="font-medium">Add to favorites</span>
        </div>

        <div>
          <label className="block font-medium">View</label>
          <Radio.Group value={view} onChange={(e) => setView(e.target.value)}>
            <Radio.Button value="list">List</Radio.Button>
            <Radio.Button value="board">Board</Radio.Button>
          </Radio.Group>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="bg-[#dc4c3e] hover:bg-[#c0392b] text-white py-2 px-6 rounded"
            onClick={() => onAdd()}
            disabled={btnDisabled}
          >
            Add Project
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddProjectModal;
