import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Stuff from "./pages/Stuff/Index";
import StuffCreate from "./pages/Stuff/Create";
import StuffEdit from "./pages/Stuff/Edit";
import Dashboard from "./pages/Dashboard";
import TrashStuff from "./pages/Stuff/TrashStuff";
import Inbound from "./pages/Inbound/Index";
import InboundCreate from "./pages/Inbound/Create";
import InboundShow from "./pages/Inbound/Show";
import User from "./pages/User/Index";
import UserCreate from "./pages/User/Create";
import UserShow from "./pages/User/Show";
import UserEdit from "./pages/User/Edit";


export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/login', element: <Login /> },
    { path: '/profile', element: <Profile /> },
    { path: '/stuff', element: <Stuff /> },
    { path: '/stuff/create', element: <StuffCreate /> },
    { path: '/stuff/edit/:id', element: <StuffEdit /> },
    { path: '/dashboard', element: <Dashboard />},
    { path: '/trash/stuff', element: <TrashStuff />},
    { path: '/inbound', element: <Inbound /> },
    { path: '/inbound/create', element: <InboundCreate /> },
    { path: '/inbound/show/:id', element: <InboundShow /> },
    { path: '/user', element: <User /> },
    { path: '/user/create', element: <UserCreate /> },
    { path: '/user/:id/show/', element: <UserShow /> },
    { path: '/user/:id/edit/', element: <UserEdit /> },
])