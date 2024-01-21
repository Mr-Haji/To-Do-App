import React from 'react'
import Home from '../Screens/Home/Home'
import SignUp from '../Screens/SingUp/SignUp'
import LogIn from '../Screens/LogIn/LogIn'
import Error from '../Screens/Error/Error'


const RouteList = [
    {
        path: "/",
        element: <SignUp />
    },
    {
        path: "/login",
        element: <LogIn />
    },
    {
        path: "/todo",
        element: <Home />
    },
    {
        path: "*",
        element: <Error />
    },

]

export default RouteList
