import { RouterProvider } from "react-router";
import { router } from "./routes.jsx";
import { Toaster } from "./components/ui/sonner.js";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}
