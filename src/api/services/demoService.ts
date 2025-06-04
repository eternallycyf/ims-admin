import apiClient from '../apiClient'

export enum DemoApi {
  TOKEN_EXPIRED = '/user/tokenExpired',
}

async function mockTokenExpired() {
  return await apiClient.post({ url: DemoApi.TOKEN_EXPIRED })
}

export default {
  mockTokenExpired,
}
