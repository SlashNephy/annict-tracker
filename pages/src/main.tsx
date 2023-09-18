import { init, BrowserTracing } from '@sentry/react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { App } from './App.tsx'
import { router } from './router.tsx'

if (import.meta.env.PROD) {
  init({
    dsn: 'https://406bfa633652c954c74eb4251033d857@o4505899258871808.ingest.sentry.io/4505900803686400',
    integrations: [new BrowserTracing()],
    tracesSampleRate: 0.2,
  })
}

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
