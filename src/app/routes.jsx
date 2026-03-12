import { createBrowserRouter } from "react-router";
import { Root } from "./pages/root";
import { Home } from "./pages/home";
import { AddQuestion } from "./pages/add-question";
import { Practice } from "./pages/practice";

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