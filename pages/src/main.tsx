import { browserTracingIntegration, init } from '@sentry/react'
import { Provider } from 'jotai'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { App } from './App.tsx'
import { router } from './routes/router.tsx'

init({
  environment: import.meta.env.PROD ? 'production' : 'development',
  dsn: 'https://406bfa633652c954c74eb4251033d857@o4505899258871808.ingest.sentry.io/4505900803686400',
  integrations: [browserTracingIntegration()],
  sampleRate: import.meta.env.PROD ? 1 : 0,
  tracesSampleRate: import.meta.env.PROD ? 0.25 : 0,
})

const root = document.getElementById('root')
if (root !== null) {
  createRoot(root).render(
    <StrictMode>
      <Provider>
        <App>
          <RouterProvider router={router} />
        </App>
      </Provider>
    </StrictMode>,
  )
}
