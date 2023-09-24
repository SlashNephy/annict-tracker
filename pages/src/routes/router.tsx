import { IconDeviceTv, IconHelp, IconSettings } from '@tabler/icons-react'
import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { Help } from './help.tsx'
import { Index } from './index.tsx'
import { Settings } from './settings.tsx'

import type { TablerIconsProps } from '@tabler/icons-react'
import type { RouteObject } from 'react-router-dom'

export type Route = {
  label: string
  route: RouteObject & { path: string }
  icon(props: TablerIconsProps): React.JSX.Element
}

export const routes: Route[] = [
  {
    label: '視聴記録',
    icon: IconDeviceTv,
    route: {
      path: '/',
      element: <Index />,
    },
  },
  {
    label: '使い方',
    icon: IconHelp,
    route: {
      path: '/help',
      element: <Help />,
    },
  },
  {
    label: '設定',
    icon: IconSettings,
    route: {
      path: '/settings',
      element: <Settings />,
    },
  },
]

export const router = createBrowserRouter(routes.map((r) => r.route))
