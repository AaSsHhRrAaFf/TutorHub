import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login'
import Register from '../pages/Register'
import React from 'react';
import FindTutors from '../pages/FindTutors'


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/find-tutors/:category',
        element: <FindTutors />
      }
      
    ]
  }
])

export default router;
