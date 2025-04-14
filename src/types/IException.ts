export interface IException {
    args: string[],
    date: string,
    message: string,
    path: string | URL,
    status: number
}