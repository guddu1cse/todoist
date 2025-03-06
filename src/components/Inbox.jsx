import React, { use, useEffect, useState } from "react";
import { todoist } from "./config";
import TaskEditModal from "./TaskEditModel";
import { updateTask } from "../utils/axios";
import { notifySuccess, notifyError } from "./config";
import { setState } from "../redux/slice";
import { useSelector, useDispatch } from "react-redux";
import {
  Adjust,
  Calculator,
  Comments,
  Edit,
  More,
  Plus,
  Tick,
} from "../assets/Icons";

const Inbox = ({ InboxSize, setInboxSize, setAddForm }) => {
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

  const [task, setTask] = useState([]);
  const [hoveredTask, setHoveredTask] = useState(null);
  const [listHovered, setListHovered] = useState(null);
  const [taskEdit, setTaskEdit] = useState(false);
  const [salectedTask, setSalectedTask] = useState(null);

  useEffect(() => {
    todoist
      .getTasks()
      .then((tasks) => {
        setTask(
          tasks.results
            .map((task) => ({ ...task, name: task.content }))
            .filter((task) => !task.isCompleted)
        );
        notifySuccess("Task loaded Successfully");
      })
      .catch((error) => {
        notifyError("Error loading tasks");
      });
  }, []);

  useEffect(() => {
    if (task) {
      setInboxSize(task.length);
    } else {
      setInboxSize("");
    }
  }, [task]);

  const onCancel = () => {
    setTaskEdit(false);
  };

  const handleClick = (id) => {
    setTask((prevTask) => prevTask.filter((task) => task.id !== id));
    updateTask(id, { isCompleted: true });
  };

  return (
    <div>
      {taskEdit && (
        <TaskEditModal
          visible={taskEdit}
          {...salectedTask}
          onCancel={onCancel}
          setEditModel={setTaskEdit}
        />
      )}
      <div className="p-6 w-full bg-white min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-center">Inbox</h1>
          <div className="flex space-x-2 text-gray-500">
            <button className="flex items-center hover:bg-gray-100 p-2 rounded">
              <div className="flex">
                {/* Adjust icon */}
                <Adjust />
                <span className="ml-2">View</span>
              </div>
            </button>
            <button className="flex items-center hover:bg-gray-100 py-2 px-2">
              {/* Comments icon */}
              <Comments />
            </button>
            <button className="flex items-center hover:bg-gray-100 py-2 px-2">
              {/* Three dots icon */}
              <More />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
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
                    {hoveredTask === item.id && <Tick />} {/* Tick icon */}
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
                    setTaskEdit(true);
                    setSalectedTask(item);
                  }}
                >
                  <div className="w-6 h-6">
                    {/* Edit icon */}
                    <Edit />
                  </div>
                </button>
                <button
                  className="flex items-center text-gray-500 hover:bg-gray-200 p-1 rounded-sm"
                  style={{
                    visibility: listHovered === item.id ? "visible" : "hidden",
                  }}
                >
                  <div className="w-6 h-6">
                    {/* Calculator icon */}
                    <Calculator />
                  </div>
                </button>
                <button
                  className="flex items-center text-gray-500 hover:bg-gray-200 p-1 rounded-sm"
                  style={{
                    visibility: listHovered === item.id ? "visible" : "hidden",
                  }}
                >
                  <div className="w-6 h-6">
                    <Comments />
                  </div>
                </button>
                <button
                  className="flex items-center text-gray-500 hover:bg-gray-200 p-1 rounded-sm"
                  style={{
                    visibility: listHovered === item.id ? "visible" : "hidden",
                  }}
                >
                  <div className="w-6 h-6">
                    {/* Three dots icon */}
                    <More />
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
              {/* Plus icon */}
              <Plus />
            </div>{" "}
            Add Task
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
