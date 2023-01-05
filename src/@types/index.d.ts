export interface IDisposable {
  dispose(): void | Promise<void>
}

export interface SystemError extends Error {
  address: string
  code: string
  dest: string
  errno: number
  info: Record<string, unknown>
  message: string
  path: string
  port: number
  syscall: string
}
