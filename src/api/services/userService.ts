import apiClient from '../apiClient'

import type { UserInfo, UserToken } from '#/entity'

export interface SignInReq {
  username: string
  password: string
}

export interface SignUpReq extends SignInReq {
  email: string
}
export type SignInRes = UserToken & { user: UserInfo }

export enum UserApi {
  SignIn = '/auth/signin',
  SignUp = '/auth/signup',
  Logout = '/auth/logout',
  Refresh = '/auth/refresh',
  User = '/user',
}

function signin(data: SignInReq): Promise<SignInRes> {
  return apiClient.post<SignInRes>({ url: UserApi.SignIn, data })
}

function signup(data: SignUpReq): Promise<SignInRes> {
  return apiClient.post<SignInRes>({ url: UserApi.SignUp, data })
}
const logout = () => apiClient.get({ url: UserApi.Logout })
function findById(id: string): Promise<UserInfo[]> {
  return apiClient.get<UserInfo[]>({ url: `${UserApi.User}/${id}` })
}

export default {
  signin,
  signup,
  findById,
  logout,
}
