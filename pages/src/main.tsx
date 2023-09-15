import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { App } from './App.tsx'
import { Help } from './pages/help.tsx'
import { Index } from './pages/index.tsx'
import { Settings } from './pages/settings.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/help',
    element: <Help />,
  },
])

const root = document.getElementById('root')
if (root !== null) {
  createRoot(root).render(
    <React.StrictMode>
      <App>
        <RouterProvider router={router} />
      </App>
    </React.StrictMode>
  )
}
