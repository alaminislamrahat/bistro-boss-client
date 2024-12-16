import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Secret from "../Pages/Shared/Secret/Secret";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../Pages/Dashboard/UpdateItem/UpdateItem";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children : [
        {
            path: '/',
            element : <Home/>
        },
        {
            path: '/menu',
            element : <Menu/>
        },
        {
            path: '/order/:category',
            element : <Order/>
        },
        {
            path: '/login',
            element : <Login/>
        },
        {
            path: '/signUp',
            element : <SignUp/>
        },
        {
            path: '/secret',
            element : <PrivateRoute><Secret/></PrivateRoute>
        },
      ]
    },
    {
        path : 'dashboard',
        element : <PrivateRoute><Dashboard/></PrivateRoute>,
        children : [
            // normal route
            {
                path : 'cart',
                element : <Cart/>
            },

            // admin only routes

            {
                path : 'users',
                element : <AdminRoute><AllUsers/></AdminRoute>
            },
            {
                path : 'addItems',
               element : <AdminRoute><AddItems/></AdminRoute>
            },
            {
                path : 'manageItems',
               element : <AdminRoute><ManageItems/></AdminRoute>
            },
            {
                path : 'updateItem/:id',
               element : <AdminRoute><UpdateItem/></AdminRoute>
            },
        ]
    }
  ]);
  