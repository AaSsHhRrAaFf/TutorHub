import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login'
import Register from '../pages/Register'
import React from 'react';
import FindTutors from '../pages/FindTutors'
import PrivateRoute from './PrivateRoute';
import AddTutorial from '../pages/AddTutorial';
import MyTutorials from '../pages/MyTutorials'
import TutorDetails from '../pages/TutorDetails'


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
        path: '/find-tutors',
        element: <FindTutors />
      },
      {
        path: '/add-tutorials',
        element: (
          <PrivateRoute>
            <AddTutorial />
          </PrivateRoute>
        )
      },
      {
        path: '/my-tutorials',
        element: (
          <PrivateRoute>
            <MyTutorials />
          </PrivateRoute>
        )
      },
      {
        path: '/find-tutors/:category',
        element: <FindTutors />
      },
      {
        path: '/tutor/:id',
        element: (
          <PrivateRoute>
            <TutorDetails />
          </PrivateRoute>
        )
      }
     
     
            
      
      
    ]
  }
])

export default router;
