/* eslint-disable @typescript-eslint/consistent-type-definitions */
/**
 * Basic JSON response for Controllers
 */
export type BasicResponse = {
  message: string
}

/**
 * error JSON responses for Controllers
 */
export type ErrorResponse = {
  message: string,
  error: string
}

/**
 * Auth JSON responses for Controllers
 */
export type AuthResponse = {
  message: string,
  token: string
}
