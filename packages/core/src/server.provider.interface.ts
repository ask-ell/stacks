export interface IServerProvider {
  listen: (port: number) => Promise<void>
}
