import React, { useState, useEffect } from "react";
import { todoist } from "./config";
import { Splitter } from "antd";
import {
  InboxOutlined,
  CalendarOutlined,
  RightOutlined,
} from "@ant-design/icons/lib/icons";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showProject, setShowProject] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    todoist
      .getProjects()
      .then((projects) => projects.results)
      .then((projects) => {
        setFavorites(() => projects.filter((project) => project.isFavorite));
        setProjects(projects);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleFavoritesClick = () => setShowFavorites(!showFavorites);
  const handleProjectClick = () => setShowProject(!showProject);

  const style = {
    btn: {
      paddingLeft: "10px",
      width: "100%",
      height: "40px",
      border: "1px solid transparent",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      borderRadius: "5px",
      fontSize: "15px",
      background: "transparent",
      color: "black",
      gap: "10px",
      transition: "background 0.3s",
    },

    span: {
      width: "28px",
      height: "28px",
      background: "red",
      color: "#FAF0EE",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      borderRadius: "50%",
      fontSize: "20px",
      fontWeight: "bold",
    },

    icon: {
      width: "28px",
      height: "28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "22px",
    },

    listItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "5px 10px",
      borderRadius: "5px",
      transition: "background 0.3s",
    },

    menuBtn: {
      cursor: "pointer",
      border: "none",
      background: "transparent",
      fontSize: "16px",
      display: "none",
    },
  };

  return (
    <Splitter
      style={{
        marginTop: "40px",
        height: "100vh",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Splitter.Panel
        defaultSize="25%"
        min="20%"
        max="70%"
        style={{
          backgroundColor: "#FDFAF8",
          padding: "10px",
          overflowY: "auto",
        }}
      >
        <button
          style={{
            ...style.btn,
            color: "red",
          }}
          className="hover:bg-gray-200"
        >
          <span style={style.span}>+</span> Add task
        </button>
        <button style={style.btn} className="hover:bg-gray-200">
          <div style={style.icon}>
            <InboxOutlined />
          </div>
          Inbox
        </button>
        <button style={style.btn} className="hover:bg-gray-200">
          <div style={style.icon}>
            <CalendarOutlined />
          </div>
          Today
        </button>

        {/* Favorites Section */}
        <div style={{ width: "100%", padding: "5px 0" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ color: "gray", margin: 0 }}>Favorites</p>
            <button
              style={{
                cursor: "pointer",
                border: "none",
                background: "transparent",
              }}
              onClick={handleFavoritesClick}
            >
              <RightOutlined
                style={{
                  transform: showFavorites ? "rotate(90deg)" : "rotate(0deg)",
                }}
              />
            </button>
          </div>
          {showFavorites && (
            <div style={{ paddingLeft: "15px" }}>
              {favorites.map((fav) => (
                <div
                  key={fav.id}
                  style={style.listItem}
                  onMouseEnter={(e) => {
                    e.currentTarget.children[1].style.display = "block";
                    e.currentTarget.style.backgroundColor = "#BBBBBB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.children[1].style.display = "none";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <p style={{ margin: "5px 0" }}>
                    <span style={{ color: fav.color }}>{"# "}</span> {fav.name}
                  </p>
                  <button style={style.menuBtn}>⋮</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Projects Section */}
        <div style={{ width: "100%", padding: "5px 0" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ color: "gray", margin: 0 }}>Projects</p>
            <button
              style={{
                cursor: "pointer",
                border: "none",
                background: "transparent",
              }}
              onClick={handleProjectClick}
            >
              <RightOutlined
                style={{
                  transform: showProject ? "rotate(90deg)" : "rotate(0deg)",
                }}
              />
            </button>
          </div>
          {showProject && (
            <div style={{ paddingLeft: "15px" }}>
              {projects.map((project) => (
                <div
                  key={project.id}
                  style={style.listItem}
                  onMouseEnter={(e) => {
                    e.currentTarget.children[1].style.display = "block";
                    e.currentTarget.style.backgroundColor = "#BBBBBB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.children[1].style.display = "none";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <p style={{ margin: "5px 0" }}>
                    <span style={{ color: project.color }}>{"# "}</span>{" "}
                    {project.name}
                  </p>
                  <button style={style.menuBtn}>...</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Splitter.Panel>
      <Splitter.Panel>{/* 2nd Section */}</Splitter.Panel>
    </Splitter>
  );
};

export default Home;
