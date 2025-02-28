import { useState, useEffect } from "react";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Splitter } from "antd";
import { todoist } from "./config";
import Inbox from "./Inbox";
import TaskModal from "./TaskModal";
import AddProjectModal from "./AddProjectModal";
import ProjectDetails from "./ProjectDetails";
import ProjectMenu from "./ProjectMenu";

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
      console.log("taskCount", obj);
    }
  }, [tasks, projects]);

  useEffect(() => {
    if (activeTab === "Inbox") setIsInboxIteam(true);
    else setIsInboxIteam(false);
  }, [activeTab]);

  useEffect(() => {
    console.log(
      "checked Favorite Project",
      checkedFavorite,
      +"checked Project",
      checkedProject
    );

    if (checkedFavorite || checkedProject) {
      setActiveTab(null);
    }
  }, [checkedFavorite, checkedProject]);

  // no use
  useEffect(() => {
    console.log(salectedProject);
  }, [salectedProject]);

  useEffect(() => {
    todoist
      .getProjects()
      .then((projects) => projects.results)
      .then((projects) => {
        setFavorites(() => projects.filter((project) => project.isFavorite));
        setProjects(projects);
        console.log(projects);
      })
      .catch((error) => console.log(error));

    todoist
      .getTasks()
      .then((tasks) => tasks.results)
      .then((tasks) => {
        setTasks(tasks);
        console.log(tasks);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCheckedProject(null);
    setCheckedFavorite(null);
  };

  const onCancel = () => {
    setAddForm(false);
  };

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
          <TaskModal visible={true} onCancel={onCancel} projects={projects} />
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          fill-rule="evenodd"
                          d="m6.585 15.388-.101.113c-.286.322-.484.584-.484 1h12c0-.416-.198-.678-.484-1l-.101-.113c-.21-.233-.455-.505-.7-.887-.213-.33-.355-.551-.458-.79-.209-.482-.256-1.035-.4-2.71-.214-3.5-1.357-5.5-3.857-5.5s-3.643 2-3.857 5.5c-.144 1.675-.191 2.227-.4 2.71-.103.239-.245.46-.457.79-.246.382-.491.654-.701.887Zm10.511-2.312c-.083-.341-.131-.862-.241-2.148-.113-1.811-.469-3.392-1.237-4.544C14.8 5.157 13.57 4.5 12 4.5c-1.571 0-2.8.656-3.618 1.883-.768 1.152-1.124 2.733-1.237 4.544-.11 1.286-.158 1.807-.241 2.148-.062.253-.13.373-.46.884-.198.308-.373.504-.57.723-.074.081-.15.166-.232.261-.293.342-.642.822-.642 1.557a1 1 0 0 0 1 1h3a3 3 0 0 0 6 0h3a1 1 0 0 0 1-1c0-.735-.35-1.215-.642-1.557-.082-.095-.158-.18-.232-.261-.197-.22-.372-.415-.57-.723-.33-.511-.398-.63-.46-.884ZM14 17.5h-4a2 2 0 1 0 4 0Z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          fill-rule="evenodd"
                          d="M19 4.001H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-12a2 2 0 0 0-2-2Zm-15 2a1 1 0 0 1 1-1h4v14H5a1 1 0 0 1-1-1v-12Zm6 13h9a1 1 0 0 0 1-1v-12a1 1 0 0 0-1-1h-9v14Z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => setAddForm(true)}
                  className="flex items-center cursor-pointer p-2 text-[#DC4C3E] hover:bg-gray-200 rounded"
                >
                  <div className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Zm-.711-16.5a.75.75 0 1 1 1.5 0v4.789H17.5a.75.75 0 0 1 0 1.5h-4.711V17.5a.75.75 0 0 1-1.5 0V12.79H6.5a.75.75 0 1 1 0-1.5h4.789V6.5Z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>{" "}
                  Add Task
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-4">
                <div className="">
                  {[
                    {
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            fill-rule="evenodd"
                            d="M16.29 15.584a7 7 0 1 0-.707.707l3.563 3.563a.5.5 0 0 0 .708-.707l-3.563-3.563ZM11 17a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      ),
                      label: "Search",
                    },
                    {
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            fill-rule="evenodd"
                            d="M8.062 4h7.876a2 2 0 0 1 1.94 1.515l2.062 8.246c.04.159.06.322.06.486V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3.754a2 2 0 0 1 .06-.485L6.12 5.515A2 2 0 0 1 8.061 4Zm0 1a1 1 0 0 0-.97.758L5.03 14.004a1 1 0 0 0-.03.242V18a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.754a.997.997 0 0 0-.03-.242L16.91 5.758a1 1 0 0 0-.97-.758H8.061Zm6.643 10a2.75 2.75 0 0 1-5.41 0H7a.5.5 0 1 1 0-1h2.75a.5.5 0 0 1 .5.5 1.75 1.75 0 1 0 3.5 0 .5.5 0 0 1 .5-.5H17a.5.5 0 0 1 0 1h-2.295Z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      ),
                      label: "Inbox",
                      count: inboxSize,
                    },
                    {
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M20 6.00049C20 4.89592 19.1046 4.00049 18 4.00049H6C4.89543 4.00049 4 4.89592 4 6.00049V18.0005C4 19.1051 4.89543 20.0005 6 20.0005H18C19.1046 20.0005 20 19.1051 20 18.0005V6.00049ZM17 8.00049C17.2761 8.00049 17.5 8.22435 17.5 8.50049C17.5 8.77663 17.2761 9.00049 17 9.00049H7C6.72386 9.00049 6.5 8.77663 6.5 8.50049C6.5 8.22435 6.72386 8.00049 7 8.00049H17Z"
                            fill="currentColor"
                          ></path>
                          <text
                            fontSize="9"
                            fontWeight="500"
                            fill="currentColor"
                            color="white"
                            x="50%"
                            y="65%"
                            dominantBaseline="middle"
                            textAnchor="middle"
                          >
                            {new Date().getDate()}
                          </text>
                        </svg>
                      ),
                      label: "Today",
                    },
                    {
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            fill-rule="evenodd"
                            d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6Zm10 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-3-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm9-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-3-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM7 8a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1H7Z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      ),
                      label: "Upcoming",
                    },
                    {
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            fill-rule="evenodd"
                            d="M17.5 6.001h-3a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5Zm-3-1a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5h-3Zm-8 9h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5Zm-1.5.5a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5v-3Zm9.5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5Zm-1.5.5a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5v-3Zm-6.5-8.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5Zm-1.5.5a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5v-3Z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      ),
                      label: "Filters & Labels",
                    },
                    {
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            fill-rule="evenodd"
                            d="M12 21.001a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-1a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm-4.354-8.104a.5.5 0 0 1 .708 0l2.146 2.147 5.146-5.147a.5.5 0 0 1 .708.708l-5.5 5.5a.5.5 0 0 1-.708 0l-2.5-2.5a.5.5 0 0 1 0-.708Z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      ),
                      label: "Completed",
                    },
                  ].map(({ icon, label, count }) => (
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
                      {count > 0 && (
                        <span className="ml-auto text-sm text-gray-500">
                          {count}
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
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                                className=""
                                style={{ color: project.color }}
                              >
                                <path
                                  fill="currentColor"
                                  fillRule="evenodd"
                                  d="M15.994 6.082a.5.5 0 1 0-.987-.164L14.493 9h-3.986l.486-2.918a.5.5 0 1 0-.986-.164L9.493 9H7a.5.5 0 1 0 0 1h2.326l-.666 4H6a.5.5 0 0 0 0 1h2.493l-.486 2.918a.5.5 0 1 0 .986.164L9.507 15h3.986l-.486 2.918a.5.5 0 1 0 .987.164L14.507 15H17a.5.5 0 1 0 0-1h-2.326l.667-4H18a.5.5 0 1 0 0-1h-2.493l.487-2.918ZM14.327 10H10.34l-.667 4h3.987l.667-4Z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
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
                              <svg width="15" height="3" aria-hidden="true">
                                <path
                                  fill="currentColor"
                                  fill-rule="evenodd"
                                  d="M1.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                                ></path>
                              </svg>
                            </span>
                          </Button>
                          <p
                            style={{
                              display:
                                project.id !== hoveredFavorite
                                  ? "flex"
                                  : "none",
                            }}
                            className="text-[#bca4a4] hover:bg-gray-300 rounded mr-5"
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
                        USED: 14/5
                      </span>
                    </div>
                    <div>
                      <span className="">
                        <div className="flex gap-3 ">
                          <div
                            className="hover:bg-gray-300 rounded p-2 flex justify-center items-center"
                            onClick={() => setShowAddProject(true)}
                          >
                            <svg width="13" height="13">
                              <path
                                fill="currentColor"
                                fill-rule="evenodd"
                                d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"
                              ></path>
                            </svg>
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
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                                className=""
                                style={{ color: project.color }}
                              >
                                <path
                                  fill="currentColor"
                                  fillRule="evenodd"
                                  d="M15.994 6.082a.5.5 0 1 0-.987-.164L14.493 9h-3.986l.486-2.918a.5.5 0 1 0-.986-.164L9.493 9H7a.5.5 0 1 0 0 1h2.326l-.666 4H6a.5.5 0 0 0 0 1h2.493l-.486 2.918a.5.5 0 1 0 .986.164L9.507 15h3.986l-.486 2.918a.5.5 0 1 0 .987.164L14.507 15H17a.5.5 0 1 0 0-1h-2.326l.667-4H18a.5.5 0 1 0 0-1h-2.493l.487-2.918ZM14.327 10H10.34l-.667 4h3.987l.667-4Z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
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
                              <svg width="15" height="3" aria-hidden="true">
                                <path
                                  fill="currentColor"
                                  fill-rule="evenodd"
                                  d="M1.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                                ></path>
                              </svg>
                            </span>
                          </Button>
                          <p
                            style={{
                              display:
                                project.id !== hoveredProject ? "flex" : "none",
                            }}
                            className="text-[#bca4a4] hover:bg-gray-300 rounded mr-5"
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
                    <svg width="13" height="13">
                      <path
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"
                      ></path>
                    </svg>
                  </div>{" "}
                  Add a team
                </div>
                <div className="flex items-center text-gray-700 cursor-pointer p-2  hover:bg-gray-200 rounded">
                  <div className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="M10.241 4.004h3.513c.554 0 1.004.448 1.004 1v9.638l-5.52-7.855V5.004c0-.552.449-1 1.003-1Zm4.844 15.4.048-.074a3.772 3.772 0 0 1-6.218.074L1.863 9.37a1.995 1.995 0 0 1 .493-2.786l2.878-2.007a2.012 2.012 0 0 1 2.795.49l.205.292v-.355c0-1.105.899-2 2.007-2h3.513c1.109 0 2.007.895 2.007 2v.361l.21-.298a2.012 2.012 0 0 1 2.796-.492l2.877 2.008a1.995 1.995 0 0 1 .493 2.785l-7.052 10.035Zm.676-12.295v9.589l5.554-7.903a.998.998 0 0 0-.247-1.393l-2.877-2.007a1.006 1.006 0 0 0-1.398.245L15.761 7.11ZM5.81 5.396 2.932 7.403a.998.998 0 0 0-.247 1.393L9.737 18.83a2.766 2.766 0 0 0 3.844.675 2.744 2.744 0 0 0 .678-3.83L7.207 5.64a1.006 1.006 0 0 0-1.398-.245Zm6.189 12.983a1.002 1.002 0 0 1-1.004-1c0-.552.45-1 1.004-1s1.003.448 1.003 1-.45 1-1.003 1Z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
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
            {isInboxIteam && (
              <Inbox
                inboxSize={inboxSize}
                setInboxSize={setInboxSize}
                setAddForm={setAddForm}
              />
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
