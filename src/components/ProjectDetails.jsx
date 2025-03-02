import React, { useEffect, useState } from "react";
import { todoist } from "./config";
import { updateTask } from "../utils/axios";
import { notifyError } from "./config";
import TaskEditModal from "./TaskEditModel";
import {
  Adjust,
  Calculator,
  Comments,
  Edit,
  Hashtag,
  More,
  Plus,
  Tick,
} from "../assets/Icons";

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
                {/* Hashtag icon */}
                <Hashtag project={{ color }} />
              </div>{" "}
              {name}
            </div>
          </h1>
          <div className="flex space-x-2 text-gray-500">
            <button className="flex items-center hover:bg-gray-100 p-2 rounded">
              <div className="flex">
                <Adjust />
                <span className="ml-2">View</span>
              </div>
            </button>
            <button className="flex items-center hover:bg-gray-100 py-2 px-2">
              {/* Comment icon */}
              <Comments />
            </button>
            <button className="flex items-center hover:bg-gray-100 py-2 px-2">
              {/* Three dot icon */}
              <More />
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
                    {/* Tick icon */}
                    {hoveredTask === item.id && <Tick />}
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
                    {/* Comments icon */}
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
                    {/* Three dot icon */}
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
              <Plus />
            </div>{" "}
            Add Task
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
