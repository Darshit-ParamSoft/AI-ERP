import { createBrowserRouter } from "react-router";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginScreen,
  },
  {
    path: "/dashboard",
    Component: DashboardScreen,
  },
]);
