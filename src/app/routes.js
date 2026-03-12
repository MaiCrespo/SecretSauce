import { createBrowserRouter } from "react-router";
import { Root } from "./pages/root.js";
import { Home } from "./pages/home.js";
import { AddQuestion } from "./pages/add-question.js";
import { Practice } from "./pages/practice.js";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "add", Component: AddQuestion },
      { path: "practice", Component: Practice },
    ],
  },
]);
