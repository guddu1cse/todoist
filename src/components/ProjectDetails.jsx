import React, { useEffect, useState } from "react";
import { todoist } from "./config";
import { updateTask } from "../utils/axios";
import { notifyError } from "./config";
import TaskEditModal from "./TaskEditModel";

const ProjectDetails = ({ id, name, color, setAddForm }) => {
  const [task, setTask] = useState([]);
  const [hoveredTask, setHoveredTask] = useState(null);
  const [listHovered, setListHovered] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editModel, setEditModel] = useState(false);
  const [salectedTask, setSalectedTask] = useState(null);

  useEffect(() => {
    setTask([]);
    setIsLoading(true);
    todoist
      .getTasks()
      .then((tasks) => {
        setTask(
          tasks.results
            .map((task) => ({ ...task, name: task.content }))
            .filter((task) => !task.isCompleted && task.projectId === id)
        );
        setIsLoading(false);
      })
      .catch(() => {
        notifyError("Error loading tasks");
        setIsLoading(false);
      });
  }, [id]);

  const handleClick = (id) => {
    setTask((prevTask) => prevTask.filter((task) => task.id !== id));
    updateTask(id, { isCompleted: true });
  };

  oncancel = () => setEditModel(false);

  return (
    <div>
      {editModel && (
        <TaskEditModal
          visible={editModel}
          onCancel={oncancel}
          id={salectedTask}
          setEditModel={setEditModel}
        />
      )}
      <div className="p-6 w-full bg-white min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-center">
            <div className="flex items-center">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  className=""
                  style={{ color: color }}
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M15.994 6.082a.5.5 0 1 0-.987-.164L14.493 9h-3.986l.486-2.918a.5.5 0 1 0-.986-.164L9.493 9H7a.5.5 0 1 0 0 1h2.326l-.666 4H6a.5.5 0 0 0 0 1h2.493l-.486 2.918a.5.5 0 1 0 .986.164L9.507 15h3.986l-.486 2.918a.5.5 0 1 0 .987.164L14.507 15H17a.5.5 0 1 0 0-1h-2.326l.667-4H18a.5.5 0 1 0 0-1h-2.493l.487-2.918ZM14.327 10H10.34l-.667 4h3.987l.667-4Z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>{" "}
              {name}
            </div>
          </h1>
          <div className="flex space-x-2 text-gray-500">
            <button className="flex items-center hover:bg-gray-100 p-2 rounded">
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fill-rule="nonzero"
                    d="M15 14.5a2 2 0 0 1 1.936 1.498L19.5 16a.5.5 0 0 1 0 1l-2.563.001a2.001 2.001 0 0 1-3.874 0L4.5 17a.5.5 0 0 1 0-1l8.564-.002A2 2 0 0 1 15 14.5zm-.982 1.81.005-.025-.005.026-.003.014-.004.025-.007.061A.897.897 0 0 0 14 16.5l.008.125.007.047-.001.002.003.014.006.024h-.001l.004.018.016.058.007.021.004.013.009.026.013.033.012.027-.011-.026.019.043-.008-.017.029.06-.018-.037.048.09a1 1 0 0 0 1.784-.155l.015-.039.006-.018-.015.039.022-.06-.001-.001.016-.057.004-.018.005-.024.001-.006v-.001l.005-.033.008-.06A.877.877 0 0 0 16 16.5l-.008-.124-.007-.051-.001-.001-.003-.014-.01-.047-.004-.016-.007-.024-.01-.034-.004-.012-.01-.03-.006-.013-.007-.017-.01-.026a.998.998 0 0 0-1.843.043l-.014.034-.007.022-.014.047-.002.009v.001l-.005.016-.01.047zM9 9.5a2 2 0 0 1 1.936 1.498L19.5 11a.5.5 0 0 1 0 1l-8.563.001a2.001 2.001 0 0 1-3.874 0L4.5 12a.5.5 0 0 1 0-1l2.564-.002A2 2 0 0 1 9 9.5zm0 1a.998.998 0 0 0-.93.634l-.014.034-.007.022-.014.047-.002.009v.001l-.005.016-.01.047.005-.025-.005.026-.003.014-.004.025-.007.061C8 11.441 8 11.471 8 11.5l.008.125.007.047-.001.002.003.014.006.024h-.001l.004.018.016.058.007.021.004.013.009.026.013.033.012.027-.011-.026.019.043-.008-.017.029.06-.018-.037.048.09a1 1 0 0 0 1.784-.155l.015-.039.006-.018-.015.039.022-.06-.001-.001.016-.057.004-.018.005-.024.001-.006v-.001l.005-.033.008-.06A.877.877 0 0 0 10 11.5l-.008-.124-.007-.051-.001-.001-.003-.014-.01-.047-.004-.016-.007-.024-.01-.034-.004-.012-.01-.03-.006-.013-.007-.017-.01-.026A1.002 1.002 0 0 0 9 10.5zm6-6a2 2 0 0 1 1.936 1.498L19.5 6a.5.5 0 0 1 0 1l-2.563.001a2.001 2.001 0 0 1-3.874 0L4.5 7a.5.5 0 0 1 0-1l8.564-.002A2 2 0 0 1 15 4.5zm0 1a.998.998 0 0 0-.93.634l-.014.034-.007.022-.014.047-.002.009v.001l-.005.016-.01.047.005-.025-.005.026-.003.014-.004.025-.007.061C14 6.441 14 6.471 14 6.5l.008.125.007.047-.001.002.003.014.006.024h-.001l.004.018.016.058.007.021.004.013.009.026.013.033.012.027-.011-.026.019.043-.008-.017.029.06-.018-.037.048.09a1 1 0 0 0 1.784-.155l.015-.039.006-.018-.015.039.022-.06-.001-.001.016-.057.004-.018.005-.024.001-.006v-.001l.005-.033.008-.06C16 6.557 16 6.528 16 6.5l-.008-.124-.007-.051-.001-.001-.003-.014-.01-.047-.004-.016-.007-.024-.01-.034-.004-.012-.01-.03-.006-.013-.007-.017-.01-.026A1.002 1.002 0 0 0 15 5.5z"
                  ></path>
                </svg>
                <span className="ml-2">View</span>
              </div>
            </button>
            <button className="flex items-center hover:bg-gray-100 py-2 px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                data-svgs-path="sm1/comments.svg"
              >
                <path
                  fill="currentColor"
                  fill-rule="nonzero"
                  d="M11.707 20.793A1 1 0 0 1 10 20.086V18H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4.5l-2.793 2.793zM11 20.086L14.086 17H19a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h6v3.086z"
                ></path>
              </svg>
            </button>
            <button className="flex items-center hover:bg-gray-100 py-2 px-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  transform="translate(3 10)"
                >
                  <circle cx="2" cy="2" r="2"></circle>
                  <circle cx="9" cy="2" r="2"></circle>
                  <circle cx="16" cy="2" r="2"></circle>
                </g>
              </svg>
            </button>
          </div>
        </div>

        {/* List */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {task.length === 0 && (
            <div className="flex items-center justify-center py-4">
              {isLoading ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900">
                  {" "}
                </div>
              ) : (
                <p className="text-gray-500">No tasks found</p>
              )}
            </div>
          )}
          {task.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between px-4 py-1 border-b border-gray-200 hover:bg-gray-100 transition"
              onMouseEnter={() => setListHovered(item.id)}
              onMouseLeave={() => setListHovered(null)}
            >
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleClick(item.id)}
                  className="cursor-pointer p-2 rounded"
                  onMouseEnter={() => setHoveredTask(item.id)}
                  onMouseLeave={() => setHoveredTask(null)}
                >
                  <div className="w-6 h-6 rounded-full border border-gray-300">
                    {hoveredTask === item.id && (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="tb7nk6f"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M16.5056 9.00958C16.2128 8.71668 15.7379 8.71668 15.445 9.00958L10.6715 13.7831L8.72649 11.8381C8.43359 11.5452 7.95872 11.5452 7.66583 11.8381C7.37294 12.1309 7.37293 12.6058 7.66583 12.8987L10.1407 15.3736C10.297 15.5299 10.5051 15.6028 10.7097 15.5923C10.8889 15.5833 11.0655 15.5104 11.2023 15.3735L16.5056 10.0702C16.7985 9.77735 16.7985 9.30247 16.5056 9.00958Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    )}
                  </div>
                </button>
                <div className="flex flex-col ml-5">
                  <span className="text-gray-800 text-md">{item.name}</span>
                  <span className="text-gray-400 text-sm">
                    {item.description}
                  </span>
                  <span className="text-blue-600 text-sm">
                    {item.createdAt.substring(0, 10)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  className="flex items-center text-gray-500 hover:bg-gray-200 p-1 rounded-sm"
                  style={{
                    visibility: listHovered === item.id ? "visible" : "hidden",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSalectedTask(item.id);
                    setEditModel(true);
                  }}
                >
                  <div className="w-6 h-6">
                    <svg width="24" height="24">
                      <g fill="none" fill-rule="evenodd">
                        <path
                          fill="currentColor"
                          d="M9.5 19h10a.5.5 0 1 1 0 1h-10a.5.5 0 1 1 0-1z"
                        ></path>
                        <path
                          stroke="currentColor"
                          d="M4.42 16.03a1.5 1.5 0 0 0-.43.9l-.22 2.02a.5.5 0 0 0 .55.55l2.02-.21a1.5 1.5 0 0 0 .9-.44L18.7 7.4a1.5 1.5 0 0 0 0-2.12l-.7-.7a1.5 1.5 0 0 0-2.13 0L4.42 16.02z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                </button>
                <button
                  className="flex items-center text-gray-500 hover:bg-gray-200 p-1 rounded-sm"
                  style={{
                    visibility: listHovered === item.id ? "visible" : "hidden",
                  }}
                >
                  <div className="w-6 h-6">
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
                        d="M18 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM5 6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6Zm12 10a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM7 8a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1H7Z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </button>
                <button
                  className="flex items-center text-gray-500 hover:bg-gray-200 p-1 rounded-sm"
                  style={{
                    visibility: listHovered === item.id ? "visible" : "hidden",
                  }}
                >
                  <div className="w-6 h-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      data-svgs-path="sm1/comments.svg"
                    >
                      <path
                        fill="currentColor"
                        fill-rule="nonzero"
                        d="M11.707 20.793A1 1 0 0 1 10 20.086V18H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4.5l-2.793 2.793zM11 20.086L14.086 17H19a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h6v3.086z"
                      ></path>
                    </svg>
                  </div>
                </button>
                <button
                  className="flex items-center text-gray-500 hover:bg-gray-200 p-1 rounded-sm"
                  style={{
                    visibility: listHovered === item.id ? "visible" : "hidden",
                  }}
                >
                  <div className="w-6 h-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        transform="translate(3 10)"
                      >
                        <circle cx="2" cy="2" r="2"></circle>
                        <circle cx="9" cy="2" r="2"></circle>
                        <circle cx="16" cy="2" r="2"></circle>
                      </g>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          ))}
          <div
            onClick={() => setAddForm(true)}
            className="flex items-center justify-center cursor-pointer p-2 text-gray-500 hover:text-[#DC4C3E] hover:bg-gray-200 rounded"
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
      </div>
    </div>
  );
};

export default ProjectDetails;
