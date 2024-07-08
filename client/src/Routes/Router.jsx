import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Chat from "../pages/Chat";
import Register from "../pages/Register";
import Login from "../pages/Login";
import SetAvatar from "../pages/SetAvatar";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Chat />
            },
            {
                path: '/set-avatar',
                element: <SetAvatar />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            },
        ]
    },
]);

export default router;