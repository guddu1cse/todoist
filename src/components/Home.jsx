import { useEffect } from "react";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Splitter } from "antd";
import { notifyError, todoist } from "./config";
import Inbox from "./Inbox";
import TaskModal from "./TaskModal";
import AddProjectModal from "./AddProjectModal";
import ProjectDetails from "./ProjectDetails";
import ProjectMenu from "./ProjectMenu";
import Today from "./Today";
import Completed from "./Completed";
import { useDispatch, useSelector } from "react-redux";
import { setState } from "../redux/slice";
import {
  Add,
  Bell,
  Close,
  Ellipsis,
  Hashtag,
  Plus,
  Template,
} from "../assets/Icons";
import { scrollableContent } from "../constant/constant";

const Sidebar = () => {
  const dispatch = useDispatch();

  const {
    isProjectsOpen,
    activeTab,
    isFavoritesExpanded,
    projects,
    favorites,
    hoveredProject,
    hoveredFavorite,
    inboxSize,
    addForm,
    checkedProject,
    checkedFavorite,
    showAddProject,
    isInboxIteam,
    salectedProject,
    showProjectMenu,
    edit,
    tasks,
    taskCount,
  } = useSelector((state) => state.project);

  const handleStateChange = (key, value) => {
    dispatch(setState({ key, value }));
  };

  useEffect(() => {
    if (tasks.length > 0 && projects.length > 0) {
      const obj = {};
      projects.forEach((project) => {
        obj[project.id] = 0;
        tasks.forEach((task) => {
          if (task.projectId === project.id) {
            obj[project.id] += 1;
          }
        });
      });
      handleStateChange("taskCount", obj);
    }
  }, [tasks, projects]);

  useEffect(() => {
    if (activeTab === "Inbox") {
      handleStateChange("isInboxIteam", true);
    } else {
      handleStateChange("isInboxIteam", false);
    }
  }, [activeTab]);

  useEffect(() => {
    if (checkedFavorite || checkedProject) {
      handleStateChange("activeTab", null);
    }
  }, [checkedFavorite, checkedProject]);

  const handleTabClick = (tab) => {
    handleStateChange("activeTab", tab);
    handleStateChange("checkedProject", null);
    handleStateChange("checkedFavorite", null);
  };

  const onCancel = () => handleStateChange("addForm", false);

  const onFavoriteClick = (id) => {
    handleStateChange("activeTab", null);
    handleStateChange("checkedProject", null);
    handleStateChange("checkedFavorite", id);
  };

  const onProjectClick = (id) => {
    handleStateChange("activeTab", null);
    handleStateChange("checkedFavorite", null);
    handleStateChange("checkedProject", id);
  };

  return (
    <div>
      {addForm && (
        <div className="fixed top-0 bottom-0 w-[100vw] h-[100vh] flex justify-center items-center">
          <TaskModal
            visible={true}
            onCancel={onCancel}
            projects={projects}
            projectId={checkedProject || checkedFavorite}
          />
        </div>
      )}
      {showAddProject && (
        <AddProjectModal
          setShowAddProject={() => handleStateChange("showAddProject", false)}
        />
      )}
      {showProjectMenu && (
        <ProjectMenu
          setShowProjectMenu={() => handleStateChange("showProjectMenu", false)}
          id={edit}
        />
      )}
      <div>
        <Splitter
          style={{
            height: "100vh",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Splitter.Panel
            defaultSize="25%"
            min="20%"
            max="70%"
            style={{
              backgroundColor: "#FCFAF8",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="h-full bg-[#FCFAF8] flex flex-col text-gray-800">
              {/* Fixed Header Section */}
              <div className="p-4 bg-[#FCFAF8]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <img
                      src="https://dcff1xvirvpfp.cloudfront.net/a53d31e03afc4c03a351be551b929d63_big.jpg"
                      alt="Profile"
                      className="rounded-full w-6 h-6 mx-2"
                    />
                    <span className="font-semibold">Guddu</span>
                  </div>
                  <div className="flex items-center justify-end">
                    <div className="mr-3">
                      <Bell />
                    </div>
                    <div>
                      <Close />
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => handleStateChange("addForm", true)}
                  className="flex items-center cursor-pointer p-2 text-[#DC4C3E] hover:bg-gray-200 rounded"
                >
                  <div className="mr-2">
                    <Plus />
                  </div>{" "}
                  Add Task
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-4">
                <div className="">
                  {scrollableContent.map(({ icon, label, count }) => (
                    <div
                      key={label}
                      className={`flex items-center cursor-pointer p-2 rounded ${
                        activeTab === label
                          ? "text-red-500 bg-red-100"
                          : "text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => handleTabClick(label)}
                    >
                      {icon} <span className="ml-2">{label}</span>{" "}
                      {label === "Inbox" && inboxSize > 0 && (
                        <span className="ml-auto text-sm text-gray-500">
                          {inboxSize}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Favorites */}
                <div className="mt-4">
                  <div className="flex items-center text-gray-500 justify-between uppercase text-xs cursor-pointer hover:bg-gray-200 rounded p-2">
                    <div>Favorites </div>
                    <div
                      onClick={() =>
                        handleStateChange(
                          "isFavoritesExpanded",
                          !isFavoritesExpanded
                        )
                      }
                      className="flex justify-center items-center hover:bg-gray-300 rounded p-2"
                    >
                      <span className="flex items-center justify-center ">
                        {isFavoritesExpanded ? (
                          <DownOutlined />
                        ) : (
                          <RightOutlined />
                        )}
                      </span>
                    </div>
                  </div>
                  {isFavoritesExpanded && (
                    <div className="mt-2 space-y-2">
                      {favorites.map((project) => (
                        <div
                          key={project.id + "favorite"}
                          onMouseEnter={() =>
                            handleStateChange("hoveredFavorite", project.id)
                          }
                          onMouseLeave={() =>
                            handleStateChange("hoveredFavorite", null)
                          }
                          onClick={() => onFavoriteClick(project.id)}
                          className={`flex items-center justify-between text-gray-700 cursor-pointer hover:bg-gray-200 rounded ${
                            checkedFavorite === project.id ? "bg-[#ffefe5]" : ""
                          }`}
                        >
                          <div className={`flex items-center`}>
                            <div className="flex justify-center items-center hover:bg-gray-300 rounded p-2">
                              <Hashtag />{" "}
                              {/* Assuming Hashtag is a component */}
                            </div>{" "}
                            {project.name}
                          </div>
                          <Button
                            type="link"
                            size="small"
                            style={{
                              display:
                                project.id === hoveredFavorite
                                  ? "flex"
                                  : "none",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStateChange("edit", project.id);
                              handleStateChange("showProjectMenu", true);
                            }}
                          >
                            <Ellipsis />{" "}
                            {/* Assuming Ellipsis is a component */}
                          </Button>
                          <div
                            className="text-gray-500 hover:bg-gray-300 rounded mr-5"
                            style={{
                              display:
                                project.id !== hoveredFavorite
                                  ? "flex"
                                  : "none",
                            }}
                          >
                            {taskCount[project.id] ? taskCount[project.id] : 0}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* My Projects Section */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-gray-500 uppercase text-xs cursor-pointer hover:bg-gray-200 rounded p-2">
                    <div>My Projects</div>
                    <div
                      onClick={() =>
                        handleStateChange("isProjectsOpen", !isProjectsOpen)
                      }
                    >
                      {isProjectsOpen ? <DownOutlined /> : <RightOutlined />}
                    </div>
                  </div>
                  {isProjectsOpen && (
                    <div className="mt-2">
                      {/* Projects list could be similar to favorites */}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Splitter.Panel>
          <Splitter.Panel style={{ height: "100vh" }}>
            {/* Conditional rendering based on `activeTab` */}
            {/* {activeTab === "Inbox" && <Inbox />}
            {activeTab === "Today" && <Today />}
            {activeTab === "Completed" && <Completed />} */}
            {/* Additional conditional renders for other tabs */}
          </Splitter.Panel>
        </Splitter>
      </div>
    </div>
  );
};

export default Sidebar;
