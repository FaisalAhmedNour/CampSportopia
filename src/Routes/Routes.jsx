import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Classes from "../Pages/AllClasses/Classes/Classes";
import Instructors from "../Pages/Instructors/Instructors/Instructors";
import DashBoard from "../layouts/Dashboard/DashBoard";
import PrivateRoute from "./PrivateRoute";
import SelectedClasses from "../Pages/SelectedClasses/SelectedClasses";
import EnrolledClasses from "../Pages/EnrolledClasses/EnrolledClasses";
import ManageUsers from "../Pages/ManageUsers/ManageUsers";
import ManageClasses from "../Pages/ManageClasses/ManageClasses";
import AddAClass from "../Pages/AddAClass/AddAClass";
import MyClasses from "../Pages/MyClasses/MyClasses";
import UpdateClass from "../Pages/UpdateClass/UpdateClass";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import UserDashboard from "../Pages/UserDashboard/UserDashboard";
// import Payment from "../Pages/Payment/Payment";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        // errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/all-classes',
                element: <Classes></Classes>
            },
            {
                path: '/instructors',
                element: <Instructors></Instructors>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
        children: [
            {
                path: "/dashboard",
                element: <UserDashboard></UserDashboard>
            },
            // {
            //     path: "/dashboard/payment/:id",
            //     element: <PrivateRoute><Payment></Payment></PrivateRoute>,
            //     loader: ({ params }) => fetch(`https://camp-sportopia-server-faisalahmednour.vercel.app/classes/${params.id}`)
            // },
            {
                path: "/dashboard/selected-classes",
                element: <PrivateRoute><SelectedClasses></SelectedClasses></PrivateRoute>
            },
            {
                path: "/dashboard/enrolled-classes",
                element: <PrivateRoute><EnrolledClasses></EnrolledClasses></PrivateRoute>
            },
            {
                path: "/dashboard/manage-users",
                element: <PrivateRoute><AdminRoute><ManageUsers></ManageUsers></AdminRoute></PrivateRoute>
            },
            {
                path: "/dashboard/manage-classes",
                element: <PrivateRoute><AdminRoute><ManageClasses></ManageClasses></AdminRoute></PrivateRoute>
            },
            {
                path: "/dashboard/add-class",
                element: <PrivateRoute><InstructorRoute><AddAClass></AddAClass></InstructorRoute></PrivateRoute>
            },
            {
                path: "/dashboard/my-classes",
                element: <PrivateRoute><InstructorRoute><MyClasses></MyClasses></InstructorRoute></PrivateRoute>
            },
            {
                path: "/dashboard/update-classes/:id",
                element: <PrivateRoute><InstructorRoute><UpdateClass></UpdateClass></InstructorRoute></PrivateRoute>,
                loader: ({ params }) => fetch(`https://camp-sportopia-server-faisalahmednour.vercel.app/classes/${params.id}`)
            },
            {

            }
        ]
    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>
    }
])