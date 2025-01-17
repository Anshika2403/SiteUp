import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Monitor from "./pages/Monitor.jsx";
import store from "./store/store.js";
import Profile from "./pages/Profile.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import WebsiteForm from "./components/WebsiteForm.jsx";
import Website from "./components/Website.jsx";
import Notification from "./components/Notification.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path:"/dashboard",
        element:<ProtectedRoute>
        <Dashboard/></ProtectedRoute>
      },
      {
        path:"/monitor",
        element:<ProtectedRoute>
        <Monitor/>
        </ProtectedRoute>
      },
      {path:"/profile",
        element:<ProtectedRoute>
        <Profile/></ProtectedRoute>
      },
      {
        path:"/addWebsite",
        element:<ProtectedRoute><WebsiteForm /></ProtectedRoute> 
      },
      {
        path:"/website/:id",
        element:<ProtectedRoute><Website/></ProtectedRoute>
      },
      {
        path:"/notification",
        element:<ProtectedRoute><Notification/></ProtectedRoute>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/signup",
        element:<SignUp/>
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
