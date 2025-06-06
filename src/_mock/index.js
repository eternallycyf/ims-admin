import { setupWorker } from 'msw/browser'

import orgMockApi from './handlers/_org'
import userMockApi from './handlers/_user'
import demoMockApi from './handlers/_demo'

const handlers = [...userMockApi, ...orgMockApi, ...demoMockApi]
export const worker = setupWorker(...handlers)
