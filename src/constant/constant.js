import { completed, filter, inbox, search, today, Upcoming } from "../assets/Icons";

export const colors = [
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

export const priorityList = [
  { priority: 1, color: "#d1453b" },
  { priority: 2, color: "#f7dc6f" },
  { priority: 3, color: "#00b8a9" },
  { priority: 4, color: "#8c8c8c" },
];

export const scrollableContent = [
  {
    icon: search(),
    label: "Search",
  },
  {
    icon: inbox(),
    label: "Inbox",
    count: 5,
  },
  {
    icon: today(),
    label: "Today",
  },
  {
    icon: Upcoming(),
    label: "Upcoming",
  },
  {
    icon: filter(),
    label: "Filters & Labels",
  },
  {
    icon: completed(),
    label: "Completed",
  },
];
