import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Timeline from './routes/Timeline.tsx';
import Layout from './routes/Layout.tsx';
import Map from './routes/Map.tsx';

const router = createBrowserRouter([
 {
  path: '',
  element: <Layout/>,
  children: [
    {
      path: "/",
      element: <Timeline/>,
    },
    {
      path: "/map",
      element: <Map/>,
    },
  ]
 }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
