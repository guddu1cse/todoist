import { useState, useEffect } from "react";
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
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Inbox");
  const [isFavoritesExpanded, setIsFavoritesExpanded] = useState(false);
  const [projects, setProjects] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [hoveredFavorite, setHoveredFavorite] = useState(null);
  const [inboxSize, setInboxSize] = useState("");
  const [addForm, setAddForm] = useState(false);
  const [checkedProject, setCheckedProject] = useState(null);
  const [checkedFavorite, setCheckedFavorite] = useState(null);
  const [showAddProject, setShowAddProject] = useState(false);
  const [isInboxIteam, setIsInboxIteam] = useState(true);
  const [salectedProject, setSalectedProject] = useState(null);
  const [showProjectMenu, setShowProjectMenu] = useState(false);
  const [edit, setEdit] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [taskCount, setTaskCount] = useState({});

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
      setTaskCount({ ...obj });
    }
  }, [tasks, projects]);

  useEffect(() => {
    if (activeTab === "Inbox") setIsInboxIteam(true);
    else setIsInboxIteam(false);
  }, [activeTab]);

  useEffect(() => {
    if (checkedFavorite || checkedProject) {
      setActiveTab(null);
    }
  }, [checkedFavorite, checkedProject]);

  useEffect(() => {
    todoist
      .getProjects()
      .then((projects) => projects.results)
      .then((projects) => {
        setFavorites(() => projects.filter((project) => project.isFavorite));
        setProjects(projects);
      })
      .catch((error) => notifyError(error.message));

    todoist
      .getTasks()
      .then((tasks) => tasks.results)
      .then((tasks) => setTasks(tasks))
      .catch((error) => notifyError(error.message));
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCheckedProject(null);
    setCheckedFavorite(null);
  };

  const onCancel = () => setAddForm(false);

  const onFavoriteClick = (id) => {
    setActiveTab(null);
    setCheckedProject(null);
    setCheckedFavorite(id);
  };

  const onProjectClick = (id) => {
    setActiveTab(null);
    setCheckedFavorite(null);
    setCheckedProject(id);
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
        <AddProjectModal setShowAddProject={setShowAddProject} />
      )}
      {showProjectMenu && (
        <ProjectMenu setShowProjectMenu={setShowProjectMenu} id={edit} />
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
                      {/* Bell Icon */}
                      <Bell />
                    </div>
                    <div>
                      {/* Close Icon */}
                      <Close />
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => setAddForm(true)}
                  className="flex items-center cursor-pointer p-2 text-[#DC4C3E] hover:bg-gray-200 rounded"
                >
                  <div className="mr-2">
                    {/* Plus Icon */}
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
                        setIsFavoritesExpanded(!isFavoritesExpanded)
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
                          onMouseEnter={() => setHoveredFavorite(project.id)}
                          onMouseLeave={() => setHoveredFavorite(null)}
                          onClick={() => {
                            onFavoriteClick(project.id);
                            setSalectedProject(project);
                          }}
                          className={`flex items-center justify-between text-gray-700 cursor-pointer hover:bg-gray-200 rounded ${
                            checkedFavorite === project.id ? "bg-[#ffefe5]" : ""
                          }`}
                        >
                          <div className={`flex items-center`}>
                            <div className="flex justify-center items-center hover:bg-gray-300 rounded p-2">
                              <Hashtag project={project} />
                            </div>{" "}
                            {project.name}
                          </div>
                          <Button
                            type="link"
                            size="small"
                            style={{
                              display:
                                project.id == hoveredFavorite ? "flex" : "none",
                            }}
                            // Edit Model
                            onClick={(e) => {
                              e.stopPropagation();
                              setEdit(project.id);
                              setShowProjectMenu(true);
                            }}
                          >
                            <span className="text-[#bca4a4] hover:bg-gray-300 py-3 px-2 rounded">
                              <Ellipsis />
                            </span>
                          </Button>
                          <p
                            style={{
                              display:
                                project.id !== hoveredFavorite
                                  ? "flex"
                                  : "none",
                            }}
                            className="text-gray-500 hover:bg-gray-300 rounded mr-5"
                          >
                            {taskCount[project.id] ? taskCount[project.id] : 0}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* My Projects */}
                <div className="mt-4">
                  <div className="flex items-center text-gray-500 justify-between uppercase text-xs cursor-pointer hover:bg-gray-200 rounded p-2">
                    <div>
                      My Projects{" "}
                      <span className="ml-2 text-xs bg-gray-200 px-2 rounded">
                        USED: {projects.length}/5
                      </span>
                    </div>
                    <div>
                      <span className="">
                        <div className="flex gap-3 ">
                          <div
                            className="hover:bg-gray-300 rounded p-2 flex justify-center items-center"
                            onClick={() => setShowAddProject(true)}
                          >
                            <Add />
                          </div>
                          <div
                            className="flex items-center justify-center hover:bg-gray-300 rounded p-2"
                            onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                          >
                            {isProjectsOpen ? (
                              <DownOutlined />
                            ) : (
                              <RightOutlined />
                            )}
                          </div>
                        </div>
                      </span>
                    </div>
                  </div>
                  {isProjectsOpen && (
                    <div className="mt-2 space-y-2">
                      {projects.map((project) => (
                        <div
                          key={project.id}
                          onMouseEnter={() => setHoveredProject(project.id)}
                          onMouseLeave={() => setHoveredProject(null)}
                          onClick={() => {
                            onProjectClick(project.id);
                            setSalectedProject(project);
                          }}
                          className={`flex items-center justify-between text-gray-700 cursor-pointer p-2 hover:bg-gray-200 rounded ${
                            checkedProject === project.id ? "bg-[#ffefe5]" : ""
                          }`}
                        >
                          <div className="flex items-center">
                            <div>
                              <Hashtag project={project} />
                            </div>{" "}
                            {project.name}
                          </div>
                          <Button
                            type="link"
                            size="small"
                            style={{
                              display:
                                hoveredProject === project.id ? "flex" : "none",
                            }}
                            // Edit Model
                            onClick={(e) => {
                              e.stopPropagation();
                              setEdit(project.id);
                              setShowProjectMenu(true);
                            }}
                          >
                            <span className="text-[#bca4a4] hover:bg-gray-300 py-3 px-2 rounded">
                              <Ellipsis />
                            </span>
                          </Button>
                          <p
                            style={{
                              display:
                                project.id !== hoveredProject ? "flex" : "none",
                            }}
                            className="text-gray-500 hover:bg-gray-300 rounded mr-3"
                          >
                            {taskCount[project.id] ? taskCount[project.id] : 0}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Fixed Add Team Button */}
              <div className="p-4">
                <div className="flex items-center text-gray-700 cursor-pointer p-2  hover:bg-gray-200 rounded">
                  <div className="mr-2">
                    <Add />
                  </div>{" "}
                  Add a team
                </div>
                <div className="flex items-center text-gray-700 cursor-pointer p-2  hover:bg-gray-200 rounded">
                  <div className="mr-2">
                    <Template />
                  </div>{" "}
                  Browser Template
                </div>
              </div>
            </div>
          </Splitter.Panel>
          <Splitter.Panel
            style={{
              height: "100vh",
            }}
          >
            {/* Inbox */}
            {activeTab === "Inbox" && (
              <Inbox
                inboxSize={inboxSize}
                setInboxSize={setInboxSize}
                setAddForm={setAddForm}
              />
            )}
            {activeTab === "Today" && (
              <Today InboxSize={inboxSize} setAddForm={setAddForm} />
            )}
            {activeTab === "Completed" && (
              <Completed InboxSize={inboxSize} setAddForm={setAddForm} />
            )}
            {/* Project Details Page */}
            {salectedProject != null && (
              <ProjectDetails {...salectedProject} setAddForm={setAddForm} />
            )}
          </Splitter.Panel>
        </Splitter>
      </div>
    </div>
  );
};

export default Sidebar;
