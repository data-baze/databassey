import { createBrowserRouter } from "react-router-dom";
import Home from "./screens/home/Home";
import About from "./screens/about/About";
// import Dashboard from "../screens/Dashboard";
// import NotFound from "./screens/not-found/NotFound";
import Layout from "./components/layouts/Layout";
import NotFound from "./screens/not-found/NotFound";
import Contact from "./screens/contact/Contact";
import Services from "./screens/services/Services";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      // { path: "dashboard", element: <Dashboard /> },
      { path: "contact", element: <Contact /> },
      { path: "services", element: <Services /> },
      { path: "*", element: <NotFound /> },
    ],
  },

  // Fallback for any unmatched root-level routes
  { path: "*", element: <NotFound /> },
]);
