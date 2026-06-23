import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import Architecture from '../pages/Architecture';
import Development from '../pages/Development';
import Deployment from '../pages/Deployment';
import GettingStarted from '../pages/GettingStarted';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'architecture',
        element: <Architecture />,
      },
      {
        path: 'development',
        element: <Development />,
      },
      {
        path: 'deployment',
        element: <Deployment />,
      },
      {
        path: 'getting-started',
        element: <GettingStarted />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
