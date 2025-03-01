import { Modal, Menu } from "antd";
import { StarOutlined, DeleteOutlined } from "@ant-design/icons";
import { use, useState, useEffect } from "react";
import { getProject, addToFavorites, removeProject } from "../utils/axios";

const ProjectMenu = ({ setShowProjectMenu, id }) => {
  const [project, setProject] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    getProject(id).then((res) => setProject(res));
  }, [id]);

  const updateProject = async () => {
    await addToFavorites(id, { ...project, is_favorite: !isFavorite });
    setShowProjectMenu(false);
  };

  const deleteProject = async () => {
    await removeProject(id);
    setShowProjectMenu(false);
  };

  return (
    <Modal open={true} onCancel={() => setShowProjectMenu(false)} footer={null}>
      <Menu className="my-10 mx-2">
        <Menu.Item
          key="remove"
          icon={<StarOutlined />}
          onClick={() => updateProject()}
        >
          {isFavorite ? "Remove from favorites" : "Add to favorites"}
        </Menu.Item>
        <Menu.Item
          key="delete"
          icon={<DeleteOutlined />}
          danger
          onClick={() => deleteProject()}
        >
          Delete
        </Menu.Item>
      </Menu>
    </Modal>
  );
};

export default ProjectMenu;
