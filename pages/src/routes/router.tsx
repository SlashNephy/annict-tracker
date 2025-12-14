import { createBrowserRouter } from 'react-router-dom'

import { Help } from './help.tsx'
import { Index } from './index.tsx'
import { Settings } from './settings.tsx'

import type { RouteObject } from 'react-router-dom'

export type Route = RouteObject & {
  title: string
}

export const routes: Route[] = [
  {
    title: '視聴記録',
    path: '/',
    element: <Index />,
  },
  {
    title: '使い方',
    path: '/help',
    element: <Help />,
  },
  {
    title: '設定',
    path: '/settings',
    element: <Settings />,
  },
]

export const router = createBrowserRouter(routes)
